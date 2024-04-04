import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PostDisplay } from "./page";
import { UserDisplay } from "@/components/PostCard";
import Image from "next/image";

function DescriptionDisplay({ description }: { description: string }) {
  return <p className="text-sm break-words">{description}</p>;
}

function PriceDisplay({ price }: { price: number }) {
  return <p className="text-md">{price}</p>;
}

function CategoryDisplay({ category }: { category: string }) {
  return <p className="text-md">{category}</p>;
}

function ConditionDisplay({ condition }: { condition: string }) {
  return <p className="text-md">{condition}</p>;
}

function TradeModeDisplay({ tradeMode }: { tradeMode: string }) {
  return <p className="text-md">{tradeMode}</p>;
}

export default function ViewDetails({ post }: Readonly<{ post: PostDisplay }>) {
  const imageUrl = `data:image/jpeg;base64,${post.picture.toString("base64")}`;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Details</Button>
      </DialogTrigger>
      <DialogContent className="overflow-scroll max-h-screen p-8">
        <DialogHeader>
          <DialogTitle>Details</DialogTitle>
        </DialogHeader>
        <div className="relative h-80 w-full rounded-lg">
          <Image
            src={imageUrl}
            className="object-cover rounded-t-lg"
            alt="Post Image"
            fill
          />
        </div>
        <Label htmlFor="Publisher">Publisher:</Label>
        <UserDisplay sellerName={post.seller_name} />
        <div className="flex flex-col max-w-md">
          <Label htmlFor="Description">Description:</Label>
          <div className="w-full">
            <DescriptionDisplay description={post.description} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="Trade Mode">Trade Mode Preference:</Label>
            <TradeModeDisplay tradeMode={post.trade_mode} />
          </div>
          <div>
          <Label htmlFor="Price">Approximate Price:</Label>
          <PriceDisplay price={post.price} />
          </div>
          <div>
          <Label htmlFor="Category">Category:</Label>
          <CategoryDisplay category={post.category} />
          </div>
          <div>
          <Label htmlFor="Condition">Condition:</Label>
          <ConditionDisplay condition={post.condition} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
