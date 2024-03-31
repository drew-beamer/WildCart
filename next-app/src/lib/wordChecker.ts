import fs from "fs";
import path from "path";

export const containsBannedWords = (post: string): boolean => {
  try {
    const filePath = path.join(process.cwd(), "bad-words.txt");
    const data = fs.readFileSync(filePath, "utf8");
    const bannedWords = data
      .split("\n")
      .map((word) => word.trim().toLowerCase())
      .filter((word) => word.length > 0);

    const postWords = post.toLowerCase().split(/\s+/);

    return postWords.some((word) => bannedWords.includes(word));
  } catch (error) {
    console.error("Error reading banned words file:", error);
    return false;
  }
};