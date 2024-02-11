import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cartAddQuery, cartResponse, messageRespose } from "../../types/api-types";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/cart/`,
  }),
  tagTypes:['cart'],
  endpoints: (builer) => ({
    createcart: builer.mutation<messageRespose,cartAddQuery>({
      query: (cart) => ({
        url: "/new",
        method: "POST",
        body: cart,
      }),
      invalidatesTags:['cart'],
    }),
    allCart: builer.query<cartResponse,string>({
      query: (userId) => `all?id=${userId}`,
      providesTags:['cart']
    }),
    deleteCart: builer.mutation({
      query: (cartId) => ({
        url: `${cartId}`,
        method: "DELETE",
      }),
      invalidatesTags:['cart']
    }),
    incQuantityItem: builer.mutation({
      query: (cartId) => ({
        url: `${cartId}`,
        method: "POST",
      }),
      invalidatesTags:['cart']
    }), 
    decQuantityItem: builer.mutation({
      query: (cartId) => ({
        url: `/dec/${cartId}`,
        method: "POST",
      }),
      invalidatesTags:['cart']
    }),
    calculatePrice: builer.query({
      query: () =>'price',
      providesTags:['cart']
    }),
  }),
});

export const { useCreatecartMutation, useAllCartQuery, useDeleteCartMutation ,useIncQuantityItemMutation,useDecQuantityItemMutation,useCalculatePriceQuery} =
  cartApi;
