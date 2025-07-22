"use client";

import { useRef } from "react";

import { Input } from "rizzui";
import { SearchIcon } from "../svg";
import { XIcon } from "react-share";
import CenteredFlex from "./CenteredFlex";

const SearchBar = ({
  placeholder = "Search",
  inputClassnames,
  queryKey = "search",
}: {
  placeholder?: string;
  inputClassnames?: string;
  queryKey?: string;
}) => {
  const ref = useRef<HTMLInputElement | null>(null);
  // const clearSearch = () => {
  //   if (!query[queryKey]) return;
  //   ref.current!.value = "";
  //   push({
  //     href: pathname,
  //   });
  // };
  // const onSearch = (search: string) => {
  //   if (search) {
  //     push({
  //       query: {
  //         ...query,
  //         [queryKey]: search,
  //       },
  //     });
  //   } else {
  //     clearSearch();
  //   }
  // };
  return (
    <div className={`relative w-full ${inputClassnames}`}>
      <input
        ref={ref}
        // onKeyUp={(e) => {
        //   if (e.key === "Enter") {
        //     onSearch(e.currentTarget.value);
        //   }
        // }}
        placeholder={placeholder}
        className="px-12 w-full rounded-lg border-gray-300"
        // value={query[queryKey]}
      />

      <span className="absolute text-gray-300 left-4 top-[50%] translate-y-[-50%]">
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.5 15.6035L10.5001 10.6035M12.1667 6.43685C12.1667 9.65851 9.55499 12.2702 6.33333 12.2702C3.11167 12.2702 0.5 9.65851 0.5 6.43685C0.5 3.21519 3.11167 0.603516 6.33333 0.603516C9.55499 0.603516 12.1667 3.21519 12.1667 6.43685Z"
            stroke="#47586E"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <CenteredFlex
        role="button"
        // aria-disabled={!query[queryKey]}
        // onClick={clearSearch}
        className="absolute size-[1.3rem] hover:cursor-pointer bg-gray-400 rounded-full text-white right-4 top-[50%] translate-y-[-50%]"
      >
        <p className="text-[13px]">X</p>
      </CenteredFlex>
    </div>
  );
};

export default SearchBar;
