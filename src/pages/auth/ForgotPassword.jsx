import { useState } from "react";
import { Button, Form, Input } from "@nextui-org/react";
import "./auth.css";
import { Link } from "react-router-dom";
import axios from "axios";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [showError, setShowError] = useState(false);

    const handleForgotPassword = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/user/forgot-password`,
                { email }
            );
            alert(response.data.message);
        } catch (error) {
            setShowError(true);
            alert(error.response?.data?.message || "Something went wrong");
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
                        Reset Password
                    </Link>
                </Form>


            </div>
        </div>
    );
};

export default ForgotPasswordPage;

