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
import { FormState, createOffer } from "@/lib/actions/createOffer";
import { compressImage } from "@/lib/image-utils";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";



/**
 * Renders the form for creating a post, and handles the form submission
 * @returns the form for creating a post
 */
export default function CreateOffer({postId, sellerId}:{postId:string, sellerId: string}) {
  const [formState, submitForm] = useFormState(createOffer, { success: false });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loadState, setLoadState] = useState(0);

  const handleSubmit = async (formData: FormData) => {
    // Logic to run before submitting the form, such as compressing images to reduce file size
    const picture = formData.get("picture");
    if (picture instanceof File) {
      const compressedDataURL = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataURL = event.target?.result;
          if (typeof dataURL === "string") {
            compressImage(dataURL, 500, 500, 0.3, resolve);
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(picture);
      });
      formData.set("picture", compressedDataURL);
    }
    formData.set("post_id",postId);
    formData.set("seller_id",sellerId);
  };

  useEffect(() => {
    // If the form submission was successful, close the dialog and reset the load state
    if (formState.success) {
      setDialogOpen(false);
      setLoadState(0);
    } else {
      // If the form submission failed, reset the load state after 300ms to transition nicely
      setTimeout(() => {
        setLoadState(0);
      }, 300);
    }
  }, [formState]);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setDialogOpen(true)}>Create Offer</Button>
      </DialogTrigger>
      <DialogContent className="overflow-scroll max-h-screen p-4">
        <DialogHeader>
          <DialogTitle>Submit a trade offer</DialogTitle>
        </DialogHeader>
        <form
          action={async (formData: FormData) => {
            setLoadState(0.5);
            setTimeout(async () => {
              await handleSubmit(formData);
              setLoadState(50);
              submitForm(formData);
              if (formState.success) {
                setLoadState(100);
              }
            }, 250);
          }}
          className="space-y-4">
          <Form loadProgress={loadState} formState={formState} />
        </form>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Renders the form for creating a trade offer
 * @param loadProgress - The progress of the form submission
 * @param formState - The state of the form
 * @returns the form for creating a trade offer
 */
function Form({
  loadProgress,
  formState,
}: {
  loadProgress: number;
  formState: FormState;
}) {
  const { pending } = useFormStatus();

  return (
    <>
      <h3 className="font-bold">Item Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <InputWithErrorState
            label="Name*"
            errors={formState.error?.name}
            name="name"
            type="text"
            required
          />
        </div>
        
        
        <div>
          <InputWithErrorState
            label="Picture*"
            errors={formState.error?.picture}
            name="picture"
            type="file"
            accept="image/*"
            required
          />
        </div>
        <div>
          <ConditionSelect errors={formState.error?.condition} />
        </div>
        <div>
          <DescriptionInput errors={formState.error?.description} />
        </div>
      </div>
      <div
        className="flex flex-col space-y-1"
        aria-live="polite"
        aria-atomic="true"></div>
      <div className="flex space-x-2 items-center">
        <Button className="mt-2" type="submit" disabled={pending}>
          {pending ? "Submitting..." : "Create Offer"}
        </Button>
        <Progress value={loadProgress} />
      </div>
    </>
  );
}





/**
 * Renders the condition select dropdown
 *
 * @param errors - The errors for the condition select
 * @returns
 */
function ConditionSelect({ errors }: { errors: string[] | undefined }) {
  return (
    <>
      <Label htmlFor="condition">Condition*</Label>
      <Select name="condition">
        <SelectTrigger>
          <SelectValue placeholder="Select a condition" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Used">Used</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {errors?.map((error, index) => (
        <p key={index} className="text-sm text-red-500">
          {error}
        </p>
      ))}
    </>
  );
}

function DescriptionInput({ errors }: { errors: string[] | undefined }) {
  return (
    <>
      <Label htmlFor="description">Description*</Label>
      <Textarea name="description" required />
      {errors?.map((error, index) => (
        <p key={index} className="text-sm text-red-500">
          {error}
        </p>
      ))}
    </>
  );
}

/**
 * Renders an input field with an error state
 * @param label - The label for the input field
 * @param errors - The errors for the input field
 * @param name - The name of the input field
 * @param type - The type of the input field
 * @param className - The class name for the input field
 * @param accept - The accept attribute for the input field
 * @param required - The required attribute for the input field
 * @returns an input field with an error state
 */
function InputWithErrorState({
  label,
  errors,
  name,
  type,
  className,
  accept,
  required,
}: {
  label: string;
  errors: string[] | undefined;
  name: string;
  className?: string;
  type?: string;
  accept?: string;
  required?: boolean;
}) {
  return (
    <>
      <Label className={`${errors && "text-red-500"}`} htmlFor={name}>
        {label}
      </Label>
      <Input
        name={name}
        type={type}
        accept={accept}
        required={required}
        className={cn(className, errors && "border-red-500")}
      />
      {errors?.map((error, index) => (
        <p key={index} className="text-sm text-red-500">
          {error}
        </p>
      ))}
    </>
  );
}