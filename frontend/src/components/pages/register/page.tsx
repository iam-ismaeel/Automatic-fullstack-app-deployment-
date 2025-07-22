"use client";
import React from "react";
import Link from "next/link";
import { Input, Password, Button } from "rizzui";
import { useRouter, usePathname } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AppleBlack, Google } from "@icons";
import { useLocale } from "next-intl";
import { signUp } from "@/lib/api";
import { showerror, showsuccess } from "@/utils/showPopup";
import SearchableDropDown from "@/components/common/searchable-dropdown";
import { useLocationOptions } from "@/hooks/useLocationOptions";

const Register = () => {
  const router = useRouter();
  const pathName = usePathname();
  const localActive = useLocale();

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
      confirmPassword: yup
        .string()
        .required("Confirm Password is required")
        .oneOf([yup.ref("password")], "Passwords must match"),
      firstName: yup.string().required("First Name is required"),
      lastName: yup.string().required("Last Name is required"),
      state_id: yup.string().required("State is required"),
      country_id: yup.string().required("Country is required"),
    })
    .required();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleForm: SubmitHandler<Record<string, any>> = async (data) => {
    const {
      email,
      password,
      firstName,
      lastName,
      confirmPassword,
      country_id,
      state_id,
    } = data;

    try {
      const result = await signUp({
        first_name: firstName,
        last_name: lastName,
        email,
        password: password,
        password_confirmation: confirmPassword,
        country_id: country_id,
        state_id: state_id,
        terms: 0,
      });

      showsuccess("Please check your inbox to proceed.");
      router.push(
        `/${localActive}/verify-otp?email=${encodeURIComponent(
          email
        )}&redirect=/&context=register`
      );
    } catch (error: any) {
      showerror(`${error.message}`);
    }
  };

  return (
    <div className="my-form">
      <div className="mb-4">
        <h1 className="text-heading-1-bold smd:text-heading-2-bold sm:text-heading-4-bold">
          Sign Up to join Azany &#128079;
        </h1>
        <h2 className="text-base-regular sm:text-small-regular text-[#687076]">
          Use one of the methods below to Continue!
        </h2>
      </div>
      <div className="flex">
        <Link href="#" title="Use Apple" className="socials-row">
          <AppleBlack className="w-6 h-6" />
          <label> Continue with Apple</label>
        </Link>
      </div>
      <div className="flex">
        <Link href="#" title="Use Github" className="socials-row">
          <Google className="w-6 h-6" />
          Continue with Google
        </Link>
      </div>
      <div className="custom-divider ">
        <div className="divider-line"></div>
        or
        <div className="divider-line"></div>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(handleForm)}>
        <div className="flex smd:flex-col justify-between  smd:justify-start items-center smd:items-stretch ">
          <Input
            label="First Name"
            type="text"
            placeholder="First name"
            inputClassName={`${errors.firstName && "border-2 border-red-500"} `}
            {...register("firstName")}
            error={errors.firstName?.message}
            errorClassName="text-red-500"
          />

          <Input
            label="Last Name"
            type="text"
            placeholder="Last name"
            inputClassName={`${errors.lastName && "border-2 border-red-500"}`}
            {...register("lastName")}
            error={errors.lastName?.message}
            errorClassName="text-red-500"
          />
        </div>
        <Input
          label="Email"
          type="email"
          placeholder="Enter your Email"
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
            errors.confirmPassword && "border-2 border-red-500"
          }`}
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
          errorClassName="text-red-500"
        />
        <Button
          rounded="lg"
          type="submit"
          className="w-full h-[45px] text-white  !text-base-bold !bg-primary"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Continue
        </Button>
        <div className="flex justify-between items-center">
          <label className="font-degular_medium text-base">
            Already have an account?
          </label>
          <Link
            href={`login`}
            className="underline decoration-primary underline-offset-2"
          >
            Log In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
