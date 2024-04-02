"use server";

import Post from "@/models/Post";
import mongoose from "mongoose";
import { auth } from "@/lib/auth";
import { z } from "zod";
import { containsBannedWords } from "@/lib/wordChecker";
import { revalidatePath } from "next/cache";

export interface FormState {
  success: boolean;
  error?: {
    name?: string[] | undefined;
    description?: string[] | undefined;
    category?: string[] | undefined;
    price?: string[] | undefined;
    trade_mode?: string[] | undefined;
    picture?: string[] | undefined;
    condition?: string[] | undefined;
    server?: string | undefined;
    auth?: string | undefined;
  };
}

/**
 * Controller function, validates inputs and calls the model to create a post
 * @param prevState - previous state of the form
 * @param formData - current form data
 * @returns
 */
export async function createPost(
  prevState: any,
  formData: FormData
): Promise<FormState> {
  const session = await auth();
  if (!session || !session.user) {
    return { error: { auth: "Unauthorized" }, success: false };
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
    return { error: validateField.error.flatten().fieldErrors, success: false };
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
    console.error("Failed to create post", error);
    return {
      error: {
        server: "Validation succeeded but failed to create post",
      },
      success: false,
    };
  }
  // revalidate the market page to show the new post
  revalidatePath("/market");
  return { success: true };
}

// Zod validation schema for creating a post
const createPostForm = z.object({
  // name is string, 4 chars min, does not contain banned words
  name: z
    .string()
    .min(4, { message: "Name must be greater than 4 characters long" })
    .refine((val) => !containsBannedWords(val), {
      message: "Name contains banned words",
    }),
  // description is string, does not contain banned words, min 10 meaningful chars, trim whitespace
  description: z
    .string()
    .trim()
    .min(10)
    .refine((val) => !containsBannedWords(val), {
      message: "Description contains banned words",
    }),
  // category is string
  category: z.string(),
  // price is number, min 0
  price: z.coerce.number().min(0),
  // trade_mode is string, must be either "Sell" or "Trade"
  trade_mode: z.string().refine((val) => ["Sell", "Trade"].includes(val)),
  // picture is string, must be a jpeg base64 image
  picture: z.string().startsWith("data:image/jpeg;base64"),
  // condition is string, must be either "Used" or "New"
  condition: z.string().refine((val) => ["Used", "New"].includes(val)),
});
