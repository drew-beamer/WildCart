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
import Offer from "@/models/Offer";
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
import Image from "next/image";
import AcceptOfferButton from "./AcceptButton";
import { PostDisplay } from "@/app/market/page";

export default async function ViewOffer({
  post,
}: Readonly<{ post: PostDisplay }>) {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  await dbConnect();

  const { user } = session;
  const offersToReview = await Offer.find({
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
      <DialogContent className="overflow-scroll max-h-screen p-8 max-w-4xl">
        <h2 className="typography">Offers to Review</h2>
        <ul className="overflow-x-scroll flex flex-wrap justify-start">
          {offersToReview.map((offer) => {
            const dataURL = `data:image/jpeg;base64,${offer.picture.toString(
              "base64"
            )}`;
            return (
              <li className="flex my-2 px-2 md:w-1/3" key={offer._id}>
                <Card className="flex flex-col w-64 my-2">
                  <CardHeader className="w-full p-0">
                    <div className="w-full relative h-32">
                      <Image
                        src={dataURL}
                        alt={offer.name}
                        className=" object-cover rounded-t-md"
                        fill
                      />
                    </div>
                    <CardTitle className="px-6">{offer.name}</CardTitle>
                    <CardDescription className="px-6 break-words line-clamp-3">
                      {offer.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grow p-6"></CardContent>
                  <CardFooter className="w-full grid grid-cols-2 gap-2">
                    <AcceptOfferButton
                      offer_id={offer._id.toString()}
                      post_id={post._id.toString()}
                      type={post.trade_mode}
                      email={offer.buyer_id.email}
                    />
                    <Button variant="destructive" className="w-full">
                      Decline
                    </Button>
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
