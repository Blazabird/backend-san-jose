
import dotenv from "dotenv";

let apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

export const fetchNews = async () => {
  try {
    const response = await fetch(`${apiDomain}/api/news?populate=*`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.statusText}`);
    }

    const responseData = await response.json();
    const baseURL = process.env.NEXT_PUBLIC_API_DOMAIN; 

    // Sorting the news articles by date (newest first)
    const sortedNews = responseData.data
      .map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        date: item.date,
        image: item.image?.formats?.medium
          ? `${baseURL}${item.image.formats.medium.url}`
          : item.image?.url
          ? `${baseURL}${item.image.url}`
          : "", 
      }))
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());  // Sort descending by date

    return sortedNews;
  } catch (error) {
    console.error(error);
    return [];
  }
};
