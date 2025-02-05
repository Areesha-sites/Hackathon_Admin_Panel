"use client";
import KPIsCard from "./Components/KPIsCard";
import {
  HiCurrencyRupee,
  HiOutlineShoppingBag,
  HiUsers,
  HiOutlineStar,
} from "react-icons/hi2";
import { groq } from "next-sanity";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { client } from "@/sanity/lib/client";
import { UserTypes } from "../../types/ComponentsTypes";
import { OrderTypes } from "../../types/ComponentsTypes";
import DashBoardSideBar from "./Components/DashBoardSideBar";
import SalesChart from "./Components/SalesChart";
import CalendarComponent from "./Components/Calendar";
import BarChart from "./Components/BarsChart";
import DashboardProfile from "./Components/Profile";
import ProductDashboard from "./Components/DashboardProducts";
import CustomerDashboard from "./Components/DashboardCustomer";
import OrdersDashboard from "./Components/DashboardOrders";
import Navbar from "./Components/Navbar";
import { getRevenueData } from "./Components/FetchReveneu";
import RevenueChart from "./Components/RevenueChart";
import RevenueTable from "./Components/RevenueTable";
import SubscriptionManagement from "./Components/Subscription";
import ReviewsDashboard from "./Components/ReviewsDashboard";
import { Component } from "./Components/VisitorsChart";
const userQuery = groq`*[_type == "user"] { _id, name, email }`;
const orderQuery = groq`*[_type == "order"] { _id, orderAmount, orderDate, status }`;
const topSellingQuery = groq`*[_type == "topSelling"] { _id, name }`;
function Dashboard() {
  const [users, setUsers] = useState<UserTypes[]>([]);
  const [orders, setOrders] = useState<OrderTypes[]>([]);
  const [mostPopularProduct, setMostPopularProduct] = useState("Loading...");
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [revenue, setRevenue] = useState([]);
  const [activeTabs, setActiveTabs] = useState("chart");
  useEffect(() => {
    async function fetchRevenue() {
      const data = await getRevenueData();
      setRevenue(data);
    }
    fetchRevenue();
  }, []);
  useEffect(() => {
    async function fetchData() {
      const usersData: UserTypes[] = await client.fetch(userQuery);
      const ordersData: OrderTypes[] = await client.fetch(orderQuery);
      const topSellingData = await client.fetch(topSellingQuery);
      setUsers(usersData);
      setOrders(ordersData);
      if (topSellingData.length > 0) {
        setMostPopularProduct(topSellingData.length.toString());
      } else {
        setMostPopularProduct("0");
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    const token = Cookies.get("authToken");
    if (!token) {
      router.push("/login");
    } else {
      setIsAuth(true);
    }
  }, [router]);
  const totalSales = orders.reduce((acc, order) => acc + order.totalAmount, 0);
  const totalOrders = orders.length;
  const totalUsers = users.length;
  const monthlySalesData = [
    { date: "Feb", salesAmount: 22 },
    { date: "Mar", salesAmount: 30 },
    { date: "Apr", salesAmount: 25 },
    { date: "May", salesAmount: 40 },
    { date: "Jun", salesAmount: 35 },
    { date: "Jul", salesAmount: 50 },
  ];
  const productSalesData = [
    { product: "Product One", salesAmount: 22 },
    { product: "Product Two", salesAmount: 35 },
  ];
  if (!isAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="loader"></div>
          <p className="mt-4 text-white text-lg font-semibold">
            Redirecting to login...
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="">
      <div className={darkMode ? "dark" : ""}>
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          toggleTheme={() => setDarkMode(!darkMode)}
          onSearch={(query) => {
            console.log("Searching for", query);
          }}
        />
      </div>
      <div className="">
        <aside className="w-64 ">
          <DashBoardSideBar setActiveTab={setActiveTab} />
        </aside>
        <div>
          {activeTab === "dashboard" && (
            <div>
              <h1 className="md:text-3xl text-[28px] xxl:text-[38px] leading-[26px] text-center w-full font-extrabold font-integralCf tracking-wider mb-2 lg:ml-[-20px] md:text-right lg:text-center md:ml-[-50px] mt-4 xl:ml-[-150px]">
                Analytics Dashboard
              </h1>
              <p className="text-gray-600 mb-8 font-satoshi md:text-[16px] xxl:text-[18px] text-[14px] w-full text-center md:text-right md:ml-[-150px] lg:text-center lg:ml-[-70px] xl:ml-[-200px]">
                Welcome to my SHOP.CO analytics dashboard.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 md:ml-72">
                <KPIsCard
                  title="Total Sales"
                  value={`₹${totalSales}`}
                  icon={
                    <HiCurrencyRupee className="text-[21px] text-white/80" />
                  }
                />
                <KPIsCard
                  title="Total Orders"
                  value={totalOrders.toString()}
                  icon={
                    <HiOutlineShoppingBag className="text-[21px] text-white/80" />
                  }
                />
                <KPIsCard
                  title="Total Users"
                  value={totalUsers.toString()}
                  icon={<HiUsers className="text-[21px] text-white/80" />}
                />
                <KPIsCard
                  title="Most Popular Product"
                  value={mostPopularProduct}
                  icon={<HiOutlineStar className="text-[21px] text-white/80" />}
                />
              </div>
              <div className="px-4 md:ml-72">
                <SalesChart salesData={monthlySalesData} />
              </div>
              <div className="px-4 md:ml-72">
                <BarChart data={productSalesData} />
              </div>
            </div>
          )}
          {activeTab === "calendar" && (
            <div>
              <h1 className="md:text-3xl text-[28px] xxl:text-[38px] leading-[26px] text-center lg:ml-[-130px] xl:ml-[-230px] w-full font-extrabold font-integralCf tracking-wider mb-5 mt-8">
                Calendar
              </h1>
              <div className="px-4 md:ml-72">
                <CalendarComponent />
              </div>
            </div>
          )}
          {activeTab === "profile" && (
            <div>
              <h1 className="md:text-3xl text-[28px] xxl:text-[38px] leading-[26px] text-center lg:ml-[-130px] xl:ml-[-230px] w-full font-extrabold font-integralCf tracking-wider mb-5 mt-8">
                Profile
              </h1>
              <div className="px-4 md:ml-72">
                <DashboardProfile />
              </div>
            </div>
          )}
          {activeTab === "product" && (
            <div>
              <h1 className="md:text-3xl text-[28px] xxl:text-[38px] leading-[26px] text-center lg:ml-[-130px] xl:ml-[-230px] w-full font-extrabold font-integralCf tracking-wider mb-5 mt-8">
                Products
              </h1>
              <div className="px-4 md:ml-72">
                <ProductDashboard />
              </div>
            </div>
          )}
          {activeTab === "customers" && (
            <div>
              <h1 className="md:text-3xl text-[28px] xxl:text-[38px] leading-[26px] text-center lg:ml-[-130px] xl:ml-[-230px] w-full font-extrabold font-integralCf tracking-wider mb-5 mt-8">
                Customers
              </h1>
              <div className="px-4 md:ml-64">
                <CustomerDashboard />
              </div>
            </div>
          )}
          {activeTab === "orders" && (
            <div>
              <h1 className=" font-extrabold font-integralCf tracking-wider md:text-3xl text-[28px] xxl:text-[38px] leading-[26px] md:ml-72 text-center md:text-left mt-4 mb-6">
                Orders
              </h1>
              <div className=" px-4 md:ml-64">
                <OrdersDashboard />
              </div>
            </div>
          )}
          {activeTab === "revenue" && (
            <div className="flex flex-col w-full">
              <div className="flex justify-between md:flex-row flex-col items-center w-full mb-6">
                <h1 className=" font-extrabold font-integralCf tracking-wider md:text-3xl text-[28px] xxl:text-[38px] leading-[26px] md:ml-72 text-center md:text-left mt-4">
                  Revenue
                </h1>

                <div className="relative right-0 mt-5 mr-3">
                  <ul className="flex flex-wrap px-1.5 py-1.5 list-none rounded-md bg-gray-100">
                    <li className="flex-auto text-center">
                      <button
                        className={`w-full px-4 py-2 text-sm rounded-md ${
                          activeTabs === "chart"
                            ? "bg-white text-black shadow"
                            : "bg-inherit text-slate-600"
                        }`}
                        onClick={() => setActiveTabs("chart")}
                      >
                        Chart
                      </button>
                    </li>
                    <li className="flex-auto text-center">
                      <button
                        className={`w-full px-4 py-2 text-sm rounded-md ${
                          activeTabs === "table"
                            ? "bg-white text-black shadow"
                            : "bg-inherit text-slate-600"
                        }`}
                        onClick={() => setActiveTabs("table")}
                      >
                        Table
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className=" mt-0">
                {activeTabs === "chart" && (
                  <div className="w-full flex justify-center items-center">
                    <div className=" px-4 md:ml-64 overflow-hidden w-full">
                      <RevenueChart data={revenue} />
                    </div>
                  </div>
                )}
                {activeTabs === "table" && (
                  <div className="w-full flex justify-center items-center">
                    <div className=" px-4 md:ml-64 w-full">
                      <RevenueTable />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {activeTab === "subscription" && (
            <div className="">
              <h1 className="md:text-3xl text-[28px] xxl:text-[38px] leading-[26px] font-extrabold font-integralCf tracking-wider mb-6 md:ml-72 text-center md:text-left mt-4">
                Subscription
              </h1>
              <div className=" px-4 md:ml-64">
                <SubscriptionManagement />
              </div>
            </div>
          )}
          {activeTab === "reviews" && (
            <div className="flex flex-col ">
              <h1 className="md:text-3xl text-[28px] xxl:text-[38px] leading-[26px] font-extrabold font-integralCf tracking-wider mb-6 mt-9 md:ml-72 text-center md:text-left">
                Reviews
              </h1>
              <div className=" px-4 md:ml-64">
                <ReviewsDashboard />
              </div>
            </div>
          )}
          {activeTab === "visitors" && (
            <div className="w-full">
              <h1 className="md:text-3xl text-[28px] xxl:text-[38px] leading-[26px] mt-4 text-center md:text-left font-extrabold font-integralCf tracking-wider mb-6  md:ml-72">
                visitors
              </h1>
              <div className=" px-4 md:ml-64">
                <Component />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
