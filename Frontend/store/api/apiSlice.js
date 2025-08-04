import apiSlice from "./apiMain";

const apiMain = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //auth
    userSign: builder.mutation({
      query: (userData) => ({
        url: `/auth/sign`,
        method: "POST",
        body: userData,
        credentials: "include",
      }),
    }),
    userVerify: builder.query({
      query: () => ({
        url: `/auth/verify`,
        credentials: "include",
      }),
    }),

    //client
    clientCreate: builder.mutation({
      query: (clientData) => ({
        url: `/client/create`,
        method: "POST",
        body: clientData,
      }),
    }),
    clientGet: builder.mutation({
      query: (data) => ({
        url: "/client/all/user-client",
        method: "POST",
        body: data,
      }),
    }),
    clientGetSingle: builder.query({
      query: (id) => `/client/single/user-client/${id}`,
    }),
    clientPut: builder.mutation({
      query: ({clientData, id}) => ({
        url: `/client/update/${id}`,
        method: "PUT",
        body: clientData,
      }),
    }),
    clientsGet: builder.query({
      query: (userId) => `/client/get/${userId}`,
    }),

    //Project
    projectCreate: builder.mutation({
      query: (projectData) => ({
        url: `/project/create`,
        method: "POST",
        body: projectData,
      }),
    }),
    projectGet: builder.mutation({
      query: (data) => ({
        url: "/project/all/user-project",
        method: "POST",
        body: data,
      }),
    }),
    projectGetSingle: builder.query({
      query: (id) => `/project/single/user-project/${id}`,
    }),
    projectPut: builder.mutation({
      query: ({projectData, id}) => ({
        url: `/project/update/${id}`,
        method: "PUT",
        body: projectData,
      }),
    }),
  
  }),
  
});

export const {
  useUserSignMutation,
  useUserVerifyQuery,

  useClientCreateMutation,
  useClientGetMutation,
  useClientGetSingleQuery,
  useClientPutMutation,
  useClientsGetQuery,

  useProjectCreateMutation,
  useProjectGetMutation,
  useProjectGetSingleQuery,
  useProjectPutMutation
} = apiMain;
export default apiMain;
