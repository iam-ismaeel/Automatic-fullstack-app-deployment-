import BaskervilleHeading from "@/components/common/BaskervilleHeading";
import ContainerWrapper from "@/components/common/container-wrapper";
import {
  DoodleIconGreen,
  DoodleIconPurple,
  DoodleIconRed,
} from "@/components/svg/seller";
import Image from "next/image";

const FeaturesYouLove = () => {
  const lists = [
    {
      label: "User friendly personalized homepage",
      desc: "The fastest-growing and preferred acquisition channel for over half our multichannel sellers.",
      color: "bg-[#EEF9F2]",
      icon: <DoodleIconGreen className="w-full" />,
    },
    {
      label: "Easy product listing",
      desc: "The fastest-growing and preferred acquisition channel for over half our multichannel sellers.",
      color: "bg-[#FFF4DB]",
      icon: <DoodleIconRed className="w-full" />,
    },
    {
      label: "Selection insights",
      desc: "The fastest-growing and preferred acquisition channel for over half our multichannel sellers.",
      color: "bg-[#E4E8FF]",
      icon: <DoodleIconPurple className="w-full" />,
    },
  ];
  return (
    <div className="py-24">
      <ContainerWrapper>
        <div className="w-[450px] smd:w-full mx-auto text-center mb-12">
          <BaskervilleHeading
            text={
              <>
                Some amazing features{" "}
                <span className="text-[#DB4444]">you&apos;ll love</span>
              </>
            }
          />
          <p className="text-[#252525] font-medium">
            Take a sneak peek 👀 into our platform
          </p>
        </div>

        <div className="grid">
          {lists.map((l, i) => (
            <div
              className={`md:flex md:gap-4 md:flex-col-reverse items-center grid grid-cols-2 gap-12 md:px-8 px-12 md:py-12 py-24 
                ${l.color}`}
              key={i}
            >
              {/* {<l.icon className="size-[50px]" />} */}
              <div>
                <BaskervilleHeading text={l.label} />

                <p className="text-[#42526B] text-[20px] font-public-sans">
                  {l.desc}
                </p>
              </div>
              <div className="flex flex-col gap-4 justify-center">
                <Image
                  width={600}
                  height={600}
                  alt="desktop-screenshot"
                  src="/img/pc-screenshot.png"
                  className="w-full"
                />
                <div>{l.icon}</div>
              </div>
            </div>
          ))}
        </div>
      </ContainerWrapper>
    </div>
  );
};

export default FeaturesYouLove;
