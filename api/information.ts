// services/fetchImage.ts
import dotenv from "dotenv";

let apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

let cachedImageUrl: string | null = null;
let cachedAt: number | null = null;

export async function fetchImageUrl(): Promise<string> {
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;

  if (cachedImageUrl && cachedAt && now - cachedAt < oneDay) {
    return cachedImageUrl;
  }

  try {
    const response = await fetch(`${apiDomain}/api/information?populate=*`);
    const data = await response.json();

  
    const imageUrl = data?.data?.picture?.url;
    if (!imageUrl) throw new Error("Image URL not found");

    cachedImageUrl = `${apiDomain}${imageUrl}`;
    console.log("Fetched and cached image:", cachedImageUrl);
    cachedAt = now;

    return cachedImageUrl;
  } catch (error) {
    console.log(`request made to: ${apiDomain} failed`);
    console.error("Failed to fetch image:", error);
    throw error;
  }
}
