"use client";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDisclosure } from "@/hooks/useDisclosure";
import { useState } from "react";
import NewPassword from "./steps/NewPassword";
import Verification from "./steps/Verification";
import ForgotPassword from "./steps/ForgotPassword";
import ResetSuccess from "./steps/ResetSuccess";

const SellerForgotPassword = () => {
  const { isOpen, toggleOpenState } = useDisclosure();
  const [compMode, setCompMode] = useState<
    "forgot" | "verification" | "new_pass" | "success"
  >("forgot");

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
    toggleOpenState();
  };

  return (
    <div className="overflow-y-auto flex justify-center items-center  px-2 h-full w-full max-w-[26rem]">
      <div className="w-full flex gap-8 max-w-xl mx-0 md:mx-auto flex-col justify-between">
        {compMode === "forgot" ? (
          <ForgotPassword callback={() => setCompMode("verification")} />
        ) : compMode === "verification" ? (
          <Verification callback={() => setCompMode("new_pass")} />
        ) : compMode === "new_pass" ? (
          <NewPassword callback={() => setCompMode("success")} />
        ) : (
          <ResetSuccess />
        )}
        <div className="flex justify-center items-center">
          <Link
            className="text-[14px] font-[500] underline cursor-pointer hover:opacity-80 hover:transition-all"
            href={"seller-login"}
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellerForgotPassword;
