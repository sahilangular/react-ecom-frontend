import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  categoriesResponse,
  createProductQuery,
  deleteProductQuery,
  messageRespose,
  productDetailResponse,
  productResponse,
  searchProductsResponse,
  searchProductsquery,
  updateProductQuery,
} from "../../types/api-types";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
  }),
  tagTypes:['product'],
  endpoints: (builder) => ({
    latestProduct: builder.query<productResponse, string>({
      query: () => "latest",
      providesTags: ["product"],
    }),
    allProduct: builder.query<productResponse, string>({
      query: (id) => `admin-products?id=${id}`,
      providesTags:['product']
    }),
    categories: builder.query<categoriesResponse, string>({
      query: () => `categories`,
      providesTags:['product']
    }),
    searchProducts: builder.query<searchProductsResponse, searchProductsquery>({
      query: ({ price, search, sort, category, page }) => {
        let base = `all?search=${search}&page=${page}`;

        if (price) base += `&price=${price}`;
        if (sort) base += `&sort=${sort}`;
        if (category) base += `&category=${category}`;

        return base;
      },
      providesTags:['product']
    }),
    createProducts: builder.mutation<messageRespose,createProductQuery>({
      query: ({formData,id}) => ({
        url:`new?id=${id}`,
        method:"POST",
        body:formData
      }),
      invalidatesTags:['product']
    }),
    productDetails: builder.query<productDetailResponse, string>({
      query: (id) => id,
      providesTags:['product']
    }),
    updateProduct: builder.mutation<messageRespose,updateProductQuery>({
      query: ({userId,productId,formData}) => ({
        url: `${productId}?id=${userId}`,
        method:"PUT",
        body:formData
      }),
      invalidatesTags:['product']
    }),
    deleteProduct: builder.mutation<messageRespose,deleteProductQuery>({
      query: ({userId,productId}) => ({
        url: `${productId}?id=${userId}`,
        method:"DELETE",
      }),
      invalidatesTags:['product']
    }),
  }),
});

export const {
  useLatestProductQuery,
  useAllProductQuery,
  useCategoriesQuery,
  useSearchProductsQuery,
  useCreateProductsMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation
} = productApi;
