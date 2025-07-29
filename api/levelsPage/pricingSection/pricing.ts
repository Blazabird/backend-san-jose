// lib/api/fetchPricingByLevel.ts
export async function fetchPricingByLevelId(id: string) {
  try {
    const res = await fetch(`/api/pricings/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch pricing for level ID ${id}`);
    }
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
