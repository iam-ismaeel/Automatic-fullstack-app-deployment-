"use client";
import Link from "next/link";
import { Input, Password, Button, PinCode } from "rizzui";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLocale } from "next-intl";
import { AppleBlack, ArrowBack, Google } from "@icons";
import { ILoginPayload, LoginVerifyData } from "@/interfaces/seller";
import { useLoginMutation, useVerifyLoginMutation } from "@/api/auth";
import { useState } from "react";
import useAuthStore from "@/zustand/authStore";
import { useUserStore } from "@/zustand/userStore";
import { showinfo, showsuccess } from "@/utils/showPopup";

const SellerLogIn = () => {
  const router = useRouter();
  const localActive = useLocale();
  const [viewMode, setViewMode] = useState<"login" | "otp">("login");
  const [otp, setOtp] = useState<string>();
  const { setUser } = useUserStore();

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
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutateAsync } = useLoginMutation();
  const { mutateAsync: verifyLogin, isPending: verifyingLogin } =
    useVerifyLoginMutation();

  const handleForm: SubmitHandler<ILoginPayload> = async (data) => {
    await mutateAsync(data)
      .then((res) => {
        const userData: LoginVerifyData = res?.data;

        if (userData?.token) {
          if (userData?.is_affiliate_member) {
            showinfo(
              "Affiliate account detected. Please log in through Affiliate.."
            );
            router.push(`/${localActive}/affiliate-login`);
          } else {
            login(userData);
            showsuccess("Account logged in successfully");
            router.push(`/${localActive}/seller/dashboard`);
          }
        } else {
          showsuccess("Please check your email for login verification code.");
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

  const email = getValues("email");
  const { login } = useAuthStore();

  return (
    <div className="overflow-y-auto flex justify-center items-center px-2 h-full ">
      <div className="w-full flex gap-8 max-w-xl mx-0 md:mx-auto flex-col justify-between">
        {viewMode === "login" ? (
          <>
            {" "}
            <div className="mb-4 w-full">
              <h1 className="text-heading-1-bold mb-2 smd:text-heading-2-bold sm:text-heading-4-bold">
                Welcome Back, AZANY{" "}
                <span className="text-primary">Sellers</span> 🛒
              </h1>
              <h2 className="text-base-regular sm:text-small-regular text-[#687076]">
                🚀 Log In Now to Manage Your Store and Boost Your Sales with
                AZANY!
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
            <form
              className="space-y-4 w-full"
              onSubmit={handleSubmit(handleForm)}
            >
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                inputClassName={`${errors.email && "border-2 border-red-500"}`}
                {...register("email")}
                error={errors.email?.message}
                errorClassName="text-red-500"
              />
              <Password
                label="Password"
                placeholder="Enter your password"
                inputClassName={`${
                  errors.password && "border-2 border-red-500"
                }`}
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
                href={`seller-signup`}
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
              Welcome Back, AZANY <span className="text-primary">Sellers</span>{" "}
              🛒
            </h1>
            <h2 className="text-base-regular sm:text-small-regular text-[#687076]">
              🚀 Enter your login verfication code to access your dashboard.
            </h2>
            <div className="mt-8">
              <PinCode
                setValue={setOtp as any}
                length={6}
                size="xl"
                className="w-full  mb-4"
                inputClassName="!border-[#4D4D4D]"
              />
              <Button
                rounded="lg"
                className="w-full py-8 text-white !text-base-bold !bg-primary"
                onClick={async () => {
                  await verifyLogin({ code: otp as string, email }).then(
                    (res) => {
                      const userData: LoginVerifyData = res?.data;
                      if (userData?.is_affiliate_member) {
                        showinfo(
                          "Affiliate account detected. Please log in through Affiliate.."
                        );
                        router.push(`/${localActive}/affiliate-login`);
                      } else if (userData?.user_type === "customer") {
                        showsuccess("Account logged in successfully");
                        router.push(`/${localActive}/customer/dashboard`);
                      } else {
                        login(userData);
                        showsuccess("Account logged in successfully");
                        router.push(`/${localActive}/seller/dashboard`);
                      }
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
    </div>
  );
};

export default SellerLogIn;
