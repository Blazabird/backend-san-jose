// src/api/banner.ts

export const fetchBannerData = async (): Promise<any> => {
    try {
      const response = await fetch('http://localhost:1500/api/banner?populate=*');
  
      if (!response.ok) {
        throw new Error('Failed to fetch banner data');
      }
  
      const data = await response.json();

      return data;

    } catch (e) {

      if (e instanceof Error) {
        throw new Error(e.message || 'Error fetching banner data');

      } else {

        throw new Error('Error interno del servidor');
      }
    }
  };
  