import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../types/types";
import { allUserResponse, deleteUserRequest, messageRespose, userResponse } from "../../types/api-types";
import axios from "axios";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/`,
  }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    login: builder.mutation<messageRespose, User>({
      query: (user) => ({
        url: "new",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["users"],
    }),
    allUsers: builder.query<allUserResponse, string>({
      query: (id) => `all?id=${id}`,
      providesTags: ["users"],
    }),
    deleteUser:builder.mutation<messageRespose,deleteUserRequest>({
      query:({userId,adminId})=>({
        url:`${userId}?id=${adminId}`,
        method:"DELETE",
      }),
      invalidatesTags:['users']
    })
  }),
});

export const getUser = async (id: string) => {
  try {
    const { data }: { data: userResponse } = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/v1/user/${id}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const { useLoginMutation , useAllUsersQuery,useDeleteUserMutation} = userApi;
