"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 z-20 w-full bg-[rgba(11,11,11,0.8)] backdrop-blur-lg sm:p-0 p-2">
        <div className="relative flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
          <a href="/" className="flex items-center space-x-3">
            <span className="self-center text-2xl font-bold text-white sm:text-4xl whitespace-nowrap">
              Skill<span className="text-indigo-500">Sets</span>
            </span>
          </a>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center w-auto px-5 py-5 mx-auto text-sm text-black bg-indigo-100 rounded"
          >
            Job Positions
            <img
              src="/assets/icons/chevron.svg"
              alt="chevron"
              className="w-5 h-5 ml-2"
            />
          </button>
          <div
            id="navbar-menu"
            className={`${
              mobileOpen ? "block" : "hidden"
            } w-full md:flex md:items-center md:w-auto`}
          >
            <ul className="flex flex-col p-1 mt-4 space-y-2 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
              <li>
                <p className="mr-8 text-xs text-white sm:text-sm">
                  Last updated
                  <br />
                  February 2025
                </p>
              </li>
            </ul>
          </div>
        </div>
        {dropdownOpen && (
          <div
            id="mega-menu-full-dropdown"
            className="absolute w-full pr-4 bg-transparent sm:pr-0"
          >
            <div className="grid justify-center max-w-screen-sm grid-cols-2 p-10 mx-auto mt-1 text-black bg-white border border-indigo-100 rounded-lg shadow-lg sm:grid-cols-3 shadow-indigo-100">
              <ul className="space-y-10">
                <li>
                  <Link
                    href="/frontend"
                    className="flex items-center text-black hover:text-indigo-500"
                    onClick={closeDropdown}
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
                    href="/backend"
                    className="flex items-center text-black hover:text-indigo-500"
                    onClick={closeDropdown}
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
                    href="/devops"
                    className="flex items-center text-black hover:text-indigo-500"
                    onClick={closeDropdown}
                  >
                    <img
                      src="/assets/icons/devops.svg"
                      alt="devops"
                      className="w-5 h-5 mr-2"
                    />
                    DevOps
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ai-ml"
                    className="flex items-center text-black hover:text-indigo-500"
                    onClick={closeDropdown}
                  >
                    <img
                      src="/assets/icons/ai.svg"
                      alt="AI"
                      className="w-5 h-5 mr-2"
                    />
                    AI / ML
                  </Link>
                </li>
              </ul>
              <ul className="space-y-10">
                <li>
                  <Link
                    href="/data"
                    className="flex items-center text-black hover:text-indigo-500"
                    onClick={closeDropdown}
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
                    href="/full-stack"
                    className="flex items-center text-black hover:text-indigo-500"
                    onClick={closeDropdown}
                  >
                    <img
                      src="/assets/icons/full-stack.svg"
                      alt="full stack"
                      className="w-5 h-5 mr-2"
                    />
                    Full Stack
                  </Link>
                </li>
                <li>
                  <Link
                    href="/design"
                    className="flex items-center text-black hover:text-indigo-500"
                    onClick={closeDropdown}
                  >
                    <img
                      src="/assets/icons/design.svg"
                      alt="design"
                      className="w-5 h-5 mr-2"
                    />
                    UX / UI
                  </Link>
                </li>
                <li>
                  <Link
                    href="/technical-writing"
                    className="flex items-center text-black hover:text-indigo-500"
                    onClick={closeDropdown}
                  >
                    <img
                      src="/assets/icons/technical-writing.svg"
                      alt="technical writing"
                      className="w-5 h-5 mr-2"
                    />
                    Tech Writing
                  </Link>
                </li>
              </ul>
              <ul className="mt-10 space-y-10 sm:mt-0">
                <li>
                  <Link
                    href="/quality-assurance"
                    className="flex items-center text-black hover:text-indigo-500"
                    onClick={closeDropdown}
                  >
                    <img
                      src="/assets/icons/quality-assurance.svg"
                      alt="quality assurance"
                      className="w-5 h-5 mr-2"
                    />
                    QA
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mobile"
                    className="flex items-center text-black hover:text-indigo-500"
                    onClick={closeDropdown}
                  >
                    <img
                      src="/assets/icons/mobile.svg"
                      alt="mobile"
                      className="w-5 h-5 mr-2"
                    />
                    iOS / Android
                  </Link>
                </li>
                <li>
                  <Link
                    href="/management"
                    className="flex items-center text-black hover:text-indigo-500"
                    onClick={closeDropdown}
                  >
                    <img
                      src="/assets/icons/management.svg"
                      alt="project management"
                      className="w-5 h-5 mr-2"
                    />
                    Management
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cybersecurity"
                    className="flex items-center text-black hover:text-indigo-500"
                    onClick={closeDropdown}
                  >
                    <img
                      src="/assets/icons/cybersecurity.svg"
                      alt="cybersecurity"
                      className="w-5 h-5 mr-2"
                    />
                    Cybersecurity
                  </Link>
                </li>
              </ul>
              {/* <ul className="mt-10 space-y-10 sm:mt-0">
                <li>
                  <Link
                    href="/quality-assurance"
                    className="flex items-center text-black hover:text-indigo-500"
                    onClick={closeDropdown}
                  >
                    <img
                      src="/assets/icons/quality-assurance.svg"
                      alt="quality assurance"
                      className="w-5 h-5 mr-2"
                    />
                    Cybersecurity
                  </Link>
                </li>
              </ul> */}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
