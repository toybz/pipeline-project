/**
 * model of a user
 */
export type UsersT = {
  id: string;
  row: number;
  age: number;
  gender: "female" | "male";
};

/**
 * model of the paginated users
 */
export type PaginatedUsersT = {
  [key: number]: UsersT[];
};

/**
 * a model of the response from the fetch user endPoint
 * although the returned data has other data as well
 * this type only references the property used in our app
 */
export type FetchUserT = {
  results: PaginatedUsersT[];
};
