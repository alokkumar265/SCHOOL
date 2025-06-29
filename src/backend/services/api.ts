
// Base API service for making HTTP requests

/**
 * Base URL for API requests
 */
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

/**
 * HTTP GET request
 */
export const get = <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  return fetchApi<T>(endpoint, { ...options, method: 'GET' });
};

/**
 * HTTP POST request
 */
export const post = <T>(endpoint: string, data: any, options?: RequestInit): Promise<T> => {
  return fetchApi<T>(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * HTTP PUT request
 */
export const put = <T>(endpoint: string, data: any, options?: RequestInit): Promise<T> => {
  return fetchApi<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

/**
 * HTTP DELETE request
 */
export const del = <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  return fetchApi<T>(endpoint, { ...options, method: 'DELETE' });
};

export default {
  get,
  post,
  put,
  del
};
