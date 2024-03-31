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
import { FormState, createPost } from "@/lib/actions/createPost";
import { compressImage } from "@/lib/image-utils";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

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

/**
 * Renders the form for creating a post, and handles the form submission
 * @returns the form for creating a post
 */
export default function CreatePost() {
  const [formState, submitForm] = useFormState(createPost, { success: false });
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
        <Button onClick={() => setDialogOpen(true)}>Create Post</Button>
      </DialogTrigger>
      <DialogContent className="overflow-scroll max-h-screen p-4">
        <DialogHeader>
          <DialogTitle>Create a Post</DialogTitle>
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
 * Renders the form for creating a post
 * @param loadProgress - The progress of the form submission
 * @param formState - The state of the form
 * @returns the form for creating a post
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
      <div>
        <ExchangeMethodsSelect />
      </div>
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
          <CategorySelect errors={formState.error?.category} />
        </div>
        <div>
          <InputWithErrorState
            label="Approximate Value*"
            errors={formState.error?.price}
            name="price"
            type="number"
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
          {pending ? "Submitting..." : "Create Post"}
        </Button>
        <Progress value={loadProgress} />
      </div>
    </>
  );
}

/**
 * Responsible for rendering the select dropdown for the exchange methods
 *
 * @returns a select dropdown for the exchange methods
 */
function ExchangeMethodsSelect() {
  return (
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
              value={method.value}>
              <div className="flex items-center">
                {method.label} <span className="mr-2">{method.icon}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

/**
 * Renders the category select dropdown
 *
 * @param errors - The errors for the category select
 * @returns
 */
function CategorySelect({ errors }: { errors: string[] | undefined }) {
  return (
    <>
      <Label htmlFor="category">Category*</Label>
      <Select name="category">
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
      {errors?.map((error, index) => (
        <p key={index} className="text-sm text-red-500">
          {error}
        </p>
      ))}
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
