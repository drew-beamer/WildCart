import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Offer from "@/models/Offer";
import mongoose from "mongoose";
import Post from "@/models/Post";
import { redirect } from "next/navigation";
import User from "@/models/User";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import acceptOffer from "@/lib/actions/acceptOffer";
import AcceptOfferButton from "./AcceptButton";

export default async function ProfilePage() {
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
    <main className="max-w-3xl mx-auto mt-4 space-y-4 px-4">
      <header>
        <h1 className="typography">Profile</h1>
        <p className="lead">Welcome back, {user.name}</p>
      </header>
      <section>
        <h2 className="typography">Offers to Review</h2>
        <ul className="flex space-x-2 overflow-x-scroll">
          {offersToReview.map((offer) => {
            const dataURL = `data:image/jpeg;base64,${offer.picture.toString(
              "base64"
            )}`;
            return (
              <li className="flex my-2" key={offer._id}>
                <Card className="flex flex-col w-64">
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
                    <CardDescription className="px-6 break-words">
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
      </section>
      <section>
        <h2 className="typography">Your Posts</h2>
      </section>
    </main>
  );
}
