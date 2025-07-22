import { ReactNode } from "react";

const SpaceBetween = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string | undefined;
}) => {
  return (
    <div
      className={`flex w-full items-center justify-between gap-2 ${className}`}
    >
      {children}
    </div>
  );
};

export default SpaceBetween;
