import mongoose from "mongoose";
import { config } from "dotenv";
import { startBackgrounCronJob } from "../../services/cronjob";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

config({ path: envFile });

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI as string;

    if (!mongoURI) {
      throw new Error("Database URL is missing");
    }

    await mongoose.connect(mongoURI);

    /**
     * Starts the background cron job,
     * In production environment, the job runs every 2 hours
     * In development environment, the job runs every 30 seconds for testing purposes,
     * cron job stops workign after 16-01-2025 due to billing
     */

    startBackgrounCronJob();

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
