import { Router } from "express";
import { fetchCryptoDetails } from "../controller/coinController";

const coinStatsRouter = Router();

coinStatsRouter.get("/", fetchCryptoDetails);

export default coinStatsRouter;
