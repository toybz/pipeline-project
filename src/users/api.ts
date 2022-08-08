import { FetchUserT } from "./types";

const baseUrl = "https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84";

export function fetchUsers(page): Promise<FetchUserT> {
  return fetch(`${baseUrl}&page=${page}`).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<FetchUserT>;
  });
}
