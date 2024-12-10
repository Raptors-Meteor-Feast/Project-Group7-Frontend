import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Checkbox } from '@nextui-org/react';
import { IoMdMail } from 'react-icons/io';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { GiDinosaurRex } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './auth.css';

const Register = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [isAgreed, setIsAgreed] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const validateEmail = (email) => {
        return email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
    };

    const isEmailInvalid = useMemo(() => {
        if (!formSubmitted && email === '') return false;
        return !validateEmail(email);
    }, [email, formSubmitted]);

    const validatePassword = (password) => {
        const hasMinLength = password.length >= 8;
        const hasLowercase = /[a-z]/.test(password);
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return hasMinLength && hasLowercase && hasUppercase && hasNumber && hasSymbol;
    };

    const isPasswordInvalid = useMemo(() => {
        if (!formSubmitted && password === '') return false;
        return !validatePassword(password);
    }, [password, formSubmitted]);

    const getPasswordErrorMessage = () => {
        if (!password && formSubmitted) return 'Password is required';
        if (password && !validatePassword(password)) {
            return 'Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character';
        }
        return '';
    };

    const getConfirmPasswordErrorMessage = () => {
        if (formSubmitted) {
            if (!confirmPassword) {
                return 'Confirm Password is required';
            }
            if (confirmPassword !== password) {
                return 'Passwords do not match';
            }
        }
        return '';
    };

    const baseURL = import.meta.env.VITE_API_BASE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();

        setFormSubmitted(true);

        if (!email || isEmailInvalid || !password || isPasswordInvalid || password !== confirmPassword || !firstName || !lastName || !displayName || !isAgreed) {
            toast.error('Please fill in all fields correctly.');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                `${baseURL}/user/register`,
                { firstName, lastName, displayName, email, password }
            );

            toast.success('Successfully Registered!');
            navigate('/login');
        } catch (error) {
            console.error(error);
            toast.error('Server error or invalid credentials, please try again later.');
        } finally {
            setLoading(false);
        }

        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setFirstName('');
        setLastName('');
        setDisplayName('');
        setIsAgreed(false);
        setFormSubmitted(false);
    };

    return (
        <div className='flex justify-center items-center bg-neutral-950 min-h-screen'>
            <ToastContainer />
            <div className="flex flex-col items-center gap-2 p-8 rounded-xl text-white bg-neutral-900 w-full max-w-md sm:w-[50%] m-10">
                <Link to="/" className="flex justify-center items-center w-full mb-4">
                    <img
                        className="w-1/2 sm:w-[60%] hover:scale-110 transition duration-300 ease-in-out"
                        src="Images/ProjectLogo/WebLogo.svg"
                        alt="logo"
                    />
                </Link>

                <h1 className="text-sm sm:text-base font-bold mb-4 hover:animate-bounce">Create Account</h1>

                <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full max-w-xs'>

                    <div className='flex gap-4'>
                        <Input
                            type="text"
                            variant="bordered"
                            placeholder="First Name"
                            isInvalid={formSubmitted && !firstName}
                            value={firstName}
                            className="w-full"
                            onChange={(e) => setFirstName(e.target.value)}
                            errorMessage={formSubmitted && !firstName ? 'First Name is required' : ''}
                        />

                        <Input
                            type="text"
                            variant="bordered"
                            placeholder="Last Name"
                            isInvalid={formSubmitted && !lastName}
                            value={lastName}
                            className="w-full"
                            onChange={(e) => setLastName(e.target.value)}
                            errorMessage={formSubmitted && !lastName ? 'Last Name is required' : ''}
                        />

                    </div>

                    <Input
                        type="text"
                        variant="bordered"
                        placeholder="Display Name"
                        isInvalid={formSubmitted && !displayName}
                        value={displayName}
                        className="w-full"
                        endContent={
                            <GiDinosaurRex className="text-xl text-default-400 pointer-events-none" />
                        }
                        onChange={(e) => setDisplayName(e.target.value)}
                        errorMessage={formSubmitted && !displayName ? 'Display Name is required' : ''}
                    />

                    <Input
                        type="email"
                        variant="bordered"
                        isInvalid={isEmailInvalid}
                        placeholder="Email Address"
                        value={email}
                        className="w-full"
                        endContent={
                            <IoMdMail className="text-2xl text-default-400 pointer-events-none" />
                        }
                        errorMessage={isEmailInvalid ? 'Please enter a valid email.' : ''}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        type={isVisible ? 'text' : 'password'}
                        variant="bordered"
                        value={password}
                        isInvalid={isPasswordInvalid}
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
                        onChange={(e) => setPassword(e.target.value)}
                        errorMessage={getPasswordErrorMessage()}
                    />

                    <Input
                        type={isVisible ? 'text' : 'password'}
                        variant="bordered"
                        value={confirmPassword}
                        isInvalid={confirmPassword !== password && formSubmitted}
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
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        errorMessage={getConfirmPasswordErrorMessage()}
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

export default Register;

