import BaskervilleHeading from "@/components/common/BaskervilleHeading";
import ContainerWrapper from "@/components/common/container-wrapper";
import {
  AdditionalSupportIcon,
  EasyIcon,
  OppurtunityIcon,
} from "@/components/svg/seller";

const WhatSellersLove = () => {
  const lists = [
    {
      label: "Opportunity",
      icon: OppurtunityIcon,
      desc: "Access a vast global marketplace with millions of potential customers across multiple countries. Expand your business reach and tap into new markets effortlessly.",
      color: "bg-[#FFF6D7]",
    },
    {
      label: "Easy for Everyone",
      icon: EasyIcon,
      desc: "Azany offers a user-friendly platform with effortless global reach and simplified multi-currency tools, enabling anyone to sell worldwide easily.",
      color: "bg-[#EEF9F2]",
    },
    {
      label: "Additional Support",
      icon: AdditionalSupportIcon,
      desc: "Azany’s 24/7 support: global live chat (multi-language), email, WhatsApp—always accessible for seamless seller assistance.",
      color: "bg-[#FFE3E3]",
    },
  ];

  return (
    <div className="py-24">
      <ContainerWrapper>
        <div className="w-[450px] smd:w-full mx-auto text-center mb-12">
          <BaskervilleHeading text="Why do sellers love selling on ️Azany?" />
          <p className="text-[#252525] font-medium">
            Sellers thrive on Azany&apos;s global marketplace, leveraging
            multi-currency card for seamless worldwide sales, maximizing reach
            and revenue in today&apos;s economy. Shop anytime, anywhere!
          </p>
        </div>

        <div className="grid md:grid-cols-1 grid-cols-3 gap-4">
          {lists.map((l, i) => (
            <div
              className={`flex flex-col gap-4 px-6 py-10 rounded-[16px]
                ${l.color}`}
              key={i}
            >
              {<l.icon className="size-[50px]" />}
              <p className="text-[#061C3D] font-medium text-[20px]">
                {l.label}
              </p>
              <p className="text-[#42526B]">{l.desc}</p>
            </div>
          ))}
        </div>
      </ContainerWrapper>
    </div>
  );
};

export default WhatSellersLove;
