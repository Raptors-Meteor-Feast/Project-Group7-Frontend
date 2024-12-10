import { Input, Button } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import "./auth.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const validatePassword = (password) =>
        password.length >= 8 &&
        /[a-z]/.test(password) &&
        /[A-Z]/.test(password) &&
        /\d/.test(password) &&
        /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const isPasswordInvalid = useMemo(() => {
        if (!formSubmitted && !newPassword) return false;
        return !validatePassword(newPassword);
    }, [newPassword, formSubmitted]);

    const getPasswordErrorMessage = () => {
        if (!newPassword && formSubmitted) return "Password is required";
        if (isPasswordInvalid) {
            return "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character";
        }
        return "";
    };

    const getConfirmPasswordErrorMessage = () => {
        if (formSubmitted) {
            if (!confirmNewPassword) {
                return "Confirm Password is required";
            }
            if (confirmNewPassword !== newPassword) {
                return "Passwords do not match";
            }
        }
        return "";
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        setFormSubmitted(true);

        if (!newPassword || isPasswordInvalid || newPassword !== confirmNewPassword) {
            toast.error("Please fill in all fields correctly.");
            return;
        }

        try {
            const response = await axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/user/reset-password/${token}`,
                { newPassword }
            );
            toast.success(response.data.message);
        } catch (error) {
            console.error("Error resetting password:", error);
            toast.error(
                error.response?.data?.message || "Server error, please try again later"
            );
        }
    };

    return (
        <div className="flex justify-center items-center bg-neutral-950 min-h-screen">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="flex flex-col items-center gap-2 p-8 rounded-xl text-white bg-neutral-900 w-full max-w-md sm:w-[50%] m-10">
                <Link to="/" className="flex justify-center items-center w-full mb-4">
                    <img
                        className="w-1/2 sm:w-[60%] hover:scale-110 transition duration-300 ease-in-out"
                        src="/Images/ProjectLogo/WebLogo.svg"
                        alt="logo"
                    />
                </Link>

                <form onSubmit={handleResetPassword}
                    className="flex flex-col gap-4 w-full pt-4 pb-4 max-w-xs">
                    <Input
                        type={isVisible ? "text" : "password"}
                        variant="bordered"
                        value={newPassword}
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
                                {isVisible ? (
                                    <FaEyeSlash className="text-xl text-default-400 pointer-events-none" />
                                ) : (
                                    <FaEye className="text-xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <Input
                        type={isVisible ? "text" : "password"}
                        variant="bordered"
                        value={confirmNewPassword}
                        label="Confirm New Password"
                        labelPlacement="outside"
                        isInvalid={confirmNewPassword !== newPassword && formSubmitted}
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
                                    <FaEyeSlash className="text-xl text-default-400 pointer-events-none" />
                                ) : (
                                    <FaEye className="text-xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
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
};

export default ResetPassword;
