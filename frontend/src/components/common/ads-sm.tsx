import React from "react";
import Image from "next/image";

const AdsSm = () => {
  return (
    <div className="col-span-2 2xl:hidden">
      <div
        className={` w-full h-full flex items-center justify-center relative rounded-[20px] `}
      >
        <Image
          src={"/img/ads-sm-1.png"}
          alt="Product"
          width={800}
          height={545}
          className="object-contain max-w-full max-h-full border rounded-[20px]"
          priority
        />
      </div>
    </div>
  );
};

export default AdsSm;
