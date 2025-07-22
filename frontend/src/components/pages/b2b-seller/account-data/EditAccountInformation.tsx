import Flex from "@/components/common/Flex";
import SpaceBetween from "@/components/common/SpaceBetween";
import { PencilIcon } from "@/components/svg/seller/icons";
import { Button, Input } from "rizzui";

const EditAccountInformation = ({ onCancel }: { onCancel: () => void }) => {
  return (
    <div className="mt-10">
      <SpaceBetween className="flex-wrap mb-8">
        <p className="text-[#0C0C0C] font-bold text-[20px]">
          Edit Account Information
        </p>
        <PencilIcon className="text-[#737B7D]" />
      </SpaceBetween>
      <form>
        <div className="flex flex-col gap-4">
          {[
            { label: "Name", placeholder: "John" },
            { label: "Surname", placeholder: "Doe" },
            { label: "Login/E-mail", placeholder: "test@doe.com" },
            { label: "Phone", placeholder: "+48 545 678 55" },
          ].map((a) => (
            <Input
              key={a.label}
              inputClassName="bg-white !py-[22px] border-[#EAECEE]"
              label={a.label}
              placeholder={a.placeholder}
              labelClassName="text-[#434447] font-[400] text-[14px]"
            />
          ))}

          <Flex className="mt-4">
            <Button onClick={onCancel} className="text-main" variant="flat">
              Cancel
            </Button>
            <Button className="bg-main text-white">Save Changes</Button>
          </Flex>
        </div>
      </form>
    </div>
  );
};

export default EditAccountInformation;
