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

export default async function ViewOffer() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  await dbConnect();

  const { user } = session;
  const offersToReview = await Offer.find({
    seller_id: user.id,
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
            const dataURL = `data:image/jpeg;base64,${offer.picture.toString(
              "base64"
            )}`;
            return (
              <li className="flex my-2" key={offer._id}>
                <Card className="flex flex-col w-full">
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
                  <CardFooter className="w-full grid sm:grid-cols-2 gap-2">
                    <AcceptOfferButton
                      offer_id={offer._id.toString()}
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
