import PostCard from "@/components/PostCard";
import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";

export default async function MarketPage() {
  await dbConnect();
  const testPost = await Post.findOne({});

  return (
    <main className="max-w-[768px] mx-auto px-4">
      <h1>Market Page</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <PostCard post={Object.freeze(testPost)} />
        <PostCard post={Object.freeze(testPost)} />
        <PostCard post={Object.freeze(testPost)} />
        <PostCard post={Object.freeze(testPost)} />
        <PostCard post={Object.freeze(testPost)} />
      </div>
    </main>
  );
}
