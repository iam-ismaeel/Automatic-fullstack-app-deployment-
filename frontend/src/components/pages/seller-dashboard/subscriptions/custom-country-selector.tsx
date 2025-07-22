import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Check, Globe } from "lucide-react";
import { cn, Loader } from "rizzui";
import { ICountry } from "@/interfaces/seller";
import Image from "next/image";

interface CountrySelectorProps {
  selectedCountry: ICountry | undefined;
  countries: ICountry[];
  onSelectCountry: (country: ICountry) => void;
  isLoading?: boolean;
}

const CustomCountrySelector: React.FC<CountrySelectorProps> = ({
  selectedCountry,
  countries,
  onSelectCountry,
  isLoading = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) {
    return (
      <button
        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        disabled
      >
        <Loader variant="spinner" className="text-primary" size="sm" />
        Loading countries...
      </button>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-all shadow-subtle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedCountry ? (
          <>
            <Image
              src={selectedCountry.flag}
              alt={`${selectedCountry.name} flag`}
              className="w-5 h-5 rounded-sm object-cover"
              width={20}
              height={20}
            />
            <span className="font-medium text-subscription-dark-gray">
              {selectedCountry.name}
            </span>
          </>
        ) : (
          <>
            <Globe className="h-5 w-5 text-subscription-blue" />
            <span className="font-medium text-subscription-dark-gray">
              Select Country
            </span>
          </>
        )}
        <ChevronDown
          className={cn(
            "h-4 w-4 text-gray-500 transition-transform",
            isOpen && "transform rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-52 origin-top-left rounded-md overflow-hidden bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1 max-h-64 overflow-y-auto">
            {countries.map((country) => (
              <button
                key={country.id}
                className={cn(
                  "flex w-full items-center gap-2 px-3 py-2 text-sm font-medium",
                  selectedCountry?.id === country.id
                    ? "bg-subscription-light-blue text-subscription-blue"
                    : "text-gray-700 hover:bg-gray-50"
                )}
                onClick={() => {
                  onSelectCountry(country);
                  setIsOpen(false);
                }}
              >
                <Image
                  src={country.flag}
                  alt={`${country.name} flag`}
                  className="w-4 h-4 rounded-sm object-cover"
                  width={16}
                  height={16}
                />
                <span className="flex-1 text-left">{country.name}</span>
                {selectedCountry?.id === country.id && (
                  <Check className="h-4 w-4" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomCountrySelector;
