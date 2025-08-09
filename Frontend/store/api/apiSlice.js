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
    projectsGet: builder.query({
      query: (clientId) => `/project/get/${clientId}`,
    }),


    //Invoice
    invoiceCreate: builder.mutation({
      query: (invoiceData) => ({
        url: `/invoice/create`,
        method: "POST",
        body: invoiceData,
      }),
    }),
    invoiceGet: builder.mutation({
      query: (data) => ({
        url: "/invoice/all/user-invoice",
        method: "POST",
        body: data,
      }),
    }),
    invoiceGetSingle: builder.query({
      query: (id) => `/invoice/single/user-invoice/${id}`,
    }),
    invoicePut: builder.mutation({
      query: ({invoiceData, id}) => ({
        url: `/invoice/update/${id}`,
        method: "PUT",
        body: {invoiceData},
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
  useProjectPutMutation,
  useProjectsGetQuery,

  useInvoiceCreateMutation,
  useInvoiceGetMutation,
  useInvoiceGetSingleQuery,
  useInvoicePutMutation
} = apiMain;
export default apiMain;
