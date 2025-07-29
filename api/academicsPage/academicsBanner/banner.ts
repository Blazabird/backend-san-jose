const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || "";

export type AcademicsBannerItem = {
  id: number;
  title: string;
  paragraph: string;
  image: any; 
};

export async function fetchAcademicsBanner(): Promise<AcademicsBannerItem | null> {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || "";

  if (!apiDomain) {
    console.error("API domain not defined");
    return null;
  }

  try {
    const response = await fetch(`${apiDomain}/api/academics-banner?populate=*`, {
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error fetching banner: ${response.status}`);
    }

    const { data } = await response.json();

    return {
      id: data.id,
      title: data.title,
      paragraph: data.paragraph,
      image: data.image, // ✅ pass full image object here
    };
  } catch (error) {
    console.error("Failed to fetch banner:", error);
    return null;
  }
}
