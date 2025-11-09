// API configuration utility
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

/**
 * Gets the appropriate API URL based on the environment
 * For development: uses local Next.js API routes (/api/...)
 * For production: uses the configured external API base URL
 */
export const getApiUrl = (endpoint: string): string => {
  // If API_BASE_URL is configured and we're not in development, use external API
  if (API_BASE_URL && API_BASE_URL !== 'https://your-api-endpoint.com') {
    // Remove leading slash from endpoint to avoid double slashes
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    return `${API_BASE_URL}/${cleanEndpoint}`;
  }
  
  // Default to local Next.js API routes for development
  return endpoint;
};

export { API_BASE_URL };