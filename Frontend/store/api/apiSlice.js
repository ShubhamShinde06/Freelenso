import apiSlice from "./apiMain";

const apiMain = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    //auth
    userSign: builder.mutation({
      query: (userData) => ({
        url: `/auth/sign`,
        method: "POST",
        body: userData,
        credentials: 'include',
      }),
    }),
    userVerify: builder.query({
      query: () => ({
        url: `/auth/verify`,
        credentials: 'include',
      }),
    }),

    //account
    accountDelete: builder.mutation({
      query: (id, CltID) => ({
        url: `/account/delete/${id}/${CltID}`,
        method: "DELETE",
      }),
    }),
    accountGet: builder.query({
      query: (DbID) => `/account/get/${DbID}`,
    }),
})
})

export const { useUserSignMutation, useUserVerifyQuery } = apiMain;
export default apiMain;