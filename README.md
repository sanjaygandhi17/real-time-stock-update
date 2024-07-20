# Real-Time Prices

A web application that provides real-time cryptocurrency price tracking. The application consists of a backend service that fetches and stores cryptocurrency prices, and a frontend interface for displaying these prices in real-time.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Backend Implementation](#backend-implementation)
3. [Frontend Implementation](#frontend-implementation)
4. [Running the Project](#running-the-project)
5. [Dependencies](#dependencies)
6. [License](#license)

## Project Structure

- **`/backend`**: Contains the backend code.
  - `index.ts`: Entry point for the backend service.
  - `app.ts`: Defines the Express application and includes API routes.
  - **`/lib/models/StockPrice.ts`**: Mongoose model for storing stock prices.

- **`/frontend`**: Contains the frontend code.
  - **`/pages`**: Contains React pages for the application.
    - `/_app.tsx`: Main application component.
    - `index.tsx`: Homepage with price charts and modal component.
  - **`/components`**: Contains reusable React components.
    - `Modal.tsx`: Modal component for selecting cryptocurrencies.
  - **`/store`**: Contains Redux slices and store configuration.
    - `slices/pricesSlice.ts`: Redux slice for managing price data.
    - `index.ts`: Configures the Redux store.
  - `styles.css`: Global CSS styles.

## Backend Implementation

1. **Setup**

   - **Model**: Defined in `backend/lib/models/StockPrice.ts`. The `StockPrice` model uses Mongoose to define a schema for storing cryptocurrency prices.
   - **API**: Defined in `backend/app.ts`. The application connects to MongoDB, fetches cryptocurrency prices from an external API, stores them in the database, and provides an endpoint `/api/prices/:symbol` for retrieving historical price data.
   - **Polling**: The backend polls the CoinGecko API every 10 seconds for price updates.

2. **Running the Backend**

   - Make sure MongoDB is running and accessible.
   - Set the `MONGODB_URI` environment variable to the MongoDB connection string.
   - Run `npm install` to install dependencies.
   - Start the server with `npm start`.

## Frontend Implementation

1. **Setup**

   - **Pages**: Defined in `frontend/pages/index.tsx` and `_app.tsx`. The main page displays cryptocurrency prices and a chart. `_app.tsx` sets up the Redux store for the application.
   - **Components**: The `Modal.tsx` component allows users to select different cryptocurrencies to view.
   - **Store**: Redux is used for state management, with the price data being fetched and stored in the Redux store using `pricesSlice.ts`.

2. **Running the Frontend**

   - Run `npm install` to install dependencies.
   - Start the development server with `npm run dev`.

## Running the Project

1. **Backend**

   - Ensure MongoDB is running.
   - Set the environment variables as required.
   - Run the backend server:
     ```bash
     cd backend
     npm install
     npm start
     ```

2. **Frontend**

   - Start the frontend server:
     ```bash
     cd frontend
     npm install
     npm run dev
     ```

3. **Accessing the Application**

   - Open a web browser and navigate to `http://localhost:3000` to view the frontend application.
## Known Issues
- **Rate Limiting**: The CoinGecko API has rate limits which might cause the backend to throttle requests.
- **Error Handling**: Limited error handling for API failures.
## Dependencies

- **Backend**: Express, Mongoose, Axios, CORS
- **Frontend**: React, Redux, Chart.js, Next.js, Axios
