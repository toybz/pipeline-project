type UsersT = {
  id: string;
  row: number;
  age: number;
  gender: "female" | "male";
};

//model of the response from the fetch user endPoint
//the return data has other data as well
// This type only references the props used  in our app
export type FetchUserT = {
  results: [
    {
      [key: number]: UsersT[];
    }
  ];
};

export type PaginatedUsersT = {
  [key: number]: UsersT[];
};
