/**
 * CORS utility functions for making cross-origin requests
 */

/**
 * Makes a CORS-enabled fetch request with proper headers
 * @param {string} url - The URL to fetch from
 * @param {object} options - Fetch options (method, headers, body, etc.)
 * @returns {Promise} - Promise that resolves to the response
 */
export async function corsFetch(url, options = {}) {
  const defaultOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    mode: 'cors',
    credentials: 'omit' // Change to 'include' if you need cookies
  };

  // Merge provided options with defaults
  const fetchOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers
    }
  };

  try {
    const response = await fetch(url, fetchOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response;
  } catch (error) {
    console.error('CORS fetch error:', error);
    throw error;
  }
}

/**
 * Makes a CORS-enabled JSON GET request
 * @param {string} url - The URL to fetch from
 * @param {object} headers - Additional headers
 * @returns {Promise} - Promise that resolves to the JSON data
 */
export async function corsGetJSON(url, headers = {}) {
  const response = await corsFetch(url, {
    method: 'GET',
    headers
  });
  return response.json();
}

/**
 * Makes a CORS-enabled JSON POST request
 * @param {string} url - The URL to post to
 * @param {object} data - The data to send
 * @param {object} headers - Additional headers
 * @returns {Promise} - Promise that resolves to the JSON response
 */
export async function corsPostJSON(url, data, headers = {}) {
  const response = await corsFetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  });
  return response.json();
}

/**
 * Checks if CORS is supported by the browser
 * @returns {boolean} - True if CORS is supported
 */
export function isCORSSupported() {
  return 'withCredentials' in new XMLHttpRequest();
}

/**
 * Creates a CORS proxy URL for APIs that don't support CORS
 * @param {string} url - The original URL
 * @param {string} proxyUrl - The CORS proxy service URL (default: cors-anywhere)
 * @returns {string} - The proxied URL
 */
export function createCORSProxyURL(url, proxyUrl = 'https://cors-anywhere.herokuapp.com/') {
  return proxyUrl + encodeURIComponent(url);
}

/**
 * Example usage of CORS functions
 */
export const corsExamples = {
  // Example: Fetch JSON data from an API
  async fetchAPIData() {
    try {
      const data = await corsGetJSON('https://api.example.com/data');
      console.log('API data:', data);
      return data;
    } catch (error) {
      console.error('Failed to fetch API data:', error);
    }
  },

  // Example: Post data to an API
  async postAPIData(payload) {
    try {
      const response = await corsPostJSON('https://api.example.com/submit', payload);
      console.log('API response:', response);
      return response;
    } catch (error) {
      console.error('Failed to post API data:', error);
    }
  },

  // Example: Use CORS proxy for APIs that don't support CORS
  async fetchWithProxy() {
    try {
      const proxyUrl = createCORSProxyURL('https://api.non-cors-api.com/data');
      const data = await corsGetJSON(proxyUrl);
      console.log('Proxied API data:', data);
      return data;
    } catch (error) {
      console.error('Failed to fetch with proxy:', error);
    }
  }
};