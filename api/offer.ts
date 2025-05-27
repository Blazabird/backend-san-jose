export interface AcademicOffer {
  id: number;
  title: string;
  description: string;
  Image?: {
    url: string;
  };
}

export interface Characteristic {
  id: number;
  Title: string;
  description: string;
}

const ACADEMIC_CACHE_KEY = 'academicOffer';
const ACADEMIC_EXPIRATION_KEY = 'academicOfferExpiration';
const CHARACTERISTICS_CACHE_KEY = 'characteristics';
const CHARACTERISTICS_EXPIRATION_KEY = 'characteristicsExpiration';

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export const fetchAcademicOffer = async (): Promise<AcademicOffer | null> => {
  try {
    const now = Date.now();
    const cachedData = localStorage.getItem(ACADEMIC_CACHE_KEY);
    const expiration = localStorage.getItem(ACADEMIC_EXPIRATION_KEY);

    if (cachedData && expiration && now < parseInt(expiration)) {
      return JSON.parse(cachedData);
    }

    const response = await fetch('http://localhost:1500/api/academic-offer?populate=*');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    const academicOffer = result.data || null;

    if (academicOffer) {
      localStorage.setItem(ACADEMIC_CACHE_KEY, JSON.stringify(academicOffer));
      localStorage.setItem(ACADEMIC_EXPIRATION_KEY, (now + CACHE_DURATION).toString());
    }

    return academicOffer;
  } catch (error) {
    console.error('Error fetching academic offer:', error);
    return null;
  }
};

export const fetchCharacteristics = async (): Promise<Characteristic[] | null> => {
  try {
    const now = Date.now();
    const cachedData = localStorage.getItem(CHARACTERISTICS_CACHE_KEY);
    const expiration = localStorage.getItem(CHARACTERISTICS_EXPIRATION_KEY);

    if (cachedData && expiration && now < parseInt(expiration)) {
      return JSON.parse(cachedData);
    }

    const response = await fetch('http://localhost:1500/api/characteristics');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    const characteristics = result.data || null;

    if (characteristics) {
      localStorage.setItem(CHARACTERISTICS_CACHE_KEY, JSON.stringify(characteristics));
      localStorage.setItem(CHARACTERISTICS_EXPIRATION_KEY, (now + CACHE_DURATION).toString());
    }

    return characteristics;
  } catch (error) {
    console.error('Error fetching characteristics:', error);
    return null;
  }
};
