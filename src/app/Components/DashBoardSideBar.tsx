"use client";
import React, { useState } from "react";
import { BiHomeAlt } from "react-icons/bi";
import { MdOutlineCalendarToday } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { AiOutlineProduct } from "react-icons/ai";
import { HiUsers } from "react-icons/hi";
import { HiUserGroup } from "react-icons/hi";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineAttachMoney } from "react-icons/md";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { GiCheckMark } from "react-icons/gi";
import { FaRegComments } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import { DashBoardSideBarProps } from "../../../types/ComponentsTypes";
import { RxCross2 } from "react-icons/rx";
import { CgMenuLeftAlt } from "react-icons/cg";
const DashBoardSideBar: React.FC<DashBoardSideBarProps> = ({
  setActiveTab,
}) => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    Cookies.remove("authToken");
    router.push("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="">
      <button
        onClick={toggleSidebar}
        className="md:hidden absolute top-4 left-0 z-50 p-2  text-black rounded-lg"
      >
        {isSidebarOpen ? <RxCross2 size={23} /> : <CgMenuLeftAlt  size={23}/>}
      </button>
      <div
        id="hs-sidebar-layout-splitter"
        className={`hs-overlay [--auto-close:md] md:block md:translate-x-0 md:end-auto md:bottom-0 w-64
          hs-overlay-open:translate-x-0
          -translate-x-full transition-all duration-300 transform
          absolute md:top-[73px] top-[68px] start-0 bottom-0 z-[60]
          bg-black dark:bg-neutral-800 md:h-[800px] h-[600px] dark:border-neutral-700
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        role="dialog"
        aria-label="Sidebar"
      >
        <div
          className="relative flex md:-full max-h-full pointer-events-none"
          data-hs-layout-splitter-horizontal-group
        >
          <div className="pointer-events-auto w-full">
            <header className="p-4 flex justify-between items-center gap-x-2">
              <p
                className="flex-none cursor-pointer font-semibold text-xl text-white focus:outline-none focus:opacity-80"
                aria-label="Brand"
              >
                Dashboard
              </p>
            </header>
            <nav className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
              <div
                className="hs-accordion-group pb-0 px-2 w-full flex flex-col flex-wrap"
                data-hs-accordion-always-open
              >
                <ul className="space-y-1">
                  <li>
                    <p
                      className="flex items-center gap-x-3 cursor-pointer py-2 px-2.5 text-sm text-white rounded-lg hover:bg-gray-700"
                      onClick={() => setActiveTab("dashboard")}
                    >
                      <BiHomeAlt className="h-[20px] w-[20px] text-white" />
                      Dashboard
                    </p>
                  </li>
                  <li>
                    <p
                      className="flex items-center gap-x-3 cursor-pointer py-2 px-2.5 text-sm text-white rounded-lg hover:bg-gray-700"
                      onClick={() => setActiveTab("calendar")}
                    >
                      <MdOutlineCalendarToday className="h-[19px] w-[19px] text-white" />
                      Calendar
                    </p>
                  </li>
                  <li>
                    <p
                      className="flex items-center gap-x-3 cursor-pointer py-2 px-2.5 text-sm text-white rounded-lg hover:bg-gray-700"
                      onClick={() => setActiveTab("profile")}
                    >
                      <FiUser className="h-[19px] w-[19px] text-white" />
                      Profile
                    </p>
                  </li>
                  <li>
                    <p
                      className="flex items-center gap-x-3 cursor-pointer py-2 px-2.5 text-sm text-white rounded-lg hover:bg-gray-700"
                      onClick={() => setActiveTab("product")}
                    >
                      <AiOutlineProduct className="h-[19px] w-[19px] text-white" />
                      Product
                    </p>
                  </li>
                  <li>
                    <p
                      className="flex items-center gap-x-3 cursor-pointer py-2 px-2.5 text-sm text-white rounded-lg hover:bg-gray-700"
                      onClick={() => setActiveTab("customers")}
                    >
                      <HiUsers className="h-[19px] w-[19px] text-white" />
                      Customers
                    </p>
                  </li>
                  <li>
                    <p
                      className="flex items-center gap-x-3 cursor-pointer py-2 px-2.5 text-sm text-white rounded-lg hover:bg-gray-700"
                      onClick={() => setActiveTab("orders")}
                    >
                      <HiUserGroup className="h-[19px] w-[19px] text-white" />
                      Orders
                    </p>
                  </li>
                  <li>
                    <p
                      className="flex items-center gap-x-3 cursor-pointer py-2 px-2.5 text-sm text-white rounded-lg hover:bg-gray-700"
                      onClick={() => setActiveTab("revenue")}
                    >
                      <MdOutlineAttachMoney className="h-[19px] w-[19px] text-white" />
                      Reveneu
                    </p>
                  </li>
                  <li>
                    <p
                      className="flex items-center gap-x-3 cursor-pointer py-2 px-2.5 text-sm text-white rounded-lg hover:bg-gray-700"
                      onClick={() => setActiveTab("subscription")}
                    >
                      <GiCheckMark className="h-[16px] w-[16px] text-white" />
                      Subscription
                    </p>
                  </li>
                  <li>
                    <p
                      className="flex items-center gap-x-3 cursor-pointer py-2 px-2.5 text-sm text-white rounded-lg hover:bg-gray-700"
                      onClick={() => setActiveTab("reviews")}
                    >
                      <FaRegComments className="h-[16px] w-[16px] text-white" />
                      Reviews
                    </p>
                  </li>
                  <li>
                    <p
                      className="flex items-center gap-x-3 cursor-pointer py-2 px-2.5 text-sm text-white rounded-lg hover:bg-gray-700"
                      onClick={() => setActiveTab("visitors")}
                    >
                      <FaUsers className="h-[16px] w-[16px] text-white" />
                      Visitors
                    </p>
                  </li>
                  <li onClick={handleLogout}>
                    <p
                      className="flex items-center gap-x-3 cursor-pointer py-2 px-2.5 text-sm text-red-500 rounded-lg hover:bg-gray-700 mt-6"
                      onClick={() => setActiveTab("orders")}
                    >
                      <IoIosLogOut className="h-[19px] w-[19px] text-red-500" />
                      Logout
                    </p>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardSideBar;