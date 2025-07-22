import CenteredFlex from "@/components/common/CenteredFlex";
import { copyToClipboard } from "@/utils";
import { ClipboardIcon } from "lucide-react";

const DetailComponent = ({
  text,
  title,
  Icon,
}: {
  text: string;
  title: string;
  Icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
}) => {
  return (
    <div className="flex justify-between gap-4 items-center">
      <div className="grid grid-cols-[1.2rem,1fr] items-center space-x-3">
        <CenteredFlex className="size-6">
          <Icon className="text-gray-500 h-4 w-4" />
        </CenteredFlex>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-sm break-all font-medium text-[#101928]">{text}</p>
        </div>
      </div>
      {text && (
        <button
          onClick={() => copyToClipboard(text)}
          className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ClipboardIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default DetailComponent;
