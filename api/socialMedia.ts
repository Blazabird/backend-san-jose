export interface SliderImage {
  id: number;
  url: string;
  alternativeText: string | null;
}

const CACHE_KEY = "slider_images_cache";
const CACHE_TTL = 1000 * 60 * 60 * 24 * 2; // 2 days in ms

export async function fetchSliderImages(): Promise<SliderImage[]> {
  // Try to load from cache
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      if (Date.now() < parsed.expiry && Array.isArray(parsed.data)) {
        return parsed.data.slice(0, 4); // Return first 4 from cache
      }
    } catch (err) {
      console.warn("Failed to parse slider cache:", err);
    }
  }

  // Fetch from API
  try {
    const res = await fetch(`http://localhost:1500/api/slider?populate=Images`);
    const json = await res.json();

    const images = json?.data?.Images;

    if (Array.isArray(images)) {
      const mapped: SliderImage[] = images.map((img: any) => ({
        id: img.id,
        url: img.url,
        alternativeText: img.alternativeText,
      }));

      // Cache it
      const cache = {
        data: mapped,
        expiry: Date.now() + CACHE_TTL,
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));

      return mapped.slice(0, 4); // Return first 4
    } else {
      console.error("Images field not found or not an array", json);
      return [];
    }
  } catch (err) {
    console.error("Failed to fetch slider images:", err);
    return [];
  }
}
