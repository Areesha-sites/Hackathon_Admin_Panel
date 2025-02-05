"use client";
import KPIsCard from "../Components/KPIsCard";
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
import { UserTypes } from "../../../types/ComponentsTypes";
import { OrderTypes } from "../../../types/ComponentsTypes";
import DashBoardSideBar from "../Components/DashBoardSideBar";
import SalesChart from "../Components/SalesChart";
import CalendarComponent from "../Components/Calendar";
import BarChart from "../Components/BarsChart";
import DashboardProfile from "../Components/Profile";
import ProductDashboard from "../Components/DashboardProducts";
import CustomerDashboard from "../Components/DashboardCustomer";
import OrdersDashboard from "../Components/DashboardOrders";
import Navbar from "../Components/Navbar";
import { getRevenueData } from "../Components/FetchReveneu";
import RevenueChart from "../Components/RevenueChart";
import RevenueTable from "../Components/RevenueTable";
import SubscriptionManagement from "../Components/Subscription";
import ReviewsDashboard from "../Components/ReviewsDashboard";
import { Component } from "../Components/VisitorsChart";
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
  const totalSales = orders.reduce((acc, order) => acc + order.orderAmount, 0);
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
      <Navbar toggleTheme={() => setDarkMode(!darkMode)} darkMode={darkMode} />
    </div>
    <div className="flex min-h-screen">
      <aside className="w-64 ">
        <DashBoardSideBar setActiveTab={setActiveTab} />
      </aside>
      <div className="flex-1 p-6">
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-3xl font-extrabold font-integralCf tracking-wider mb-6">
              Analytics Dashboard
            </h1>
            <p className="text-gray-600 mb-8">
              Welcome to my SHOP.CO analytics dashboard.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPIsCard
                title="Total Sales"
                value={`₹${totalSales}`}
                icon={<HiCurrencyRupee className="text-[21px] text-white/80" />}
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
            <SalesChart salesData={monthlySalesData} />
            <BarChart data={productSalesData} />
          </div>
        )}
        {activeTab === "calendar" && (
          <div>
            <h1 className="text-3xl font-extrabold font-integralCf tracking-wider mb-6">
              Calendar
            </h1>
            <CalendarComponent />
          </div>
        )}
        {activeTab === "profile" && (
          <div>
            <h1 className="text-3xl font-extrabold font-integralCf tracking-wider mb-6">
              Profile
            </h1>
            <DashboardProfile />
          </div>
        )}
        {activeTab === "product" && (
          <div>
            <h1 className="text-3xl font-extrabold font-integralCf tracking-wider mb-6">
              Products
            </h1>
            <ProductDashboard />
          </div>
        )}
        {activeTab === "customers" && (
          <div>
            <h1 className="text-3xl font-extrabold font-integralCf tracking-wider mb-6">
              Customers
            </h1>
            <CustomerDashboard />
          </div>
        )}
        {activeTab === "orders" && (
          <div>
            <h1 className="text-3xl font-extrabold font-integralCf tracking-wider mb-6">
              Orders
            </h1>
            <OrdersDashboard />
          </div>
        )}
        {activeTab === "revenue" && (
          <div className="flex flex-col w-full">
          <div className="flex justify-between items-center w-full mb-6">
            <h1 className="text-3xl font-extrabold font-integralCf tracking-wider">
              Revenue
            </h1>
    
            <div className="relative right-0">
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
                <RevenueChart data={revenue} />
              </div>
            )}
            {activeTabs === "table" && (
              <div className="w-full flex justify-center items-center">
                <RevenueTable />
              </div>
            )}
          </div>
        </div>
        )}
        {activeTab === "subscription" && (
          <div className="">
            <h1 className="text-3xl font-extrabold font-integralCf tracking-wider mb-6">
            Subscription
            </h1>
            <SubscriptionManagement />
          </div>
        )}
        {activeTab === "reviews" && (
          <div className="">
            <h1 className="text-3xl font-extrabold font-integralCf tracking-wider mb-6">
            Reviews
            </h1>
            <ReviewsDashboard/>
          </div>
        )}
         {activeTab === "visitors" && (
          <div>
            <h1 className="text-3xl font-extrabold font-integralCf tracking-wider mb-6">
            visitors
            </h1>
            <Component />
          </div>
        )}
      </div>
    </div>
   </div>
  );
}
export default Dashboard