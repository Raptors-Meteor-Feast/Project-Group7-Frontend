import { useState } from "react";
import { Button, Form, Input } from "@nextui-org/react";
import "./auth.css"
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.currentTarget));

        setSubmitted(data);
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

                <Form
                    className="w-full pt-2 pb-4 max-w-xs "
                    validationBehavior="native"
                    onSubmit={onSubmit}>
                    <Input
                        isRequired
                        variant="bordered"
                        errorMessage="Please enter a valid email"
                        label="Email"
                        labelPlacement="outside"
                        name="email"
                        placeholder="Enter your email"
                        type="email"
                        value={email}
                        onValueChange={setEmail}
                    />

                    <Link to="/reset-password"
                        className="w-full mt-4">
                        <Button
                            type="submit"
                            color="primary"
                            className="w-full"
                        >
                            Submit
                        </Button>
                    </Link>


                    <Link to="/reset-password"
                        className="w-full mt-4">
                        Reset Password
                    </Link>


                </Form>




            </div>
        </div>
    );
}

export default ForgotPassword