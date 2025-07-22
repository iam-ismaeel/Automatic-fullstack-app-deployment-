import Image from "next/image";
import React from "react";
import { Button } from "rizzui";

const AboutUs = () => {
  return (
    <div className="bg-white">
      <section className="flex flex-row lg:flex-col justify-center items-center gap-20 lg:gap-10 px-[60px] lg:px-5 pt-[220px] md:pt-[250px] mb-20 lg:mb-14">
        <div className="max-w-[646px]">
          <h1 className="font-semibold text-[#393939] text-[40px] mb-3">
            About Azany Revolutionizing Global Commerce
          </h1>
          <p className="font-light text-[17px] text-[#393939] leading-7 mb-5">
            At Azany, we’re not just building an e-commerce platform—we’re
            pioneering a borderless future for trade. As a trailblazer in global
            digital commerce, Azany empowers businesses, entrepreneurs, and
            consumers to connect, transact, and grow without limits. Our
            innovative ecosystem combines cutting-edge technology, financial
            inclusivity, and industry-specific solutions to redefine how the
            world buys, sells, and thrives.
          </p>
          {/* <h3 className="font-semibold text-[#393939] text-[20px] mb-3">
            Our Vision
          </h3>
          <p className="font-light text-[17px] text-[#393939] leading-7 mb-5">
            At Azany, we believe that exploring the Caribbean should be
            effortless and enjoyable. Our innovative reloadable debit card
            allows you to hold up to five different currencies in a single
            account, making transactions easier than ever. Whether you&apos;re
            shopping at local markets, dining at exquisite restaurants, or
            enjoying various attractions, Azany empowers you to manage your
            spending with convenience and flexibility.
          </p> */}
        </div>
        <Image
          src={"/img/about-us-image.png"}
          alt="about"
          className="max-w-[628px] lg:max-w-[500px] md:max-w-full h-[428px] lg:h-auto object-cover"
          width={628}
          height={4280}
        />
      </section>

      <section className="flex flex-row lg:flex-col justify-center items-center md:gap-5 slg:gap-20 md:mt-24 pb-[72px] sxl:px-5 slg:items-start gap-[75px] px-5">
        <Image
          src={"/img/azany-image.png"}
          alt="miv"
          className="max-w-[478px] lg:max-w-[350px] md:max-w-full h-[150px] lg:h-auto object-cover"
          width={478}
          height={150}
        />
        <div className="max-w-[636px] text-[#393939]">
          <h2 className="font-semibold text-[30px] mb-3">
            Why Azany Stands Apart
          </h2>
          <div>
            <h3 className="font-semibold text-xl mb-3">
              AzanyPay: One Card, Five Currencies, Infinite Possibilities
            </h3>
            <p className="font-light text-[17px] text-azany_secondary leading-7 mb-5">
              The AzanyPay Multi-Currency Card eliminates cross-border payment
              barriers by holding USD, EUR, GBP, CNY, and your local currency in
              a single account. Shop globally with zero conversion fees, pay
              suppliers in their preferred currency, or receive earnings
              instantly in your local currency as a vendor—no hidden costs, no
              delays.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-3">
              Global Reach, Local Impact
            </h3>
            <p className="font-light text-[17px] text-azany_secondary leading-7 mb-5">
              <b className="font-semibold">For Vendors.</b> Sell to
              international markets and get paid directly in your local
              currency, avoiding exchange rate risks and banking bottlenecks
            </p>
            <p className="font-light text-[17px] text-azany_secondary leading-7 mb-5">
              <b className="font-semibold">For Buyers.</b> Access millions of
              products worldwide at localized prices, with seamless transactions
              powered by AzanyPay.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-3">
              Dual Powerhouse: B2B & Direct-to-Consumer (DTC)
            </h3>
            <p className="font-light text-[17px] text-azany_secondary leading-7 mb-5">
              <b className="font-semibold">B2B Marketplace,</b> Connect with
              suppliers, manufacturers, and wholesalers across 150+ countries.
              Negotiate bulk deals, streamline logistics, and leverage AI-driven
              market insights.
            </p>
            <p className="font-light text-[17px] text-azany_secondary leading-7 mb-5">
              <b className="font-semibold">DTC Platform,</b> Brands and artisans
              sell directly to global consumers with integrated marketing tools,
              fulfillment support, and real-time analytics
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-3">
              The World’s Largest Agriculture B2B Ecosystem
            </h3>
            <p className="font-light text-[17px] text-azany_secondary leading-7 mb-5">
              <b className="font-semibold"> Azany’s Agriculture Marketplace</b>{" "}
              is the largest dedicated hub for agricultural produce.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
