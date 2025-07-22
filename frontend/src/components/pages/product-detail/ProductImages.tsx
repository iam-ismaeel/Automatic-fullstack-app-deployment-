import Image from "next/image";
import React, { useState } from "react";

function ProductImages({ images }: { images: string[] }) {
  const [activeImage, setActiveImage] = useState(0);
  return (
    <div className="flex flex-col gap-y-4 xl:col-span-2 md:col-span-1">
      <div className="max-w-[380px] mx-auto w-full p-5 h-[400px]  border border-[#DEE2E7] rounded-md flex justify-center items-center">
        <Image
          src={images[activeImage]}
          alt="Current Product"
          width={345}
          height={345}
          className="object-contain max-w-full max-h-full"
          priority
        />
      </div>
      <div className="max-w-[380px] mx-auto w-full  flex gap-x-[8px]">
        {images.map((item, index) => (
          <div
            key={index}
            className="h-[56px] w-[56px] p-1 border border-[#DEE2E7] cursor-pointer"
            onClick={() => setActiveImage(index)}
          >
            <Image
              src={item}
              alt="Product"
              height={48}
              width={48}
              className="object-contain max-w-full max-h-full mx-auto"
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductImages;
