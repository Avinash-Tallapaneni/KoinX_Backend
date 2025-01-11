import CryptoPrice from "../model/CryptoPriceSchema";

export const fetchLatestCryptoPriceRecords = async (coin: string) => {
  try {
    const records = await CryptoPrice.find(
      { coinName: coin },
      { price: 1, _id: 0 }
    )
      .sort({ createdAt: -1 })
      .limit(100);

    return records;
  } catch (error) {
    console.error("Error fetching crypto price records:", error);
    throw new Error("Failed to fetch crypto price records.");
  }
};
