import {Button, Input} from "rizzui";
import React from "react";
import Link from "next/link";
import {AppleBlack, Facebook, Google} from "@icons";
import {FacebookIcon} from "react-share";

const B2bSellerLogin = () => {

    return (
        <>
            <h5 className="text-sm mb-3 font-medium text-[#000000]">
                WELCOME BACK
            </h5>
            <h5 className="text-xl mb-5 font-medium text-[#000000]">
                Log In to your Account
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
                <div className="flex items-center mb-4">
                    <input id="remember-me" type="checkbox" value=""
                           className="w-4 h-4 text-gray-400-600 bg-gray-100 border-gray-300 focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="remember-me"
                           className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                </div>
                <label className="">Forgot Password</label>
            </div>
            <Button
                rounded="lg"
                type="button"
                className="text-white mb-4 !text-base-bold !bg-black"
            >
                Continue
            </Button>

            <div className="custom-divider mt-5 mb-5">
                <div className="divider-line"></div>
                or
                <div className="divider-line"></div>
            </div>

            <div className="flex mt-5">
                <Link href="#" title="Use Github" className="socials-row">
                    <Google className="w-6 h-6"/>
                    Login with Google
                </Link>
            </div>

            <div className="flex mt-5">
                <Link href="#" title="Use Github" className="socials-row">
                    <FacebookIcon className="w-6 h-6 rounded-full"/>
                    Login with Facebook
                </Link>
            </div>

            <div className="flex mt-5">
                <Link href="#" title="Use Apple" className="socials-row">
                    <AppleBlack className="w-6 h-6"/>
                    <label>Login with Apple</label>
                </Link>
            </div>

            <div className="flex justify-center items-center mb-8 mt-5">
                <label className="">New Seller?</label>
                <Link href="#" title="Login here">
                    <b> SIGN UP HERE</b>
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

export default B2bSellerLogin;