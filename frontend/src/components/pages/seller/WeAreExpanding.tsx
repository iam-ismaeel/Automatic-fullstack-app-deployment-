import BaskervilleHeading from "@/components/common/BaskervilleHeading";
import ContainerWrapper from "@/components/common/container-wrapper";
import Image from "next/image";
import Link from "next/link";

const WeAreExpanding = () => {
  return (
    <div className="py-12 bg-[#470505]">
      <ContainerWrapper>
        <div className="grid md:grid-cols-1 grid-cols-2 gap-y-12 gap-x-6 items-center md:px-4 px-8">
          <div className="flex flex-col gap-4">
            <BaskervilleHeading
              className="text-white"
              text="We are expanding"
            />
            <p className="text-white font-medium font-public-sans">
              Be among the first to expand to our emerging marketplaces
            </p>
            <Link href={"#"}>
              <button className="py-[18px] px-[60px] text-white bg-[#DB4444] sm:px-10 rounded-full">
                Learn more
              </button>
            </Link>
          </div>
          <div>
            <Image
              src="/img/map-image.png"
              alt="map-image"
              className="w-full"
              width={600}
              height={600}
            />
          </div>
        </div>
      </ContainerWrapper>
    </div>
  );
};

export default WeAreExpanding;
