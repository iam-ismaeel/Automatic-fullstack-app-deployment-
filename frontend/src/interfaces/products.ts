import { Pagination } from "./table";

export interface bestSellingProps {
  id: number;
  name: string;
  image: any;
  price: number;
  discounted?: number;
  tag?: string;
}
export interface productModel {
  id: number;
  name: string;
  slug: string;
  image: string;
  front_image: string;
  price: string;
  description: string;
  category_id: number;
  total_orders: number;
  total_reviews: number;
  average_rating: number;
  currency: string;
  discount_price: string;
  default_currency: string;
}
export interface recommendProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  discount_price: string;
  price: string;
  image: string;
}

export interface productInterface {
  id: number;
  name: string;
  slug: string;
  description: string;
  category_id: string;
  sub_category_id: string;
  brand_id: string;
  color_id: string;
  unit_id: string;
  size_id: string;
  product_sku: string;
  product_price: string;
  discount_price: string;
  price: string;
  current_stock_quantity: string;
  minimum_order_quantity: string;
  front_image: string;
  images: Image[];
  status: string;
  currency: string;
}

export interface productHome {
  id: number;
  name: string;
  slug: string;
  description: string;
  category_id: string;
  sub_category_id: string;
  brand: string;
  color: string;
  unit: string;
  size: string;
  product_sku: string;
  product_price: string;
  discount_price: string;
  price: string;
  current_stock_quantity: string;
  minimum_order_quantity: string;
  front_image: string;
  images: Image[];
  status: string;
  reviews: Review[];
  total_reviews: number;
  item_sold: number;
  seller: Seller;
  average_rating: number;
  currency: string;
  is_in_wishlist: boolean;
  category: {
    category_id: number;
    category_name: string;
    sub_category_id: number;
    sub_category_name: string;
  };
}

export interface Seller {
  id: number;
  uuid: string;
  name: string;
  country: string;
  flag: string;
}
export interface Review {
  id: number;
  rating: number;
  review: string;
  user: string;
  date: string;
}
export interface topBrandProps {
  id: number;
  name: string;
  logo: any;
  totalSales: number;
  rating: number;
}
export interface topUsersProps {
  id: number;
  name: string;
  image: any;
  username: string;
}

export interface productProps {}
[];

export type ILanguage = {
  name: string;
  id: string;
  icon?: React.ReactNode;
};

export interface ICategoriesResponse {
  status: boolean;
  message: string;
  data: ICategory[];
}

export interface CountryPayload {
  id: number;
  country_id: number;
  name: string;
  flag: string;
  currency: string;
}

export interface ICategory {
  id: number;
  name: string;
  slug: string;
  image: string;
}

export interface IProductsResponse {
  status: boolean;
  message: string;
  data: IProduct[];
  pagination: Pagination;
}

export interface IProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: {
    category_id: string;
    category_name: string;
    sub_category_id: string;
    sub_category_name: string;
  };
  brand_id: string;
  color_id: string;
  unit_id: string;
  size_id: string;
  sub_category_id: string;
  brand: string;
  color: string;
  unit: string;
  size: string;
  product_sku: string;
  product_price: string;
  discount_price: string;
  order_count: number;
  rating: number;
  review_count: number;
  price: string;
  current_stock_quantity: string;
  minimum_order_quantity: string;
  front_image: string;
  images: Image[];
  currency: string;
  country_id: number;
  status: string;
}

export interface Image {
  image: string;
}

export interface IGetProductTemplateResponse {
  status: boolean;
  message: string;
  data: string;
}

export interface IOrder {
  id: number;
  order_no: string;
  order_date: string;
  order_time: string;
  payment_status: string;
  payment_method: string;
  customer: {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
  products: OrderProducts[];
  shipping_address: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  status: string;
  total_amount: string;
}

export interface OrderProducts {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  sub_total: number;
  original_currency: string;
  image: string;
  status: string;
}
