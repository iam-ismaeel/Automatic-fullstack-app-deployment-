import {Button, Input} from "rizzui";
import React from "react";
import Link from "next/link";
import {AppleBlack, Facebook, Google} from "@icons";
import {FacebookIcon} from "react-share";

const B2bSellerRegister = () => {

    return (
        <>
            <h5 className="text-sm mb-3 font-medium text-[#000000]">
                Lets get you started
            </h5>
            <h5 className="text-xl mb-5 font-medium text-[#000000]">
                Create an Account
            </h5>
            <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                className="mb-5"
                errorClassName="text-red-500"
            />
            <Input
                label="Password"
                type="text"
                placeholder="Enter your password"
                className="mb-5"
                errorClassName="text-red-500"
            />

            <div className="flex justify-between items-center mb-4">
                <label className="">Password Hint: Your password must include at least 1 capital letter and 1
                    number</label>
            </div>

            <Button
                rounded="lg"
                type="button"
                className="text-white mb-4 !text-base-bold !bg-black"
            >
                Get Started
            </Button>

            <div className="custom-divider mt-5 mb-5">
                <div className="divider-line"></div>
                or
                <div className="divider-line"></div>
            </div>

            <div className="flex mt-5">
                <Link href="#" title="Use Github" className="socials-row">
                    <Google className="w-6 h-6"/>
                    Signup with Google
                </Link>
            </div>

            <div className="flex mt-5">
                <Link href="#" title="Use Github" className="socials-row">
                    <FacebookIcon className="w-6 h-6 rounded-full"/>
                    Signup with Facebook
                </Link>
            </div>

            <div className="flex mt-5">
                <Link href="#" title="Use Apple" className="socials-row">
                    <AppleBlack className="w-6 h-6"/>
                    <label>Signup with Apple</label>
                </Link>
            </div>

            <div className="flex justify-center items-center mb-8 mt-5">
                <label className="">Already have an account?</label>
                <Link href="#" title="Login here">
                    <b> Login Here</b>
                </Link>
            </div>

            <Button
                rounded="lg"
                type="button"
                className="text-white mb-4 !text-base-bold !bg-[#BE1E2D]"
            >
                Return to Home
            </Button>

        </>
    )
}

export default B2bSellerRegister;