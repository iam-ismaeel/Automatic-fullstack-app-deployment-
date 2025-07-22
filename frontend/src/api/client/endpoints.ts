const ADMIN_PATHS = "/admin";
import GlobalConfig from "../../../src/app/app.config.js";

const ENDPOINTS = {
  SELLER: {
    GET_SELLER_PRODUCTS: "/user/seller/product",
    GET_SINGLE_PRODUCT: (id: string) => `/user/seller/product/${id}`,
    ADD_PRODUCT: "/user/seller/product/create",
    EDIT_PRODUCT: (id: string) => `/user/seller/product/edit/${id}`,
    DELETE_PRODUCT: (id: string) => `/user/seller/product/delete/${id}`,
    GET_BANNERS: "/banners",
    CREATE_SELLER_WITH_COUPON: (coupon: string) =>
      `/connect/seller/signup?coupon=${coupon}`,
    CREATE_SELLER_WITH_REFERRER: (referrer: string) =>
      `/connect/seller/signup?referrer=${referrer}`,
    GET_CATEGORIES: "/user/category/all",
    GET_SUB_CATEGORIES: (category_id: string) =>
      `/user/category/subcategory/${category_id}`,
    GET_COLORS: `${ADMIN_PATHS}/colors`,
    GET_BRANDS: `${ADMIN_PATHS}/brands`,
    GET_UNITS: `${ADMIN_PATHS}/units`,
    GET_SIZES: `${ADMIN_PATHS}/sizes`,
    GET_TEMPLATE: "/user/seller/template",
    IMPORT_PRODUCT: "/user/seller/product/import",
    EXPORT_PRODUCT: (user_id: string, type: string) =>
      `/user/seller/product/export/${user_id}/${type}`,
    DASHBOARD_ANALYTICS: (user_id: string) =>
      `/user/seller/dashboard/analytic/${user_id}`,
    TOP_SELLING_PRODUCT: (user_id: string) =>
      `/user/seller/product/top-selling/${user_id}`,
    GET_ORDERS: (user_id: string) => `/user/seller/orders/${user_id}`,
    GET_ORDER_DETAILS: (user_id: string) => `/user/seller/orders/${user_id}`,
    GET_PLAN_BY_COUNTRY: (country_id: string) =>
      `/user/subscription/country/${country_id}`,
    PAY_FOR_SUBSCRIPTION: "/user/subscription/payment",
    VERIFY_PAYMENT: (user_id: string, reference: string) =>
      `/user/verify/payment/${user_id}/${reference}`,
    GET_SUSBCRIPTION_HISTORY: (user_id: string) =>
      `/user/subscription/history/${user_id}`,
    GET_WITHDRAWAL_HISTORY: (user_id: string, currentPage?: number) =>
      `/user/withdrawal/history/${user_id}${
        currentPage ? `?page=${currentPage}` : ""
      }`,
    GET_SELLERS_DETAIL: (sellerid: string) => `/seller/${sellerid}`,
    GET_SELLERS_REVIEW_DETAIL: (sellerid: string) =>
      `/seller/${sellerid}/reviews`,
    GET_SELLERS_CATEGORY_DETAIL: (sellerid: string) =>
      `/seller/${sellerid}/category`,
    GET_SELLER_PAYMENT_METHOD: (userId: string) =>
      `/user/withdrawal/method/${userId}`,
    SELLER_WITHDRAW: "/user/withdrawal/request",
    UPDATE_ORDER_STATUS: (user_id: number, order_id: number) =>
      `/user/seller/orders/${user_id}/update-status/${order_id}`,
  },
  ADMIN: {
    GET_CATEGORIES: "/user/category/all",
    ADD_CATEGORY: "/user/category/create",
    ADD_SUBCATEGORY: "/user/category/subcategory/create",
    GET_SUBCATEGORY: (id: string) => `/user/category/subcategory/${id}`,
    GET_BRANDS: `${ADMIN_PATHS}/brand`,
    CREATE_BRAND: `${ADMIN_PATHS}/brand`,
    GET_COLORS: `${ADMIN_PATHS}/color`,
    CREATE_COLOR: `${ADMIN_PATHS}/color`,
    GET_UNITS: `${ADMIN_PATHS}/unit`,
    CREATE_UNIT: `${ADMIN_PATHS}/unit`,
    GET_SIZES: `${ADMIN_PATHS}/sizes`,
    CREATE_SIZE: `${ADMIN_PATHS}/sizes`,
    ADD_SLIDER: `${ADMIN_PATHS}/add/slider`,
    GET_SLIDERS: `${ADMIN_PATHS}/slider`,
  },
  PUBLIC: {
    COUNTRY: "/country",
    STATE: (countryId: string) => `/states/${countryId}`,
    LOGIN: "/connect/login",
    VERIFY_EMAIL: "connect/verify/email",
    VERIFY_LOGIN: "connect/login/verify",
    LOGOUT: "/connect/logout",
    RESEND_CODE: "/connect/signup/resend",
    RESET_PASSWORD: "/connect/reset/password",
    FORGOT_PASSWORD: "/connect/forgot/password",
  },
  AFFILIATE: {
    CREATE_AFFILIATE: "/connect/affiliate/signup",
    ADD_BANK_ACCOUNT: "/user/affiliate/payment-method",
    REMOVE_BANK_ACCOUNT: "/user/remove/account",
    WITHDRAW: "/user/withdraw",
    ADD_KYC: "/user/kyc",
    UPDATE_EARNING_OPTION: "/user/earning-option",
    UPDATE_SECURITY_SETTINGS: (userId: string) => `/user/settings/${userId}`,
    GET_TRANSACTIONS: (userId: string, status: string) =>
      `/user/affiliate/transaction/${userId}?status=${status}`,
    GET_REFERRALS: (userId: string) =>
      `/user/affiliate/referral/management/${userId}`,
    GET_DASHBOARD_ANALYTICS: (userId: string) =>
      `/user/affiliate/dashboard-analytic/${userId}`,
    GET_PAYMENT_METHOD: (userId: string) =>
      `/user/affiliate/payment-method/${userId}`,
  },

  COUNTRY: {
    GET_COUNTRY: "/shop/country",
  },
  HOMEPAGE: {
    GET_BESTSELLING_PRODUCTS: `/top-products?country_id=${GlobalConfig.country_id}`,
    GET_FEATURED_PRODUCTS: `/featured/products?country_id=${GlobalConfig.country_id}`,
    GET_POCKET_PRODUCTS: `/pocket/friendly?country_id=${GlobalConfig.country_id}`,
    GET_CATEGORY_PRODUCT: (slug: string) =>
      `/category/${slug}?country_id=${GlobalConfig.country_id}`,
    GET_FEATURE_CATEGORIES: "/featured/categories",
    GET_PRODUCT_DETAIL: (slug: string) => `/single/product/${slug}`,
    ADD_TO_CART: "/user/cart/add",
    GET_CART_ITEM: (user_id: number) => `/user/cart/${user_id}`,

    REMOVE_CART_ITEM: (user_id: number, cart_id: number) =>
      `/user/cart/${user_id}/remove/${cart_id}`,
    CLEAR_CART: (user_id: number) => `/user/cart/${user_id}/clear`,
    UPDATE_CART: "/user/cart/update-cart",
    GET_PROFILE: "/user/profile",
    GET_ALL_CATEGORIES: "/user/category/all",
    GET_RECOMMENDED_PRODUCTS: "/recommended/products",
    GET_TOP_BRANDS: "/top-brands",
    POST_PRODUCT_REVIEW: "/user/product-review",
    POST_SAVE_FOR_LATER: "/user/product/save-for-later",
    POST_ADD_TO_WISH_LIST: "/user/customer/wishlist",
    POST_MOVE_WISH_LIST_TO_CART: "user/product/cart",
    GET_ADD_TO_WISH_LIST: (user_id: number) =>
      `/user/customer/wishlist/${user_id}`,
    GET_TOP_SELLER: `/top-sellers?country_id=${GlobalConfig.country_id}`,
  },
  PAYSTACK: {
    POST_CHECKOUT: "/user/payment/paystack",
    VERIFY: (user_id: number, ref: string) =>
      `/user/payment/verify/paystack/${user_id}/${ref}`,
    VERIFY_PAYSTACK: (ref: string) =>
      `https://api.paystack.co/transaction/verify/${ref}`,
    LOOKUP_PAYSTACK_ACCOUNT: "/user/payment/account-lookup",
    GET_BANK_LIST: "/banks",
  },
  AUTHORIZE_NET: {
    AUTHORIZE: "/user/payment/authorize",
  },
  CUSTOMER: {
    GET_DASHBOARD_ANALYTICS: (userId: string) =>
      `/user/customer/dashboard/analytic/${userId}`,
    GET_REWARD_POINTS_ANALYTICS: (userId: string) =>
      `/user/customer/reward/dashboard/${userId}`,
    GET_REWARD_POINTS_ACTIVITIES: (userId: string) =>
      `/user/customer/activity/${userId}`,
    GET_ACCOUNT_OVERVIEW: (userId: string) =>
      `/user/customer/account-overview/${userId}`,
    GET_RECENT_ORDERS: (userId: string) =>
      `/user/customer/recent-orders/${userId}`,
    GET_ALL_ORDERS: (userId: string) => `/user/customer/orders/${userId}`,
    GET_WISHLIST: (userId: string) => `/user/customer/wishlist/${userId}`,
    GET_ORDER_DETAILS: (order_no: string) =>
      `/user/customer/order/detail/${order_no}`,
  },
};

export const ADMIN_ENDPOINTS = ENDPOINTS.ADMIN;
export const SELLER_ENDPOINTS = ENDPOINTS.SELLER;
export const PUBLIC_ENDPOINTS = ENDPOINTS.PUBLIC;
export const AFFILIATE_ENDPOINTS = ENDPOINTS.AFFILIATE;
export const CUSTOMER_ENDPOINTS = ENDPOINTS.CUSTOMER;

export const COUNTRY_ENDPOINTS = ENDPOINTS.COUNTRY;
export const HOMEPAGE_REF = ENDPOINTS.HOMEPAGE;

export const PAYSTACK_REF = ENDPOINTS.PAYSTACK;
export const AUTHORIZE_NET_REF = ENDPOINTS.AUTHORIZE_NET;

const API_ENDPOINTS = {
  GET_PROFILE: "/user/profile",
  UPDATE_PROFILE: (user_id: string) => `user/update-profile/${user_id}`,
  GET_SELLER_PRODUCTS: "/user/seller/product",
  ADD_PRODUCT: "/user/seller/product/create",
  UPDATE_PRODUCT: (productId: string, userId: string) =>
    `/user/seller/product/edit/${productId}/${userId}`,
};

export default API_ENDPOINTS;
