// src/api/files.ts

/**
 * Fetch files from the API using the path from the initial response.
 * @param fileData - The object containing the file information.
 * @returns A promise that resolves to the full image URL.
 */
export const fetchFileUrl = async (fileData: any): Promise<string> => {
  try {
    
    const baseUrl = process.env.NEXT_PUBLIC_API_DOMAIN;

    
    const fullImageUrl =
      fileData?.formats?.thumbnail?.url
        ? `${baseUrl}${fileData.formats.thumbnail.url}`
        : `${baseUrl}${fileData.url}`;

    return fullImageUrl;
  } catch (error: any) {
    throw new Error(error.message || "An error occurred while fetching the file URL");
  }
};

/**
 * Fetch the large image URL from the API using the path from the initial response.
 * @param fileData - The object containing the file information.
 * @returns A promise that resolves to the full large image URL.
 */
export const fetchLargeImageUrl = async (fileData: any): Promise<string> => {
  try {

    const baseUrl = process.env.NEXT_PUBLIC_API_DOMAIN;

  
    if (fileData?.formats?.large?.url) {
      return `${baseUrl}${fileData.formats.large.url}`;
    }

   
    return `${baseUrl}${fileData.url}`;
  } catch (error: any) {
    throw new Error(error.message || "An error occurred while fetching the large image URL");
  }
};
