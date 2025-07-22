import { IUserData } from "./user";

export interface IProfile {
  data: IUserData | null;
  status: boolean;
  message: string;
}

export interface ICart {
  data: IWishList[];
  status: boolean;
  message: string;
}

export interface IWishList {
  id: number;
  product_image: string;
  product_name: string;
  product_category: any;
  product_price: string;
  product_id: number;
  currency: string;
}

export interface IAddProduct {
  product_price: string;
  discount_price: string;
  current_stock_quantity: string;
  minimum_order_quantity: string;
  image: string;
}
