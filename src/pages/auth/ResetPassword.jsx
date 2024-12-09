import { Input, Button } from "@nextui-org/react";
import { useState, useMemo } from "react";
// import { EyeFilledIcon } from "../../../public/LogoLogin/EyeFilledIcon";
// import { EyeSlashFilledIcon } from "../../../public/LogoLogin/EyeSlashFilledIcon";
import "./auth.css";
import { Link } from "react-router-dom";

const ResetPassword = () => {
    const [password, setPassword] = useState("");  // Stores the user's password
    const [confirmPassword, setConfirmPassword] = useState("");  // Stores the confirmation password
    const [formSubmitted, setFormSubmitted] = useState(false);  // Tracks if the form has been submitted
    const [isVisible, setIsVisible] = useState(false);  // Toggle visibility for password input

    const toggleVisibility = () => setIsVisible(!isVisible);

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
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevents default form submission behavior

        setFormSubmitted(true);  // Mark that the form has been submitted

        // Check if all fields are filled and valid
        if (!password || isPasswordInvalid || password !== confirmPassword) {
            alert("Error: Please fill in all fields correctly.");  // If any field is invalid, show an error message
            return;
        }

        // Clear the form after submission to reset the fields

        setPassword("");
        setConfirmPassword("");
        setFormSubmitted(false);  // Reset the form submission state
    };

    return (

        <div className='flex justify-center items-center bg-neutral-950 min-h-screen'>
            <div className="flex flex-col items-center gap-2 p-8 rounded-xl text-white bg-neutral-900 w-full max-w-md sm:w-[50%] m-10">

                <Link to="/" className="flex justify-center items-center w-full mb-4">
                    <img
                        className="w-1/2 sm:w-[60%] hover:scale-110 transition duration-300 ease-in-out"
                        src="Images/ProjectLogo/WebLogo.svg"
                        alt="logo"
                    />
                </Link>

                <form onSubmit={handleSubmit}
                    className='flex flex-col gap-4 w-full pt-4 pb-4 max-w-xs'>

                    <Input
                        type={isVisible ? "text" : "password"}
                        variant="bordered"
                        value={password}
                        isInvalid={isPasswordInvalid}
                        label="New Password"
                        labelPlacement="outside"
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
                                {/* {isVisible ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-xl text-default-400 pointer-events-none" />
                                )} */}
                            </button>
                        }
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Input
                        type={isVisible ? "text" : "password"}
                        variant="bordered"
                        value={confirmPassword}
                        label="Confirm Password"
                        labelPlacement="outside"
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
                                {/* {isVisible ? (
                                    <EyeSlashFilledIcon className="text-xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-xl text-default-400 pointer-events-none" />
                                )} */}
                            </button>
                        }
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />


                    <Button
                        type="submit"
                        color="primary"
                        className="w-full text-sm"
                    >
                        Confirm
                    </Button>

                </form>
            </div>
        </div>




    );
}
export default ResetPassword;