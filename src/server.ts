import cron from "node-cron";
import app from "./app";
import { SERVER_CONFIG } from "./config/constants";

/**
 * Cron job to keep server alive by hitting
 * the /health endpoint every minute
 */

cron.schedule("*/5 * * * *", () => {
  console.log("Pinging the server to keep it alive...");
  fetch("https://koinx-backend-6v42.onrender.com/health");
});

app.listen(SERVER_CONFIG.PORT, () => {
  console.log(`server is running on port ${SERVER_CONFIG.PORT}`);
});
