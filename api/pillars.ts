// src/api/pillars.ts
import { fetchFileUrl } from "./images";

export interface Pillar {
  id: number;
  title: string;
  description: string;
  image: string;
}

export const fetchPillarsByLevelId = async (levelId: string): Promise<Pillar[]> => {
  try {
    const response = await fetch(`http://localhost:1500/api/pillars?filters[level][id][$eq]=${levelId}&populate=*`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    const pillars = result.data || [];

    // Add image URLs
    for (let pillar of pillars) {
      if (pillar.image && pillar.image.id) {
        const imageUrl = await fetchFileUrl(pillar.image);
        pillar.image = imageUrl;
      }
    }

    return pillars;
  } catch (error) {
    console.error("Error fetching pillars:", error);
    return [];
  }
};
