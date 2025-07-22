import React from "react";
import { BBB, Tape, House } from "@/components/svg";
import Link from "next/link";

const WhoWeAre = () => {
  const data = [
    {
      id: 1,
      icon: <BBB className="w-[72px] h-[72px] rounded-[20px]" />,
      path: "https://www.bbb.org/us/ga/fayetteville/profile/online-shopping/azany-0443-91827400/#sealclick",
      title: "BBB Accredited",
      desc: "This signifies our commitment to maintaining high standards of integrity and customer satisfaction",
    },
    // {
    //   id: 2,
    //   icon: <Tape className="w-9 h-9" />,
    //   title: "Leadership",
    //   desc: "  Our Leadership Principles are more than inspirational wall hangings.",
    // },
    // {
    //   id: 3,
    //   icon: <House className="w-9 h-9" />,
    //   title: "Leadership",
    //   desc: "  Our Leadership Principles are more than inspirational wall hangings.",
    // },
  ];

  return (
    <div className=" bg-who-we-are bg-center bg-no-repeat w-full h-[430px] lg:h-auto lg:space-y-8 flex justify-between items-center lg:items-start px-[60px] md:px-8 lg:py-10 lg:flex-col ">
      <div className="max-w-[580px] xl:max-w-[450px] lg:max-w-[580px]  text-white space-y-4">
        <h4 className="text-heading-2-medium md:text-heading-3-medium">
          Who We Are
        </h4>
        <div>
          <p className="text-large-regular lg:text-base-regular md:text-small-medium">
            {" "}
            At Azany, we believe that shopping should know no boundaries. We are
            dedicated to breaking down barriers and connecting people from all
            corners of the world through culture, community, and commerce.
          </p>
          <p className="mt-2 text-large-regular lg:text-base-regular md:text-small-medium">
            With our innovative multi-currency card and global reward point
            system, we aim to make international shopping as easy and enjoyable
            as shopping in your own neighborhood.
          </p>
        </div>
        <button className="bg-white text-primary px-3 py-1 rounded">
          See More
        </button>
      </div>
      <div className="flex-nowrap">
        <div className="flex flex-col gap-y-6 text-white">
          {data.map((item) => {
            const Icon = item.icon;

            return (
              <a
                href={item.path}
                target="_blank"
                className="flex items-center gap-x-9 cursor-pointer"
                key={item.id}
              >
                <div className="w-[72px] h-[72px] bg-[#FFF3E8] rounded-[20px] flex justify-center items-center flex-nowrap flex-shrink-0">
                  {Icon}
                </div>
                <div className="flex flex-col gap-y-1 max-w-[332px]">
                  <h6 className="text-heading-4-medium md:text-extra-large-medium">
                    {item.title}
                  </h6>
                  <p className="text-base-regular md:text-small-medium">
                    {item.desc}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
