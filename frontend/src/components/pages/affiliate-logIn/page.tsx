"use client";
import { useState } from "react";
import Link from "next/link";
import { Input, Password, Button, PinCode } from "rizzui";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLocale } from "next-intl";
import { AppleBlack, ArrowBack, Google } from "@icons";
import { useLoginMutation, useVerifyLoginMutation } from "@/api/auth";
import { ILoginPayload } from "@/interfaces/seller";
import useAuthStore from "@/zustand/authStore";
import { useUserStore } from "@/zustand/userStore";
import { showinfo, showsuccess } from "@/utils/showPopup";

const AffiliateLogIn = () => {
  const router = useRouter();
  const localActive = useLocale();
  const { mutateAsync, isPending: loggingIn } = useLoginMutation();
  const { mutateAsync: verifyLogin, isPending: verifyingLogin } =
    useVerifyLoginMutation();
  const [viewMode, setViewMode] = useState<"login" | "otp">("login");
  const [otp, setOtp] = useState<string>();

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
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const email = getValues("email");
  const { login } = useAuthStore();
  const { setUser } = useUserStore();

  const handleForm: SubmitHandler<ILoginPayload> = async (data) => {
    await mutateAsync(data)
      .then((res) => {
        const { is_affiliate_member, two_factor_enabled } = res.data;

        if (is_affiliate_member && !two_factor_enabled) {
          setUser(res.data);
          login(res.data);
          showsuccess("Account logged in successfully");
          router.push(`/${localActive}/affiliate/dashboard`);
        } else if (!is_affiliate_member) {
          showinfo("Please create an affiliate account");
        } else {
          showsuccess("Please check your email for login verification code.");
          router.push(
            `/${localActive}/verify-otp?email=${encodeURIComponent(
              data.email
            )}&redirect=/&context=login`
          );
          setViewMode("otp");
        }
      })
      .catch((res) => {
        const accountStatus = res?.data?.status;
        if (accountStatus === "pending") {
          router.push(`/${localActive}/seller-verify?email=${data.email}`);
        }
      });
  };

  return (
    <div className="my-form ">
      {viewMode === "login" ? (
        <>
          <div className="mb-4">
            <h1 className="text-heading-1-bold smd:text-heading-2-bold sm:text-heading-4-bold">
              Welcome Back, <br /> AZANY{" "}
              <label className="text-primary"> Affiliates</label> 💼
            </h1>
            <h2 className="text-base-regular sm:text-small-regular text-[#687076]">
              🚀 Log In Now and Continue Earning with AZANY!
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
              disabled={loggingIn}
              isLoading={loggingIn}
            >
              Sign In
            </Button>
          </form>
          <div className="flex justify-between items-center">
            <label className=" text-base">Don`t have an account?</label>
            <Link
              href={`affiliate-signup`}
              className="underline decoration-primary underline-offset-2"
            >
              Sign Up
            </Link>
          </div>
        </>
      ) : (
        <div className="mb-4 w-full">
          <Button
            onClick={() => setViewMode("login")}
            variant="outline"
            className="gap-2 mb-6"
          >
            <ArrowBack />
            Back to login
          </Button>
          <h1 className="text-heading-1-bold mb-2 smd:text-heading-2-bold sm:text-heading-4-bold">
            Welcome Back, AZANY <span className="text-primary">Affiliates</span>{" "}
            🛒
          </h1>
          <h2 className="text-base-regular sm:text-small-regular text-[#687076]">
            🚀 Enter your login verfication code to access your dashboard.
          </h2>
          <div className="mt-8">
            <PinCode
              setValue={setOtp as any}
              length={6}
              size="lg"
              className="w-full mb-4"
              inputClassName="!border-[#4D4D4D]"
            />
            <Button
              rounded="lg"
              className="w-full py-6 text-white !text-base-bold !bg-primary"
              onClick={async () => {
                await verifyLogin({ code: otp as string, email }).then(
                  (res) => {
                    const userData = res?.data;
                    login(userData);
                    router.push(`/${localActive}/affiliate/dashboard`);
                    showsuccess("Account logged in successfully");
                  }
                );
              }}
              isLoading={verifyingLogin}
              disabled={otp?.length! < 6 || !otp}
            >
              Verify Login
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AffiliateLogIn;
