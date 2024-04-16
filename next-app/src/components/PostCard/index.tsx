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
import CreateOffer from "@/app/market/CreateOffer";
import ViewDetails from "@/app/profile/ViewDetails";
import CreateOfferSell from "@/app/market/CreateOfferSell";
/**
 * Responsible for rendering a user display, showing the user's avatar and name.
 *
 * @TODO make user data dynamic
 *
 * @returns a user display, for use in the post card
 */
export function UserDisplay({ sellerName, userScore }: { sellerName: string, userScore: number }) {
  return (
    <div className="flex items-center space-x-2 leading-tight">
      <Avatar>
        <AvatarFallback>
          {sellerName
            .split(" ")
            .reduce((initials, name) => initials + name[0], "")}
        </AvatarFallback>
      </Avatar>
      {/* TODO: display data here */}
      <div>
        <p>{sellerName}</p>
        <p className="text-xs">Level {getLevelFromScore(userScore)}</p>
        <p className="text-xs">{(userScore/10)} orders</p>
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
interface PostCardProps {
  post: Readonly<PostDisplay>;
  score: number; 
}

export default function PostCard({ post, score }: PostCardProps) {
/*export default function PostCard({ post }: Readonly<{ post: PostDisplay }>, {score}: Readonly<{score: number}>) {*/
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
          <CardTitle>{post.name}</CardTitle> 
          <UserDisplay sellerName={post.seller_name} userScore={score} />
          <CardDescription className="line-clamp-3">
            {post.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <>
          {post.trade_mode === "Trade" && (
            <div className="grid grid-cols-2 gap-2 mt-4">
              <CreateOffer
                postId={post._id.toString()}
                sellerId={post.seller_id.toString()}
              />
              <ViewDetails post={post} />
            </div>
          )}
        </>
        <>
          {post.trade_mode === "Sell" && (
            <div className="grid grid-cols-2 gap-2 mt-4">
              <CreateOfferSell
                postId={post._id.toString()}
                sellerId={post.seller_id.toString()}
              />
              <ViewDetails post={post} />
            </div>
          )}
        </>
      </CardContent>
    </Card>
  );
}

function getLevelFromScore(userScore: number) {
  if (userScore < 10) return 1;
  if (userScore < 30) return 2;
  if (userScore < 80) return 3;
  if (userScore < 160) return 4;
  
  return 5; 
}