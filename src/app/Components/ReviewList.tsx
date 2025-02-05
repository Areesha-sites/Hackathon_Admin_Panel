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
        backgroundColor: "#1e1e1e",
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
            backgroundColor: "#333",
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
              backgroundColor: "#2e2e2e",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            <h3 style={{ marginBottom: "10px", color: "#4CAF50" }}>
              {review.name}
            </h3>
            <p style={{ marginBottom: "10px", color: "#ccc" }}>
              {review.description}
            </p>
            <p style={{ color: "#888" }}>
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
