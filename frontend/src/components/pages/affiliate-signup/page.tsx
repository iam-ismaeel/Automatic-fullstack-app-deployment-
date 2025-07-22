"use client";
import Link from "next/link";
import { Input, Password, Button } from "rizzui";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLocale } from "next-intl";
import { useCreateAffiliateMutation } from "@/api/affiliate";
import { IAffiliatePayload } from "@/interfaces/affiliate";
import { showerror, showsuccess } from "@/utils/showPopup";
import SearchableDropDown from "@/components/common/searchable-dropdown";
import { useLocationOptions } from "@/hooks/useLocationOptions";

const AffiliateSignUp = () => {
  const router = useRouter();
  const localActive = useLocale();
  const searchParams = useSearchParams();
  const referrer_code = searchParams.get("referrer_code");

  const { mutateAsync, isPending } = useCreateAffiliateMutation();
  const { countryOptions, setCountryCode, statesOptions } =
    useLocationOptions();

  const schema = yup
    .object({
      email: yup
        .string()
        .email("Please enter a Valid e-mail")
        .required("Email is required"),
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
      first_name: yup.string().required("First Name is required"),
      last_name: yup.string().required("Last Name is required"),
      referrer_code: yup.string().optional(),
      state_id: yup.string().required("State is required"),
      country_id: yup.string().required("Country is required"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleForm: SubmitHandler<IAffiliatePayload> = async (data) => {
    await mutateAsync(data)
      .then(() => {
        const { email } = data;

        showsuccess(
          "Account created successfully. Please check your inbox to proceed."
        );
        router.push(
          `/${localActive}/verify-otp?email=${encodeURIComponent(
            email
          )}&redirect=/&context=register&isAffiliate=true`
        );
      })
      .catch((error: any) => {
        showerror(`${error.message}`);
      });
  };

  return (
    <div className="my-form">
      <div className="mb-4">
        <h1 className="text-heading-1-bold smd:text-heading-2-bold sm:text-heading-4-bold">
          Join AZANY <label className="text-primary">Affiliates</label> 💼
        </h1>
        <h2 className="text-base-regular sm:text-small-regular text-[#687076]">
          🚀 Sign Up Today and Start Earning with AZANY!
        </h2>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(handleForm)}>
        <div className="flex smd:flex-col justify-between  smd:justify-start items-center smd:items-stretch ">
          <Input
            label="First Name"
            type="text"
            placeholder="First name"
            inputClassName={`${
              errors.first_name && "border-2 border-red-500"
            } `}
            {...register("first_name")}
            error={errors.first_name?.message}
            errorClassName="text-red-500"
          />

          <Input
            label="Last Name"
            type="text"
            placeholder="Last name"
            inputClassName={`${errors.last_name && "border-2 border-red-500"}`}
            {...register("last_name")}
            error={errors.last_name?.message}
            errorClassName="text-red-500"
          />
        </div>
        <Input
          label="Email"
          type="email"
          placeholder="Enter your Name"
          inputClassName={`${errors.email && "border-2 border-red-500"}`}
          {...register("email")}
          error={errors.email?.message}
          errorClassName="text-red-500"
        />
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
          placeholder="Enter your Password"
          inputClassName={`${errors.password && "border-2 border-red-500"}`}
          {...register("password")}
          error={errors.password?.message}
          errorClassName="text-red-500"
        />
        <Password
          label="Confirm Password"
          placeholder="Confirm your Password "
          inputClassName={`${
            errors.password_confirmation && "border-2 border-red-500"
          }`}
          {...register("password_confirmation")}
          error={errors.password_confirmation?.message}
          errorClassName="text-red-500"
        />
        <Input
          label="Referral Code(Option)"
          type="email"
          value={referrer_code ?? ""}
          placeholder="Enter your Referral Code"
          {...register("referrer_code")}
        />
        <Button
          rounded="lg"
          type="submit"
          className="w-full h-[45px] text-white  !text-base-bold !bg-primary"
          disabled={isPending}
          isLoading={isPending}
        >
          Continue
        </Button>
      </form>
      <div className="flex justify-between items-center">
        <label className=" text-base">Already have an account?</label>
        <Link
          href={`affiliate-login`}
          className="underline decoration-primary underline-offset-2"
        >
          Log In
        </Link>
      </div>
    </div>
  );
};

export default AffiliateSignUp;
