import React from 'react';
import { Input } from "@nextui-org/input";
import { EyeFilledIcon } from "../../assets/Logologin/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../assets/Logologin/EyeSlashFilledIcon";
import { Button } from "@nextui-org/react";
import "./login.css"

const Login = () => {
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <div className='flex justify-center items-center bg-stone-800 h-screen'>
            <div className="flex flex-col items-center gap-4 p-8 rounded-sm text-white bg-stone-900 w-full max-w-sm sm:w-[30%]">
                <div className='flex justify-center items-center'>
                    <img className='w-2/3 sm:w-[60%]' src="src/assets/Logo-7.svg" alt="logo" />
                </div>

                <h1 className="text-xl sm:text-2xl">Sign In</h1>

                <Input
                    type="email"
                    label=""
                    variant="bordered"
                    color='default-500'
                    placeholder="Email Address"
                    defaultValue=""
                    className="w-full max-w-xs"
                />

                <Input
                    label=""
                    variant="bordered"
                    placeholder="Password"
                    endContent={
                        <button
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleVisibility}
                            aria-label="toggle password visibility"
                        >
                            {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    }
                    type={isVisible ? "text" : "password"}
                    className="w-full max-w-xs"
                />

                <div className='flex justify-between w-full'>
                    <a href="#" className='underline text-sm'>
                        Forgot password?
                    </a>
                </div>

                <Button color="primary" className="w-full sm:w-[20rem]">
                    Sign in
                </Button>

                <div className='flex items-center gap-1 w-full'>
                    <div className='border-t flex-grow border-white'></div>
                    <p className='text-sm'>or sign in with</p>
                    <div className='border-t flex-grow border-white'></div>
                </div>

                <a href="#" className='underline text-sm'>Create account</a>
            </div>
        </div>
    );
}

export default Login;
