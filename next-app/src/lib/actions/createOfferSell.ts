"use server";

import OfferSell from "@/models/OfferSell";
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
    price?: string[] | undefined;
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
export async function createOfferSell(
  prevState: any,
  formData: FormData
): Promise<FormState> {
  const session = await auth();
  if (!session || !session.user) {
    return { error: { auth: "Unauthorized" }, success: false };
  }
  const user = session.user;

  const validateField = createOfferForm.safeParse({
    description: formData.get("description"),
    price: formData.get("price"),
  });

  if (!validateField.success) {
    return { error: validateField.error.flatten().fieldErrors, success: false };
  }

  try {
    await OfferSell.create({
      description: validateField.data.description,
      price: validateField.data.price,
      post_id: new mongoose.Types.ObjectId(formData.get("post_id") as string),
      seller_id: formData.get("seller_id"),
      buyer_id: user.id,
      status: "Active",
    });
  } catch (error) {
    console.error("Failed to create offer", error);
    return {
      error: {
        server: "Validation succeeded but failed to create offer",
      },
      success: false,
    };
  }
  // revalidate the market page to show the new post
  revalidatePath("/market");
  return { success: true };
}

// Zod validation schema for creating a post
const createOfferForm = z.object({
  // description is string, does not contain banned words, min 10 meaningful chars, trim whitespace
  description: z
    .string()
    .trim()
    .min(10)
    .refine((val) => !containsBannedWords(val), {
      message: "Description contains banned words",
    }),
  // price is number, min 0
  price: z.coerce.number().min(0),
});
