import { Router } from "express";
import { fetchDeviationCryptoDetails } from "../controller/deviationController";

const deviationRouter = Router();

deviationRouter.get("/", fetchDeviationCryptoDetails);

export default deviationRouter;
