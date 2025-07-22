"use client";
import {Button, Input, PinCode} from "rizzui";
import React, {useState} from "react";
import Link from "next/link";
import {AppleBlack, Facebook, Google} from "@icons";
import {FacebookIcon} from "react-share";
import Image from "next/image";

const B2bSellerOTPScreen = () => {
    const [otp, setOtp] = useState("");
    return (
        <>
            <div className="flex items-center justify-center mt-5 mb-5">
            <Image
                src={'/img/mail.png'}
                alt="You may Like"
                width={120}
                height={100}
                className="object-contain"
            />
            </div>
            <h5 className="text-xl text-center font-extrabold text-[#000000]">
                <p className="text-xl text-center font-extrabold text-[#000000]">Check Your Email</p>
            </h5>
            <div className="flex items-center justify-center mb-5">
                <p>
                    We sent a verification link to j******@gmail.com
                </p>
            </div>
            <div className="space-y-5 mt-10">
                <PinCode length={6} size="lg" setValue={(val: any) => setOtp(val)}/>
                <p className="text-md text-center mb-5 font-bold text-[#000000]">Resend Code</p>
                <div className="flex items-center justify-center mt-10 mb-10">
                    <p>
                        Please wait 53 seconds before requesting another code.
                    </p>
                </div>
                <Button
                    className="w-full text-white !text-base-bold !bg-primary mt-5"
                    rounded="lg"
                    type="button"
                >
                    Verify
                </Button>
            </div>

        </>
    )
}

export default B2bSellerOTPScreen;