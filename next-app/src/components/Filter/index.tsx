"use client";
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeftRightIcon, DollarSignIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const exchangeMethods = [
  {
    label: "All",
    value: "All",
  },

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

export default function Filter() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSelectFilterChange = (filterType: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value !== "All") {
      params.set(filterType, value);
    } else {
      params.delete(filterType);
    }
    console.log(params.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  const handleInputFilterChange = (filterType: string, value: number) => {
    const params = new URLSearchParams(searchParams);
    params.set(filterType, value.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 mr-10">
      <div className="w-full">
        <div className="mb-6">
          <h4 className="typography grow my-1">Method</h4>
          <Select
            defaultValue={searchParams.get("option")?.toString() || "All"}
            onValueChange={(e) => handleSelectFilterChange("option", e)}
          >
            <SelectTrigger id="optionFilter">
              <SelectValue placeholder="Select an option" />
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
                      {method.label} <span className="mr-2">{method.icon}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-6">
          <h4 className="typography grow my-1">Category</h4>
          <Select
            defaultValue={searchParams.get("category")?.toString() || "All"}
            onValueChange={(e) => handleSelectFilterChange("category", e)}
          >
            <SelectTrigger id="categoryFilter">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-6">
          <h4 className="typography grow my-1">Condition</h4>
          <Select
            defaultValue={searchParams.get("condition")?.toString() || "All"}
            onValueChange={(e) => handleSelectFilterChange("condition", e)}
          >
            <SelectTrigger id="filter1">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Used">Used</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-6">
          <h4 className="typography grow my-1">Lowest Price</h4>
          <Input
            id="lowestPrice"
            placeholder="0"
            defaultValue={searchParams.get("lowestPrice")?.toString() || "0"}
            onChange={(e) =>
              handleSelectFilterChange("lowestPrice", e.target.value)
            }
          />
        </div>

        <div className="mb-6">
          <h4 className="typography grow my-1">Highest Price</h4>
          <Input
            id="highestPrice"
            placeholder="100"
            defaultValue={searchParams.get("highestPrice")?.toString() || "100"}
            onChange={(e) =>
              handleSelectFilterChange("highestPrice", e.target.value)
            }
          />
        </div>

        <div className="mb-6">
          <h4 className="typography grow my-1">Post Date</h4>
          <RadioGroup defaultValue="default">
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="r1" value="default" />
              <Label htmlFor="r1">Past 24 hours</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="r2" value="comfortable" />
              <Label htmlFor="r2">Past 7 days</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="r3" value="compact" />
              <Label htmlFor="r3">Past 30 days</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}
