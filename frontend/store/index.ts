import { configureStore } from '@reduxjs/toolkit';
import pricesReducer from './slices/pricesSlice';

export const store = configureStore({
  reducer: {
    prices: pricesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
