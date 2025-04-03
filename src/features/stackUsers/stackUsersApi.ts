import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StackUser } from "./types";

export const stackUsersApi = createApi({
  reducerPath: "stackUsersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.stackexchange.com/2.2" }),
  endpoints: (builder) => ({
    getUsers: builder.query<{ items: StackUser[] }, number>({
      query: (page = 1) => ({
        url: "/users",
        params: {
          site: "stackoverflow",
          page,
          pagesize: 20,
          order: "desc",
          sort: "reputation",
        },
      }),
      keepUnusedDataFor: 300,
    }),
    deleteUser: builder.mutation<void, number>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
        params: {
          site: "stackoverflow",
        },
      }),
    }),
  }),
});

export const { useGetUsersQuery, useDeleteUserMutation } = stackUsersApi;
