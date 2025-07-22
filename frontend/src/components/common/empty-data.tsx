import Image from "next/image";
// import EmptyIcon from "/empty.svg";
import clsx from "clsx";

const EmptyData = ({
  message,
  description,
  className,
}: {
  message?: string;
  description?: string;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "flex mt-12 items-center justify-center flex-col gap-2",
        className
      )}
    >
      <Image
        width={180}
        height={200}
        className="object-contain"
        src={"/empty.svg"}
        alt="empty-data-icon"
      />

      <p className="text-center font-medium text-[16px]">
        {message ?? "No available data!"}
      </p>
      <p className="text-center text-[13px] mt-2">{description}</p>
    </div>
  );
};

export default EmptyData;
