"use client";
import React, { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Popover, Button } from "rizzui";
import { USAFlag } from "@icons";
import { useLocale } from "next-intl";
import SearchableDropDown from "./searchable-dropdown";
import { countryData } from "@/constants/countries-data";
import { languageData } from "@/constants/language-data";
import { currencyData } from "@/constants/currency-data";
import { useAppStore } from "@/zustand/appStore";
import { useSearchParams, usePathname } from "next/navigation";
import { ILanguage } from "@/interfaces/products";
import { fetchUserLocation } from "@/lib/api";

const LocalSwitcher = () => {
  const localActive = useLocale();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {
    shippingDestination,
    currency,
    handleShippingDestination,
    handleCurrency,
    handleLanguage,
  } = useAppStore();
  const [currentShippingDestination, setCurrentShippingDestination] = useState(
    countryData.find((country) => country.id == shippingDestination)
  );
  const [currentLanguage, setCurrentLanguage] = useState(
    languageData.find((lang) => lang.id === localActive) || languageData[0]
  );
  const [currentCurrency, setCurrentCurrency] = useState(
    currencyData.find((data) => data.id === currency)
  );

  useEffect(() => {
    if (shippingDestination || currency) {
      const initialCountry = countryData.find(
        (country) => country.id === shippingDestination
      );
      const initialCurrency = currencyData.find((data) => data.id === currency);
      setCurrentShippingDestination(initialCountry);
      setCurrentCurrency(initialCurrency);
    }
  }, [shippingDestination, currency]);

  const handleLocaleChange = (value: ILanguage | null) => {
    if (!value || !value.id) return;
    console.log("first");
    const nextLocale = value.id;
    startTransition(() => {
      const currentLocaleRegex = /^\/[a-z]{2}/; // Regex to match the locale part of the path
      const newPath = pathname.replace(currentLocaleRegex, `/${nextLocale}`);
      const currentParams = searchParams.toString();
      const fullPath = currentParams ? `${newPath}?${currentParams}` : newPath;
      router.push(fullPath);
    });
  };

  const handleAppSettings = () => {
    if (currentLanguage) {
      handleLocaleChange(currentLanguage);
    }
  };

  return (
    <div className="flex items-center gap-x-1 ">
      <USAFlag className="w-6 h-6 smd:hidden" />
      <Popover placement="bottom-end">
        <Popover.Trigger>
          <Button variant="outline" className=" border-primary">
            {currentLanguage?.id}/{currentShippingDestination?.id}
          </Button>
        </Popover.Trigger>
        <Popover.Content className="bg-white">
          {({ setOpen }) => (
            <div className="w-[300px] flex flex-col gap-y-3">
              <div className="flex flex-col gap-y-2">
                <h6 className="text-large-medium">Ship To</h6>
                <SearchableDropDown
                  data={countryData}
                  defaultVal={currentShippingDestination?.id}
                  handleSelection={(e: any) => {
                    setCurrentShippingDestination(e);
                  }}
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <h6 className="text-large-medium">Language</h6>
                <SearchableDropDown
                  data={languageData}
                  defaultVal={currentLanguage?.id}
                  handleSelection={(e: any) => setCurrentLanguage(e)}
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <h6 className="text-large-medium">Currency</h6>
                <SearchableDropDown
                  data={currencyData}
                  defaultVal={currentCurrency?.id}
                  handleSelection={(e: any) => setCurrentCurrency(e)}
                />
              </div>
              <Button
                onClick={() => {
                  handleAppSettings();
                  setOpen(false);
                }}
                className="btn border border-main text-white !text-large-medium hover:text-main bg-main hover:!bg-white"
              >
                Save
              </Button>
            </div>
          )}
        </Popover.Content>
      </Popover>
    </div>
  );
};

export default LocalSwitcher;
