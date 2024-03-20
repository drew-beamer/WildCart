import mongoose from "mongoose";

export interface Post extends mongoose.Document {
  name: string;
  description: string;
  category: string;
  price: number;
  trade_mode: "Sell" | "Trade";
  picture: Buffer;
  seller_id: mongoose.Types.ObjectId;
  status: "Active" | "Closed" | "Removed";
  condition: "Used" | "New";
}

const PostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  trade_mode: { type: String, required: true },
  picture: { type: Buffer, required: true },
  seller_id: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  status: { type: String, required: true },
  condition: { type: String, required: true },
});

export default mongoose.models.Post || mongoose.model<Post>("Post", PostSchema);
