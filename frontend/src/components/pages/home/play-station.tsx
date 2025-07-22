import React from "react";
import Image from "next/image";
import Link from "next/link";

const PlayStation = () => {
  return (
    <div className="flex-1 bg-black rounded-[20px] h-[467px] text-white p-[34px] flex justify-between items-center col-span-2">
      <div className="max-w-[242px] space-y-4">
        <h5 className="text-heading-2-bold">PlayStation 5</h5>
        <p className="text-small-medium">
          Black and White version of the PS5 coming out on sale.
        </p>
        <Link
          href={"/#playstation"}
          className="text-base-medium underline underline-offset-4 inline-block"
        >
          Shop Now
        </Link>
      </div>
      <div className="w-[345px] h-[345px] flex items-center justify-center">
        <Image
          src={"/img/play-station.png"}
          alt="Product"
          width={345}
          height={345}
          className="object-contain max-w-full max-h-full"
          priority
        />
      </div>
    </div>
  );
};

export default PlayStation;
