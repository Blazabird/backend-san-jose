// File: api/mainPage/newsSection/news/news.ts

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || "";

export type NewsItem = {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
};

export async function fetchNews(): Promise<NewsItem[]> {
  if (!apiDomain) {
    console.error("API domain not defined");
    return [];
  }

  try {
    const response = await fetch(`${apiDomain}/api/news?populate=*`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error(`Error fetching news: ${response.status}`);

    const data = await response.json();
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    return data.data
      .map((item: any) => {
        // Your API returns fields at the root level
        // If you later add an image field, adjust this
        const imageUrl = item.image?.url
          ? `${apiDomain}${item.image.url}`
          : "";

        return {
          id: item.id,
          title: item.title || "Untitled",
          description: item.description || "",
          date: item.date,
          image: imageUrl,
        } as NewsItem;
      })
      // Only keep the last two months
      .filter((n: NewsItem) => {
        const d = new Date(n.date);
        return !isNaN(d.getTime()) && d >= twoMonthsAgo;
      })
      // Sort descending by date
      .sort(
        (a: NewsItem, b: NewsItem) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );
  } catch (err) {
    console.error("Failed to fetch news:", err);
    return [];
  }
}
