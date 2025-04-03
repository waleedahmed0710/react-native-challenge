import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LocalUser } from "./types";
import { JSON_SERVER_BASE_URL } from "@/utils/env";

export const localUsersApi = createApi({
  reducerPath: "localUsersApi",
  baseQuery: fetchBaseQuery({ baseUrl: JSON_SERVER_BASE_URL }),
  tagTypes: ["LocalUser"],
  endpoints: (builder) => ({
    getLocalUsers: builder.query<LocalUser[], void>({
      query: () => "/users",
      providesTags: ["LocalUser"],
      keepUnusedDataFor: 300,
    }),
    getLocalUserById: builder.query<LocalUser, number>({
      query: (id) => `/users/${id}`,
    }),
    addLocalUser: builder.mutation<LocalUser, Partial<LocalUser>>({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
      invalidatesTags: ["LocalUser"],
    }),
    updateLocalUser: builder.mutation<LocalUser, LocalUser>({
      query: ({ id, ...rest }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["LocalUser"],
    }),
    deleteLocalUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["LocalUser"],
    }),
  }),
});

export const {
  useGetLocalUsersQuery,
  useGetLocalUserByIdQuery,
  useAddLocalUserMutation,
  useUpdateLocalUserMutation,
  useDeleteLocalUserMutation,
} = localUsersApi;
