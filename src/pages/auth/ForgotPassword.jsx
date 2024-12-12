import { useState } from "react";
import { Button, Form, Input } from "@nextui-org/react";
import "./auth.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [showError, setShowError] = useState(false);

    const isValidEmail = (email) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleForgotPassword = async (event) => {
        event.preventDefault();
        if (!isValidEmail(email)) {
            setShowError(true);
            toast.error("Invalid email format", {
                position: "top-center",
                autoClose: 3000,
            });
            return;
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/user/forgot-password`,
                { email }
            );
            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 3000,
            });
            setShowError(false);
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || "Server error", {
                    position: "top-center",
                    autoClose: 3000,
                });
            } else if (error.request) {
                toast.error("Network error, please try again later", {
                    position: "top-center",
                    autoClose: 3000,
                });
            } else {
                toast.error("Unexpected error occurred", {
                    position: "top-center",
                    autoClose: 3000,
                });
            }
            setShowError(true);
        }
    };

    return (
        <div className="flex justify-center items-center bg-neutral-950 min-h-screen">
            <div className="flex flex-col items-center gap-2 p-8 rounded-xl text-white bg-neutral-900 w-full max-w-md sm:w-[50%] m-10">
                <Link to="/" className="flex justify-center items-center w-full mb-4">
                    <img
                        className="w-1/2 sm:w-[60%] hover:scale-110 transition duration-300 ease-in-out"
                        src="Images/ProjectLogo/WebLogo.svg"
                        alt="logo"
                    />
                </Link>
                <Form
                    className="w-full pt-2 pb-4 max-w-xs "
                    validationBehavior="native"
                    onSubmit={handleForgotPassword}
                >
                    <Input
                        isRequired
                        variant="bordered"
                        errorMessage={showError ? "Please enter a valid email" : null}
                        label="Email"
                        labelPlacement="outside"
                        name="email"
                        placeholder="Enter your email"
                        type="email"
                        value={email}
                        onValueChange={setEmail}
                    />
                    <Button
                        type="submit"
                        color="primary"
                        className="w-full mt-4"
                    >
                        Submit
                    </Button>
                    <Link to="/reset-password/:token" className="w-full mt-4 text-blue-200">
                        For Test Don`t Click Reset Password
                    </Link>

                    <Link to="/verify-email/:token" className="w-full mt-4 text-blue-500">
                        For Test Don`t Click Verify Email
                    </Link>
                </Form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
