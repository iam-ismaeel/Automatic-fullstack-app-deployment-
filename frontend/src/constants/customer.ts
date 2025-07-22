import Support from "@/components/pages/affiliate-dashboard/settings/support";
import { Dashboard, LogOut, Packages, User, WishList } from "@/components/svg";
import {
  AffiliatesIcon,
  AllOrdersIcon,
  DashboardHomeIcon,
  NotificationIcon,
  Profile,
  ProfileIcon,
  RewardsIcon,
  SecurityIcon,
  WalletIcon,
  WishlistIcon,
} from "@/components/svg/seller/icons";

export const customerPages = [
  {
    links: [{ icon: DashboardHomeIcon, name: "Dashboard", path: "/dashboard" }],
  },
  {
    links: [{ icon: AllOrdersIcon, name: "Orders", path: "/orders" }],
  },
  {
    links: [{ icon: WishlistIcon, name: "Wishlist", path: "/wishlist" }],
  },
  {
    links: [{ icon: RewardsIcon, name: "Rewards & Points", path: "/reward" }],
  },
  {
    label: "SETTINGS",
    links: [
      { icon: Profile, name: "Profile", path: "/profile" },
      // {
      //   icon: WalletIcon,
      //   name: "Wallet & Payment",
      //   path: "/settings/wallet-payment",
      // },
      { icon: SecurityIcon, name: "Security", path: "/settings" },
      // {
      //   icon: NotificationIcon,
      //   name: "Notification",
      //   path: "/settings/notification",
      // },
    ],
  },
];
