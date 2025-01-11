/**
 * Starts the background cron job,
 * In production environment, the job runs every 2 hours
 * In development environment, the job runs every 30 seconds for testing purposes,
 * cron job stops working after 16-01-2025 due to billing
 */

export const JOB_CONFIG = {
  PRICE_UPDATE_CRON:
    process.env.NODE_ENV === "production" ? "0 */2 * * *" : "*/30 * * * * *",
  STOP_DATE: new Date("2025-01-16T23:59:59"), // Stop cron after this date
};
