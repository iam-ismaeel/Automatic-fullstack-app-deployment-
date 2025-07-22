import React from "react";
import Intro from "./intro";
import CountrySelectorNav from "@/components/common/Country-selector-Nav";
import StepByStep from "./StepByStep";
import WhatWeOffer from "./WhatWeOffer";
import Feedback from "./feedback";
import Faq from "./faq";

const Affiliate = () => {
  return (
    <div>
      <Intro />
      <StepByStep />
      <WhatWeOffer />
      <Feedback />
      <Faq />
    </div>
  );
};

export default Affiliate;
