import { Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import { SearchIcon } from "../assets/NavIcon/SearchIcon.jsx";
import { useState } from "react";

export default function Nav() {
    const [logIn, setLogIn] = useState(false);

    const handleLogIn = () => {
    setLogIn(!logIn);
    };

    return (
        <div className="bg-[#1A1E30]">
            <div className="flex justify-evenly items-center py-5">

            {/* Logo and Brand Name */}
            <div className="flex items-center ml-36">
                <img
                src="src/assets/NavIcon/Gr-Logo-7.svg"
                alt="Raptor-Logo"
                className="w-[7%] h-auto object-cover mr-2 "
                />
                <p className="hidden sm:block font-bold text-[#F18650] text-[18px]">Raptors Meteor Feast</p>
            </div>

            {/* Search Input */}
            <div>
                <Input
                classNames={{
                    base: "max-w-full mr-6 sm:max-w-[20rem] h-10",
                    mainWrapper: "h-full mr-7",
                    input: "text-small",
                    inputWrapper:
                    "h-full font-normal text-default-500 bg-default-100/70 dark:bg-default-500/20",
                }}
                placeholder="Type to search..."
                size="sm"
                startContent={<SearchIcon size={18} />}
                type="search"
                />
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

            {/* Cart Section */}
            <div className="flex items-center gap-4 w-[8%] mr-8">
                <Link to="/cart" className="text-[#F18650] font-bold cursor-pointer text-[18px]">Cart</Link>
                <button className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 w-[40%] rounded-xl text-white">0</button>
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
                        src="src/assets/NavIcon/user.png"
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
                        src="src/assets/NavIcon/Gr-Logo-7.svg"
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
    );
}
