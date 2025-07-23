import apiSlice from "../apiSlice";

const apiMain = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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

export const {  } = apiMain;
export default apiMain;