import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/types";
import { initialReducer } from "../../types/reducer-types";

const initialState: initialReducer = {
  user: null,
  loading: true,
};

export const userReducer = createSlice({
  name: "UserReducer",
  initialState,
  reducers: {
    userExist: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
    },
    userNotExist: (state) => {
      state.loading = false;
      state.user = null;
    },
  },
});

export const {userExist,userNotExist} = userReducer.actions
