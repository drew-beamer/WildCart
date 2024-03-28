import PostCard from "@/components/PostCard";
import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import CreatePost from "./CreatePost";
import { PipelineStage } from "mongoose";
import Filter from "@/components/Filter";

const getPostSellerNames: PipelineStage[] = [
  {
    $lookup: {
      from: "users",
      let: {
        seller_id: "$seller_id",
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$$seller_id", "$_id"],
            },
          },
        },
        {
          $project: {
            name: 1,
          },
        },
      ],
      as: "seller",
    },
  },
  {
    $unwind: {
      path: "$seller",
      preserveNullAndEmptyArrays: false,
    },
  },
  {
    $addFields: {
      seller_name: "$seller.name",
    },
  },
  {
    $unset: ["seller_id", "__v", "seller"],
  },
];

export interface PostDisplay {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  trade_mode: string;
  picture: Buffer;
  condition: string;
  seller_name: string;
}

export default async function MarketPage() {
  await dbConnect();
  const testPosts = await Post.aggregate<PostDisplay>(getPostSellerNames);

  return (
    <div className="flex max-w-7xl mx-auto px-4">
      <aside className="w-1/6 my-20 mr-5">
        <Filter />
      </aside>
      <main className="flex-grow">
        <header className="flex my-4">
          <h1 className="typography grow">Market</h1>
          <CreatePost />
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testPosts.map((post) => (
            <PostCard key={post._id} post={Object.freeze(post)} />
          ))}
        </div>
      </main>
    </div>
  );
}
