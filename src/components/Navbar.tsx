import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
    const location = useLocation();
    const [buttonText, setButtonText] = useState("Job Positions");
    const [seniorityButtonText, setSeniorityButtonText] = useState("Seniority");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSeniorityDropdownOpen, setIsSeniorityDropdownOpen] =
        useState(false);
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const seniorityDropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const seniorityButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setIsNavbarOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        if (location.pathname === "/") {
            setButtonText("Job Positions");
            setSeniorityButtonText("Seniority");
        } else if (
            location.pathname.includes("/frontend") ||
            location.pathname.includes("/backend") ||
            location.pathname.includes("/devops") ||
            location.pathname.includes("/data") ||
            location.pathname.includes("/full-stack") ||
            location.pathname.includes("/design") ||
            location.pathname.includes("/quality-assurance") ||
            location.pathname.includes("/management") ||
            location.pathname.includes("/mobile")
        ) {
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
                case "/management":
                    setButtonText("Management");
                    break;
                case "/mobile":
                    setButtonText("iOS/Android");
                    break;
                default:
                    setButtonText("Job Positions");
                    break;
            }
            setSeniorityButtonText("Seniority");
        } else if (
            location.pathname.includes("/junior") ||
            location.pathname.includes("/mid") ||
            location.pathname.includes("/senior")
        ) {
            switch (location.pathname) {
                case "/junior":
                    setSeniorityButtonText("Junior");
                    break;
                case "/mid":
                    setSeniorityButtonText("Mid");
                    break;
                case "/senior":
                    setSeniorityButtonText("Senior");
                    break;
                default:
                    setSeniorityButtonText("Seniority");
                    break;
            }
            setButtonText("Job Positions");
        }

        setIsDropdownOpen(false);
        setIsSeniorityDropdownOpen(false);
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

        if (
            isSeniorityDropdownOpen &&
            seniorityDropdownRef.current &&
            seniorityButtonRef.current
        ) {
            const buttonRect =
                seniorityButtonRef.current.getBoundingClientRect();
            seniorityDropdownRef.current.style.top = `${buttonRect.bottom}px`;

            if (window.innerWidth < 768) {
                seniorityDropdownRef.current.style.left = `50%`;
                seniorityDropdownRef.current.style.transform = `translateX(-50%)`;
            } else {
                seniorityDropdownRef.current.style.left = `${
                    buttonRect.left + buttonRect.width / 2
                }px`;
                seniorityDropdownRef.current.style.transform = `translateX(-50%)`;
            }
        }
    }, [isDropdownOpen, isSeniorityDropdownOpen]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
        setIsSeniorityDropdownOpen(false);
    };

    const toggleSeniorityDropdown = () => {
        setIsSeniorityDropdownOpen(!isSeniorityDropdownOpen);
        setIsDropdownOpen(false);
    };

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    return (
        <nav className="bg-white border-gray-200 fixed top-0 start-0 w-full z-20 sm:py-1 py-3">
            <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
                <Link
                    to="/"
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <h1 className="self-center sm:text-4xl text-2xl font-bold whitespace-nowrap">
                        Skill<span className="text-indigo-500">Sets</span>
                    </h1>
                </Link>
                <div className="flex items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <p className="sm:text-sm text-xs text-gray-500 mr-2">
                        Last updated
                        <br />
                        28/09/2024
                    </p>
                    <a
                        href="https://github.com/stefanicjuraj/skillsets"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="/assets/icons/github.svg"
                            alt="chevron"
                            className="sm:w-8 sm:h-8 w-7 h-7 sm:ml-3 ml-0"
                        />
                    </a>
                    <button
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black rounded-lg md:hidden focus:outline-none focus:ring-1 focus:ring-indigo-300 border border-indigo-50"
                        onClick={toggleNavbar}
                    >
                        <img
                            src="/assets/icons/menu.svg"
                            alt="menu"
                            className="sm:w-7 sm:h-7 w-6 h-6"
                        />
                    </button>
                </div>
                <div
                    id="mega-menu"
                    className={`items-center justify-center ${
                        isNavbarOpen ? "flex" : "hidden"
                    } w-full md:flex md:w-auto md:order-1`}
                >
                    <ul className="flex flex-col mt-4 md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
                        <li className="md:flex md:items-center md:justify-center w-full">
                            <button
                                id="mega-menu-dropdown-button"
                                ref={buttonRef}
                                data-dropdown-toggle="mega-menu-dropdown"
                                className="flex items-center justify-between w-full md:w-auto p-5 rounded font-normal text-indigo-500 relative rounded-md sm:text-md text-sm bg-indigo-50 hover:shadow-sm"
                                onClick={toggleDropdown}
                                aria-expanded={
                                    isDropdownOpen ? "true" : "false"
                                }
                            >
                                {buttonText}
                                <img
                                    src="/assets/icons/chevron.svg"
                                    alt="chevron"
                                    className="w-5 h-5 ml-3"
                                />
                            </button>
                            <div
                                ref={dropdownRef}
                                id="mega-menu-dropdown"
                                className={`absolute z-10 grid ${
                                    isDropdownOpen ? "block" : "hidden"
                                } max-w-screen-md grid-cols-2 sm:text-md text-sm bg-white border border-gray-100 rounded-lg shadow-md md:grid-cols-3`}
                                style={{ minWidth: "400px" }}
                            >
                                <div className="pl-10 pr-10 pt-10 sm:pb-10 pb-2">
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
                                <div className="pl-10 pr-10 pt-10 pb-4">
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
                                                UX/UI
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="pt-4 sm:pt-10 pb-10 pl-10 pr-10">
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
                    </ul>
                    <ul className="flex flex-col mt-4 md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse ml-3">
                        <li className="md:flex md:items-center md:justify-center w-full">
                            <button
                                id="seniority-dropdown-button"
                                ref={seniorityButtonRef}
                                data-dropdown-toggle="seniority-menu-dropdown"
                                className="flex items-center justify-between w-full md:w-auto p-5 rounded font-normal text-indigo-500 relative rounded-md bg-indigo-50 hover:shadow-sm sm:text-md text-sm"
                                onClick={toggleSeniorityDropdown}
                                aria-expanded={
                                    isSeniorityDropdownOpen ? "true" : "false"
                                }
                            >
                                {seniorityButtonText}
                                <img
                                    src="/assets/icons/chevron.svg"
                                    alt="chevron"
                                    className="w-5 h-5 ml-3"
                                />
                            </button>
                            <div
                                ref={seniorityDropdownRef}
                                id="seniority-menu-dropdown"
                                className={`absolute z-10 ${
                                    isSeniorityDropdownOpen ? "block" : "hidden"
                                } max-w-sm sm:text-md text-sm bg-white border border-gray-100 rounded-lg shadow-md`}
                                style={{ minWidth: "200px" }}
                            >
                                <div className="p-10">
                                    <ul className="space-y-5">
                                        <li>
                                            <Link
                                                to="/junior"
                                                className="flex items-center text-black hover:text-indigo-500"
                                                onClick={() =>
                                                    setIsSeniorityDropdownOpen(
                                                        false
                                                    )
                                                }
                                            >
                                                Junior
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/mid"
                                                className="flex items-center text-black hover:text-indigo-500"
                                                onClick={() =>
                                                    setIsSeniorityDropdownOpen(
                                                        false
                                                    )
                                                }
                                            >
                                                Mid
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/senior"
                                                className="flex items-center text-black hover:text-indigo-500"
                                                onClick={() =>
                                                    setIsSeniorityDropdownOpen(
                                                        false
                                                    )
                                                }
                                            >
                                                Senior
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
