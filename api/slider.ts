export interface ImageData {
    src: string;
    alt: string;
  }
  
  const BASE_URL = process.env.NEXT_PUBLIC_API_DOMAIN; 
  
  export class SliderService {
    static async fetchImages(): Promise<ImageData[]> {
      try {
        const response = await fetch(`${BASE_URL}/api/slider?populate=*`);
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const json = await response.json();
       
        const imagesData = json.data?.Images || [];
        
       
        const images: ImageData[] = imagesData.map((image: any) => {
         
          const getFullUrl = (url: string) =>
            url.startsWith('http') ? url : `${BASE_URL}${url}`;
  
          return {
            src: image.formats?.large?.url
              ? getFullUrl(image.formats.large.url)
              : getFullUrl(image.url),
            alt: image.alternativeText || image.name,
          };
        });
  
        return images;
      } catch (error) {
        console.error('Error fetching images:', error);
        return [];
      }
    }
  }
  