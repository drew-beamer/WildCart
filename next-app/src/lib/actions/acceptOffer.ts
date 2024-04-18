"use server";

import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";
import Offer from "@/models/Offer";
import User from "@/models/User";
import { revalidatePath } from "next/cache";
import Post from "@/models/Post";
import OfferSell from "@/models/OfferSell";

export default async function acceptOffer(prevState: any, formData: FormData) {
  await dbConnect();

  /** @todo: protect this action with auth */

  if (!formData.has("offer_id")) {
    return { error: { offer_id: "Offer ID is required" }, success: false };
  }

  if (!formData.has("post_id")) {
    return { error: { post_id: "Post ID is required" }, success: false };
  }
  if (!formData.has("type")) {
    return { error: { type: "Type is required" }, success: false };
  }

  const type = formData.get("type");

  let offer;
  let offerPromise;
  let rejectedOffersPromise;

  if (type == "Sell") {
    offer = await OfferSell.findById(formData.get("offer_id"));
  } else if (type == "Trade") {
    offer = await Offer.findById(formData.get("offer_id"));
  }
  const post = await Post.findById(formData.get("post_id"));

  if (!offer) {
    return { error: { offer_id: "Offer not found" }, success: false };
  }

  if (!post) {
    return { error: { post_id: "Post not found" }, success: false };
  }

  const seller = await User.findById(offer.seller_id);
  const buyer = await User.findById(offer.buyer_id);

  if (type == "Sell") {
    offerPromise = OfferSell.updateOne(
      { _id: offer._id },
      { status: "Accepted" }
    );
  } else if (type == "Trade") {
    offerPromise = Offer.updateOne({ _id: offer._id }, { status: "Accepted" });
  }

  const postPromise = Post.updateOne({ _id: post._id }, { status: "Closed" });

  if (type == "Sell") {
    offerPromise = OfferSell.updateOne(
      { _id: offer._id },
      { status: "Accepted" }
    );
  } else if (type == "Trade") {
    offerPromise = Offer.updateOne({ _id: offer._id }, { status: "Accepted" });
  }

  if (type == "Sell") {
    rejectedOffersPromise = OfferSell.updateMany(
      { post_id: offer.post_id, _id: { $ne: offer._id } },
      { status: "Rejected" }
    );
  } else if (type == "Trade") {
    rejectedOffersPromise = Offer.updateMany(
      { post_id: offer.post_id, _id: { $ne: offer._id } },
      { status: "Rejected" }
    );
  }
  const sellerPromise = User.updateOne(
    { _id: seller._id },
    { $push: { sell_list: offer.post_id }, $inc: { score: 10 } }
    
  );

  const buyerPromise = await User.updateOne(
    { _id: buyer._id },
    { $push: { buy_list: offer.post_id },$inc: { score: 10 } }
  );

  const result = await Promise.all([
    offerPromise,
    postPromise,
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
