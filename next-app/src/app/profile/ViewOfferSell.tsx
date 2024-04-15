import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import OfferSell from "@/models/OfferSell";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Post from "@/models/Post";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AcceptOfferButton from "./AcceptButton";
import { PostDisplay } from "@/app/market/page";

export default async function ViewOfferSell({
  post,
}: Readonly<{ post: PostDisplay }>) {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  await dbConnect();

  const { user } = session;
  const offersToReview = await OfferSell.find({
    seller_id: user.id,
    post_id: post._id,
    status: "Active",
  })
    .populate("buyer_id", "_id name email", User)
    .populate("post_id", "name", Post);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View Offers</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Offers</DialogTitle>
        </DialogHeader>
        <h2 className="typography">Offers to Review</h2>
        <ul className="overflow-x-scroll">
          {offersToReview.map((offer) => {
            return (
              <li className="flex my-2" key={offer._id}>
                <Card className="flex flex-col w-full">
                  <CardHeader className="w-full p-0 mt-4">
                    <CardTitle className="px-6">{`$${offer.price}`}</CardTitle>
                    <CardDescription className="px-6 break-words line-clamp-3">
                      {offer.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grow p-6"></CardContent>
                  <CardFooter className="w-full grid sm:grid-cols-2 gap-2">
                    <AcceptOfferButton
                      offer_id={offer._id.toString()}
                      post_id={post._id.toString()}
                      type={post.trade_mode}
                      email={offer.buyer_id.email}
                    />
                    <Button variant="destructive">Decline</Button>
                  </CardFooter>
                </Card>
              </li>
            );
          })}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
