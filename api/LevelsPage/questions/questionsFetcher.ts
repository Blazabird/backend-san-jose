
import dotenv from "dotenv";

let apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

export interface Pillar {
  id: number;
  question: string;
  answer: string;
}

export const fetchQuestionsbyLevel = async (levelId: string): Promise<Pillar[]> => {
  try {
    const response = await fetch(`${apiDomain}/api/questions?filters[level][id][$eq]=${levelId}&populate=*`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    const questions = result.data || [];
    return questions;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};
