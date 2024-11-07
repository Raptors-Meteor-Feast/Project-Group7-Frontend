import React from 'react'
import {Input} from "@nextui-org/input";
import {EyeFilledIcon} from "../assets/Logologin/EyeFilledIcon";
import {EyeSlashFilledIcon} from "../assets/Logologin/EyeSlashFilledIcon";
import {Button} from "@nextui-org/react";


const Login = () => {
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);



  return (
    <div className='flex justify-center items-center bg-stone-800'>
            <div className="flex p-10 border-none rounded-md mt-8 my-8
            text-white bg-stone-900
            items-center justify-center flex-col gap-4">


            <div className='flex justify-center items-center max-w-fit'>
                <img className='w-[40%] max-w-fit' src="src/assets/Logo-7.svg" alt="logo"/>
            </div>

            <h1 className="text-2xl md:text-4xl">Sign In</h1>
            

            <Input
                type="email"
                label=""
                variant="bordered"
                color='default-500'
                placeholder="Email Address"
                defaultValue=""
                className="max-w-xs"
                />

                
            <Input
                label=""
                variant="bordered"
                placeholder="Password"
                endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                    {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                    </button>
                }
                type={isVisible ? "text" : "password"}
                className="max-w-xs "
                />

                

                                        
                <a href="#" className='underline underline-offset-1'>Forgot password?</a>



                
                <Button color="primary" className="w-80">
                    Sign in
                </Button>

                <p>—————— or sign in with ——————</p>

                <a href="#" className='underline underline-offset-1'>Create account</a>


            </div>
    </div>
 )
}

export default Login