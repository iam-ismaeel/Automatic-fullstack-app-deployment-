import playstation from "../../../../public/img/play-station.png";
import laptop from "../../../../public/img/laptop.png";
import camera from "../../../../public/img/camera.png";
import headphones from "../../../../public/img/headphone.png";

import { SellerProduct } from "@/interfaces/seller";

const products = [
  {
    id: 1,
    name: "Sony A6400 Mirrorles",
    slug: "Sony A6400 Mirrorles",
    product_price: 10000,
    average_rating: 1,
    item_sold: 2,
    image: camera,
  },
  {
    id: 2,
    name: "Dahua DH-SD49225I",
    slug: "Dahua DH-SD49225I",
    product_price: 2800,
    discount_price: 2500,
    average_rating: 5,
    item_sold: 2,
    image: laptop,
  },
  {
    id: 3,
    name: "Lenovo Tab P11 Plus",
    slug: "Lenovo Tab P11 Plus",
    product_price: 2800,
    discount_price: 2500,
    average_rating: 5,
    item_sold: 2,
    image: headphones,
  },
  {
    id: 4,
    name: "LG 164 cm (65 inches)",
    slug: "LG 164 cm (65 inches)",
    product_price: 2800,
    discount_price: 2500,
    average_rating: 5,
    item_sold: 2,
    image: playstation,
  },
];

export default function Products({ children }: { children: any }) {
  return (
    <div className="grid grid-cols-[repeat(6,1fr)] xl:grid-cols-[repeat(4,1fr)] slg:grid-cols-[repeat(2,1fr)] sm:grid-cols-[repeat(1,1fr)]  gap-6 mx-auto max-w-[1380px] mt-10 px-5 pb-10">
      {children}
    </div>
  );
}
