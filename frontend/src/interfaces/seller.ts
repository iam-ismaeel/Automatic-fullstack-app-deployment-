import { CommonApiResponse } from "./common";
import { Pagination } from "./table";
import { IUserData } from "./user";

export interface CreateSellerPayload {
  first_name: string;
  last_name: string;
  other_name?: string;
  business_name: string;
  email: string;
  address: string;
  country_id: string;
  state_id: string;
  password: string;
  password_confirmation: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IVerifyEmailPayload {
  email: string;
  code: string;
}

export interface IVerifyLoginResponse {
  status: boolean;
  message: any;
  data: LoginVerifyData;
}

export interface LoginVerifyData {
  user_type: string;
  user_id: string | null;
  has_signed_up: boolean;
  is_affiliate_member: boolean;
  token: string;
  expires_at: any;
  data: IUserData | null;
}

export interface IDashboardAnalyticsResponse {
  status: boolean;
  message: string;
  data: IDashboardAnalytics;
}

export interface IDashboardAnalytics {
  total_products: number;
  total_orders: number;
  completed_sales: number;
  pending_count: number;
  confirmed_count: number;
  processing_count: number;
  shipped_count: number;
  delivered_count: number;
  cancelled_count: number;
}

export interface IGetOrdersResponse {
  status: boolean;
  message: string;
  data: any;
  pagination: Pagination;
}

export interface IPayForSubscription {
  user_id: number;
  subscription_plan_id: number;
  type: string;
  email: string;
  amount: number;
  redirect_url?: string;
  card_number?: string;
  expiration_date?: string;
  card_code?: string;
}

export interface IGetCountriesResponse {
  status: boolean;
  message: string;
  data: ICountry[];
}

export interface ICountry {
  id: number;
  country_id: number;
  name: string;
  flag: string;
  currency: string;
}

export interface IGetPlansResponse extends CommonApiResponse {
  data: IPlan[];
}

export interface IGetPlanDetailResponse extends CommonApiResponse {
  data: IPlan[];
}

export interface IPlan {
  id: number;
  title: string;
  cost: number;
  country_id: number;
  currency: string;
  period: string;
  tagline: string;
  details: string;
  tier: number;
  type: string;
  status: string;
}

export interface IPlanHistory {
  id: number;
  subcription_plan: string;
  plan_start: string;
  plan_end: string;
  expired_at: string;
  status: string;
}

export interface IGetPlanHistoryResponse extends CommonApiResponse {
  data: IPlanHistory[];
}

export interface IGetWithdrawalHistoryResponse extends CommonApiResponse {
  data: IWithdrawalHistory;
  pagination: Pagination;
}

export interface IWithdrawalHistory {
  balance: number;
  pending_withdrawals: number;
  rejected_withdrawals: number;
  total_withdrawals: number;
  transactions: any[];
}

export interface TopSeller {
  user_id: number;
  name: string;
  image: string;
  total_sales: number;
  uuid: string;
}

export interface SellerData {
  id: number;
  uuid: string;
  first_name: string;
  last_name: string;
  middlename: string;
  image: string;
  product_count: number;
  products: SellerProduct[];
}

export interface SellerProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: {
    category_id: number;
    category_name: string;
    sub_category_id: number;
    sub_category_name: string;
  };
  front_image: string;
  product_sku: string;
  product_price: number;
  discount_price: number;
  price: number;
  total_reviews: number;
  item_sold: number;
  average_rating: number;
}
export interface TopSeller {
  user_id: number;
  name: string;
  image: string;
  total_sales: number;
}

export interface CategoryType {
  id: number;
  name: string;
  slug: string;
  image: string;
}

export interface ProductReview {
  overall_rating: number;
  reviews: ReviewType[];
}

export interface ReviewType {
  id: number;
  product_id: number;
  rating: number;
  review: string;
  created_at: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
  };
}
