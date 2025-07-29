// File: api/mainPage/newsSection/events/calendar.ts

import dotenv from "dotenv";

dotenv.config();
let apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

export type EventItem = {
  id: number;
  title: string;
  date: string;
  start: string | null;
  end: string | null;
  place: string | null;
  image: string | null;
  description: string | null;
};

// Define a type matching the raw event data from the API response
type RawEvent = {
  id: number;
  title: string;
  date: string;
  Start?: string | null;
  End?: string | null;
  place?: string | null;
  Image?: any;
  description?: string | null;
};

export async function fetchEvents(): Promise<EventItem[]> {
  try {
    const response = await fetch(`${apiDomain}/api/events?populate=Image`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    const now = new Date();

    const mappedEvents: EventItem[] = data.data
      .map((event: RawEvent) => {
        // Extract image URL if present
        let imageUrl: string | null = null;
        if (event.Image?.data?.attributes?.formats) {
          const formats = event.Image.data.attributes.formats;
          const medium = formats.medium || formats.large || formats.small || formats.thumbnail;
          imageUrl = medium.url ? `${apiDomain}${medium.url}` : null;
        }
        return {
          id: event.id,
          title: event.title,
          date: event.date,
          start: event.Start || null,
          end: event.End || null,
          place: event.place || null,
          image: imageUrl,
          description: event.description || null,
        };
      })
      // Filter out past events
      .filter((event: EventItem) => new Date(event.date) >= now);

    return mappedEvents;
  } catch (error) {
    console.log(`Request to ${apiDomain} failed`);
    console.error("Failed to fetch events:", error);
    return [];
  }
}
