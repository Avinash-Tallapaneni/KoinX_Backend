import cron from "node-cron";
import { JOB_CONFIG } from "../config/constants";
import { fetchCryptoCoins } from "../hooks/fetchCryptoCoins";
import CryptoPrice from "../model/CryptoPriceSchema";
import { updateCronStatus } from "./cronStatus";

export const startBackgrounCronJob = () => {
  const { PRICE_UPDATE_CRON, STOP_DATE } = JOB_CONFIG;

  console.log("Initializing the background cron job...");

  const task = cron.schedule(PRICE_UPDATE_CRON, async () => {
    const todaysDate = new Date();

    if (todaysDate > STOP_DATE) {
      console.log("Stopping cron job as stop date has been reached");
      task.stop();
      return;
    }

    try {
      console.log(`starting background worker at ${new Date()}`);

      const cryptoPriceData = await fetchCryptoCoins();

      if (!cryptoPriceData) {
        throw new Error("Error fetching the crypto coins data");
      }

      for (const [coinName, coinDetails] of Object.entries(cryptoPriceData)) {
        const {
          usd: price,
          usd_market_cap: marketCap,
          usd_24h_change: priceChange24h,
        } = coinDetails;

        if (!price || !marketCap || !priceChange24h) {
          console.warn(`Missing data for coin: ${coinName}, skipping...`);
          updateCronStatus("Stopped", null, null, "Stop date reached");

          continue;
        }

        await CryptoPrice.collection.insertOne({
          coinName,
          price,
          marketCap,
          priceChange24h,
          createdAt: new Date(),
        });

        console.log(`Inserted data for coin: ${coinName} at ${new Date()}`);
      }

      const nextRun = new Date(todaysDate.getTime() + 2 * 60 * 60 * 1000);
      updateCronStatus("Running", todaysDate, nextRun, null);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error occurred during background task:", error.message);
      } else {
        console.error(
          "Unexpected error occurred during background task:",
          error
        );
      }
    }
  });
};
