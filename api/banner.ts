
let bannerCache: any = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; 

export const fetchBannerData = async (): Promise<any> => {
  try {
  
    if (bannerCache && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_DURATION) {
      console.log('Returning cached banner data');
      return bannerCache;
    }

   
    const response = await fetch('http://localhost:1500/api/banner?populate=*');
    
    if (!response.ok) {
      throw new Error('Error al conectar con el servidor');
    }

    const data = await response.json();

   
    bannerCache = data;
    cacheTimestamp = Date.now();

    return data;

  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message || 'Error al conectar con el servidor');
    } else {
      throw new Error('Error interno del servidor');
    }
  }
};
