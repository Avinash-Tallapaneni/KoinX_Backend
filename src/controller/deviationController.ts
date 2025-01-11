import { Request, Response } from "express";
import { COINS } from "../config/constants";
import { fetchLatestCryptoPriceRecords } from "../hooks/fetchDeviation";
import { calculateStandardDeviation } from "../utils/standardDeviation";

export const fetchDeviationCryptoDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { coin } = req.query;

  if (!coin) {
    res.status(400).json({
      message: "Coin is required.",
    });
    return;
  }

  if (typeof coin !== "string" || !Object.values(COINS).includes(coin)) {
    res.status(400).json({
      message: `Invalid coin. Supported coins are: ${Object.values(COINS).join(", ")}`,
    });
    return;
  }
  try {
    const cryptoDetails = await fetchLatestCryptoPriceRecords(coin);

    const standardDeviation = calculateStandardDeviation(cryptoDetails);

    res.status(200).json({
      deviation: standardDeviation,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch crypto details",
    });
  }
};
