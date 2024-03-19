import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  const fakeId = new mongoose.Types.ObjectId();
  Post.create({
    name: "Bob",
    description: "The greatest item ever created",
    picture: "123456",
    seller_id: fakeId,
    status: "traded",
  });

  return NextResponse.json({ message: "success" });
}
