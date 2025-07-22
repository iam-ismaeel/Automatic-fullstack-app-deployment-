import { ReactElement } from "react";

const BaskervilleHeading = ({
  text,
  className,
}: {
  text: string | ReactElement;
  className?: string;
}) => {
  return (
    <p className={`font-libre-baskerville font-bold text-[28px]  ${className}`}>
      {text}
    </p>
  );
};

export default BaskervilleHeading;
