import { Request, Response } from "express";
import { fetchCryptoCoins } from "../hooks/fetchCryptoCoins";
import { COINS } from "../config/constants";

export const fetchCryptoDetails = async (
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
    const cryptoDetails = await fetchCryptoCoins(coin);

    if (!cryptoDetails[coin]) {
      res.status(404).json({
        message: "Crypto details not found",
      });
      return;
    }

    const { usd, usd_market_cap, usd_24h_change } = cryptoDetails[coin];

    res.status(200).json({
      price: usd,
      marketCap: usd_market_cap,
      "24hChange": usd_24h_change,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch crypto details",
    });
  }
};
