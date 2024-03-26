import mongoose from "mongoose";

export interface User extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  buy_list: [mongoose.Types.ObjectId];
  sell_list: [mongoose.Types.ObjectId];
}

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  buy_list: { type: [mongoose.Types.ObjectId], required: true, ref: "Offer" },
  sell_list: { type: [mongoose.Types.ObjectId], required: true, ref: "Post" },
});

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);
