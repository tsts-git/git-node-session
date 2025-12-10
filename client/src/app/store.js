import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";
import authSlice from "../features/aouth/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

// הפעלה של listeners לפני ה-export
setupListeners(store.dispatch);

export default store;
