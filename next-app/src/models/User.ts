import mongoose from "mongoose";

export interface User extends mongoose.Document {
  _id: string;
  name: string;
  email: string;
  buy_list: [mongoose.Types.ObjectId];
  sell_list: [mongoose.Types.ObjectId];
}

const UserSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  buy_list: { type: [mongoose.Types.ObjectId], required: true, ref: "Offer" },
  sell_list: { type: [mongoose.Types.ObjectId], required: true, ref: "Post" },
});

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);
