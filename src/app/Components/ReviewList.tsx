"use client";
import React, { useState } from "react";
import { Review } from "../../../types/ComponentsTypes";
interface ReviewsListComponentProps {
  reviews: Review[];
}
const ReviewsListComponent: React.FC<ReviewsListComponentProps> = ({
  reviews,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const reviewsPerPage = 5;
  const filteredReviews = reviews.filter(
    (review) =>
      review.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <div
      style={{
        backgroundColor: "#374151",
        color: "#fff",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Recent Reviews</h2>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search by name or comment..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "10px",
            backgroundColor: "#475569",
            color: "#fff",
            border: "1px solid #555",
            borderRadius: "4px",
            width: "300px",
            outline: "none",
          }}
        />
      </div>
      <div style={{ marginBottom: "40px" }}>
        {currentReviews.map((review, index) => (
          <div
            key={index}
            style={{
              marginBottom: "20px",
              borderBottom: "1px solid #444",
              paddingBottom: "10px",
              backgroundColor: "#475569",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            <h3 style={{ marginBottom: "10px", color: "#8FD14F" }}>
              {review.name}
            </h3>
            <p style={{ marginBottom: "10px", color: "#f8fafc" }}>
              {review.description}
            </p>
            <p style={{ color: "#d4d4d8" }}>
              Date: {new Date(review.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        {Array.from(
          { length: Math.ceil(filteredReviews.length / reviewsPerPage) },
          (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              style={{
                margin: "0 5px",
                padding: "10px 15px",
                backgroundColor: currentPage === i + 1 ? "#4CAF50" : "#333",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ReviewsListComponent;
