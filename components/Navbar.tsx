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
              <span className="text-indigo-500">硬技能</span>
            </span>
          </a>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center w-auto px-5 py-5 mx-auto text-sm text-black bg-indigo-100 rounded"
          >
            职位类别
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
                  最后更新
                  <br />
                  2025年3月
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
                      alt="前端"
                      className="w-5 h-5 mr-2"
                    />
                    前端
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
                      alt="后端"
                      className="w-5 h-5 mr-2"
                    />
                    后端
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
                      alt="DevOps"
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
                      alt="人工智能"
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
                      alt="数据"
                      className="w-5 h-5 mr-2"
                    />
                    数据
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
                      alt="全栈"
                      className="w-5 h-5 mr-2"
                    />
                    全栈
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
                      alt="设计"
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
                      alt="技术写作"
                      className="w-5 h-5 mr-2"
                    />
                    技术写作
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
                      alt="质量保证"
                      className="w-5 h-5 mr-2"
                    />
                    测试 / QA
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
                      alt="移动端"
                      className="w-5 h-5 mr-2"
                    />
                    iOS / 安卓
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
                      alt="项目管理"
                      className="w-5 h-5 mr-2"
                    />
                    项目管理
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
                      alt="网络安全"
                      className="w-5 h-5 mr-2"
                    />
                    网络安全
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
