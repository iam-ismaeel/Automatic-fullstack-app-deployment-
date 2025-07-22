"use client";
import React, { useEffect, useState } from "react";
import { ActionIcon, Button, Popover } from "rizzui";
import Image from "next/image";
import { CarretDown } from "@icons";
import SearchableDropDown from "./searchable-dropdown";
import { CountryPayload } from "@interfaces/country";
import { useGetCountryQuery } from "@/api/country";
import { useQueryClient } from "@tanstack/react-query";
import GlobalConfig from "@/app/app.config";
import { HOMEPAGE_REF } from "@/api/client/endpoints";
import useCountryStore from "@/zustand/useCountry";
import { ICategory } from "@/interfaces/products";

const CountrySelectorNav = ({ refetch = () => {} }: any) => {
  const queryClient = useQueryClient();
  const { data } = useGetCountryQuery();

  const { activeCountry, setActiveCountry } = useCountryStore();
  const [countryData, setcountryData] = useState<CountryPayload[] | []>([]);
  const [curractivecountry, setcurractivecountry] = useState({
    name: "",
    countryid: 0,
  });
  let countryDataraw = (data?.data as CountryPayload[]) || [];

  useEffect(() => {
    const set = new Set();
    const newcountry = [];
    for (let i = 0; i < countryDataraw.length; i++) {
      if (!set.has(countryDataraw[i].name)) {
        set.add(countryDataraw[i].name);
        newcountry.push(countryDataraw[i]);
      }
    }
    setcountryData(newcountry);
    const countryFound = newcountry.find(
      (data) => data.country_id == activeCountry
    );
    if (countryFound)
      setcurractivecountry({
        name: countryFound?.name,
        countryid: countryFound?.country_id,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryDataraw]);

  useEffect(() => {
    if (curractivecountry.name) {
      setActiveCountry(curractivecountry.countryid);
      reFetchData(curractivecountry.countryid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curractivecountry]);

  const reFetchData = (countryID: number) => {
    const bestSelling = HOMEPAGE_REF.GET_BESTSELLING_PRODUCTS;
    const featured = HOMEPAGE_REF.GET_FEATURED_PRODUCTS;
    const pocketFriendly = HOMEPAGE_REF.GET_POCKET_PRODUCTS;
    const topSeller = HOMEPAGE_REF.GET_TOP_SELLER;

    GlobalConfig.country_id = countryID;
    HOMEPAGE_REF.GET_BESTSELLING_PRODUCTS = `/top-products?country_id=${GlobalConfig.country_id}`;
    HOMEPAGE_REF.GET_FEATURED_PRODUCTS = `/featured/products?country_id=${GlobalConfig.country_id}`;
    HOMEPAGE_REF.GET_POCKET_PRODUCTS = `/pocket/friendly?country_id=${GlobalConfig.country_id}`;
    HOMEPAGE_REF.GET_TOP_SELLER = `/top-sellers?country_id=${GlobalConfig.country_id}`;
    refetch();
    queryClient.invalidateQueries({ queryKey: [bestSelling] });
    queryClient.invalidateQueries({ queryKey: [pocketFriendly] });
    queryClient.invalidateQueries({ queryKey: [featured] });
    queryClient.invalidateQueries({ queryKey: [topSeller] });
  };

  return (
    <div className="flex items-center justify-center gap-x-7 slg:gap-x-4 slg:justify-start overflow-x-scroll py-2 country-header_scrollbar app_container">
      {countryData.slice(0, 8).map((country, index) => (
        <ActionIcon
          onClick={() => {
            setcurractivecountry({
              countryid: country.country_id,
              name: country.name,
            });
          }}
          key={index}
          className={`flex items-center flex-shrink-0 gap-x-[5px] w-fit text-nowrap ${
            curractivecountry?.countryid == country.country_id
              ? "bg-primary text-white"
              : "bg-white"
          }  border border-grey hover:border-primary px-[11px] py-1 rounded-lg  hover:bg-primary hover:-translate-y-1 transition ease-in-out hover:scale-110 duration-300 hover:text-white cursor-pointer`}
        >
          <Image src={country.flag} width={20} height={20} alt={country.name} />
          <p className="text-small-medium order-first">{country.name}</p>
        </ActionIcon>
      ))}
      <Popover placement="bottom-end">
        <Popover.Trigger>
          {countryData
            .slice(8, -1)
            .find((data) => data.country_id == curractivecountry?.countryid) ? (
            <Button
              className={`flex items-center gap-x-[5px] w-fit text-nowrap text-white bg-primary border border-grey  px-[11px] py-1 rounded-lg  hover:bg-primary dark:hover:bg-primary cursor-pointer`}
            >
              <p> {curractivecountry?.name}</p>
              <CarretDown
                className="w-[8px] h-[4px]  "
                style={{ fill: "white" }}
              />
            </Button>
          ) : (
            <Button
              className={`flex items-center gap-x-[5px] w-fit bg-white border border-grey  px-[11px] py-1 rounded-lg  hover:bg-white dark:hover:bg-white cursor-pointer`}
            >
              <p className="text-small-medium ">More</p>
              <CarretDown className="w-[8px] h-[4px] " />
            </Button>
          )}
        </Popover.Trigger>
        <Popover.Content className="bg-white">
          {({ setOpen }) => (
            <div className="w-[300px] flex flex-col gap-y-3">
              <div className="flex flex-col gap-y-2">
                <h6 className="text-large-medium">Other Countries</h6>
                <SearchableDropDown
                  data={
                    countryData.slice(8, -1) as CountryPayload[] & ICategory[]
                  }
                  handleSelection={(e) => {
                    setcurractivecountry({
                      countryid: e.country_id,
                      name: e.name,
                    });
                    setOpen(false);
                  }}
                />
              </div>
            </div>
          )}
        </Popover.Content>
      </Popover>
    </div>
  );
};

export default CountrySelectorNav;
