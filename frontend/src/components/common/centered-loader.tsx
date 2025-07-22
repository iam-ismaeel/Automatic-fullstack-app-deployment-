import React from "react";
import CenteredFlex from "./CenteredFlex";
import { Loader } from "rizzui";

const CenteredLoader = ({ classNames }: { classNames?: string }) => {
  return (
    <CenteredFlex className={`w-full h-[300px] ${classNames}`}>
      <Loader variant="bars" className="text-main" size="xl" />
    </CenteredFlex>
  );
};

export default CenteredLoader;
