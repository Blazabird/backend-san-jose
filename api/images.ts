// src/api/files.ts

/**
 * Fetch files from the API using the path from the initial response.
 * @param fileData - The object containing the file information.
 * @returns A promise that resolves to the full image URL.
 */
export const fetchFileUrl = async (fileData: any): Promise<string> => {
    try {
      // Base URL for constructing the full image URL (replace with your API's base URL)
      const baseUrl = process.env.NEXT_PUBLIC_API_HOST;; 
  
      // Check if the thumbnail URL exists, otherwise use the full URL
      const fullImageUrl = fileData?.formats?.thumbnail?.url
        ? `${baseUrl}${fileData.formats.thumbnail.url}`
        : `${baseUrl}${fileData.url}`;
  
      return fullImageUrl;
    } catch (error: any) {
      throw new Error(error.message || "An error occurred while fetching the file URL");
    }
  };
  