"use client";
import Link from "next/link";
import { Input, Password, Button, Select as RizSelect } from "rizzui";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  useCreateSellerWithCouponMutation,
  useCreateSellerWithReferrerMutation,
} from "@/api/seller";
import { CreateSellerPayload } from "@/interfaces/seller";
import { useLocationOptions } from "@/hooks/useLocationOptions";
import { Select } from "@headlessui/react";
import SearchableDropDown from "@/components/common/searchable-dropdown";
import { showerror, showsuccess } from "@/utils/showPopup";

const formFields: Array<{
  name: keyof CreateSellerPayload;
  label: string;
  placeholder: string;
  type?: string;
}> = [
  {
    name: "first_name",
    label: "First Name",
    placeholder: "Enter your first name",
    type: "text",
  },
  {
    name: "last_name",
    label: "Last Name",
    placeholder: "Enter your last name",
    type: "text",
  },
  {
    name: "other_name",
    label: "Other Names",
    placeholder: "Enter any other names (optional)",
    type: "text",
  },
  {
    name: "business_name",
    label: "Business Name",
    placeholder: "Enter your business name",
    type: "text",
  },
  {
    name: "address",
    label: "Your Address",
    placeholder: "Enter your street address",
    type: "text",
  },
  {
    name: "email",
    label: "Email Address",
    placeholder: "Enter your email address",
    type: "email",
  },
];

const Step1 = ({
  callback,
  coupon,
  referrer,
}: {
  callback: (email: string) => void;
  coupon: string;
  referrer: string;
}) => {
  const Schema = yup
    .object({
      email: yup
        .string()
        .email("Please enter a Valid e-mail")
        .required("Email is required"),

      first_name: yup.string().required("First Name is required"),
      last_name: yup.string().required("Last Name is required"),
      business_name: yup.string().required("Buiness Name is required"),
      address: yup.string().required("Residential Address is required"),
      state_id: yup.string().required("State is required"),
      country_id: yup.string().required("Country is required"),

      other_name: yup.string().optional(),
      password: yup
        .string()
        .required("Password is required")
        .min(5, "Password must be at least 5 characters long")
        .matches(
          /[a-z]/,
          "The password field must contain at least one lowercase letter."
        )
        .matches(
          /[A-Z]/,
          "The password field must contain at least one uppercase letter."
        )
        .matches(
          /[0-9]/,
          "The password field must contain at least one number."
        )
        .matches(
          /[^a-zA-Z0-9]/,
          "The password field must contain at least one symbol."
        ),
      password_confirmation: yup
        .string()
        .required("Confirm password is required")
        .oneOf([yup.ref("password")], "Passwords must match"),
    })
    .required();
  type FormData = yup.InferType<typeof Schema>;

  const {
    mutateAsync: createSellerWithCoupon,
    isPending: isCreatingSellerWithCoupon,
  } = useCreateSellerWithCouponMutation(coupon);
  const {
    mutateAsync: createSellerWithReferrer,
    isPending: isCreatingSellerWithReferrer,
  } = useCreateSellerWithReferrerMutation(referrer);

  const { countryOptions, setCountryCode, statesOptions } =
    useLocationOptions();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    clearErrors,
  } = useForm<FormData>({
    resolver: yupResolver(Schema),
  });

  const handleForm: SubmitHandler<FormData> = async (data) => {
    try {
      if (referrer) {
        // If referrer is available, use referrer-based signup
        await createSellerWithReferrer(data);
      } else {
        // If coupon is available, use coupon-based signup
        await createSellerWithCoupon(data);
      }

      showsuccess(
        `Verification code sent to ${data.email}. Please check your inbox to proceed.`
      );
      callback(data.email);
    } catch (error: any) {
      showerror(`${error.message}`);
    }
  };

  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit(handleForm)}>
        {formFields.map(({ label, name, placeholder, type }, i) => (
          <Input
            key={i}
            label={label}
            type={type as any}
            placeholder={placeholder}
            inputClassName={`${errors[name] && "border-2 border-red-500"}`}
            {...register(name)}
            error={errors[name]?.message}
            errorClassName={`text-red-500`}
          />
        ))}

        <div>
          <label className="text-[14px] font-medium">Country</label>

          <SearchableDropDown
            data={countryOptions}
            defaultVal={getValues("country_id")}
            handleSelection={(e: any) => {
              setValue("country_id", e?.id);
              setCountryCode(e?.id);
              clearErrors("country_id");
            }}
            placeholder="Search for a country"
          />
          {errors.country_id?.message && (
            <p className=" text-[13px] text-red-500 ">
              {errors.country_id?.message}
            </p>
          )}
        </div>
        <div>
          <label className="text-[14px] font-medium">State/City</label>

          <SearchableDropDown
            data={statesOptions}
            defaultVal={getValues("state_id")}
            handleSelection={(e: any) => {
              setValue("state_id", e?.id);
              clearErrors("state_id");
            }}
            placeholder="Search for a state"
          />
          {errors.state_id?.message && (
            <p className=" text-[13px] text-red-500 ">
              {errors.state_id?.message}
            </p>
          )}
        </div>

        <Password
          label="Password"
          placeholder="Enter password"
          inputClassName={`${errors.password && "border-2 border-red-500"}`}
          {...register("password")}
          error={errors.password?.message}
          errorClassName="text-red-500"
        />
        <Password
          label="Confirm Password"
          placeholder="Enter new password again"
          inputClassName={`${
            errors.password_confirmation && "border-2 border-red-500"
          }`}
          {...register("password_confirmation")}
          error={errors.password_confirmation?.message}
          errorClassName="text-red-500"
        />
        <Button
          type="submit"
          className="w-full h-[45px] text-white !text-base-bold !bg-primary"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Continue
        </Button>
      </form>
      <div className="flex justify-between mt-4 items-center">
        <label className=" text-base">Already have an account?</label>
        <Link
          href={`seller-login`}
          className="underline decoration-primary underline-offset-2"
        >
          Log In
        </Link>
      </div>
    </div>
  );
};

export default Step1;
