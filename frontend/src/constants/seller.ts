import {
  AllOrdersIcon,
  BulkExportIcon,
  BulkImportIcon,
  CategoriesIcon,
  DashboardHomeIcon,
  GalleryImportIcon,
  ProductsIcon,
  ProfileIcon,
  SubscriptionsIcon,
  WalletIcon,
} from "@/components/svg/seller/icons";

export const sellerPages: {
  label?: string;
  links: { path: string; name: string; icon?: any }[];
}[] = [
  {
    links: [{ icon: DashboardHomeIcon, name: "Dashboard", path: "/dashboard" }],
  },
  // {
  //   label: "PROMOTION MANAGEMENT",
  //   links: [
  //     { icon: "", name: "Coupon vouchers", path: "/coupon-vouchers" },
  //     { icon: "", name: "Banner", path: "/banner" },
  //   ],
  // },
  {
    label: "ORDER MANAGEMENT",
    links: [
      { icon: AllOrdersIcon, name: "All Orders", path: "/orders" },
      { icon: AllOrdersIcon, name: "Pending", path: "/orders?status=pending" },
      {
        icon: AllOrdersIcon,
        name: "Confirmed",
        path: "/orders?status=confirmed",
      },
      {
        icon: AllOrdersIcon,
        name: "Processing",
        path: "/orders?status=processing",
      },
      { icon: AllOrdersIcon, name: "Shipped", path: "/orders?status=shipped" },
      {
        icon: AllOrdersIcon,
        name: "Delivered",
        path: "/orders?status=delivered",
      },
      {
        icon: AllOrdersIcon,
        name: "Cancelled",
        path: "/orders?status=cancelled",
      },
    ],
  },
  // {
  //   label: "PRODUCT VARIANTS",
  //   links: [
  //     { icon: "", name: "Brand", path: "/brand" },
  //     { icon: "", name: "Color", path: "/color" },
  //     { icon: "", name: "Unit", path: "/unit" },
  //     { icon: "", name: "Sizes", path: "/sizes" },
  //   ],
  // },
  {
    label: "PRODUCT MANAGEMENT",
    links: [
      // { icon: CategoriesIcon, name: "Categories", path: "/categories" },
      // {
      //   icon: CategoriesIcon,
      //   name: "Sub-Category",
      //   path: "/categories/sub-category",
      // },
      { icon: ProductsIcon, name: "Products", path: "/products" },
    ],
  },
  {
    label: "ACCOUNTS",
    links: [
      {
        icon: WalletIcon,
        name: "Withdrawal",
        path: "/withdrawal",
      },
      {
        icon: SubscriptionsIcon,
        name: "Subscriptions",
        path: "/subscriptions",
      },
    ],
  },
  {
    label: "STORE MANAGEMENT",
    links: [{ icon: ProfileIcon, name: "Profile", path: "/profile" }],
  },
  {
    label: "IMPORT / EXPORT",
    links: [
      { icon: BulkExportIcon, name: "Bulk Export", path: "/bulk-export" },
      { icon: BulkImportIcon, name: "Bulk Import", path: "/bulk-import" },
      // {
      //   icon: GalleryImportIcon,
      //   name: "Gallery import",
      //   path: "/gallery-import",
      // },
    ],
  },
];
