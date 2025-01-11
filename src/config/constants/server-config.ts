import { config } from "dotenv";

config();

export const SERVER_CONFIG = {
  PORT: process.env.PORT || 3000,
  ENV: process.env.NODE_ENV || "development",
};
