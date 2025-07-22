import { ReactNode } from "react";

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const CenteredFlex = ({ children, className, ...props }: FlexProps) => {
  return (
    <div className={`flex items-center justify-center ${className}`} {...props}>
      {children}
    </div>
  );
};

export default CenteredFlex;
