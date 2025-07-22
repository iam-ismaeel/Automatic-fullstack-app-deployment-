"use client";
import React, { Fragment } from "react";

import SavedForLater from "./SavedForLater";
import CartSection from "./CartSection";

function CartPageComponent() {
  return (
    <Fragment>
      <CartSection />
      <SavedForLater />
    </Fragment>
  );
}

export default CartPageComponent;
