import { useState, useEffect } from "react";

interface Breakpoints {
  isMd: boolean;
  isLg: boolean;
}
const useBreakpoints = (): Breakpoints => {
  const [breakpoints, setBreakpoints] = useState<Breakpoints>({
    isMd: false,
    isLg: false,
  });

  useEffect(() => {
    const checkBreakpoints = () => {
      const mdMatch = window.matchMedia("(max-width: 48em)");
      const lgMatch = window.matchMedia("(max-width: 64em)");

      setBreakpoints({
        isMd: mdMatch.matches,
        isLg: lgMatch.matches,
      });
    };

    checkBreakpoints();

    window.addEventListener("resize", checkBreakpoints);

    return () => window.removeEventListener("resize", checkBreakpoints);
  }, []);

  return breakpoints;
};

export default useBreakpoints;
