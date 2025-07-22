"use client";
import { Input, Button } from "rizzui";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const ForgotPassword = ({ callback }: { callback: () => void }) => {
  const schema = yup
    .object({
      email: yup
        .string()
        .email("Please enter a Valid e-mail")
        .required("Email is required"),
    })
    .required();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleForm: SubmitHandler<Record<string, string>> = async (data) => {
    callback();
  };
  return (
    <>
      <div className=" w-full">
        <h1 className="text-heading-1-bold mb-2 smd:text-heading-2-bold sm:text-heading-4-bold">
          Forgot Password
        </h1>
        <h2 className="text-base-regular sm:text-small-regular text-[#687076]">
          Enter your email for the verification process, we will send 4 digit
          code to your email.
        </h2>
      </div>

      <form className="space-y-4 w-full" onSubmit={handleSubmit(handleForm)}>
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          inputClassName={`${errors.email && "border-2 border-red-500"}`}
          {...register("email")}
          error={errors.email?.message}
          errorClassName="text-red-500"
        />
        <Button
          rounded="lg"
          type="submit"
          className="w-full text-white  !text-base-bold !bg-primary"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Continue
        </Button>
      </form>
    </>
  );
};

export default ForgotPassword;
