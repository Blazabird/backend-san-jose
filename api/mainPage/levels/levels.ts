import dotenv from "dotenv";
import { fetchFileUrl } from "../../imageFetcher/images";

export interface Level {
  id: number;
  documentId: string;  // Capital I as in API
  title: string;
  description: string;
  image: string;
  shortDescription: string;
  subtitle?: string;
  pillarDescription?: string;
}

let apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
if (!apiDomain) {
  throw new Error("Missing NEXT_PUBLIC_API_DOMAIN environment variable");
}

export const fetchLevels = async (): Promise<Level[]> => {
  try {
    const response = await fetch(`${apiDomain}/api/levels?populate=*`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    const levelsData = result.data || [];

    const levels: Level[] = levelsData.map((item: any) => {
      const icon = item.icon;
      // Prepend domain if url is relative (starts with "/")
      let imageUrl = "/default-image.jpg";

      if (icon && icon.url) {
        if (icon.url.startsWith("http")) {
          imageUrl = icon.url;
        } else {
          // Make sure apiDomain doesn't end with "/" to avoid double slashes
          imageUrl = `${apiDomain.replace(/\/$/, "")}${icon.url}`;
        }
      }

      return {
        id: item.id,
        documentId: item.documentId,
        title: item.title,
        description: item.description,
        image: imageUrl,
        shortDescription: item.shortDescription || "",  // ✅ Add this
        subtitle: item.subtitle || undefined,
        pillarDescription: "",
      };

    });

    return levels;
  } catch (error) {
    console.error("Error fetching levels:", error);
    return [];
  }
};