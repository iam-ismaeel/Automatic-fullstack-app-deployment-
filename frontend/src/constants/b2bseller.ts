import {
  AllOrdersIcon,
  BulkExportIcon,
  BulkImportIcon,
  DashboardHomeIcon,
  ProductsIcon,
} from "@/components/svg/seller/icons";

export const b2bSellerPages: {
  label?: string;
  links: { path: string; name: string; icon?: any }[];
}[] = [
  {
    links: [{ icon: DashboardHomeIcon, name: "Dashboard", path: "/dashboard" }],
  },
  {
    label: "PROMOTION MANAGEMENT",
    links: [{ icon: "", name: "Coupon vouchers", path: "/coupon-vouchers" }],
  },
  {
    label: "ORDER MANAGEMENT",
    links: [{ icon: AllOrdersIcon, name: "All Orders", path: "/orders" }],
  },
  {
    label: "PRODUCT MANAGEMENT",
    links: [{ icon: ProductsIcon, name: "Products", path: "/products" }],
  },
  {
    label: "STORE MANAGEMENT",
    links: [
      { name: "Account Data", path: "/account-data" },
      { name: "Company Data", path: "/company-data" },
      { name: "Shipping addresses", path: "/shipping" },
      {
        name: "Subscriptions and Privacy",
        path: "/privacy",
      },
      { name: "Returns and Refunds", path: "/refunds" },
      { name: "Earning Reports", path: "/earning-reports" },
      { name: "Feedback", path: "/feedback" },
    ],
  },
  {
    label: "ACCOUNTS",
    links: [{ name: "Withdraws", path: "/withdraws" }],
  },
  {
    label: "IMPORT / EXPORT",
    links: [
      { icon: BulkExportIcon, name: "Bulk Export", path: "/bulk-export" },
      { icon: BulkImportIcon, name: "Bulk Import", path: "/bulk-import" },
      { icon: BulkImportIcon, name: "Gallery Import", path: "/gallery-import" },
    ],
  },
];
