import { ReactNode } from "react";

const ContainerWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <section className="max-w-7xl mx-auto px-8 sm:px-4">{children}</section>
  );
};

export default ContainerWrapper;
