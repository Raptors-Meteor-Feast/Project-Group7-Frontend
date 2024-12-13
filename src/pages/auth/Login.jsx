import { useState, useMemo, useEffect } from 'react';
import { Input, Button } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import { IoMdMail } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./auth.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const navigate = useNavigate();

    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email) => {
        return email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
    };

    const isEmailInvalid = useMemo(() => {
        if (!isFormSubmitted && email === "") return false;
        return !validateEmail(email);
    }, [email, isFormSubmitted]);

    const validatePassword = (password) => {
        const hasMinLength = password.length >= 8;
        const hasLowercase = /[a-z]/.test(password);
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return hasMinLength && hasLowercase && hasUppercase && hasNumber && hasSymbol;
    };

    const isPasswordInvalid = useMemo(() => {
        if (!isFormSubmitted && password === "") return false;
        return !validatePassword(password);
    }, [password, isFormSubmitted]);

    const getPasswordErrorMessage = () => {
        if (!password && isFormSubmitted) return "Password is required";
        if (password && !validatePassword(password)) {
            return "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character";
        }
        return "";
    };

    const baseURL = import.meta.env.VITE_API_BASE_URL;

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsFormSubmitted(true);

        if (!email || !password || isEmailInvalid || isPasswordInvalid) {
            toast.error("Please check your email or password and try again!");
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(`${baseURL}/api/user/login`, { email, password });

            const token = response.data.token;

            localStorage.setItem("authToken", token);

            if (response.data.userId) {
                setUserId(response.data.userId); // เก็บ userId ที่ได้จาก API
              }
            toast.success("Successfully Logged In!");
            navigate("/");

        } catch (error) {
            console.error(error);
            toast.error("Server error or invalid credentials, please try again later.");
        } finally {
            setIsLoading(false);
        }

        setEmail("");
        setPassword("");
        setIsFormSubmitted(false);
    };

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            navigate("/");
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
                            <IoMdMail className="text-xl text-default-400 pointer-events-none" />
                        }
                        onChange={(event) => setEmail(event.target.value)} // Save user input to state
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
                                onClick={() => setIsVisible(!isVisible)} // Function to toggle password visibility
                            >
                                {isVisible ? (
                                    <FaEyeSlash className="text-xl text-default-400 pointer-events-none" />
                                ) : (
                                    <FaEye className="text-xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        onChange={(event) => setPassword(event.target.value)} // Save user input to state
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

