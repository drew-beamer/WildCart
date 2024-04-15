import PostCard from "@/components/PostCard";
import { PostDisplay } from "@/app/market/page";
import { render, screen } from "@testing-library/react";

const post: Readonly<PostDisplay> = Object.freeze({
  _id: "test",
  picture: Buffer.from("test"),
  name: "Keyboard",
  description: "A nice, clicky keyboard, with relatively little usage.",
  category: "Electronics",
  price: 95.99,
  trade_mode: "Trade",
  condition: "New",
  seller_id: "1234567890",
  seller_name: "John Doe",
});

describe("Renders Post Card", () => {
  it("Renders the title", () => {
    render(<PostCard post={post} />);
    expect(screen.getByText(post.name)).toBeInTheDocument();
  });
  it("Renders the description", () => {
    render(<PostCard post={post} />);
    expect(screen.getByText(post.description)).toBeInTheDocument();
  });
  it("Renders the seller name", () => {
    render(<PostCard post={post} />);
    expect(screen.getByText(post.seller_name)).toBeInTheDocument();
  });
  it("Renders two buttons", () => {
    render(<PostCard post={post} />);
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });
});
