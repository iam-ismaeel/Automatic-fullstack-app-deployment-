export interface IDashboardLink {
  icon: any;
  name: string;
  path: string;
}

export interface IDashboardLinks {
  label?: string;
  links: IDashboardLink[];
}

export interface ICountryResponse {
  status: boolean;
  message: string;
  data: ICountry[];
}

export interface ICountry {
  id: number;
  code: string;
  name: string;
  phonecode: string;
}

export interface IBannerResponse {
  status: boolean;
  message: string;
  data: IBanner[];
}

export interface IBanner {
  id: number;
  image: string;
  link: string;
}

export interface addCartItem {
  user_id: number;
  product_id: number;
  token?: any;
  quantity: number;
}

export interface removeCartItem {
  user_id: number;
  cart_id: number;
}

export interface CommonApiResponse {
  status: boolean;
  message: string;
}
export interface addReview {
  user_id: number;
  product_id: number;
  rating: number;
  review: string;
}

export interface saveForLater {
  user_id: number;
  product_id: number;
}

export interface removeCartItem {
  user_id: number;
  cart_id: number;
}
