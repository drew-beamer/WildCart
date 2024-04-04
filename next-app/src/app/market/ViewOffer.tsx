import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ViewOffer() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View Offers</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Offers</DialogTitle>
        </DialogHeader>
        {/* place for offer card UI */}
        <OfferCard />
      </DialogContent>
    </Dialog>
  );
}
