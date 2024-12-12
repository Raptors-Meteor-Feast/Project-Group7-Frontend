import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyEmail = () => {
    const { token: verificationToken } = useParams();
    const navigate = useNavigate();
    const isToastDisplayed = useRef(false); // ใช้ ref เพื่อจัดการการแสดง toast

    useEffect(() => {
        const verifyEmail = async () => {
            if (!verificationToken) {
                if (!isToastDisplayed.current) {
                    toast.error('No verification token provided!');
                    isToastDisplayed.current = true; // ตั้งค่าเมื่อแสดง toast แล้ว
                }
                return;
            }

            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/user/verify-email/${verificationToken}`
                );

                if (response.status === 200) {
                    if (!isToastDisplayed.current) {
                        toast.success('Verification successful! Redirecting...');
                        isToastDisplayed.current = true; // ป้องกันการเด้งซ้ำ
                    }
                    setTimeout(() => navigate('/'), 5000);
                }
            } catch (error) {
                console.error('Verification error:', error.response?.data?.message || 'Unexpected error occurred.');
                if (!isToastDisplayed.current) {
                    toast.error(error.response?.data?.message || 'Unexpected error occurred.');
                    isToastDisplayed.current = true; // ป้องกันการเด้งซ้ำ
                }
            }
        };

        verifyEmail();
    }, [verificationToken, navigate]);

    return (
        <div className="flex flex-col items-center justify-center bg-neutral-950 min-h-screen">
            <Link to="/" className="flex justify-center items-center w-full mb-4 pb-4">
                <img
                    className="w-1/2 sm:w-[20%] hover:scale-110 transition duration-300 ease-in-out"
                    src="/Images/ProjectLogo/WebLogo.svg"
                    alt="logo"
                />
            </Link>

            <Link to="/login" className="flex justify-center items-center w-full mb-4 pb-4">
                <button className="flex text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
                    Verifying your email...
                </button>
            </Link>

        </div>
    );
};

export default VerifyEmail;
