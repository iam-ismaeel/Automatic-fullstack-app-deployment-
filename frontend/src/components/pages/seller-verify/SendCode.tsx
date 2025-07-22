import { useResendCodeMutation } from "@/api/auth";
import { showsuccess } from "@/utils/showPopup";
import React, { useState } from "react";
import { Button, Input } from "rizzui";
import { toast } from "sonner";

const SendCode = ({
  callback,
  email,
}: {
  callback: () => void;
  email: string;
}) => {
  const { mutateAsync: resendCode, isPending: resendingCode } =
    useResendCodeMutation();
  const [emailVal, setEmailVal] = useState(email ?? "");
  return (
    <div>
      <div>
        <form
          className="flex flex-col gap-6"
          onSubmit={async (e) => {
            e.preventDefault();
            await resendCode({ email: emailVal }).then(() => {
              showsuccess(
                `Verification code sent to your inbox. Please check ${email}`
              );
              callback();
            });
          }}
        >
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmailVal(e.target.value)}
            value={emailVal}
            required
          />
          <Button
            rounded="lg"
            type="submit"
            isLoading={resendingCode}
            className="w-full text-white  !text-base-bold !bg-primary"
          >
            Send Verification Code
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SendCode;
