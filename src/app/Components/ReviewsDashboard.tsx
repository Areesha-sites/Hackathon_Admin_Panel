"use client"
import React, { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import ChartComponent from "./ReviewChart";
import ReviewsListComponent from "./ReviewList";
import { Review } from "../../../types/ComponentsTypes";
const ReviewsDashboard = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState<"chart" | "reviews">("chart");
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const query = `*[_type == "customerReviews"] {
          name,
          description,
          date,
        }`;
        const data = await client.fetch(query);
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);
  return (
    <div
      style={{
        backgroundColor: "#1e1e1e",
        color: "#fff",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Customer Reviews Dashboard
      </h1>
      <div className="flex justify-center mb-5">
        <button
          className={`px-5 py-2 mx-2 ${
            activeTab === "chart" ? "bg-gray-700" : "bg-gray-700"
          } text-white font-satoshi rounded-md font-bold cursor-pointer transition-all duration-300 outline-none ${
            activeTab !== "chart" ? "hover:bg-gray-600" : ""
          }`}
          onClick={() => setActiveTab("chart")}
        >
          Chart
        </button>
        <button
          className={`px-5 py-2 mx-2 ${
            activeTab === "reviews" ? "bg-gray-700" : "bg-gray-700"
          } text-white font-satoshi rounded-md font-bold cursor-pointer transition-all duration-300 outline-none ${
            activeTab !== "reviews" ? "hover:bg-gray-600" : ""
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>
      {activeTab === "chart" && <ChartComponent reviews={reviews} />}
      {activeTab === "reviews" && <ReviewsListComponent reviews={reviews} />}
    </div>
  );
};

export default ReviewsDashboard;
