import Image from "next/image";
import Link from "next/link";

const Intro = () => {
  return (
    <div className="bg-[#FBF3EA] md:pt-[220px] pt-40">
      <section className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:flex lg:flex-col-reverse gap-6 items-center px-8 sm:px-4">
          <div className="flex flex-col gap-4 md:pb-16 py-8">
            <p className="font-libre-baskerville font-bold text-[36px] text-[#252525]">
              Become an Azany Seller and sell to our customers
            </p>
            <p className="text-[#252525] text-[20px] font-public-sans font-medium">
              Sell globally on Azany: fastest-growing platform with
              multi-currency ease and direct reach to international shoppers.
            </p>
            <div className="relative w-fit flex flex-wrap gap-y-4 items-center gap-x-7 smd:gap-x-4">
              <Link
                href={`seller-signup`}
                className="py-[18px] px-[33px] sm:px-10 bg-[#E02014] text-base-medium text-white rounded-[20px]"
              >
                Create Account
              </Link>
              <Link
                href={`seller-login`}
                className="py-[18px] px-[33px] sm:px-10 border border-main text-base-medium text-main rounded-[20px]"
              >
                Sign in
              </Link>
              <Image
                src={"/img/arrow-left-grafitti.png"}
                width={100}
                height={100}
                alt="intro"
                className="right-0 bottom-0 smd:translate-x-0 smd:-bottom-10 translate-x-[120%] absolute"
              />
            </div>
          </div>
          <div>
            <Image
              src={"/img/seller-header.png"}
              width={900}
              height={903}
              alt="intro"
              className="md:max-w-full lg:max-w-[500px]"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Intro;
