import { Action, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialcartReducer } from "../../types/reducer-types";
import { cartItem, myCart, shippingInfo } from "../../types/types";
import { cartResponse } from "../../types/api-types";

const initialState: initialcartReducer = {
  loading: false,
  cart: [],
  cartItems: [],
  subtotal: 0,
  tax: 0,
  shippingCharges: 0,
  discount: 0,
  total: 0,
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  },
};

export const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<cartItem>) => {
      state.loading = true;
      const index = state.cart.findIndex(
        (i) => i.productId === action.payload.productId
      );
      if (index !== -1) {
        state.cart[index] = action.payload;
      } else {
        state.cart.push(action.payload);
      }
      state.loading = false;
    },
    cartItems: (state, action) => {
      state.loading = true;
      state.cart.push(action.payload);
      state.loading = false;
    },
    discountApplied: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
    },
    saveShippingInfo: (state, action: PayloadAction<shippingInfo>) => {
      state.shippingInfo = action.payload;
    },
    resetCart: () => initialState,
  },
});

export const {
  addToCart,
  discountApplied,
  saveShippingInfo,
  resetCart,
  cartItems,
} = cartReducer.actions;
