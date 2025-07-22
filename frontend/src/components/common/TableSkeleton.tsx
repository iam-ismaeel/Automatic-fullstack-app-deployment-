import React from "react";
import Flex from "./Flex";
import Skeleton from "react-loading-skeleton";

const TableSkeleton = () => {
  return (
    <Flex className="flex-col gap-5 mt-4 w-full">
      <Skeleton className="h-[48px]" containerClassName="w-full" />
      <Flex className="!gap-1 flex-col w-full h-full">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="h-[56px]" containerClassName="w-full" />
        ))}
      </Flex>
      <Skeleton className="h-[48px]" containerClassName="w-full" />
    </Flex>
  );
};

export default TableSkeleton;
