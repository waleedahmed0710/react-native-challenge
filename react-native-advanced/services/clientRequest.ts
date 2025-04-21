const BASE_URL = "https://jsonplaceholder.typicode.com";
/**
 * Makes a request to the API using the Fetch API.
 *
 * @param {string} path - The endpoint path to make the request to.
 * @param {string} [method="GET"] - The HTTP method for the request (e.g., "GET", "POST", "PUT").
 * @param {Record<string, any> | null} [body=null] - The body of the request, to be sent with methods like "POST" or "PUT". Defaults to `null`.
 * @param {Record<string, string>} [headers={}] - Optional headers to be included in the request.
 * @param {number} [page=1] - The current page number.
 * @param {number} [limit=10] - The number of items per page. Used for calculating `totalPages`.
 * @returns {Promise<{data: any, error: any}>} The response data or error from the request.
 */
export const clientRequest = async (
  path: string,
  method: string = "GET",
  body: Record<string, any> | null = null,
  headers = {},
  page: number = 1,
  limit: number = 10
) => {
  try {
    const URL = `${BASE_URL}/${path}?_page=${page}&_limit=${limit}`;
    const options:RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };
    if (body) {
        options.body = JSON.stringify(body);
    }
    const response = await fetch(URL, options);
    if (!response.ok){
      const error = await response.json();
      return { data: null, totalPages: 0, error };
    }
    const totalCount = parseInt(response.headers.get("X-Total-Count") || "0", 10);
    const totalPages = Math.ceil(totalCount / limit);

    const data = await response.json();
    return { data, totalPages, error: null };
  } catch (error) {
    return {data: null, error, totalPages: 0};
  }
};
