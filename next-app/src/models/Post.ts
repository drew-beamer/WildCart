import mongoose from "mongoose";

export interface Post extends mongoose.Document {
  name: string;
  description: string;
  picture: Buffer;
  seller_id: mongoose.Types.ObjectId;
  status: string;
}

const PostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  picture: { type: Buffer, required: true },
  seller_id: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  status: { type: String, required: true },
});

export default mongoose.models.Post || mongoose.model<Post>("Post", PostSchema);
