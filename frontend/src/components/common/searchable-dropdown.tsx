import React, { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { ChevronDown, Check } from "lucide-react";
import { Input } from "rizzui";
import Image from "next/image";

interface SearchableDropDownProps {
  data: any[];
  handleSelection: (e: any) => void;
  defaultVal?: string;
  placeholder?: string;
  loading?: boolean;
  className?: string;
  clearSelection?: boolean;
  disabled?: boolean;
  resetKey?: string;
}

export default function SearchableDropDown({
  data,
  handleSelection,
  defaultVal,
  placeholder,
  loading = false,
  className,
  clearSelection = false,
  disabled = false,
  resetKey,
}: SearchableDropDownProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<any | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (defaultVal) {
      const defaultOption = data.find(
        (el: any) => el.id?.toString() === defaultVal
      );
      if (defaultOption) {
        setSelected(defaultOption);
      }
    } else if (!clearSelection && data.length > 0) {
      setSelected(data[0]);
    } else {
      setSelected(null);
    }
  }, [defaultVal, data, clearSelection, resetKey]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !(inputRef.current && inputRef.current.contains(event.target as Node))
      ) {
        setIsOpen(false);
        setQuery("");
        setIsSearching(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openDropdown = () => {
    if (!disabled && !isOpen) {
      setIsOpen(true);
    }
  };

  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openDropdown();
  };

  const handleSelect = (value: any) => {
    setSelected(value);
    handleSelection(value);
    setIsOpen(false);
    setIsSearching(false);
    setQuery("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsSearching(true);
    if (!isOpen) setIsOpen(true);
  };

  const filteredData =
    query === ""
      ? data
      : data.filter((el: any) =>
          el.name?.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Input Box */}
      <div
        className={clsx(
          "w-full rounded-lg border border-[#aac9fb] bg-transparent py-2 pr-8 pl-3 text-sm text-black",
          "focus:outline-none focus:ring-transparent focus:ring-offset-transparent data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 ",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        onClick={openDropdown}
      >
        <Input
          ref={inputRef}
          type="text"
          value={isSearching ? query : selected?.name || ""}
          onChange={handleInputChange}
          onClick={handleInputClick}
          placeholder={placeholder || "Search for options..."}
          inputClassName="w-full h-fit bg-transparent text-sm/6 outline-none p-0 ring-0 border-0 [&.is-focus]:ring-0 [&.is-focus]:border-none"
          disabled={disabled}
        />
        <div className="absolute inset-y-0 right-0 flex items-center px-2.5 pointer-events-none">
          {loading ? (
            <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div
          className={clsx(
            "absolute z-50 mt-1 w-full rounded-lg border border-black/10 bg-white p-1 shadow-lg",
            "max-h-60 overflow-auto"
          )}
        >
          {filteredData.length > 0 ? (
            filteredData.map((el) => (
              <div
                key={el.id}
                onClick={() => handleSelect(el)}
                className={clsx(
                  "flex cursor-pointer items-center gap-2 rounded-md py-1.5 px-3",
                  "hover:bg-gray-200 transition-colors duration-150",
                  selected?.id === el.id && "bg-gray-200/70"
                )}
              >
                {el?.flag ? (
                  <Image src={el.flag} width={20} height={20} alt={el.name} />
                ) : (
                  <Check
                    className={clsx(
                      "size-4 text-primary",
                      selected?.id === el.id ? "visible" : "invisible"
                    )}
                    strokeWidth={2.5}
                  />
                )}
                <div className="text-sm text-black">{el.name}</div>
              </div>
            ))
          ) : (
            <div className="py-2 px-3 text-sm text-gray-500">
              No options found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
