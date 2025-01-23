"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import SearchInput from "./searchbox";
import logo from "../../../public/assets/logo.png";
import { LogOut } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="sticky top-0 w-full bg-white border-b border-gray-100 px-4 sm:px-6 py-3 md:z-50 z-40">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-8 flex-1">
            <div className="flex items-center gap-2 min-w-fit md:ml-0 ml-12">
              <div className="relative w-24 h-8 sm:w-28">
                <Link href={"/"}>
                  <Image
                    src={logo}
                    alt="Lampros"
                    className="object-contain"
                    priority
                    fill
                  />
                </Link>
              </div>
              <span className="text-orange-500 font-bold text-lg sm:text-xl whitespace-nowrap">
                Seller
              </span>
            </div>

            <div className="hidden sm:block flex-1 max-w-md">
              <SearchInput placeholder="Search..." size="medium" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* <span className="hidden sm:block text-gray-600 text-sm">
              3 Feb, 2023
            </span> */}

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleProfileDropdown}
                className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-50 focus:outline-none"
              >
                <Image
                  src="https://placehold.co/800x600"
                  alt="ASIN"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover"
                />
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 md:z-50 z-40">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <div className="font-medium text-gray-900">ASIN</div>
                    <div className="text-sm text-gray-500">
                      admin@example.com
                    </div>
                  </div>
                  <button
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center gap-2 text-sm"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-3 sm:hidden">
          <SearchInput placeholder="Search..." size="medium" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
