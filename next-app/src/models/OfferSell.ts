import mongoose from "mongoose";

interface OfferSell extends mongoose.Document {
  post_id: mongoose.Types.ObjectId;
  seller_id: string;
  buyer_id: string;
  price: number;
  description: string;
  status: "Active" | "Closed" | "Removed";
}

const OfferSellSchema = new mongoose.Schema({
  post_id: { type: mongoose.Types.ObjectId, required: true, ref: "Post" },
  seller_id: { type: String, required: true, ref: "User" },
  buyer_id: { type: String, required: true, ref: "User" },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, required: true },
});

export default mongoose.models.OfferSell ||
  mongoose.model<OfferSell>("offer_sells", OfferSellSchema);
