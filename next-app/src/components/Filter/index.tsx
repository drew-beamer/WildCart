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
  return (
    <div className="flex flex-col md:flex-row gap-8 mr-10">
      <div className="w-full">
        <div className="mb-6">
          <h4 className="typography grow my-1">Method</h4>
          <Select defaultValue="All">
            <SelectTrigger id="filter1">
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
          <Select defaultValue="All">
            <SelectTrigger id="filter1">
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
          <Select defaultValue="All">
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
          <Input type="lowestPrice" id="lowestPrice" placeholder="0" />
        </div>

        <div className="mb-6">
          <h4 className="typography grow my-1">Highest Price</h4>
          <Input type="highestPrice" id="highestPrice" placeholder="100" />
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
