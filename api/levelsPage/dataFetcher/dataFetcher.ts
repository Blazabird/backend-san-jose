const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

export async function fetchLevelById(documentid: string) {
  if (!apiDomain) {
    throw new Error("Missing NEXT_PUBLIC_API_DOMAIN environment variable");
  }

  try {
    
    const url = `${apiDomain}/api/levels/${documentid}?populate[pillars][populate]=image&populate[services]=true&populate[requisites]=true&populate[pricing]=true&populate[levelimage][populate]=image&populate[questions][populate]=true`;

    const res = await fetch(url);
    console.log(res);

   
    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch level ${documentid}: ${res.status}`);
    }

    const data = await res.json();
    console.log("Fetched level data:", data);

    return data.data; 
  } catch (err) {
    console.error("Error fetching level:", err);
    return null;
  }
}
