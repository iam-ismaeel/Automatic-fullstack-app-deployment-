import BaskervilleHeading from "@/components/common/BaskervilleHeading";

const YourAzanyJourney = () => {
  const steps = [
    {
      desc: "Create Your Store – Set up instantly with minimal steps.",
      title: "Create",
    },
    {
      desc: "List Products– Upload items quickly via bulk tools.",
      title: "List",
    },
    {
      desc: "Global Payments – Multi-currency setup in seconds.",
      title: "Order",
    },
    {
      desc: "Sell Worldwide – Automated cross-border logistics.",
      title: "Shipment",
    },
    {
      desc: "24/7 Support– Live chat, email, WhatsApp assistance anytime.",
      title: "Payment",
    },
  ];

  return (
    <div className="py-16">
      <section className="max-w-7xl mx-auto px-8 sm:px-4">
        <div className="w-[450px] smd:w-full mx-auto text-center mb-12">
          <BaskervilleHeading text="Your Journey on Azany" />
          <p className="text-[#252525] font-medium">
            Starting your online business with Azany is easy.
          </p>
        </div>
        <div className="lg:flex justify-center mx-auto w-fit flex-col grid grid-cols-5 mt-8 items-start gap-8 steps relative">
          {steps.map((step, i) => (
            <div
              className="flex-col lg:flex-row lg:mb-8 mb-0 flex justify-center items-center  lg:gap-6 gap-12 relative"
              key={i}
            >
              {i !== 0 && (
                <div className="absolute top-6 lg:-top-[60px] lg:left-[24px] lg:translate-x-0 lg:w-[2px] lg:h-full -left-1/2 translate-x-1/2 w-1/2 h-[2px] bg-[#DB44444D]"></div>
              )}
              <div className="font-public-sans text-white font-semibold rounded-full min-w-[48px] size-[48px] bg-[#DB4444] flex justify-center items-center relative z-10">
                {i + 1}
              </div>
              <div className="text-center lg:text-left">
                <p className="text-[#061C3D] mb-2 text-[20px] font-medium">
                  {step.title}
                </p>
                <p className="text-[#42526B]">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default YourAzanyJourney;
