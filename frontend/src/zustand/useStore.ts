import { useState, useEffect } from "react";

const useStore = <T, F>(
    store: (callback: (state: T) => unknown) => unknown,
    callback: (state: T) => F
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      setData((result));
    }
  }, [result, isInitialRender]);

  return data;
};

export default useStore;
