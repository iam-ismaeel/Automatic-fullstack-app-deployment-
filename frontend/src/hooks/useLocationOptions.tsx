import userClient from "@/api/client/user";
import { useEffect, useState } from "react";

interface Option {
  name: string;
  value: string;
  id?: number | string;
}
export const useLocationOptions = () => {
  const [statesOptions, setStatesOptions] = useState<Option[]>([]);
  const [countryCode, setCountryCode] = useState<string | undefined>();
  const [countryOptions, setCountryOptions] = useState(
    localStorage.getItem("countries")
      ? JSON.parse(localStorage.getItem("countries")!)
      : []
  );

  useEffect(() => {
    if (!countryOptions.length) {
      userClient.getCountries().then((res) => {
        const countries = res?.data;
        const newCountryList = countries.map((country) => {
          return {
            name: country.name,
            value: country.code,
            id: country.id,
          };
        });
        setCountryOptions(newCountryList);
        localStorage.setItem("countries", JSON.stringify(newCountryList));
      });
    }
    if (countryOptions.length && countryCode) {
      userClient.getStates(countryCode).then((res) => {
        const states = res?.data;
        const newStatesList = states.map((state: any) => {
          return {
            name: state?.name,
            value: state?.code ?? state?.iso2,
            id: state?.id,
          };
        });
        setStatesOptions(newStatesList);
      });
      return;
    }
  }, [countryOptions, countryCode]);

  return {
    setCountryCode,
    countryOptions,
    statesOptions,
    countryCode,
  };
};
