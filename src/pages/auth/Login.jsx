import { useState, useMemo, useEffect } from 'react';
import { Input, Button } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import { EyeFilledIcon } from "../../assets/LogoLogin/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../assets/LogoLogin/EyeSlashFilledIcon";
import { MailIcon } from '../../assets/LogoLogin/Maillcon';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./auth.css";

const Login = () => {
    const navigate = useNavigate(); // Hook for navigation

    // State management for storing input values and controlling display
    const [isVisible, setIsVisible] = useState(false); // State to control password visibility (show/hide)
    const [email, setEmail] = useState(""); // State to store the email input
    const [password, setPassword] = useState(""); // State to store the password input
    const [formSubmitted, setFormSubmitted] = useState(false); // Tracks whether the form has been submitted
    const [loading, setLoading] = useState(false); // Tracks whether the form is loading

    // Function to toggle password visibility
    const toggleVisibility = () => setIsVisible(!isVisible);

    // Function to validate the entered email
    const validateEmail = (email) => {
        // Check if the email matches the standard email format
        return email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    };

    // Check if the entered email is valid or not
    const isEmailInvalid = useMemo(() => {
        if (!formSubmitted && email === "") return false; // If the form is not submitted or the email is empty, consider it valid
        return !validateEmail(email); // If it does not match the format, consider it invalid
    }, [email, formSubmitted]);

    // Function to validate the entered password
    const validatePassword = (password) => {
        const hasMinLength = password.length >= 8; // Check if password is at least 8 characters long
        const hasLowercase = /[a-z]/.test(password); // Check if password contains a lowercase letter
        const hasUppercase = /[A-Z]/.test(password); // Check if password contains an uppercase letter
        const hasNumber = /\d/.test(password); // Check if password contains a number
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Check if password contains a special character

        // Password must meet all the above criteria
        return hasMinLength && hasLowercase && hasUppercase && hasNumber && hasSymbol;
    };

    // Check if the entered password is valid or not
    const isPasswordInvalid = useMemo(() => {
        if (!formSubmitted && password === "") return false; // If the form is not submitted or the password is empty, consider it valid
        return !validatePassword(password); // If it does not meet the criteria, consider it invalid
    }, [password, formSubmitted]);

    // Function to get the error message for invalid password
    const getPasswordErrorMessage = () => {
        if (!password && formSubmitted) return "Password is required"; // If no password is entered after form submission, show an error
        if (password && !validatePassword(password)) {
            // If password is invalid, show a message with password requirements
            return "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character";
        }
        return ""; // If password is valid, no error message
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload on form submit
        setFormSubmitted(true); // Mark that the form has been submitted

        if (!email || !password || isEmailInvalid || isPasswordInvalid) {
            // If any field is invalid, show an error message
            return;
        }

        // Set loading state to true
        setLoading(true); // Set loading state to true

        try {
            const response = await axios.post(
                "http://localhost:4000/api/user/login",
                {
                    email,
                    password,
                }
            );

            const token = response.data.token; // Extract the token from the response

            // Store the token in localStorage for future use (such as for authentication)
            localStorage.setItem("authToken", token); // Save the token in localStorage

            // If login is successful, show a success message
            alert("Successfully Logged In!");

            // Redirect to home page
            navigate("/");

        } catch (error) {
            console.error(error);
            alert("Login failed. Please try again."); // If login fails, show an error message
        } finally {
            // Set loading state to false
            setLoading(false); // Set loading state to false
        }

        // Reset the form
        setEmail("");
        setPassword("");
        setFormSubmitted(false);
    };

    // Check if token exists in localStorage and navigate if logged in
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            navigate("/"); // Redirect to home page if token is present
        }
    }, [navigate]);

    return (
        <div className="flex justify-center items-center bg-neutral-950 min-h-screen">
            <div className="flex flex-col items-center gap-2 p-8 rounded-xl text-white bg-neutral-900 w-full max-w-md sm:w-[50%] m-10">
                {/* Project logo */}

                <Link to="/" className="flex justify-center items-center w-full mb-4">
                    <img
                        className="w-1/2 sm:w-[60%] hover:scale-110 transition duration-300 ease-in-out"
                        src="Images/ProjectLogo/WebLogo.svg"
                        alt="logo"
                    />
                </Link>


                {/* Sign-in page header */}
                <h1 className="text-lg sm:text-xl font-bold mb-4 hover:scale-110 transition duration-300 ease-in-out">Sign In</h1>

                {/* Login form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full max-w-xs">
                    {/* Email field */}
                    <Input
                        type="email"
                        variant="bordered"
                        value={email}
                        isInvalid={isEmailInvalid}
                        errorMessage={isEmailInvalid && (email ? "Please enter a valid email" : "Email is required")}
                        placeholder="Enter your email"
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
                            <MailIcon className="text-xl text-default-400 pointer-events-none" />
                        }
                        onChange={(e) => setEmail(e.target.value)} // Save user input to state
                    />

                    {/* Password field */}
                    <Input
                        type={isVisible ? "text" : "password"} // Toggle password display based on visibility state
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
                                onClick={toggleVisibility} // Function to toggle password visibility
                            >
                                {isVisible ? (
                                    <EyeSlashFilledIcon className="text-xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        onChange={(e) => setPassword(e.target.value)} // Save user input to state
                    />

                    {/* Link to reset password */}
                    <div className="flex justify-start w-full">
                        <Button
                            as={Link}
                            to="/forgot-password"
                            variant="default"
                            className="p-0 text-primary text-sm hover:underline hover:text-red-500"
                        >
                            Forgot password?
                        </Button>
                    </div>

                    {/* Submit button */}
                    <Button
                        type="submit"
                        color="primary"
                        className="w-full text-sm"
                    >
                        Sign in
                    </Button>

                    {/* Divider text */}
                    <div className="flex items-center gap-2 my-4">
                        <div className="flex-grow border-t border-white/20"></div>
                        <p className="text-xs text-white/60">or sign in with</p>
                        <div className="flex-grow border-t border-white/20"></div>
                    </div>

                    {/* Other buttons */}
                    <div>
                        <Button
                            as={Link}
                            to="/register"
                            variant="default"
                            className="w-full underline text-primary text-sm hover:underline hover:text-red-500"
                        >
                            Create account
                        </Button>

                        <Button
                            as={Link}
                            to="/"
                            variant="default"
                            className="w-full underline text-primary text-sm hover:underline hover:text-red-500"
                        >
                            Privacy Policy
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

