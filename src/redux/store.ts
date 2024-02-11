import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import { userReducer } from "./reducer/userReducer";
import { productApi } from "./api/productApi";
import { cartReducer } from "./reducer/cartReducer";
import { orderApi } from "./api/orderApi";
import { dashboardApi } from "./api/dashboardApi";
import { cartApi } from "./api/cartApi";

export const serverUrl = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    userApi: userApi.reducer,
    productApi: productApi.reducer,
    orderApi: orderApi.reducer,
    dashboardApi: dashboardApi.reducer,
    cartApi: cartApi.reducer,
    user: userReducer.reducer,
    cart: cartReducer.reducer,
  },
  middleware: (midd) =>
    midd().concat(
      userApi.middleware,
      productApi.middleware,
      orderApi.middleware,
      dashboardApi.middleware,
      cartApi.middleware
    ),
});

export type rootState = ReturnType<typeof store.getState>;
