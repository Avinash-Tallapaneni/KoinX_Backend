import { config } from "dotenv";

config();

export const API_CONFIG = {
  BASE_URL: process.env.COINGECKO_BASE_URL,
  ENDPOINTS: {
    SIMPLE_PRICE: "/simple/price",
  },
};
