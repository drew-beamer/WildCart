import mongoose from "mongoose";

interface Offer extends mongoose.Document {
  post_id: mongoose.Types.ObjectId;
  seller_id: mongoose.Types.ObjectId;
  buyer_id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  picture: Buffer;
  status: string;
  condition: "Used" | "New";
}

const OfferSchema = new mongoose.Schema({
  post_id: { type: mongoose.Types.ObjectId, required: true, ref: "Post" },
  seller_id: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  buyer_id: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  name: { type: String, required: true },
  description: { type: String, required: true },
  picture: { type: Buffer, required: true },
  status: { type: String, required: true },
  condition: { type: String, required: true },
});

export default mongoose.models.Offer ||
  mongoose.model<Offer>("Offer", OfferSchema);
