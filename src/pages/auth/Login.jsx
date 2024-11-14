import React, { useState } from 'react';
import { Input } from "@nextui-org/input";
import { EyeFilledIcon } from "../../assets/LogoLogin/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../assets/LogoLogin/EyeSlashFilledIcon";
import { Button } from "@nextui-org/react";
import { MailIcon } from '../../assets/LogoLogin/Maillcon';
import "./login.css"
import { Link } from 'react-router-dom';

const Login = () => {
    // State to toggle password visibility
    const [isVisible, setIsVisible] = React.useState(false);
    // Toggle function for password visibility
    const toggleVisibility = () => setIsVisible(!isVisible);

    // State variables to store email and password values
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [value, setValue] = React.useState(""); // Email input field value

    // Function to validate email format
    const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    // Memoized value to check if the email is invalid, recalculated only when 'value' changes
    const isInvalid = React.useMemo(() => {
        return value !== "" && !validateEmail(value);
    }, [value]);



    // Form submit handler
    function handleSubmit(e) {
        e.preventDefault();// Prevents default form submission

        // Check for empty fields
        if (email && password) {
            alert(
                `Successfully!`
            );

            // Clear the form after submission
            setEmail("");
            setPassword("");
            setValue("");
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

                <h1 className="text-xl sm:text-2xl">Sign In</h1>

            <form onSubmit={handleSubmit}
            className='flex flex-col items-center gap-4 p-8 max-w-sm'>
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
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className='flex justify-between w-full'>
                    <a href="#" className='underline text-sm'>
                        Forgot password?
                    </a>
                </div>

                <Button 
                type='submit'
                color="primary" className="w-full sm:w-[20rem]">
                    Sign in
                </Button>

            </form>
                

                <div className='flex items-center gap-1 w-full'>
                    <div className='border-t flex-grow border-white'></div>
                    <p className='text-sm'>or sign in with</p>
                    <div className='border-t flex-grow border-white'></div>
                </div>
                
                <Link to="/register">Create account</Link>

            </div>
        </div>
    );
}

export default Login;
