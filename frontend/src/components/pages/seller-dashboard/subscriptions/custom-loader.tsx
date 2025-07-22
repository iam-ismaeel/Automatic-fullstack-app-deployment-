import React from "react";
import { cn, Loader } from "rizzui";

const CustomLoader = ({
  loadingText,
  className,
}: {
  loadingText: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex justify-center items-center min-h-[300px]",
        className
      )}
    >
      <div className="flex flex-col items-center">
        <Loader variant="spinner" size="xl" className="text-primary" />
        <p className="mt-4 text-subscription-gray">{loadingText}...</p>
      </div>
    </div>
  );
};

export default CustomLoader;
