import { Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import { useState } from "react";
import SearchBox from "./SearchBox";

export default function Nav() {
    const [logIn, setLogIn] = useState(false);

    const handleLogIn = () => {
    setLogIn(!logIn);
    };

    return (
        <div className="bg-[#1A1E30]">
            <div className="flex justify-between items-center py-[24px]">

                {/* Logo and Brand Name */}
                <div className="flex items-center ml-36">
                    <img
                    src="src/Images/NavIcon/Gr-Logo-7.svg"
                    alt="Raptor-Logo"
                    className="w-[55px] h-auto object-cover mr-2 "
                    />
                    <p className="hidden sm:block font-bold text-[#F18650] text-[18px]">Raptors Meteor Feast</p>
                </div>

                <div className="flex items-center gap-5">
                {/* Search Input */}
                <div>
                    <SearchBox />
                </div>

                {/* Navigation Links */}
                <div>
                    <ul className="flex gap-7 mr-8 font-bold items-center ">
                        <li>
                            <Link to="/" className="text-[#F18650] cursor-pointer text-[18px]">Home</Link>
                        </li>
                        <li>
                            <Link to="/browse" className="text-[#F18650] cursor-pointer text-[18px]">Browse</Link>
                        </li>
                        <li>
                            <Link to="/news" className="text-[#F18650] cursor-pointer text-[18px]">News</Link>
                        </li>
                    </ul>
                </div>
                </div>

                <div className="flex items-center justify-between">
                {/* Cart Section */}
                <div className="flex items-center gap-4 w-[] mr-8">
                    <Link to="/cart" className="text-[#F18650] font-bold cursor-pointer text-[18px]">Cart</Link>
                    <button className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 w-[50px] rounded-xl text-white">0</button>
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
                            src="src/Images/NavIcon/user.png"
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
                            src="src/Images/NavIcon/Gr-Logo-7.svg"
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
