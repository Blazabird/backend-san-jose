import dotenv from "dotenv";

let apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

export async function fetchHighlightedDays(): Promise<{ [key: string]: string }> {
  try {
    const response = await fetch(`${apiDomain}/api/events?populate=*'`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    const currentDate = new Date().toISOString().split('T')[0]; 

    const highlightedDays = data.data.reduce((filter: { [key: string]: string }, event: { date: string, title: string }) => {
      if (event.date >= currentDate) { 
        filter[event.date] = event.title;
      }
      return filter;
    }, {});

    return highlightedDays;
  } catch (error) {

    console.log(`request made to: ${apiDomain} failed`)
    console.error('Failed to fetch highlighted days:', error);
    return {};
  }
}
