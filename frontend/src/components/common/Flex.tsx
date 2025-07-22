import * as React from "react";
import { ReactNode } from "react";

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const Flex = ({ children, className, ...props }: FlexProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Flex;
