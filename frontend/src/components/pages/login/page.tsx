"use client";
import React from "react";
import Link from "next/link";
import { Input, Password, Button } from "rizzui";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AppleBlack, Google } from "@icons";
import { useLocale } from "next-intl";
import { ILoginPayload } from "@interfaces/seller";
import { useUserStore } from "@/zustand/userStore";
import useAuthStore from "@/zustand/authStore";
import { useLoginMutation } from "@/api/auth";
import { ApiClient, client } from "@/api/client";
import { showerror, showsuccess } from "@/utils/showPopup";

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Get the search params
  const localActive = useLocale();
  const { mutateAsync, isPending: loggingIn } = useLoginMutation();
  const { setUser } = useUserStore();
  const { login } = useAuthStore();

  const schema = yup
    .object({
      email: yup
        .string()
        .email("Please enter a Valid e-mail")
        .required("Email is required"),
      password: yup.string().required("Password is required"),
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

  const handleForm: SubmitHandler<ILoginPayload> = async (data) => {
    await mutateAsync(data)
      .then((res) => {
        const { user_type, two_factor_enabled } = res.data;

        if (user_type === "customer" && !two_factor_enabled) {
          login(res.data);
          setUser(res.data);

          client.defaults.headers.common["Authorization"] =
            `Bearer ${res?.data?.token}`;
          client.defaults.headers["Authorization"] =
            `Bearer ${res?.data?.token}`;

          showsuccess("Account logged in successfully");
          const redirectUrl = searchParams.get("redirect");
          if (redirectUrl) {
            router.push(redirectUrl);
            return;
          }

          router.push(`/${localActive}`);
        } else {
          showsuccess("Please check your email for login verification code.");
          setTimeout(() => {
            router.push(
              `/${localActive}/verify-otp?email=${encodeURIComponent(
                data.email
              )}&redirect=/&context=login`
            );
          }, 2000);
        }
      })
      .catch((e) => {
        console.log(e);
        showerror(`${e.message}`);
      });

    router.push("/");
  };

  return (
    <div className="my-form">
      <div className="mb-4">
        <h1 className="text-heading-1-bold smd:text-heading-2-bold sm:text-heading-4-bold">
          Welcome back! &#128079;
        </h1>
        <h2 className="text-base-regular sm:text-small-regular text-[#687076]">
          Login with your account!
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
        <Input
          label="Email"
          type="email"
          placeholder="Enter your name"
          inputClassName={`${errors.email && "border-2 border-red-500"}`}
          {...register("email")}
          error={errors.email?.message}
          errorClassName="text-red-500"
        />
        <Password
          label="Password"
          placeholder="Enter your password"
          inputClassName={`${errors.password && "border-2 border-red-500"}`}
          {...register("password")}
          error={errors.password?.message}
          errorClassName="text-red-500"
        />
        <div className="flex justify-between items-center">
          <label className="">Forgot your Password?</label>
          <Link
            href={`forgot-password`}
            className=" text-base-bold text-primary "
          >
            Reset
          </Link>
        </div>
        <Button
          rounded="lg"
          type="submit"
          className="w-full text-white  !text-base-bold !bg-primary"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Sign In
        </Button>
      </form>
      <div className="flex justify-between items-center">
        <label className=" text-base">Don`t have an account?</label>
        <Link
          href={`register`}
          className="underline decoration-primary underline-offset-2"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
