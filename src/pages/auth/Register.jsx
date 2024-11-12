import React, { useState } from 'react';
import { Input } from "@nextui-org/input";
import { EyeFilledIcon } from "../../assets/LogoLogin/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../assets/LogoLogin/EyeSlashFilledIcon";
import { Button } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
import { MailIcon } from '../../assets/LogoLogin/Maillcon';
import { GiDinosaurRex } from "react-icons/gi";

import "./login.css"

const Login = () => {
    // State for toggling password visibility
    const [isVisible, setIsVisible] = React.useState(false);
   // Function to toggle password visibility
    const toggleVisibility = () => setIsVisible(!isVisible);

    // States for storing form inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [value, setValue] = React.useState("");
    const [firstname ,setFirstName] = useState("");
    const [lastname ,setLastName] = useState("");
    const [displayname , setDisplayName] = useState("");
    const [isAgreed, setIsAgreed] = useState(false);

     // Function to validate email format
    const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
    
    // Memoized check if email is invalid
    const isInvalid = React.useMemo(() => {
        return value !== "" && !validateEmail(value);
    }, [value]);

      // Form submit handler
    function handleSubmit(e) {
        e.preventDefault();// Prevents default form submission

        //Check for empty fields
        if (email && password && firstname && lastname && displayname 
            && password === confirmPassword) {
            alert(
                `Successfully!`
            );

            //Clear the form after submission
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setValue("");
            setFirstName("");
            setLastName("");
            setDisplayName("");
            setIsAgreed(false);
        } else {
            alert("Error: Please fill in all fields.")
        }
    }

    return (
        <div className='flex justify-center items-center bg-neutral-950 h-screen'>
            <div className="flex flex-col items-center gap-4 p-8 rounded-sm text-white bg-neutral-900 w-full max-w-sm sm:w-[30%]">
                <div className='flex justify-center items-center'>
                    <img className='w-2/3 sm:w-[60%]' src="src/assets/ProjectLogo/Logo-7.svg" alt="logo" />
                </div>

                <h1 className="text-xl sm:text-2xl">Create Account</h1>
            
            <form onSubmit={handleSubmit}
            className='flex flex-col items-center gap-3 p-2 max-w-sm'>
            <Input
                    type="text"
                    label=""
                    variant="bordered"
                    color='default-500'
                    placeholder="First Name"
                    defaultValue=""
                    className="w-full"
                    onChange={(e) => {
                        setFirstName(e.target.value)
                    }}
                />

                <Input
                    type="text"
                    label=""
                    variant="bordered"
                    color='default-500'
                    placeholder="Last Name"
                    defaultValue=""
                    className="w-full"
                    onChange={(e) => {
                        setLastName(e.target.value)
                    }}
                />
        

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
                    onChange={(e) => {
                        setDisplayName(e.target.value)
                    }}
                />

                
                
                <Input
                    value={value}
                    type="email"
                    label=""
                    variant="bordered"
                    isInvalid={isInvalid}
                    color='default-500'
                    placeholder="Email Address"
                    defaultValue=""
                    className="w-full"
                    endContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    errorMessage={isInvalid ? "Please enter a valid email." : ""}
                    onChange={(e) => {
                        setValue(e.target.value)
                        setEmail(e.target.value)
                    }}
                />

{["Password", "Confirm Password"].map((placeholder, index) => (
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
                                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                    )}
                                </button>
                            }
                            type={isVisible ? "text" : "password"}
                            className="w-full max-w-xs"
                            onChange={(e) => {
                                if (placeholder === "Password") {
                                    setPassword(e.target.value);
                                } else {
                                    setConfirmPassword(e.target.value); // จัดการกับฟิลด์ยืนยันรหัสผ่าน
                                }
                            }}
                        />
                    ))}

                <div className='flex gap-2 w-full sm:w-[20rem] text-sm'>

                    <Checkbox 
                    checked={isAgreed} 
                    onChange={() => setIsAgreed(!isAgreed)} 
                    lineThrough 
                    className='text-nowrap'
                    >
                    </Checkbox>
                
                    <p className='text-nowrap'>I have read and agree</p>

                    <a href="#" className='underline text-nowrap'>
                    terms of service</a>
                
                </div>
            
            
                <Button 
                type='submit' 
                color="primary" 
                className="w-full sm:w-[20rem]"
                disabled={!isAgreed}
                >
                Confirm
                </Button>

                </form>

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
