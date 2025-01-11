# KoinX Backend

## Table of Contents

1. [Description](#description)
2. [Features](#features)
3. [API Endpoints](#api-endpoints)
4. [Local Setup](#local-setup)
5. [Deployment](#deployment)
6. [Usage](#usage)
7. [Contributing](#contributing)
8. [Twitter](#twitter)

## Description

KoinX Backend is a robust server-side application designed to power the KoinX project. It provides APIs for managing cryptocurrency data, user transactions, and related functionalities. The backend periodically fetches and stores cryptocurrency data, offering real-time statistics and historical analysis.

## Features

- **Real-time Cryptocurrency Data**: Fetches and provides up-to-the-minute data for Bitcoin, Ethereum, and Matic.
- **Automated Data Collection**: Utilizes a cron job to fetch cryptocurrency data every 2 hours, ensuring data freshness.
- **Historical Data Storage**: Stores historical cryptocurrency data in MongoDB for trend analysis and reporting.
- **Price Deviation Calculation**: Offers a specialized endpoint to calculate price standard deviation based on historical data.
- **Health Monitoring**: Includes a health check endpoint for monitoring server status and uptime.

## Architecture & Tech Stack

- **Backend Framework**: Node.js with Express.js
- **Language**: TypeScript
- **Database**: MongoDB
- **Deployment**: Render (Cloud Platform)
- **Environment Management**: dotenv for environment variable management
- **Data Fetching**: Node's native `fetch` API
- **Scheduling**: Node-cron for scheduled tasks

## API Endpoints

Base URL: `https://koinx-backend-6v42.onrender.com/`

### 1. Get Cryptocurrency Stats

- **Endpoint**: `/stats`
- **Method**: GET
- **Query Parameters**:

- `coin`: Cryptocurrency name (e.g., bitcoin, ethereum, matic-network)

- **Example**: `https://koinx-backend-6v42.onrender.com/stats?coin=bitcoin`
- **Response**:

```json
{
  "price": 40000,
  "marketCap": 800000000,
  "24hChange": 3.4
}
```

### 2. Get Price Deviation

- **Endpoint**: `/deviation`
- **Method**: GET
- **Query Parameters**:

- `coin`: Cryptocurrency name (e.g., bitcoin, ethereum, matic-network)

- **Example**: `https://koinx-backend-6v42.onrender.com/deviation?coin=bitcoin`
- **Response**:

```json
{
  "deviation": 4082.48
}
```

### 3. Health Check

- **Endpoint**: `/health`
- **Method**: GET
- **Response**: Server status and uptime information

## Local Setup

### Prerequisites

- Node.js
- pnpm
- MongoDB instance
- CoinGecko API Key

### Installation Steps

1. Clone the repository:

```shellscript
git clone https://github.com/Avinash-Tallapaneni/koinx_backend
cd koinx_backend
```

2. Install dependencies:

```shellscript
pnpm install
```

3. Set up environment variables:
   Create a `.env.development` file for development or `.env.production` for production with the following variables:

```plaintext
MONGO_URI=<your_mongodb_connection_string>
COINGECKO_BASE_URL=https://api.coingecko.com/api/v3
COINGECKO=<your_coingecko_api_key>
```

4. Start the development server:

```shellscript
pnpm run dev
```

## Deployment

The project is deployed on Render and is accessible at:

- Base URL: `https://koinx-backend-6v42.onrender.com/`

## Usage

### Fetching Cryptocurrency Stats

```shellscript
curl "https://koinx-backend-6v42.onrender.com/stats?coin=bitcoin"
```

### Calculating Price Deviation

```shellscript
curl "https://koinx-backend-6v42.onrender.com/deviation?coin=bitcoin"
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## twitter

contact me [@twit](https://x.com/TallapaneniAvi)

---
