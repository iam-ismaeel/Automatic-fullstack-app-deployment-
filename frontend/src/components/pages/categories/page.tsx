"use client";
import CountrySelectorNav from "@/components/common/Country-selector-Nav";
import Banner from "./Banner";
import ProductsList from "./ProductsList";
import { useGetProductCategory } from "@/api/homeProduct";
import Product from "./Product";

import playstation from "../../../../public/img/play-station.png";
import bag from "../../../../public/img/denim-bag.png";
import coat from "../../../../public/img/feat-1.png";
import hoodie from "../../../../public/img/feat-3.png";
import boots from "../../../../public/img/feat-4.png";
import suit from "../../../../public/img/prod09.png";
import gamepad from "../../../../public/img/shop-D1.png";
import Skeleton from "react-loading-skeleton";
import EmptyData from "@/components/common/empty-data";

const products = [
  {
    id: 1,
    subcategory: "Men's wear",
    name: "Coat of many colors",
    slug: "coat of many color",
    product_price: 890.11,
    average_rating: 4,
    total_reviews: 5,
    item_sold: 9,
    image: coat,
  },
  {
    id: 2,
    subcategory: "Men's wear",
    name: "Hoodie swag",
    slug: "coat of many color",
    product_price: 1090.11,
    average_rating: 5,
    total_reviews: 2,
    item_sold: 5,
    image: hoodie,
  },
  {
    id: 3,
    subcategory: "Travel accesories",
    name: "Bag cool ",
    slug: "coat of many color",
    product_price: 770.11,
    average_rating: 3,
    total_reviews: 10,
    item_sold: 2,
    image: bag,
  },
  {
    id: 4,
    subcategory: "Travel accesories",
    name: "Boots",
    slug: "coat of many color",
    product_price: 570.11,
    average_rating: 3,
    total_reviews: 10,
    item_sold: 2,
    image: boots,
  },
  {
    id: 4,
    subcategory: "Travel accesories",
    name: "Navy Blue Suit",
    slug: "coat of many color",
    product_price: 1470.11,
    average_rating: 4,
    total_reviews: 20,
    item_sold: 22,
    image: suit,
  },
  {
    id: 5,
    subcategory: "Gaming",
    name: "Playstation Console",
    slug: "coat of many color",
    product_price: 2000.11,
    average_rating: 4,
    total_reviews: 20,
    item_sold: 10,
    image: playstation,
  },
  {
    id: 6,
    subcategory: "Gaming",
    name: "Playstation Gamepad Console",
    slug: "coat of many color",
    product_price: 270.11,
    average_rating: 4,
    total_reviews: 20,
    item_sold: 10,
    image: gamepad,
  },
];

export default function CategoriesPage({ categoryId }: { categoryId: string }) {
  const {
    data,
    isLoading,
    refetch: refetchProductCategory,
  } = useGetProductCategory(categoryId);
  const products = data?.data;

  const refetch = () => {
    refetchProductCategory();
  };
  return (
    <div className="pt-[150px] md:pt-[220px] bg-white">
      <CountrySelectorNav refetch={refetch} />
      <Banner
        data={[
          "/img/AZANY-TOP-1.jpg",
          "/img/AZANY-TOP-2.jpg",
          "/img/Azany-top-3.jpg",
          "/img/Azany-top-4.jpg",
          "/img/AZANY-TOP-5.jpg",
        ]}
      />
      <div className="app_container">
        <ProductsList categoryId={categoryId}>
          {isLoading ? (
            ["_", "_", "_", "_"].map((v, i) => (
              <Skeleton key={i} width={"100%"} height={370} />
            ))
          ) : products?.length == 0 ? (
            <div className="col-span-10">
              <EmptyData />
            </div>
          ) : (
            products?.map((product, i) => <Product key={i} product={product} />)
          )}
        </ProductsList>
      </div>
    </div>
  );
}
