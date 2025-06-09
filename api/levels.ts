import dotenv from "dotenv";
import { fetchFileUrl } from "./images";

export interface Level {
  id: number;
  title: string;
  description: string;
  image: string;
  subtitle?: string;
  pillarDescription?: string;
}

let apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

export const fetchLevels = async (): Promise<Level[]> => {
  try {
  const response = await fetch(`${apiDomain}/api/levels?populate=*`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    const levels = result.data || [];

    for (let level of levels) {
      if (level.icon && level.icon.id) {
        const imageUrl = await fetchFileUrl(level.icon);
        level.image = imageUrl;
      }
    }

    return levels;
  } catch (error) {
    console.error("Error fetching levels:", error);
    console.log(`request made to: ${apiDomain} failed`);
    return [];
  }
};
