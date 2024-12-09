import { useState } from "react";
import { Button, Form, Input } from "@nextui-org/react";
import "./auth.css";
import { Link } from "react-router-dom";
import axios from "axios";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [showError, setShowError] = useState(false);

    // ฟังก์ชันตรวจสอบรูปแบบอีเมล
    const isValidEmail = (email) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Regular Expression สำหรับตรวจสอบอีเมล

    // ฟังก์ชันจัดการการส่งคำขอรีเซ็ตรหัสผ่าน
    const handleForgotPassword = async (event) => {
        event.preventDefault(); // ป้องกันการ Refresh หน้า
        // ตรวจสอบรูปแบบอีเมล
        if (!isValidEmail(email)) {
            setShowError(true); // แสดงข้อผิดพลาดถ้าอีเมลไม่ถูกต้อง
            alert("Invalid email format"); // แจ้งผู้ใช้ว่ารูปแบบอีเมลไม่ถูกต้อง
            return;
        }

        try {
            // ส่งคำขอ POST ไปยัง API พร้อมอีเมลที่ผู้ใช้กรอก
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/user/forgot-password`,
                { email }
            );
            alert(response.data.message); // แจ้งข้อความจากเซิร์ฟเวอร์เมื่อสำเร็จ
            setShowError(false); // ปิดข้อความข้อผิดพลาด
        } catch (error) {
            // ตรวจสอบประเภทข้อผิดพลาด
            if (error.response) {
                // ข้อผิดพลาดจากฝั่งเซิร์ฟเวอร์
                alert(error.response.data.message || "Server error");
            } else if (error.request) {
                // ไม่สามารถเชื่อมต่อกับ API ได้
                alert("Network error, please try again later");
            } else {
                // ข้อผิดพลาดที่ไม่คาดคิด
                alert("Unexpected error occurred");
            }
            setShowError(true); // แสดงข้อความข้อผิดพลาด
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
                </Form>


            </div>
        </div>
    );
};

export default ForgotPasswordPage;

