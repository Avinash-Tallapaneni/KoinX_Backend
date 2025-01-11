import cors from "cors";
import express, { Request, Response } from "express";
import { SERVER_CONFIG } from "./config/constants";
import connectDB from "./config/database";
import coinIDRouter from "./router/coinStatsRouter";
import { cronStatus } from "./services/cronStatus";
import coinStatsRouter from "./router/coinStatsRouter";
import deviationRouter from "./router/deviationRouter";

const app = express();
app.use(express.json());

const corsOptions = {
  origin: SERVER_CONFIG.ENV === "development" ? "*" : process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Origin",
    "X-Requested-With",
    "Accept",
    "x-client-key",
    "x-client-token",
    "x-client-secret",
    "Authorization",
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

//mongo db
connectDB();

/**
 * Croj job updates
 */
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "👋 Welcome to the Cryptocurrency API",
    description:
      "Get real-time stats and insights for Bitcoin, Matic, and Ethereum.",
    availableRoutes: {
      "/": "🏠 API overview and available routes.",
      "/health": "🩺 Server health check.",
      "/stats":
        "📊 Get stats for a cryptocurrency. Example: `/stats?coin=bitcoin`.",
      "/deviation":
        "📈 Get price deviation for the last 100 records. Example: `/deviation?coin=ethereum`.",
    },
    cronJobStatus: {
      status:
        cronStatus.status === "stopped"
          ? `🔴 ${cronStatus.status}`
          : `🟢 ${cronStatus.status}`,
      lastRun: cronStatus.lastRun
        ? `📅 ${cronStatus.lastRun.toISOString()}`
        : "❌ Not yet executed",
      nextRun: cronStatus.nextRun
        ? `📅 ${cronStatus.nextRun.toISOString()}`
        : "❌ Not scheduled",
      error: cronStatus.error ? `⚠️ ${cronStatus.error}` : "✅ No errors",
      note: "⚠️ Cron job stops after 16th January 2025 due to billing constraints.",
    },
    serverUpTime: `${process.uptime().toFixed(2)} seconds`,
  });
});

app.use("/stats", coinStatsRouter);
app.use("/deviation", deviationRouter);

app.get("/health", (req: Request, res: Response) => {
  res.json({
    message: "🩺 Server is up and running.",
    uptime: `${process.uptime().toFixed(2)} seconds`,
  });
});

export default app;
