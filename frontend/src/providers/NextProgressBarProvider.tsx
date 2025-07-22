"use client";

import React from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const NextProgressBarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <React.Fragment>
      {children}
      <ProgressBar
        height="3px"
        color="#DB4444"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </React.Fragment>
  );
};

export default React.memo(NextProgressBarProvider);
