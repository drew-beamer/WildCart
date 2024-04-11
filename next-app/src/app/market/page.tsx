import PostCard from "@/components/PostCard";
import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import CreatePost from "./CreatePost";
import { PipelineStage } from "mongoose";
import Filter from "@/components/Filter";

const getPost: PipelineStage[] = [
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
  seller_id: string;
}

const getFilteredPosts = async (
  option: string,
  category: string,
  condition: string,
  lowestPrice: number,
  highestPrice: number
) => {
  let pipeline = getPost;
  if (category != "") {
    pipeline = pipeline.filter(
      (stage) => !("$match" in stage && "category" in stage.$match)
    );
    pipeline.push({
      $match: {
        category: category,
      },
    });
  }
  if (option != "") {
    pipeline = pipeline.filter(
      (stage) => !("$match" in stage && "option" in stage.$match)
    );
    pipeline.push({
      $match: {
        trade_mode: option,
      },
    });
  }
  if (condition != "") {
    pipeline = pipeline.filter(
      (stage) => !("$match" in stage && "condition" in stage.$match)
    );
    pipeline.push({
      $match: {
        condition: condition,
      },
    });
  }
  if (lowestPrice !== 0 && !isNaN(lowestPrice)) {
    pipeline = pipeline.filter(
      (stage) => !("$match" in stage && "lowestPrice" in stage.$match)
    );
    pipeline.push({
      $match: {
        price: { $gte: lowestPrice },
      },
    });
  }
  if (highestPrice !== 0 && !isNaN(highestPrice)) {
    pipeline = pipeline.filter(
      (stage) => !("$match" in stage && "highestPrice" in stage.$match)
    );
    pipeline.push({
      $match: {
        price: { $lte: highestPrice },
      },
    });
  }
  const filteredPosts = await Post.aggregate<PostDisplay>(pipeline);
  return filteredPosts;
};

export default async function MarketPage({
  searchParams,
}: {
  searchParams?: {
    category?: string;
    option?: string;
    condition?: string;
    lowestPrice?: string;
    highestPrice?: string;
  };
}) {
  await dbConnect();
  const category = searchParams?.category || "";
  const option = searchParams?.option || "";
  const condition = searchParams?.condition || "";
  const lowestPrice = parseInt(searchParams?.lowestPrice || "0", 10);
  const highestPrice = parseInt(searchParams?.highestPrice || "100", 10);

  const filteredPost = await getFilteredPosts(
    option,
    category,
    condition,
    lowestPrice,
    highestPrice
  );

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
          {filteredPost.map((post) => (
            <PostCard key={post._id} post={Object.freeze(post)} />
          ))}
        </div>
      </main>
    </div>
  );
}
