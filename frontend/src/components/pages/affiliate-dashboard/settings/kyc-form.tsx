import { useAddKYCMutation } from "@/api/affiliate";
import { useProfileQuery } from "@/api/user";
import DocumentUploader from "@/components/common/document-uploader";
import SearchableDropDown from "@/components/common/searchable-dropdown";
import UploadedDocument from "@/components/common/uploaded-document";
import { useLocationOptions } from "@/hooks/useLocationOptions";
import { appendFormData } from "@/utils";
import { showsuccess } from "@/utils/showPopup";
import useAuthStore from "@/zustand/authStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Input, Select } from "rizzui";
import { toast } from "sonner";
import * as yup from "yup";

const formFields = [
  {
    name: "fullname",
    label: "Full Name",
    placeholder: "Enter your full name",
    type: "text",
  },
  {
    name: "email",
    label: "Email Address",
    placeholder: "Enter your email address",
    type: "email",
  },
  {
    name: "phone_number",
    label: "Phone Number",
    placeholder: "Enter phone number",
    type: "number",
  },
  {
    name: "date_of_birth",
    label: "Date of Birth",
    placeholder: "Select date of birth",
    type: "date",
  },
  {
    name: "document_number",
    label: "Document Number",
    placeholder: "Enter document number",
    type: "text",
  },
  {
    name: "document_type",
    label: "Document Type",
    placeholder: "Select document type",
    type: "text",
  },
] as const;

const Schema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a Valid e-mail")
      .required("Email is required"),
    fullname: yup.string().required("Full Name is required"),
    date_of_birth: yup.string().required("Date of Birth is required"),
    city: yup.string().required("City/State is required"),
    country_of_residence: yup.string().required("Country is required"),
    nationality: yup.string().required("Nationality is required"),
    document_type: yup.string().required("Document type is required"),
    document_number: yup.string().required("Document number is required"),
    phone_number: yup.string().required("Phone number is required"),
    other_name: yup.string().optional(),
  })
  .required();

type FormData = yup.InferType<typeof Schema>;

const KycForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const { countryOptions, setCountryCode, statesOptions } =
    useLocationOptions();
  const {
    userData: { user_id },
  } = useAuthStore();
  const { mutateAsync, isPending: addingKyc } = useAddKYCMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    clearErrors,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(Schema),
  });

  const nationalityId = watch("nationality");
  const countryId = watch("country_of_residence");
  const cityId = watch("city");

  const handleForm: SubmitHandler<FormData> = async (data) => {
    try {
      if (!file) {
        showsuccess("Please upload a document");
        return;
      }

      const formdata = new FormData();
      appendFormData(data, formdata);
      formdata.append("image", file);
      formdata.append("user_id", user_id as string);

      await mutateAsync(formdata);
      showsuccess("KYC Updated");

      // Reset form and file state
      reset();
      setFile(null);
    } catch (error) {
      console.error("KYC submission error:", error);
    }
  };

  const renderInputField = (field: (typeof formFields)[number]) => (
    <Input
      key={field.name}
      label={field.label}
      type={field.type}
      placeholder={field.placeholder}
      inputClassName={`${errors[field.name] && "border-2 border-red-500"}`}
      {...register(field.name)}
      error={errors[field.name]?.message}
      errorClassName="text-red-500"
    />
  );

  const renderLocationDropdown = (
    label: string,
    name: "nationality" | "country_of_residence" | "city",
    options: any[],
    value: string
  ) => (
    <div>
      <label className="text-[14px] font-medium">{label}</label>
      <SearchableDropDown
        data={options}
        defaultVal={value}
        handleSelection={(e: any) => {
          setValue(name, e?.id);
          if (name !== "city") setCountryCode(e?.id);
          clearErrors(name);
        }}
        placeholder={`Search for a ${name === "city" ? "city" : "country"}`}
        clearSelection={true}
        className={errors[name] && "border-2 border-red-500"}
      />
      {errors[name]?.message && (
        <p className="text-[13px] text-red-500">{errors[name]?.message}</p>
      )}
    </div>
  );

  return (
    <div className="">
      <form onSubmit={handleSubmit(handleForm)}>
        <div className="grid lg:grid-cols-1 grid-cols-2 gap-6  w-full">
          {formFields.map(renderInputField)}

          {renderLocationDropdown(
            "Nationality",
            "nationality",
            countryOptions,
            nationalityId
          )}
          {renderLocationDropdown(
            "Country",
            "country_of_residence",
            countryOptions,
            countryId
          )}
          {renderLocationDropdown("State/City", "city", statesOptions, cityId)}

          <div>
            <label className="text-[14px] font-medium">Upload Document</label>
            <DocumentUploader onSelectFile={(val) => setFile(val[0])} />
          </div>

          {file && (
            <UploadedDocument
              className="h-fit"
              file={file}
              onDelete={() => setFile(null)}
            />
          )}
        </div>

        <div className="text-center">
          <Button
            type="submit"
            className="xs:w-full w-2/6 mt-4 h-[45px] text-white !text-base-bold !bg-primary"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default KycForm;
