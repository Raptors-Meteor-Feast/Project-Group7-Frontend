import { useState, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import { Input, Button, Checkbox } from "@nextui-org/react";
import { EyeFilledIcon } from "../../assets/LogoLogin/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../assets/LogoLogin/EyeSlashFilledIcon";
import { MailIcon } from '../../assets/LogoLogin/Maillcon';
import { GiDinosaurRex } from "react-icons/gi";
import { Link } from "react-router-dom";
import "./login.css";

const Login = () => {
    const navigate = useNavigate(); // For navigation

    // State management to store the values of each form field
    const [isVisible, setIsVisible] = useState(false);  // Toggle visibility for password input
    const [email, setEmail] = useState("");  // Stores the user's email
    const [password, setPassword] = useState("");  // Stores the user's password
    const [confirmPassword, setConfirmPassword] = useState("");  // Stores the confirmation password
    const [firstname, setFirstName] = useState("");  // Stores the user's first name
    const [lastname, setLastName] = useState("");  // Stores the user's last name
    const [displayname, setDisplayName] = useState("");  // Stores the display name
    const [isAgreed, setIsAgreed] = useState(false);  // Checks if the user agrees to terms
    const [formSubmitted, setFormSubmitted] = useState(false);  // Tracks if the form has been submitted

    // Toggle function to show or hide the password
    const toggleVisibility = () => setIsVisible(!isVisible);

    // Error messages for required fields
    const getFisrtNameErrorMessage = () => {
        if (!firstname && formSubmitted) return "First Name is required";  // If no first name is provided after submit, show error
        return "";
    };

    const getLastNameErrorMessage = () => {
        if (!lastname && formSubmitted) return "Last Name is required";  // If no last name is provided after submit, show error
        return "";
    };

    const getDisplayNameErrorMessage = () => {
        if (!displayname && formSubmitted) return "Display Name is required";  // If no display name is provided after submit, show error
        return "";
    };

    // Email validation using regular expression (regex) to check valid email format
    const validateEmail = (email) => {
        return email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);  // Checks if email matches standard format
    };

    // Memoized function to check if email is invalid
    const isEmailInvalid = useMemo(() => {
        if (!formSubmitted && email === "") return false;  // Don't check email if the form hasn't been submitted yet
        return !validateEmail(email);  // Check if email is valid
    }, [email, formSubmitted]);

    // Password validation function
    const validatePassword = (password) => {
        const hasMinLength = password.length >= 8;  // Password must be at least 8 characters
        const hasLowercase = /[a-z]/.test(password);  // Must contain lowercase letters
        const hasUppercase = /[A-Z]/.test(password);  // Must contain uppercase letters
        const hasNumber = /\d/.test(password);  // Must contain numbers
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);  // Must contain special characters
        return hasMinLength && hasLowercase && hasUppercase && hasNumber && hasSymbol;  // Return true if all conditions are met
    };

    // Memoized function to check if password is invalid
    const isPasswordInvalid = useMemo(() => {
        if (!formSubmitted && password === "") return false;  // Don't check password if the form hasn't been submitted yet
        return !validatePassword(password);  // Check if password meets requirements
    }, [password, formSubmitted]);

    // Password error message generator
    const getPasswordErrorMessage = () => {
        if (!password && formSubmitted) return "Password is required";  // If password is empty after form submit, show error
        if (password && !validatePassword(password)) {
            return "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character";  // Detailed error message for invalid password
        }
        return "";
    };

    // Confirm password validation
    const getConfirmPasswordErrorMessage = () => {
        if (formSubmitted) {
            if (!confirmPassword) {
                return "Confirm Password is required";  // If confirm password is empty after form submit, show error
            }
            if (confirmPassword !== password) {
                return "Passwords do not match";  // If passwords don't match, show error
            }
        }
        return "";
    };


    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();  // Prevents default form submission behavior

        setFormSubmitted(true);  // Mark that the form has been submitted

        // Check if all fields are filled and valid
        if (!email || isEmailInvalid || !password || isPasswordInvalid || password !== confirmPassword || !firstname || !lastname || !displayname || !isAgreed) {
            alert("Error: Please fill in all fields correctly.");  // If any field is invalid, show an error message
            return;
        }

        // If all fields are valid, show a success message with the registered email and password
        alert(
            `Successfully Registered!\n` +
            `Email: ${email}\n` +
            `Password: ${password}`
        );

        // Redirect to login page
        navigate("/login");

        // Clear the form after submission to reset the fields
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFirstName("");
        setLastName("");
        setDisplayName("");
        setIsAgreed(false);
        setFormSubmitted(false);  // Reset the form submission state
    };

    return (
        <div className='flex justify-center items-center bg-neutral-950 min-h-screen'>
        <div className="flex flex-col items-center gap-2 p-8 rounded-xl text-white bg-neutral-900 w-full max-w-md sm:w-[50%] m-10">
            <div className='flex justify-center items-center'>
                <img 
                    className='w-1/3 sm:w-[60%] hover:animate-spin' 
                    src="Images/ProjectLogo/Logo-7.svg" 
                    alt="logo" />
            </div>
    
            <h1 className="text-sm sm:text-base font-bold mb-4 hover:animate-bounce">Create Account</h1>
        
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>
                
                <div className='flex gap-4'>
                <Input
                    type="text"
                    variant="bordered"
                    placeholder="First Name"
                    isInvalid={formSubmitted && !firstname}
                    value={firstname}
                    className="w-full"
                    onChange={(e) => setFirstName(e.target.value)}
                    errorMessage={getFisrtNameErrorMessage()}
                />
    
                <Input
                    type="text"
                    variant="bordered"
                    placeholder="Last Name"
                    isInvalid={formSubmitted && !lastname}
                    value={lastname}
                    className="w-full"
                    onChange={(e) => setLastName(e.target.value)}
                    errorMessage={getLastNameErrorMessage()}
                />

                </div>

                <Input
                    type="text"
                    variant="bordered"
                    placeholder="Display Name"
                    isInvalid={formSubmitted && !displayname}
                    value={displayname}
                    className="w-full"
                    endContent={
                        <GiDinosaurRex className="text-xl text-default-400 pointer-events-none" />
                    }
                    onChange={(e) => setDisplayName(e.target.value)}
                    errorMessage={getDisplayNameErrorMessage()}
                />
    
                <Input
                    type="email"
                    variant="bordered"
                    isInvalid={isEmailInvalid}
                    placeholder="Email Address"
                    value={email}
                    className="w-full"
                    endContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none" />
                    }
                    errorMessage={isEmailInvalid ? "Please enter a valid email." : ""}
                    onChange={(e) => setEmail(e.target.value)}
                />
    
                <Input
                    type={isVisible ? "text" : "password"}
                    variant="bordered"
                    value={password}
                    isInvalid={isPasswordInvalid}
                    errorMessage={getPasswordErrorMessage()}
                    placeholder="Enter your password"
                    classNames={{
                        input: ["bg-transparent"],
                        innerWrapper: ["bg-transparent"],
                        inputWrapper: [
                            "bg-transparent",
                            "hover:bg-default-100/10",
                            "group-data-[focused=true]:bg-default-100/10",
                            "!cursor-text",
                        ],
                    }}
                    endContent={
                        <button
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleVisibility}
                        >
                            {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <EyeFilledIcon className="text-xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    }
                    onChange={(e) => setPassword(e.target.value)}
                />
    
                <Input
                    type={isVisible ? "text" : "password"}
                    variant="bordered"
                    value={confirmPassword}
                    isInvalid={confirmPassword !== password && formSubmitted}
                    errorMessage={getConfirmPasswordErrorMessage()}
                    placeholder="Confirm your password"
                    classNames={{
                        input: ["bg-transparent"],
                        innerWrapper: ["bg-transparent"],
                        inputWrapper: [
                            "bg-transparent",
                            "hover:bg-default-100/10",
                            "group-data-[focused=true]:bg-default-100/10",
                            "!cursor-text",
                        ],
                    }}
                    endContent={
                        <button
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleVisibility}
                        >
                            {isVisible ? (
                                <EyeSlashFilledIcon className="text-xl text-default-400 pointer-events-none" />
                            ) : (
                                <EyeFilledIcon className="text-xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    }
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
    
                <div className='flex w-full text-sm gap-1'>
                    <Checkbox 
                        checked={isAgreed} 
                        onChange={() => setIsAgreed(!isAgreed)} 
                        className='text-nowrap'
                    />
                    <p className='text-nowrap'>I have read and agree</p>
                    <Link to="#" className='underline text-nowrap text-primary text-sm hover:underline hover:text-red-500'>terms of service</Link>
                </div>
        
                <Button 
                    type='submit' 
                    color="primary" 
                    className="w-full"
                    isDisabled={!isAgreed}
                >
                    Confirm
                </Button>
            </form>
    
            <div className='flex gap-2 items-center justify-center'>
                <p className='text-sm'>Already have an account?</p>
                <Link to="/login" className='underline text-primary text-sm hover:underline hover:text-red-500'>Sign in</Link>
            </div>
    
            <Link to="#" className='underline text-primary text-sm hover:underline hover:text-red-500'>Privacy Policy</Link>
        </div>
    </div>
    
    );
};

export default Login;
