import { config } from "dotenv";
import { API_CONFIG, COIN_CURRENCY, COINS } from "../config/constants";
import { CryptoCoinTypes } from "../types/coins";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

config({ path: envFile });

const COINGECKO_KEY = process.env.COINGECKO;

if (!COINGECKO_KEY) {
  throw new Error(`COINGECKO KEY is missing in ${envFile}`);
}

export const fetchCryptoCoins = async (
  coin?: string
): Promise<{ [key: string]: CryptoCoinTypes }> => {
  const coinsToFetch = coin ? coin : Object.values(COINS).join("%2C");

  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SIMPLE_PRICE}?ids=${coinsToFetch}&vs_currencies=${COIN_CURRENCY.currency}&include_market_cap=true&include_24hr_change=true`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": COINGECKO_KEY,
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    console.log(data);
    console.log(`Successfully fetched crypto coin data ${new Date()}`);

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error fetching crypto coins data: ${error.message}`);
    } else {
      console.error(
        "An unknown error occurred while fetching crypto coins data."
      );
    }
    throw error;
  }
};
