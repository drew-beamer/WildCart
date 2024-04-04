"use server";

import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";
import Offer from "@/models/Offer";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

export default async function acceptOffer(prevState: any, formData: FormData) {
  await dbConnect();

  /** @todo: protect this action with auth */

  if (!formData.has("offer_id")) {
    return { error: { offer_id: "Offer ID is required" }, success: false };
  }

  const offer = await Offer.findById(formData.get("offer_id"));

  if (!offer) {
    return { error: { offer_id: "Offer not found" }, success: false };
  }

  const seller = await User.findById(offer.seller_id);
  const buyer = await User.findById(offer.buyer_id);

  const offerPromise = Offer.updateOne(
    { _id: offer._id },
    { status: "Accepted" }
  );

  const rejectedOffersPromise = Offer.updateMany(
    { post_id: offer.post_id, _id: { $ne: offer._id } },
    { status: "Rejected" }
  );

  const sellerPromise = User.updateOne(
    { _id: seller._id },
    { $push: { sell_list: offer.post_id } }
  );

  const buyerPromise = await User.updateOne(
    { _id: buyer._id },
    { $push: { buy_list: offer.post_id } }
  );

  const result = await Promise.all([
    offerPromise,
    sellerPromise,
    buyerPromise,
    rejectedOffersPromise,
  ])
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { error: { server: "Failed to accept offer" }, success: false };
    });

  return result;
}
