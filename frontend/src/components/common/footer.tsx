import React from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  Info,
  ShoppingBag,
  Money,
  SocialMedia,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "@icons";

type FooterItem = {
  name: string;
  link: string;
  img?: JSX.Element; // img is optional
};

type FooterCategory = {
  label: string;
  icon: JSX.Element;
  items: FooterItem[];
};

export default function Footer() {
  const t = useTranslations("Footer");
  const localActive = useLocale();

  const footerData: FooterCategory[] = [
    {
      label: "Quick Links",
      icon: <Info className="w-7 h-7" />,
      items: [
        {
          name: "About us",
          link: `/${localActive}/about-us`,
        },
        // {
        //   name: "Career",
        //   link: "/#Career",
        // },
        // {
        //   name: "Help center",
        //   link: "/#Help-center",
        // },
        {
          name: "Contact",
          link: `/${localActive}/contact`,
        },
      ],
    },
    {
      label: "Payment",
      icon: <Card className="w-7 h-7" />,
      items: [
        {
          name: "AzanyPay Card",
          link: "https://www.azanypay.com/",
        },
        {
          name: "AVC Card",
          link: "https://www.africavisioncard.com/",
        },
        {
          name: "MIV Card",
          link: "https://www.myislandvisa.com/",
        },
      ],
    },
    {
      label: "Make money with us",
      icon: <Money className="w-7 h-7" />,
      items: [
        {
          name: "Sell on Azany",
          link: `/${localActive}/seller`,
        },
        {
          name: "Become an Affiliate",
          link: `/${localActive}/affiliate`,
        },
      ],
    },
    // {
    //   label: "Products",
    //   icon: <ShoppingBag className="w-7 h-7" />,
    //   items: [
    //     {
    //       name: "Azany Live",
    //       link: "/#",
    //     },
    //     {
    //       name: "Multi-currency",
    //       link: "/#Multi-currency",
    //     },
    //     {
    //       name: "Reward Glo",
    //       link: "/#Reward-Glo",
    //     },
    //   ],
    // },
    {
      label: "Connect with us",
      icon: <SocialMedia className="w-7 h-7 -ml-3" />,
      items: [
        {
          name: "Twitter(X)",
          link: " https://x.com/shopazany",
          img: <Twitter className="w-6 h-6" />,
        },
        {
          name: "LinkedIn",
          link: "https://www.linkedin.com/company/shopazany/",
          img: <Linkedin className="w-6 h-6" />,
        },
        {
          name: "Facebook",
          link: "https://www.facebook.com/shopazany",
          img: <Facebook className="w-6 h-6" />,
        },
        {
          name: "Instagram",
          link: "https://www.instagram.com/shopazany",
          img: <Instagram className="w-6 h-6" />,
        },
      ],
    },
  ];

  return (
    <footer>
      <div className="px-[60px] md:px-8 py-[40px] bg-[#270909] w-full flex md:flex-col md:items-stretch md:gap-y-8 items-start justify-between gap-x-[64px]">
        <div className="max-w-[320px] md:max-w-full space-y-4 md:space-y-0 text-white md:grid md:grid-cols-2 sm:grid-cols-1 md:items-start md:gap-5">
          <div className="space-y-3 ">
            <div className="w-[222px] md:w-[180px] h-[66px] md:h-[56px]">
              <Image
                src={"/img/footer-logo.png"}
                width={222}
                height={66}
                alt="Azany"
                className="object-contain max-w-full max-h-full"
                priority
              />
            </div>

            <p className="text-base-regular text-white">
              Your Global Shopping Playground
            </p>
          </div>

          <div className="space-y-4  ">
            <p className="">
              320 W Lanier Ave Suite 200, Fayetteville, GA 30214
            </p>
            <p>support@shopazany.com</p>
            <p>+1 (800) 750-7442</p>
            <p>+1 (470) 255-0365</p>
          </div>
        </div>
        <div className=" grid grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-x-10 gap-y-8">
          {footerData.map((item, index) => {
            const Icon = item.icon;
            return (
              <div className="space-y-4" key={index}>
                <div className="flex items-center gap-x-2">
                  {Icon}
                  <h6 className="text-[#cad2e2] text-base-bold relative ">
                    {item.label}
                  </h6>
                </div>
                <ul className="text-white space-y-3">
                  {item.items.map((el, index) => {
                    return (
                      <li key={index}>
                        <a
                          href={el.link}
                          target="_blank"
                          className="flex  items-center gap-x-2 hover:text-primary-light duration-300 ease-in-out"
                        >
                          {el.img}
                          {el.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-[#000] flex justify-between items-center md:flex-col  md:items-stretch md:gap-y-5 px-[60px] md:px-8 py-[20px]">
        <p className="text-[#cad2e2] text-base-regular md:text-small-regular">
          © Copyright Azany 2023. All right reserved
        </p>
        <div className=" grid grid-cols-4 md:grid-cols-2 xsm:grid-cols-1 md:gap-y-4 gap-x-5 text-[#cad2e2] text-base-regular md:text-small-regular">
          <Link href={`/${localActive}/return-policy`} target="_blank">
            Return Policy
          </Link>
          <Link href={`/${localActive}/support-policy`} target="_blank">
            Support Policy
          </Link>
          <Link href={`/${localActive}/privacy-policy`} target="_blank">
            Privacy use
          </Link>
          <Link href={`/${localActive}/terms-and-conditions`} target="_blank">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}

// <div className="my-10 text-center">
//   <p>{t("copyright")}</p>
// </div>
