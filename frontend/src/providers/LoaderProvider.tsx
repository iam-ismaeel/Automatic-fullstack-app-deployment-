"use client";
import Loader from "@/components/common/loader";
import React, { useEffect, useState } from "react";

function LoaderProvider({ children }: React.PropsWithChildren) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return <>{loaded ? children : <Loader />}</>;
}

export default LoaderProvider;
