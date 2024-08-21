import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
    const location = useLocation();
    const [buttonText, setButtonText] = useState("Job Positions");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        switch (location.pathname) {
            case "/frontend":
                setButtonText("Frontend");
                break;
            case "/backend":
                setButtonText("Backend");
                break;
            case "/devops":
                setButtonText("DevOps");
                break;
            case "/data":
                setButtonText("Data");
                break;
            case "/full-stack":
                setButtonText("Full Stack");
                break;
            case "/design":
                setButtonText("UX / UI");
                break;
            case "/quality-assurance":
                setButtonText("Quality Assurance");
                break;
            case "/mobile":
                setButtonText("iOS/Android");
                break;
            case "/management":
                setButtonText("Management");
                break;
            default:
                setButtonText("Job Positions");
                break;
        }

        // Close the dropdown when the route changes
        setIsDropdownOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        if (isDropdownOpen && dropdownRef.current && buttonRef.current) {
            const buttonRect = buttonRef.current.getBoundingClientRect();
            dropdownRef.current.style.top = `${buttonRect.bottom}px`;

            if (window.innerWidth < 768) {
                dropdownRef.current.style.left = `50%`;
                dropdownRef.current.style.transform = `translateX(-50%)`;
            } else {
                dropdownRef.current.style.left = `${
                    buttonRect.left + buttonRect.width / 2
                }px`;
                dropdownRef.current.style.transform = `translateX(-50%)`;
            }
        }
    }, [isDropdownOpen]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    return (
        <nav className="bg-white border-gray-200 fixed top-0 start-0 w-full z-20 sm:py-0 py-3">
            <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
                <Link
                    to="/"
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <span className="self-center sm:text-5xl text-4xl font-bold whitespace-nowrap">
                        Skill<span className="text-indigo-500">Set</span>
                    </span>
                </Link>
                <div className="flex items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <p className="text-black rounded-lg text-md px-5">
                        Contribute
                    </p>
                    <button
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black rounded-lg md:hidden focus:outline-none focus:ring-1 focus:ring-indigo-300"
                        onClick={toggleNavbar}
                    >
                        <img
                            src="/assets/icons/menu.svg"
                            alt="menu"
                            className="w-7 h-7"
                        />
                    </button>
                </div>
                <div
                    id="mega-menu"
                    className={`items-center justify-center ${
                        isNavbarOpen ? "flex" : "hidden"
                    } w-full md:flex md:w-auto md:order-1`}
                >
                    <ul className="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
                        <li className="md:flex md:items-center md:justify-center w-full">
                            <button
                                id="mega-menu-dropdown-button"
                                ref={buttonRef}
                                data-dropdown-toggle="mega-menu-dropdown"
                                className="flex items-center justify-between w-full md:w-auto p-5 rounded font-medium text-white border-b bg-indigo-500 relative"
                                onClick={toggleDropdown}
                                aria-expanded={
                                    isDropdownOpen ? "true" : "false"
                                }
                            >
                                {buttonText}
                                <img
                                    src="/assets/icons/chevron.svg"
                                    alt="chevron"
                                    className="w-6 h-6 ml-3"
                                />
                            </button>
                            <div
                                ref={dropdownRef}
                                id="mega-menu-dropdown"
                                className={`absolute z-10 grid ${
                                    isDropdownOpen ? "block" : "hidden"
                                } max-w-screen-md grid-cols-2 text-md bg-white border border-gray-100 rounded-lg shadow-md md:grid-cols-3`}
                                style={{ minWidth: "300px" }}
                            >
                                <div className="p-10">
                                    <ul className="space-y-7">
                                        <li>
                                            <Link
                                                to="/frontend"
                                                className="flex items-center text-black hover:text-indigo-500"
                                                onClick={() =>
                                                    setIsDropdownOpen(false)
                                                }
                                            >
                                                <img
                                                    src="/assets/icons/frontend.svg"
                                                    alt="frontend"
                                                    className="w-5 h-5 mr-2"
                                                />
                                                Frontend
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/backend"
                                                className="flex items-center text-black hover:text-indigo-500"
                                                onClick={() =>
                                                    setIsDropdownOpen(false)
                                                }
                                            >
                                                <img
                                                    src="/assets/icons/backend.svg"
                                                    alt="backend"
                                                    className="w-5 h-5 mr-2"
                                                />
                                                Backend
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/devops"
                                                className="flex items-center text-black hover:text-indigo-500"
                                                onClick={() =>
                                                    setIsDropdownOpen(false)
                                                }
                                            >
                                                <img
                                                    src="/assets/icons/devops.svg"
                                                    alt="devops"
                                                    className="w-5 h-5 mr-2"
                                                />
                                                DevOps
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="px-5 py-10">
                                    <ul className="space-y-7">
                                        <li>
                                            <Link
                                                to="/data"
                                                className="flex items-center text-black hover:text-indigo-500"
                                                onClick={() =>
                                                    setIsDropdownOpen(false)
                                                }
                                            >
                                                <img
                                                    src="/assets/icons/data.svg"
                                                    alt="data"
                                                    className="w-5 h-5 mr-2"
                                                />
                                                Data
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/full-stack"
                                                className="flex items-center text-black hover:text-indigo-500"
                                                onClick={() =>
                                                    setIsDropdownOpen(false)
                                                }
                                            >
                                                <img
                                                    src="/assets/icons/full-stack.svg"
                                                    alt="full-stack"
                                                    className="w-5 h-5 mr-2"
                                                />
                                                Full Stack
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/design"
                                                className="flex items-center text-black hover:text-indigo-500"
                                                onClick={() =>
                                                    setIsDropdownOpen(false)
                                                }
                                            >
                                                <img
                                                    src="/assets/icons/design.svg"
                                                    alt="design"
                                                    className="w-5 h-5 mr-2"
                                                />
                                                UX / UI
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="sm:px-10 sm:py-10 px-10 py-5">
                                    <ul className="space-y-7">
                                        <li>
                                            <Link
                                                to="/quality-assurance"
                                                className="flex items-center text-black hover:text-indigo-500"
                                                onClick={() =>
                                                    setIsDropdownOpen(false)
                                                }
                                            >
                                                <img
                                                    src="/assets/icons/quality-assurance.svg"
                                                    alt="qa"
                                                    className="w-5 h-5 mr-2"
                                                />
                                                QA
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/mobile"
                                                className="flex items-center text-black hover:text-indigo-500"
                                                onClick={() =>
                                                    setIsDropdownOpen(false)
                                                }
                                            >
                                                <img
                                                    src="/assets/icons/mobile.svg"
                                                    alt="mobile"
                                                    className="w-5 h-5 mr-2"
                                                />
                                                iOS/Android
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/management"
                                                className="flex items-center text-black hover:text-indigo-500"
                                                onClick={() =>
                                                    setIsDropdownOpen(false)
                                                }
                                            >
                                                <img
                                                    src="/assets/icons/project-management.svg"
                                                    alt="management"
                                                    className="w-5 h-5 mr-2"
                                                />
                                                Management
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li>
                            <Link
                                to="/#"
                                className="block p-5 text-black hover:text-indigo-500 md:p-5"
                            >
                                About
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
