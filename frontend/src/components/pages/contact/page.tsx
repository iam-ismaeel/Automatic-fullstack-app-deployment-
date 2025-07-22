import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button, Checkbox, Input, Textarea } from "rizzui";

const Contact = () => {
  const localActive = useLocale();
  return (
    <div className="bg-white">
      <section className="flex flex-row lg:flex-col justify-center items-start lg:items-center gap-20 lg:gap-7 px-[60px] lg:px-5 pt-[220px] md:pt-[250px] mb-20 lg:mb-14">
        <div className="max-w-[646px]">
          <h1 className="font-semibold text-[#393939] text-[40px] mb-3">
            Contact Us
          </h1>
          <p className="font-light text-[17px] text-[#7A7878] leading-7 mb-5">
            Have a word for us?
          </p>
          <p className="font-light text-[17px] text-[#7A7878] leading-7 mb-5">
            We’d love to hear from you too. Drop us a line or two below and we’d
            get in touch as soon as possible.
          </p>
        </div>
        <Image
          src={"/img/contact-image.png"}
          alt="about"
          className="w-full max-w-[628px] lg:max-w-[500px] md:max-w-full h-[428px] lg:h-auto object-cover"
          width={628}
          height={428}
        />
      </section>

      <section className="flex flex-col justify-center items-center gap-10 md:gap-5 slg:gap-20 pt-10 pb-[72px] sxl:px-5 px-5">
        <div className="flex flex-col gap-6 text-center">
          <h1 className="text-[#470505] font-semibold">Contact Us</h1>
          <h2 className="text-4xl text-[#101828] font-semibold">
            Get in touch
          </h2>
          <p className="text-xl text-[#667085]">
            We’d love to hear from you. Please fill out this form.
          </p>
        </div>

        <form
          action=""
          // onSubmit={handleSubmit}
          className="w-full max-w-[636px] flex flex-col gap-6"
        >
          <div className="flex flex-row smd:flex-col gap-6 smd:gap-[15px]">
            <Input
              type="text"
              name="first_name"
              value=""
              // onChange={handleChange}
              placeholder=""
              label="First name"
              inputClassName="w-full border border-[#39393933] px-[25px] py-[13px] flex-1"
              className="w-full"
            />
            <Input
              type="text"
              name="last_name"
              value=""
              label="Last name"
              // onChange={handleChange}
              placeholder=""
              inputClassName="border border-[#39393933] px-[25px] py-[13px] flex-1"
              className="w-full"
            />
          </div>
          <Input
            type="email"
            name="email"
            value=""
            // onChange={handleChange}
            label="Email"
            inputClassName="border border-[#39393933] px-[25px] py-[13px] flex-1"
          />
          <Input
            type="text"
            name="subject"
            value=""
            // onChange={handleChange}
            label="Phone"
            inputClassName="border border-[#39393933] px-[25px] py-[13px] w-full"
          />
          <Textarea
            name="message"
            value=""
            label="Message"
            // onChange={handleChange}
            textareaClassName="border border-[#39393933] px-[25px] py-[13px] w-full h-[118px]"
          />
          <div className="flex items-center gap-1">
            <Checkbox
              label="You agree to our friendly"
              iconClassName="text-white"
            />
            <span>
              <Link
                href={`/${localActive}/privacy-policy`}
                className="underline"
              >
                privacy policy.
              </Link>
            </span>
          </div>
          <Button
            type="submit"
            className="text-white p-[14px] text-[15px] w-full h-fit"
            // disabled={isSubmitting}
          >
            Send Message
          </Button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
