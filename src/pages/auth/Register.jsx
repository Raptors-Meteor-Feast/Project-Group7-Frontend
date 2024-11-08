import React from 'react';
import { Input } from "@nextui-org/input";
import { EyeFilledIcon } from "../../assets/LogoLogin/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../assets/LogoLogin/EyeSlashFilledIcon";
import { Button } from "@nextui-org/react";
import {Checkbox} from "@nextui-org/react";
import {MailIcon} from '../../assets/LogoLogin/Maillcon';
import { GiDinosaurRex } from "react-icons/gi";

import "./login.css"

const Login = () => {
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <div className='flex justify-center items-center bg-neutral-950 h-screen'>
            <div className="flex flex-col items-center gap-4 p-8 rounded-sm text-white bg-neutral-900 w-full max-w-sm sm:w-[30%]">
                <div className='flex justify-center items-center'>
                    <img className='w-2/3 sm:w-[60%]' src="src/assets/ProjectLogo/Logo-7.svg" alt="logo" />
                </div>

                <h1 className="text-xl sm:text-2xl">Create Account</h1>

            <div className='flex gap-2'>
            <Input
                    type="text"
                    label=""
                    variant="bordered"
                    color='default-500'
                    placeholder="First Names"
                    defaultValue=""
                    className="w-full"
                />

                

                <Input
                    type="text"
                    label=""
                    variant="bordered"
                    color='default-500'
                    placeholder="Last Names"
                    defaultValue=""
                    className="w-full"
                />
            </div>

            <Input
                    type="text"
                    label=""
                    variant="bordered"
                    color='default-500'
                    placeholder="Display Name"
                    defaultValue=""
                    className="w-full"
                    endContent={
                        <GiDinosaurRex className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                />

        
                <Input
                    type="email"
                    label=""
                    variant="bordered"
                    color='default-500'
                    placeholder="Email Address"
                    defaultValue=""
                    className="w-full"
                    endContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                />

                { ["Password", "Confirm Password"].map((placeholder,index) => ( 
                    <Input
                        key={index}
                        label=""
                        variant="bordered"
                        placeholder={placeholder}
                        endContent={
                            <button
                                className="focus:outline-none"
                                type="button"
                                onClick={toggleVisibility}
                                aria-label="toggle password visibility">
                                    {isVisible ? (
                                        <EyeFilledIcon  className="text-2xl text-default-400 pointer-events-none" />
                                    
                                ) : (
                                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" /> 
                                )}
                                </button>
                        }
                        type={setIsVisible ? "text" : "password"}
                        className="w-full"
                        />
                ))}

                <div className='flex gap-2 w-full sm:w-[20rem] text-sm'>

                    <Checkbox lineThrough 
                    className='text-nowrap'>
                    </Checkbox>
                
                    <p className='text-nowrap'>I have read and agree to the</p>

                    <a href="#" className='underline text-nowrap'>
                    terms of service</a>
                
                </div>
            
            
                <Button color="primary" className="w-full sm:w-[20rem]">
                Confirm
                </Button>

                <div className='flex gap-2 items-center justify-center'>
                <p className=''>Already have and acoount?</p>
                <a href="#" className='underline text-sm'>Sign in</a>
                </div>

                <a href="#" className='underline text-sm'>Privacy Policy</a>



            </div>
        </div>
    );
}

export default Login;
