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
import { createPost } from "./action";
import { compressImage } from "@/lib/image-utils";
import { useState } from "react";

const exchangeMethods = [
  {
    label: "Trade",
    value: "Trade",
    icon: <ArrowLeftRightIcon className="h-4" />,
  },
  {
    label: "Sell",
    value: "Sell",
    icon: <DollarSignIcon className="h-4" />,
  },
];

interface ServerErrors {
  name?: string;
  description?: string;
}
export default function CreatePost() {
  const [serverErrors, setServerErrors] = useState<ServerErrors>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await createPost(formData);

    if (response.error) {
      setServerErrors(response as ServerErrors);
    } else {
      setServerErrors({});
    }
  };
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
            console.log(await createPost(formData));
          }}
          onSubmit={handleSubmit}
        >
          <div>
            <Label htmlFor="title">Method</Label>
            <Select name="trade_mode">
              <SelectTrigger>
                <SelectValue placeholder="Select a method" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {exchangeMethods.map((method) => (
                    <SelectItem
                      className="hover:cursor-pointer"
                      key={method.value}
                      value={method.value}
                    >
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
              <Label htmlFor="price">Approximate Value*</Label>
              <Input type="number" name="price" required />
            </div>
            <div>
              <Label htmlFor="picture">Picture*</Label>
              <Input type="file" name="picture" accept="image/*" required />
            </div>
            <div>
              <Label htmlFor="title">Condition*</Label>
              <Select name="condition" required>
                <SelectTrigger>
                  <SelectValue placeholder="Condition of Item" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Used">Used</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea name="description" required />
            </div>
          </div>
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {serverErrors && (
              <p className="text-sm text-red-500">{serverErrors.name}</p>
            )}
          </div>
          <Button className="mt-2" type="submit">
            Create Post
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
