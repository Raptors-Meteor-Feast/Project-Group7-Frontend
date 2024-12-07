import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import { useState, useEffect } from "react";
import SearchBox from "./SearchBox";
import { Link } from "react-router-dom";
import axios from "axios"; // เพิ่ม axios

export default function Nav() {
    const [logIn, setLogIn] = useState(false); // เก็บสถานะการล็อกอิน
    const [userData, setUserData] = useState(null); // เก็บข้อมูลผู้ใช้จาก backend
    console.log("User Data:", userData);

    // ตรวจสอบ token เมื่อโหลดหน้าเว็บ
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            try {
                const parsedToken = JSON.parse(token); // แปลงเป็นอ็อบเจ็กต์
                setLogIn(!!parsedToken); // ตรวจสอบว่ามี token หรือไม่
            } catch (error) {
                // ถ้าไม่สามารถแปลงได้ ก็ถือว่า token เป็นสตริงปกติ
                setLogIn(true);
            }
        }
    }, []);

    // ดึงข้อมูลผู้ใช้จาก backend เมื่อ logIn เป็น true
    useEffect(() => {
        const fetchUserData = async () => {
            if (logIn) {
                try {
                    const token = localStorage.getItem("authToken"); // ดึง token
                    console.log("Token:", token);
                    const response = await axios.get("http://localhost:4000/api/user/data", {
                        headers: {
                            Authorization: `Bearer ${token}` // ส่ง token ไปใน header
                        }
                    });
                    console.log("Response:", response.data);
                    setUserData(response.data); // เก็บข้อมูลใน state
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setLogIn(false); // หากเกิดข้อผิดพลาดให้เปลี่ยนสถานะเป็น logOut
                }
            }
        };

        fetchUserData();
    }, [logIn]); // จะทำงานเมื่อ logIn เปลี่ยน

    // ฟังก์ชันล็อกอิน
    const handleLogIn = async () => {
        try {
            const response = await axios.post("http://localhost:4000/api/user/login", { email, password });
            const token = response.data.token; // สมมติว่า token มาจาก response

            if (token) {
                // แปลง token เป็น string ก่อนเก็บ
                if (typeof token !== "string") {
                    localStorage.setItem("authToken", JSON.stringify(token)); // แปลง token เป็น string
                } else {
                    localStorage.setItem("authToken", token); // เก็บ token เป็นสตริง
                }
                setLogIn(true);
                alert("Logged in successfully!");
            } else {
                alert("Login failed: No token received.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed: " + (error.response?.data?.message || "An error occurred."));
        }
    };

    // ฟังก์ชันล็อกเอาต์
    const handleLogout = () => {
        localStorage.removeItem("authToken"); // ลบ token ออกจาก localStorage
        setLogIn(false); // เปลี่ยนสถานะเป็นล็อกเอาต์
        setUserData(null); // ล้างข้อมูลผู้ใช้
        alert("You have been logged out.");
    };

    return (
        <div className="bg-neutral-900 sticky top-0 w-full z-50">
            <div className="flex justify-between items-center py-[24px]">

                {/* Logo and Brand Name */}
                <div className="flex items-center ml-36">
                    <Link to="/">
                        <img
                            src="../src/Images/NavIcon/Gr-Logo-7.svg"
                            alt="Raptor-Logo"
                            className="w-[55px] h-auto object-cover mr-2"
                        />
                    </Link>
                    <p className="hidden sm:block font-bold text-orange-500 text-[18px]">Raptors Meteor Feast</p>
                </div>

                <div className="flex items-center gap-5">
                    {/* Search Input */}
                    <div>
                        <SearchBox />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    {/* Cart Section */}
                    <div className="flex items-center gap-4 w-[] mr-8">
                        <p className="text-orange-500 font-bold text-[18px]">Browse</p>
                        <p className="text-orange-500 font-bold text-[18px]">Cart</p>
                        <Link to="/checkout">
                            <button className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 w-[50px] rounded-xl text-white">0</button>
                        </Link>
                    </div>

                    {/* Login / Logout Dropdown */}
                    {!logIn ? (
                        <div className="mr-36">
                            <Dropdown placement="bottom-end">
                                <DropdownTrigger>
                                    <Avatar
                                        isBordered
                                        as="button"
                                        className="transition-transform"
                                        color="secondary"
                                        name="Guest"
                                        size="md"
                                        src="../src/Images/NavIcon/user.png"
                                        aria-label="Sign In"
                                    />
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Profile Actions" variant="flat">
                                    <DropdownItem key="log_in">
                                        <Link to="/login" className="text-orange-500 font-bold">
                                            Sign In
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem key="register">
                                    <Link to="/register" className="text-blue-600 font-bold">
                                            Register
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem key="settings">Settings</DropdownItem>
                                    <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    ) : (
                        <div className="mr-36">
                            <Dropdown placement="bottom-end">
                                <DropdownTrigger>
                                    <Avatar
                                        isBordered
                                        as="button"
                                        className="transition-transform"
                                        color="secondary"
                                        name={userData?.displayName || "User"} // แสดงชื่อผู้ใช้
                                        size="md"
                                        src={userData?.avatar || "../src/Images/NavIcon/user.png"} // แสดงรูปโปรไฟล์
                                        aria-label="User Profile"
                                    />
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Profile Actions" variant="flat">
                                    <DropdownItem key="profile" className="h-14 gap-2">
                                        <p className="font-semibold">{userData?.displayName || "No name provided"}</p>
                                        <p className="font-semibold">{userData?.email || "No email provided"}</p>
                                    </DropdownItem>
                                    <DropdownItem key="settings">My Settings</DropdownItem>
                                    <DropdownItem key="team_settings">Team Settings</DropdownItem>
                                    <DropdownItem key="analytics">Analytics</DropdownItem>
                                    <DropdownItem key="system">System</DropdownItem>
                                    <DropdownItem key="configurations">Configurations</DropdownItem>
                                    <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                                    <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                                        Log Out
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
