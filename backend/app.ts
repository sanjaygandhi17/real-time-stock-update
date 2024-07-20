import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import { StockPrice } from './lib/models/StockPrice';
import cors from 'cors';
import axios from 'axios';

export const createApp = async (): Promise<Application> => {
  const app = express();
  app.use(express.json());
  app.use(cors({
    methods: ['GET'],
    allowedHeaders: ['Content-Type'],
  }));

  const mongoURI = process.env.MONGODB_URI;
  if (!mongoURI) {
    throw new Error('MONGODB_URI environment variable is not set.');
  }

  await mongoose.connect(mongoURI, {
    writeConcern: {
      w: "majority",
      wtimeout: 1000,
    },
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB Atlas!');
  });

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const stocks = ['bitcoin', 'ethereum', 'ripple', 'litecoin', 'dogecoin'];
  const apiUrl = 'https://api.coingecko.com/api/v3/simple/price';
  
  let retryCount = 0;
  const maxRetries = 5;

  const pollData = async (): Promise<void> => {
    try {
      const response = await axios.get(apiUrl, {
        params: {
          ids: stocks.join(','),
          vs_currencies: 'usd',
        },
        headers: {
          'Accept-Encoding': 'gzip, deflate',
        },
      });

      const data = response.data;
      const stockPrices = stocks.map(stock => ({
        symbol: stock,
        price: data[stock]?.usd ?? 0,
        timestamp: new Date(),
      }));

      await StockPrice.insertMany(stockPrices);
      retryCount = 0;

    } catch (error: any) {
      if (error.response && error.response.status === 429) {
        console.warn('Rate limit exceeded. Waiting for the next interval.');
        retryCount++;
        const backoffTime = Math.min(Math.pow(2, retryCount) * 1000, 60000);
        await sleep(backoffTime);
      } else {
        console.error('Error fetching data:', error.message);
      }
    }
  };

  setInterval(pollData, 10000);

  app.get('/api/prices/:symbol', async (req: Request, res: Response) => {
    const { symbol } = req.params;
    try {
      const prices = await StockPrice.find({ symbol }).sort({ timestamp: -1 }).limit(20);
      res.json(prices);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving prices', error });
    }
  });

  return app;
};
