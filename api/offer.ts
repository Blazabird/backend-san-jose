export interface AcademicOffer {
    id: number;
    title: string;
    description: string;
    // Add other fields if needed
  }
  
  const CACHE_KEY = 'academicOffer'; // The key used for localStorage
  const CACHE_EXPIRATION_KEY = 'academicOfferExpiration'; // The key used for expiration timestamp
  
  const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  
  export const fetchAcademicOffer = async (): Promise<AcademicOffer | null> => {
    try {
      const now = new Date().getTime();
      const cachedData = localStorage.getItem(CACHE_KEY);
      const expiration = localStorage.getItem(CACHE_EXPIRATION_KEY);
  
      // Check if the cache is still valid (within 24 hours)
      if (cachedData && expiration && now < parseInt(expiration)) {
        // Return cached data if still valid
        return JSON.parse(cachedData);
      }
  
      // Fetch new data from the API if cache is expired or not present
      const response = await fetch('http://localhost:1500/api/academic-offer');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      const academicOffer = result.data || null;
  
      // Cache the data and set expiration time
      if (academicOffer) {
        localStorage.setItem(CACHE_KEY, JSON.stringify(academicOffer));
        localStorage.setItem(CACHE_EXPIRATION_KEY, (now + CACHE_DURATION).toString());
      }
  
      return academicOffer;
    } catch (error) {
      console.error('Error fetching academic offer:', error);
      return null;
    }
  };
  