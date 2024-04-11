"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import acceptOffer from "@/lib/actions/acceptOffer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

export default function AcceptOfferButton({
  offer_id,
  post_id,
  type,
  email,
}: {
  offer_id: string;
  post_id: string;
  type: string;
  email: string;
}) {
  const [prevState, formAction] = useFormState(acceptOffer, { success: false });
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (prevState.success) {
      setOpen(true);
    }
  }, [prevState]);

  useEffect(() => {
    if (!open && prevState.success) {
      setOpen(false);
      router.refresh();
    }
  }, [open, prevState, router]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <form
          action={async () => {
            const formData = new FormData();
            formData.append("offer_id", offer_id.toString());
            formData.append("post_id", post_id.toString());
            formData.append("type", type.toString());
            formAction(formData);
          }}
        >
          <Button type="submit">Accept Offer</Button>
        </form>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Offer Accepted!</DialogTitle>
        </DialogHeader>
        <p>
          Offer has been accepted, you can reach your trade partner at:&nbsp;
          <a
            className="text-red-400 hover:underline"
            target="_blank"
            href={`mailto:${email}`}
          >
            {email}
          </a>
        </p>
      </DialogContent>
    </Dialog>
  );
}
