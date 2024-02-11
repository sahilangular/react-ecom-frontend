import { Order, Product, User, barchart, cartItem, chart, linechart, shippingInfo, stats } from "./types"

export interface customeError {
    status:number,
    data:{
        success:boolean,
        message:string
    }
}

export interface allUserResponse{
    success:boolean,
    users:User[]
}

export interface messageRespose {
    success:boolean,
    message:string
}

export interface userResponse {
    success:boolean,
    user:User
}

export interface allOrdersResponse {
    success:boolean,
    orders:Order[]
}

export interface OrdersDetailResponse {
    success:boolean,
    order:Order;
}

export interface productResponse {
    success:boolean,
    products:Product[]
}

export interface categoriesResponse {
    success:boolean,
    categories:string[]
}

export interface searchProductsResponse {
    success:boolean,
    products:Product[],
    totalpage:number
}

export interface searchProductsquery {
    category?:string,
    search?:string,
    page?:number,
    sort?:string,
    price?:number
}

export interface createProductQuery {
    id:string,
    formData:FormData,
}

export interface productDetailResponse {
    success:boolean,
    products:Product;
}

export interface updateProductQuery {
    userId:string,
    productId:string,
    formData:FormData,
}

export interface deleteProductQuery {
    userId:string,
    productId:string,
}

export interface newOrderRequest {
    shippingInfo: shippingInfo ;
    user: string;
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    orderItems: cartItem[];
}

export interface updateOrderRequest {
    userId:string,
    orderId:string
}

export interface deleteUserRequest{
    userId:string
    adminId:string
}

export interface deleteOrderRequest {
    userId:string,
    orderId:string
}

export interface statsResponse{
    success:boolean,
    stats:stats
}

export interface pieResponse{
    success:boolean,
    chart:chart
}

export interface barResponse{
    success:boolean,
    barChart:barchart
}

export interface lineResponse{
    success:boolean,
    lineChart:linechart
}

export interface cartAddQuery{
        productId:string,
        name:string,
        photo:string,
        price:string,
        quantity:number,
        stock:number
        user:string
}

 interface myCart{
    productId:string,
    name:string,
    price:number,
    photo:string,
    quantity:number,
    stock:number
    _id?:string
}

export interface cartResponse{
    success:boolean,
    cart:myCart[]
}