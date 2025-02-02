// news.ts
export const fetchNews = async () => {
    try {
      const response = await fetch("http://localhost:1500/api/news?populate=*", {
        method: "GET",
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch news: ${response.statusText}`);
      }
  
      const responseData = await response.json();
      const baseURL = "http://localhost:1500"; 
  
      return responseData.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        date: item.date,
        image: item.image?.formats?.medium
          ? `${baseURL}${item.image.formats.medium.url}`
          : item.image?.url
          ? `${baseURL}${item.image.url}`
          : "", 
      }));
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  