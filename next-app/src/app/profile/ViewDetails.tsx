import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PostDisplay } from "../market/page";
import { UserDisplay } from "@/components/PostCard";
import Image from "next/image";

function DescriptionDisplay({ description }: { description: string }) {
  return <p className="text-sm">{description}</p>;
}

function PriceDisplay({ price }: { price: number }) {
  return <p className="text-sm">{price}</p>;
}

function CategoryDisplay({ category }: { category: string }) {
  return <p className="text-sm">{category}</p>;
}

function ConditionDisplay({ condition }: { condition: string }) {
  return <p className="text-sm">{condition}</p>;
}

function TradeModeDisplay({ tradeMode }: { tradeMode: string }) {
  return <p className="text-sm">{tradeMode}</p>;
}

export default function ViewDetails({ post }: Readonly<{ post: PostDisplay }>) {
  const imageUrl = `data:image/jpeg;base64,${post.picture.toString("base64")}`;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Details</Button>
      </DialogTrigger>
      <DialogContent className="overflow-scroll max-h-screen p-4">
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
        <Label htmlFor="Description">Description:</Label>
        <DescriptionDisplay description={post.description} />
        <Label htmlFor="Price">Approximate Price:</Label>
        <PriceDisplay price={post.price} />
        <Label htmlFor="Category">Category:</Label>
        <CategoryDisplay category={post.category} />
        <Label htmlFor="Condition">Condition:</Label>
        <ConditionDisplay condition={post.condition} />
        <Label htmlFor="Trade Mode">Trade Mode Preference:</Label>
        <TradeModeDisplay tradeMode={post.trade_mode} />
      </DialogContent>
    </Dialog>
  );
}
