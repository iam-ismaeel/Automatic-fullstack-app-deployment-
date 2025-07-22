import Flex from "@/components/common/Flex";
import SearchableDropDown from "@/components/common/searchable-dropdown";
import SpaceBetween from "@/components/common/SpaceBetween";
import { PencilIcon } from "@/components/svg/seller/icons";
import { Button, Input } from "rizzui";

const EditCompanyInformation = ({ onCancel }: { onCancel: () => void }) => {
  return (
    <div className="mt-10">
      <SpaceBetween className="flex-wrap mb-8">
        <p className="text-[#0C0C0C] font-bold text-[20px]">
          Edit Company Information
        </p>
        <PencilIcon className="text-[#737B7D]" />
      </SpaceBetween>
      <form>
        <div className="flex flex-col gap-4">
          {[
            { label: "Company Name", placeholder: "JKT Company" },
            { label: "Tax ID", placeholder: "909889878" },

            { label: "Street", placeholder: "177 Kent St." },
            { label: "City", placeholder: "New York" },
            { label: "Postal Code", placeholder: "1122" },
          ].map((a) => (
            <Input
              key={a.label}
              inputClassName="bg-white !py-[22px] border-[#EAECEE]"
              label={a.label}
              placeholder={a.placeholder}
              labelClassName="text-[#434447] font-[400] text-[14px]"
            />
          ))}
          <div>
            <p className="text-[#434447] mb-1 text-[14px]">State/Province</p>

            <SearchableDropDown
              data={[{ name: "Brooklyn", id: "brooklyn" }]}
              handleSelection={() => {}}
              className="!py-3 bg-white border-[#EAECEE]"
              placeholder={"Select state"}
              defaultVal="brooklyn"
            />
          </div>
          <div>
            <p className="text-[#434447] mb-1 text-[14px]">Country</p>

            <SearchableDropDown
              data={[{ name: "United States", id: "usa" }]}
              handleSelection={() => {}}
              className="!py-3 bg-white border-[#EAECEE]"
              placeholder={"Select country"}
              defaultVal="usa"
            />
          </div>
          <Input
            inputClassName="bg-white !py-[22px] border-[#EAECEE]"
            label={"Phone"}
            placeholder={"+48 768 908 554"}
            labelClassName="text-[#434447] font-[400] text-[14px]"
          />

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

export default EditCompanyInformation;
