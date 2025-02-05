"use client";
import { useState, useEffect, useRef } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import NotificationBell from "./NotificationComp";
import { NavbarProps } from "../../../types/ComponentsTypes";
export default function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };
  const handleLogout = () => {
    router.push("/login");
  };
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?query=${searchQuery}`);
  };
  return (
    <nav className="bg-white dark:bg-black shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-[25px] font-bold text-gray-800 dark:text-white font-integralCf tracking-widest">
        SHOP.CO
      </div>
      <form className="max-w-lg mx-auto" onSubmit={handleSearch}>
        <div className="flex">
          <button
            id="dropdown-button"
            onClick={toggleDropdown}
            type="button"
            className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-white bg-black border border-gray-300 rounded-s-lg hover:bg-gray-800"
          >
            {selectedCategory}
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute mt-12 bg-black divide-y divide-gray-700 rounded-lg shadow-sm w-44"
            >
              <ul className="py-2 text-sm text-white">
                {[
                  "Calender",
                  "Profile",
                  "Customer",
                  "Order",
                  "Products",
                  "Reveneu",
                  "Subscriptions",
                  "Reviews",
                ].map((category) => (
                  <li key={category}>
                    <button
                      type="button"
                      onClick={() => selectCategory(category)}
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-700"
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-e-lg border border-gray-300"
              placeholder="Search Products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              required
            />
            <button
              type="submit"
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-black rounded-e-lg border border-gray-300 hover:bg-gray-800"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
      <div className="flex items-center space-x-4">
        <NotificationBell />
        <button
          onClick={toggleTheme}
          className="text-gray-600 dark:text-gray-300 text-xl"
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>
        <div className="relative" ref={userDropdownRef}>
          <button onClick={() => setIsOpen(!isOpen)}>
            <IoPersonCircleSharp className="text-gray-600 dark:text-gray-300 text-2xl" />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-0 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
              <a
                href="/profile"
                className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Profile
              </a>
              <a
                href="/settings"
                className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Settings
              </a>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
