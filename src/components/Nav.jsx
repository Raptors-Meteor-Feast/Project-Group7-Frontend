import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button} from "@nextui-org/react";
import { useState, useEffect } from "react";
import SearchBox from "./SearchBox";
import Gr7Logo from "/NavIcon/Gr7Logo.svg";
// import UserIcon from "/NavIcon/user.png";
import LoginLogo from "/NavIcon/loginlogo1.png";
import { Link } from "react-router-dom";
import { useCart } from "../components/Checkout/CartContext";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import { FaCartShopping } from "react-icons/fa6";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function Nav() {
    const [logIn, setLogIn] = useState(false); // เก็บสถานะการล็อกอิน
    const [userData, setUserData] = useState(null); // เก็บข้อมูลผู้ใช้จาก backend

    // ตรวจสอบ token เมื่อโหลดหน้าเว็บ
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            try {
                const parsedToken = JSON.parse(token); // แปลงเป็นอ็อบเจ็กต์
                setLogIn(!!parsedToken); // ตรวจสอบว่ามี token หรือไม่
            } catch (error) {
                // console.log(error)
                // ถ้าไม่สามารถแปลงได้ ก็ถือว่า token เป็นสตริงปกติ
                setLogIn(true);
            }
        }
    }, []);

    // ดึงข้อมูลผู้ใช้จาก backend เมื่อ logIn เป็น true
    useEffect(() => {
        const fetchUserData = async () => {
            if (logIn && !userData) {
                try {
                    const token = localStorage.getItem("authToken");
                    const response = await axios.get(`${API_URL}/api/user/data`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setUserData(response.data);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setLogIn(false);
                    localStorage.removeItem("authToken");
                }
            }
        };
        fetchUserData();
    }, [logIn, userData]);

    // ฟังก์ชันล็อกเอาต์
    const handleLogout = () => {
        localStorage.removeItem("authToken"); // ลบ token ออกจาก localStorage
        setLogIn(false); // เปลี่ยนสถานะเป็นล็อกเอาต์
        setUserData(null); // ล้างข้อมูลผู้ใช้
        toast.success("You have been logged out."); // Show success toast notification
    };

    const { cart } = useCart();
    const cartCount = cart.length;

    return (
        <div className="bg-neutral-900 sticky top-0 w-full z-50">
            <div className="flex justify-between items-center py-[24px]">
                {/* Logo and Brand Name */}
                <div className="flex items-center ml-36">
                    <Link to="/" className="flex justify-center items-center"> 
                        <img
                            src={Gr7Logo}
                            alt="Raptor-Logo"
                            className="w-[55px] h-auto object-cover mr-2"
                        />
                        <p className="hidden sm:block font-bold text-white text-[18px] transition-all duration-200 
                            hover:[text-shadow:_0_0_10px_white,_0_0_20px_white,_0_0_30px_white,_0_0_40px_white]
                            hover:text-black"
                        >Raptors Meteor Feast</p>
                    </Link>
                </div>
                <div className="flex items-center gap-5">
                    {/* Search Input */}
                    <div className="hidden md:block" >
                        <SearchBox />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    {/* Cart Section */}
                    <div className="flex items-center gap-4 mr-8">
                        <div>
                            <ul className="flex gap-7 mr-2 font-bold items-center">
                                <li>
                                    <Link to="/browse" className="hidden sm:block font-bold text-white text-[18px] transition-all duration-200 
                                    hover:[text-shadow:_0_0_10px_white,_0_0_20px_white,_0_0_30px_white,_0_0_40px_white]
                                    hover:text-black"
                                    >Browse</Link>
                                </li>
                            </ul>
                        </div>
                        {/* <p className="text-orange-500 font-bold text-[18px]">Cart</p> */}
                        {/* <Link to="/checkout"><button className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 w-[50px] rounded-xl text-white">{cartCount}</button></Link> */}
                        {logIn && (
                            <Link to="/checkout" className="flex items-center gap-2 mr-8 relative">
                                <p className="text-orange-500 font-bold text-[30px] relative">
                                    <FaCartShopping />
                                    {cartCount > 0 && (
                                        <span className="absolute top-[-8px] right-[-8px] bg-red-500 text-white text-[12px] font-bold rounded-full w-[20px] h-[20px] flex items-center justify-center">
                                            {cartCount}
                                        </span>
                                    )}
                                </p>
                            </Link>
                        )}
                    </div>
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
                                        src={LoginLogo}
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
                                        name={userData?.displayName}
                                        size="md"
                                        src={Gr7Logo}
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
