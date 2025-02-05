"use client";
import { useState, useEffect, useRef } from "react";
import { FiSun, FiMoon, FiX } from "react-icons/fi";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import NotificationBell from "./NotificationComp";
import { NavbarProps } from "../../../types/ComponentsTypes";
export default function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
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

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <nav className="bg-white dark:bg-black shadow-md px-6 py-4 flex justify-between items-center">
      {!isSearchVisible && (
        <div className="sm:text-[25px] ml-4 md:ml-0 text-[23px] xxl:text-[30px] font-bold text-gray-800 dark:text-white font-integralCf tracking-widest">
          SHOP.CO
        </div>
      )}
      {isSearchVisible ? (
        <form className="w-full mx-auto md:hidden" onSubmit={handleSearch}>
          <div className="flex">
            <div className="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300"
                placeholder="Search Products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={toggleSearch}
                className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-black rounded-e-lg border border-gray-300 hover:bg-gray-800"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      ) : (
        <form className="max-w-lg mx-auto hidden md:block" onSubmit={handleSearch}>
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
      )}
      {!isSearchVisible && (
        <div className="flex items-center space-x-2">
          <NotificationBell />
          <button
            onClick={toggleTheme}
            className="text-gray-600 dark:text-gray-300 text-xl xxl:text-[27px]"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
          <button onClick={toggleSearch} className="md:hidden text-gray-600 dark:text-gray-300 text-xl xxl:text-[27px]">
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
          </button>
          <div className="relative mt-1" ref={userDropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)}>
              <IoPersonCircleSharp className="text-gray-600 dark:text-gray-300 text-2xl xxl:text-[30px]" />
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-0 w-32 md:w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
               
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-[12px] md:text-[14px] xxl:text-[16px] px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}