import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface PriceData {
  symbol: string;
  price: number;
  timestamp: string;
}

interface PricesState {
  data: PriceData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PricesState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchPrices = createAsyncThunk('prices/fetchPrices', async (symbol: string) => {
  const response = await axios.get<PriceData[]>(`http://localhost:8090/api/prices/${symbol}`);
  return response.data;
});

const pricesSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPrices.fulfilled, (state, action: PayloadAction<PriceData[]>) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchPrices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch prices';
      });
  },
});

export default pricesSlice.reducer;
