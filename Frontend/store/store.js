import { configureStore } from "@reduxjs/toolkit";
import globalSliceReducer from './global/globalState'
import apipMain from "./api/apiMain";

export const store = configureStore({
    reducer: {
        globalState : globalSliceReducer,
         [apipMain.reducerPath] : apipMain.reducer
    },
    middleware: (prevMiddleware) => prevMiddleware().concat([apipMain.middleware]),
})