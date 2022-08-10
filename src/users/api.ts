import { FetchUserT } from "./types";

const API_KEY = process.env.TOKEN;
const API_URL = process.env.SERVER;

const BASE_URL = `${API_URL}?key=${API_KEY}`;

/**
 *  fetch paginated users data from the endpoint using
 *  @param {String} page the page to fetch
 *  @returns {Promise}
 */
export function fetchUsers(page: number): Promise<FetchUserT> {
  return fetch(`${BASE_URL}&page=${page}`).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<FetchUserT>;
  });
}
