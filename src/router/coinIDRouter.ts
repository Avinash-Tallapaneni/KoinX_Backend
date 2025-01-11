import { Router, Request, Response } from "express";
import { fetchCryptoDetails } from "../controller";

const coinIDRouter = Router();

coinIDRouter.get("/", fetchCryptoDetails);

export default coinIDRouter;
