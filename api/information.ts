// services/fetchImage.ts
let cachedImageUrl: string | null = null;
let cachedAt: number | null = null;

export async function fetchImageUrl(): Promise<string> {
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;

  if (cachedImageUrl && cachedAt && now - cachedAt < oneDay) {
    return cachedImageUrl;
  }

  try {
    const response = await fetch("http://localhost:1500/api/information?populate=*");
    const data = await response.json();

  
    const imageUrl = data?.data?.picture?.url;
    if (!imageUrl) throw new Error("Image URL not found");

    cachedImageUrl = `http://localhost:1500${imageUrl}`;
    console.log("Fetched and cached image:", cachedImageUrl);
    cachedAt = now;

    return cachedImageUrl;
  } catch (error) {
    console.error("Failed to fetch image:", error);
    throw error;
  }
}
