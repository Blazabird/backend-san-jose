// api/events.ts

export async function fetchHighlightedDays(): Promise<{ [key: string]: string }> {
    try {
      const response = await fetch('http://localhost:1500/api/events?populate=*', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
  
      const highlightedDays = data.data.reduce((acc: { [key: string]: string }, event: { date: string, title: string }) => {
        acc[event.date] = event.title;
        return acc;
      }, {});
  
      return highlightedDays;
    } catch (error) {
      console.error('Failed to fetch highlighted days:', error);
      return {};
    }
  }
  