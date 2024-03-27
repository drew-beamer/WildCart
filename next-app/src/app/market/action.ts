"use server";
import Post from "@/models/Post";
import mongoose from "mongoose";
import { auth } from "@/lib/auth";
import { string, z } from "zod";
import { containsBannedWords } from "@/lib/wordChecker";

export async function createPost(formData: FormData) {
  const session = await auth();
  if (!session || !session.user) {
    return { error: "Unauthorized" };
  }
  const user = session.user;

  const validateField = createPostForm.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    category: formData.get("category"),
    price: formData.get("price"),
    trade_mode: formData.get("trade_mode"),
    picture: formData.get("picture"),
    condition: formData.get("condition"),
  });

  if (!validateField.success) {
    console.log(validateField.error.flatten().fieldErrors);
    return { error: validateField.error.flatten().fieldErrors };
  }

  try {
    await Post.create({
      name: validateField.data.name,
      description: validateField.data.description,
      category: validateField.data.category,
      price: validateField.data.price,
      trade_mode: validateField.data.trade_mode,
      picture: Buffer.from(validateField.data.picture.split(",")[1], "base64"),
      condition: validateField.data.condition,
      seller_id: new mongoose.Types.ObjectId(user.id),
      status: "Active",
    });
  } catch (error) {
    console.log(error);
    return {
      error: { server: "Validation succeeded but failed to create post" },
    };
  }
  return { success: true };
}

const createPostForm = z.object({
  name: z.string().refine((val) => !containsBannedWords(val), {
    message: "Name contains banned words",
  }),
  description: z.string().refine((val) => !containsBannedWords(val), {
    message: "Description contains banned words",
  }),
  category: z.string(),
  price: z.coerce.number().min(0),
  trade_mode: z.string().refine((val) => ["Sell", "Trade"].includes(val)),
  picture: z.string().startsWith("data:image/jpeg;base64"),
  condition: z.string().refine((val) => ["Used", "New"].includes(val)),
});
