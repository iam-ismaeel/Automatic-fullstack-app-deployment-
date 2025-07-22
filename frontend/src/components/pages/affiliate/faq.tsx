"use client";
import { Accordion, Avatar } from "rizzui";
import { LinkIcon, SunIcon, MoonIcon } from "@icons";

const data = [
  {
    title: "How do I join the AZANY affiliate program?",
    icon: <LinkIcon />,
    defaultOpen: true,
    content: `
      Joining the AZANY affiliate program is easy! Simply sign up on our affiliate page, complete your profile, and you'll receive a unique referral link. Start sharing this link to earn commissions on every sale made through your referrals.
    `,
  },
  {
    title: "How much can I earn as an AZANY affiliate?",
    icon: <SunIcon />,
    content: `
      Your earning potential is unlimited! AZANY offers competitive commission rates on all sales generated through your referral link. The more you promote and refer, the more you can earn. Some of our top affiliates earn thousands each month!
    `,
  },
  {
    title: "How and when do I get paid?",
    icon: <MoonIcon />,
    content: `
      AZANY ensures timely payments. Commissions are paid out monthly via your preferred payment method once you reach the minimum payout threshold. You'll always have full visibility of your earnings through our user-friendly dashboard.
    `,
  },
  {
    title: "What marketing tools and support does AZANY provide?",
    icon: <LinkIcon />,
    content: `
      We provide everything you need to succeed! AZANY offers a variety of marketing tools, including banners, social media graphics, and email templates. Plus, our dedicated support team is always available to assist you with any questions or strategies to maximize your earnings.
    `,
  },
];

const Faq = () => {
  return (
    <div className="bg-[#fcf6f6] py-[70px] px-[130px] 2xl:px-[70px] xl:px-[40px] lg:px-0 smd:px-4 flex flex-col items-center justify-center gap-y-[56px]">
      <div className="flex flex-col items-center gap-y-5">
        <label className="text-base-bold text-main bg-secondary border-secondary-light px-5 py-2 rounded-[20px] shadow-md">
          FAQ Section
        </label>
        <h6 className="text-h4 font-public-sans font-extrabold smd:text-[32px] smd:text-center">
          Frequently asked Questions & Answers
        </h6>
      </div>
      <div className="rounded-3xl border max-w-[1244px] w-full ">
        {data.map((item) => (
          <Accordion
            key={item.title}
            defaultOpen={item.defaultOpen}
            className="mx-8 smd:mx-4 my-2 border-b last-of-type:border-b-0"
          >
            <Accordion.Header>
              {/* @ts-ignore */}
              {({ open }: { open: boolean }) => (
                <div className="flex w-full cursor-pointer items-center justify-between py-5 text-left rtl:text-right">
                  <div className="flex items-center gap-4">
                    <div className="grid gap-1">
                      <h3
                        className={`text-lg font-semibold ${
                          open && "text-main"
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <div
                    className={`h-5 w-5 transform transition-transform duration-300 ${
                      open && "-rotate-90"
                    }`}
                  >
                    {item.icon}
                  </div>
                </div>
              )}
            </Accordion.Header>
            <Accordion.Body className="mb-7">{item.content}</Accordion.Body>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default Faq;
