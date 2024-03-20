import PostCard from "@/components/PostCard";
import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import CreatePost from "./CreatePost";

export default async function MarketPage() {
  await dbConnect();
  const testPosts = await Post.find({});

  return (
    <main className="max-w-[768px] mx-auto px-4">
      <h1>Market Page</h1>
      <CreatePost />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {testPosts.map((post) => (
          <PostCard key={post._id} post={Object.freeze(post)} />
        ))}
      </div>
    </main>
  );
}
