export interface User {
  name: string;
  email: string;
  photo: string;
  gender: string;
  role: string;
  dob: string;
  _id: string;
}

export interface Product {
  name: string;
  category: string;
  price: number;
  stock: number;
  photo: string;
  _id: string;
}

export type shippingInfo = {
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
};

export interface cartItem {
  productId: string;
  photo: string;
  name: string;
  quantity: number;
  price: number;
  stock: number;
}


export interface myCart{
  productId:string,
  name:string,
  price:number,
  photo:string,
  quantity:number,
  stock:number,
  _id?:string
}

export type orderItem = Omit<cartItem, "stock"> & { _id: string };

export type Order = {
  orderItems: orderItem[];
  shippingInfo: shippingInfo;
  subtotal: number;
  tax: number;
  shippingCharge: number;
  discount: number;
  total: number;
  status: string;
  user: {
    _id: string;
    name: string;
  };
  _id: string;
};

type counts = {
  users: number;
  products: number;
  orders: number;
};

type transaction = {
  _id: string;
  discount: number;
  status: string;
  amount: number;
  quantity: number;
};

export type stats = {
  userPercentage: string | number;
  productPercentage: string | number;
  orderPercentage: string | number;
  revenue: number;
  allOrderRevenue: number;
  counts: counts;
  chart: {
    order: number[];
    revenue: number[];
  };
  categoryCount: Record<string, number>[];
  ratio: {
    female: number;
    male: number;
  };
  lastTransaction: transaction[];
};

type revenueDistribution = {
  netMargin:number,
  discount:number,
  productionCost:number,
  burnt:number,
  marketingCost:number,
};

type usersAgeGroup = {
  teen: number;
  adult:number;
  old: number
};


export type chart={
  processing: number;
      shipped: number,
      delivered: number,
      categoryCount:Record<string,number>[],
      stock:{
        inStock:number,
        outOfStock:number
      },
      revenueDistribution:revenueDistribution,
      adminCustomer: {
        admin: number,
        customer: number, 
      };
      usersAgeGroup:usersAgeGroup,
}

export type barchart = {
  products: number[],
  users:  number[],
  orders:  number[],
}

export type linechart={
  product: number[],
  user: number[],
  discount:number[],
  revenue:number[]
}
