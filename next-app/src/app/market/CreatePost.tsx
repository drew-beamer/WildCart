"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeftRightIcon, DollarSignIcon } from "lucide-react";
import { createPost } from "./actions";
import { compressImage } from "@/lib/image-utils";

const exchangeMethods = [
  {
    label: "Trade",
    value: "trade",
    icon: <ArrowLeftRightIcon className="h-4" />,
  },
  {
    label: "Sell",
    value: "sell",
    icon: <DollarSignIcon className="h-4" />,
  },
];

export default function CreatePost() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Post</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Post</DialogTitle>
        </DialogHeader>
        <form
          className="space-y-4"
          action={async (formData: FormData) => {
            const picture = formData.get("picture");
            if (picture instanceof File) {
              // ChatGPT & Copilot greatly helped in generating this code
              // Uses canvas trick to compress image, then sets the compressed data URL
              const compressedDataURL = await new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                  const dataURL = event.target?.result;
                  if (typeof dataURL === "string") {
                    compressImage(dataURL, 500, 500, 0.3, resolve);
                  }
                };
                reader.readAsDataURL(picture);
              });
              formData.set("picture", compressedDataURL);
            }
            await createPost(formData);
          }}>
          <div>
            <Label htmlFor="title">Method</Label>
            <Select name="method">
              <SelectTrigger>
                <SelectValue placeholder="Select a method" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {exchangeMethods.map((method) => (
                    <SelectItem
                      className="hover:cursor-pointer"
                      key={method.value}
                      value={method.value}>
                      <div className="flex items-center">
                        {method.label}{" "}
                        <span className="mr-2">{method.icon}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <h3 className="font-bold">Item Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Title*</Label>
              <Input type="text" name="name" required />
            </div>
            <div>
              <Label htmlFor="title">Category*</Label>
              <Select name="category" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="furniture">Furniture</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="price">Approximate Value</Label>
              <Input type="number" name="price" required />
            </div>
            <div>
              <Label htmlFor="picture">Picture*</Label>
              <Input type="file" name="picture" accept="image/*" required />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea name="description" required />
            </div>
          </div>
          <Button className="mt-2" type="submit">
            Create Post
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
