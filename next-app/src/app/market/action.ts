"use server";
import { z } from "zod";
import Post from "@/models/Post";

export function createPost(formData: FormData) {
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
    return { error: validateField.error.flatten().fieldErrors };
  }

  Post.create({
    name: validateField.data.name,
    description: validateField.data.description,
    category: validateField.data.category,
    price: validateField.data.price,
    trade_mode: validateField.data.trade_mode,
    picture: validateField.data.picture,
    condition: validateField.data.condition,
    status: "Active",
  });
}

const createPostForm = z.object({
  name: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.coerce.number().min(0),
  trade_mode: z.string().refine((val) => ["Sell", "Trade"].includes(val)),
  picture: z.string().startsWith("data:image/jpeg;base64"),
  condition: z.string().refine((val) => ["Used", "New"].includes(val)),
});
