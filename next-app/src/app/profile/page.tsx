import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Offer from "@/models/Offer";
import mongoose, { PipelineStage } from "mongoose";
import Post from "@/models/Post";
import { redirect } from "next/navigation";
import User from "@/models/User";
import { PostDisplay } from "@/app/market/page";
import PostCardUser from "@/components/PostCardUser";
import PostCardUserClosed from "@/components/PostCardUserClosed";

export default async function ProfilePage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  await dbConnect();

  const { user } = session;
  const userId = user.id;
  const userScoreDoc = await User.findOne({ _id: userId }).select("score");
  const score = userScoreDoc ? userScoreDoc.score : 0;

  const offersToReview = await Offer.find({
    seller_id: user.id,
    status: "Active",
  })
    .populate("buyer_id", "_id name email", User)
    .populate("post_id", "name", Post);


  const getActivePost: PipelineStage[] = [
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
      $unset: ["__v", "seller"],
    },
    {
      $match: {
        status: "Active",
      },
    },
  ];

  const getClosedPost: PipelineStage[] = [
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
      $unset: ["__v", "seller"],
    },
    {
      $match: {
        status: "Closed",
      },
    },
  ];

  const userActivePosts = await Post.aggregate<PostDisplay>(getActivePost);
  const userClosedPosts = await Post.aggregate<PostDisplay>(getClosedPost);
  return (
    <main className="max-w-3xl mx-auto mt-4 space-y-4 px-4">
      <header>
        <h1 className="typography">Profile</h1>
        <p className="lead">Welcome back, {user.name} Level {getLevelFromScore(score)}, you have finished {score/10} orders</p>
      </header>
      <section>
        <h2 className="typography">Your Active Posts</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-scroll">
          {userActivePosts.map((post) => (
            <PostCardUser key={post._id} post={Object.freeze(post)} score={getLevelFromScore(score)} />
          ))}
        </ul>
      </section>
      <section>
        <h2 className="typography">Your Closed Posts</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-scroll">
          {userClosedPosts.map((post) => (
            <PostCardUserClosed key={post._id} post={Object.freeze(post)} />
          ))}
        </ul>
      </section>
    </main>
  );
}

function getLevelFromScore(score: number) {
  if (score < 10) return 1;
  if (score < 30) return 2;
  if (score < 80) return 3;
  if (score < 160) return 4;
  
  return 5; 
}