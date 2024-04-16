import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { PostDisplay } from "@/app/market/page";
import ViewDetails from "@/app/profile/ViewDetails";
import ViewOffer from "@/app/profile/ViewOffer";
import ViewOfferSell from "@/app/profile/ViewOfferSell";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import { revalidatePath } from "next/cache";

/**
 * Responsible for rendering a user display, showing the user's avatar and name.
 *
 * @TODO make user data dynamic
 *
 * @returns a user display, for use in the post card
 */
export function UserDisplay({ sellerName }: { sellerName: string }) {
  return (
    <div className="flex items-center space-x-2 leading-tight">
      <Avatar>
        <AvatarFallback>
          {sellerName
            .split(" ")
            .reduce((initials, name) => initials + name[0], "")}
        </AvatarFallback>
      </Avatar>
      <div>
        <p>{sellerName}</p>
        <p className="text-xs">Level 40</p>
      </div>
    </div>
  );
}

/**
 * Responsible for rendering a card that represents a post.
 *
 * @TODO add functionality to the buttons
 * @TODO make user data dynamic
 *
 * @returns a card that represents a post, for use in the market page
 */
export default function PostCardUser({
  post,
}: Readonly<{ post: PostDisplay }>) {
  const imageUrl = `data:image/jpeg;base64,${post.picture.toString("base64")}`;

  return (
    <Card className="flex flex-col">
      <CardHeader className="p-0 grow">
        <div className="relative h-48 w-full rounded-lg">
          <Image
            src={imageUrl}
            className="object-cover rounded-t-lg"
            alt="Post Image"
            fill
          />
        </div>
        <div className="px-4 pt-2 space-y-2">
          <CardTitle className="flex items-center">
            <span className="grow">{post.name}</span>
            <Dialog>
              <DialogTrigger asChild>
                <TrashIcon />
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Delete Post</DialogTitle>
                <p>Are you sure you want to delete this post?</p>
                <form
                  action={async () => {
                    "use server";
                    await dbConnect();
                    await Post.findByIdAndDelete(post._id);
                    revalidatePath("/profile");
                  }}>
                  <Button type="submit" variant="destructive">
                    Delete
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </CardTitle>
          <UserDisplay sellerName={post.seller_name} />
          <CardDescription className="line-clamp-3">
            {post.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <>
          {post.trade_mode === "Trade" && (
            <div className="grid grid-cols-2 gap-2 mt-4">
              <ViewOffer post={post} />
              <ViewDetails post={post} />
            </div>
          )}
        </>
        <>
          {post.trade_mode === "Sell" && (
            <div className="grid grid-cols-2 gap-2 mt-4">
              <ViewOfferSell post={post} />
              <ViewDetails post={post} />
            </div>
          )}
        </>
      </CardContent>
    </Card>
  );
}
