import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { OrdersDetailResponse, allOrdersResponse, deleteOrderRequest, messageRespose, newOrderRequest, updateOrderRequest } from "../../types/api-types";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/order/`,
  }),
  tagTypes:['orders'],
  endpoints: (builder) => ({
    newOrder: builder.mutation<messageRespose,newOrderRequest>({
      query: (order) => ({
        url:'new',
        method:'POST',
        body:order
      }),
      invalidatesTags:['orders']
    }),
    updateOrder: builder.mutation<messageRespose,updateOrderRequest>({
      query: ({userId,orderId}) => ({
        url:`${orderId}?id=${userId}`,
        method:'PUT',
      }),
      invalidatesTags:['orders']
    }),
    deleteOrder: builder.mutation<messageRespose,deleteOrderRequest>({
      query: ({userId,orderId}) => ({
        url:`${orderId}?id=${userId}`,
        method:'DELETE',
      }),
      invalidatesTags:['orders']
    }),
    myOrders: builder.query<allOrdersResponse,string>({
      query: (id) => (`my?id=${id}`),
      providesTags:['orders']
    }),
    allorders: builder.query<allOrdersResponse, string>({
      query: (id) => `all?id=${id}`,
      providesTags:['orders']
    }),
    orderDetail: builder.query<OrdersDetailResponse,string>({
      query: (id) => id,
      providesTags:['orders']
    }),
  }),
});

export const {useNewOrderMutation,useUpdateOrderMutation,useDeleteOrderMutation,useMyOrdersQuery,useAllordersQuery,useOrderDetailQuery} = orderApi;
