import { User, cartItem, shippingInfo } from "./types";

export interface initialReducer{
    user:User | null;
    loading:boolean
}

export interface initialcartReducer{
    loading:boolean;
    cart:cartItem[];
    subtotal:number;
    cartItems:cartItem[]
    tax:number;
    shippingCharges:number;
    discount:number;
    total:number;
    shippingInfo:shippingInfo
}


