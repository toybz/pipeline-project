import { FetchUserT } from "./types";

const BASE_URL = "https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84";

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
