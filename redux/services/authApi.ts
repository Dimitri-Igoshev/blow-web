import { config } from "@/common/env";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${config.API_URL}/auth`,
    // prepareHeaders: (headers, { getState }) => {
    //   const token = localStorage.getItem('access-token')
    //   if (token) headers.set('Authorization', `Bearer ${token}`)

    //   return headers
    // },
  }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: '/registration',
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body
      })
    })
  })
})

export const { useRegisterMutation, useLoginMutation } = authApi;