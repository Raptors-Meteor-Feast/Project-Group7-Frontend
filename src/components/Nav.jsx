import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import { useState } from "react";
import SearchBox from "./SearchBox";
import { Link } from "react-router-dom";

export default function Nav() {
    const [logIn, setLogIn] = useState(false);
    

    const handleLogIn = () => {
    setLogIn(!logIn);
    };

    return (
        <div className="bg-neutral-900 sticky top-0 w-full z-50">
            <div className="flex justify-between items-center py-[24px]">

                {/* Logo and Brand Name */}
                <div className="flex items-center ml-36">
                    <img
                    src="../src/Images/NavIcon/Gr-Logo-7.svg"
                    alt="Raptor-Logo"
                    className="w-[55px] h-auto object-cover mr-2"
                    />
                    <p className="hidden sm:block font-bold text-orange-500 text-[18px]">Raptors Meteor Feast</p>
                </div>

                <div className="flex items-center gap-5">
                {/* Search Input */}
                <div>
                    <SearchBox />
                </div>

                {/* Navigation Links */}
                <div>
                    <ul className="flex gap-7 mr-8 font-bold items-center">
                        <li>
                            <Link to="/" className="text-orange-500 hover:text-orange-600 active:text-orange-700 cursor-pointer text-[18px]">Home</Link>
                        </li>
                        <li>
                            <Link to="/browse" className="text-orange-500 hover:text-orange-600 active:text-orange-700 cursor-pointer text-[18px]">Browse</Link>
                        </li>
                        <li>
                            <Link to="#" className="text-orange-500 hover:text-orange-600 active:text-orange-700 cursor-pointer text-[18px]">News</Link>
                        </li>
                    </ul>
                </div>
                </div>

                <div className="flex items-center justify-between">
                {/* Cart Section */}
                <div className="flex items-center gap-4 w-[] mr-8">
                    <Link to="/checkout" className="text-orange-500 hover:text-orange-600 active:text-orange-700 font-bold cursor-pointer text-[18px]">Cart</Link>
                    <Link to="/checkout"><button className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 w-[50px] rounded-xl text-white">0</button></Link>
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
                        <DropdownItem key="sign_in" onClick={handleLogIn}>Sign In</DropdownItem>
                        <DropdownItem key="log_in">Log In</DropdownItem>
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
                            name="Jason Hughes"
                            size="md"
                            src="../src/Images/NavIcon/Gr-Logo-7.svg"
                            aria-label="User Profile"
                        />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-semibold">Signed in as</p>
                            <p className="font-semibold">Raptor@example.com</p>
                        </DropdownItem>
                        <DropdownItem key="settings">My Settings</DropdownItem>
                        <DropdownItem key="team_settings">Team Settings</DropdownItem>
                        <DropdownItem key="analytics">Analytics</DropdownItem>
                        <DropdownItem key="system">System</DropdownItem>
                        <DropdownItem key="configurations">Configurations</DropdownItem>
                        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                        <DropdownItem key="logout" color="danger" onClick={handleLogIn}>
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
