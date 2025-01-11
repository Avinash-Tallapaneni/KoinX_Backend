import mongoose from "mongoose";

const CryptoPriceSchema = new mongoose.Schema({
  coinName: { type: String, required: true },
  price: { type: Number, required: true },
  marketCap: { type: Number, required: true },
  priceChange24h: { type: Number, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

CryptoPriceSchema.index({ coinName: 1, timestamp: -1 });

const CryptoPrice = mongoose.model("CryptoPrice", CryptoPriceSchema);

export default CryptoPrice;
