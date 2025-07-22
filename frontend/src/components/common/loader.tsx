import Image from "next/image";
import React, { Fragment } from "react";

function Loader({ transparent = false }) {
  return (
    <Fragment>
      <div
        className={`fixed top-0 left-0 right-0 z-[999] h-screen w-screen ${
          transparent ? "bg-white bg-opacity-50" : "bg-white"
        } flex items-center justify-center`}
      >
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-transparent flex items-center justify-center">
          <div className="relative">
            <Image
              src="/img/logo-small.png"
              alt="logo"
              width={100}
              height={100}
              priority
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Loader;
