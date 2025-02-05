"use client";
import React from "react";
interface Review {
  name: string;
  description: string;
  date: string;
  rating: number;
}
interface ReviewsTableProps {
  reviews: Review[];
  currentPage: number;
  reviewsPerPage: number;
  onPageChange: (pageNumber: number) => void;
}
const ReviewsTable: React.FC<ReviewsTableProps> = ({
  reviews,
  currentPage,
  reviewsPerPage,
  onPageChange,
}) => {
  return (
    <div>
      <h2>Recent Reviews</h2>
      {reviews.map((review, index) => (
        <div
          key={index}
          style={{ marginBottom: "20px", borderBottom: "1px solid #333", paddingBottom: "10px" }}
        >
          <h3>{review.name}</h3>
          <p>{review.description}</p>
          <p>Date: {new Date(review.date).toLocaleDateString()}</p>
          <p>Rating: {"⭐".repeat(review.rating)}</p>
        </div>
      ))}
      <div style={{ marginTop: "20px" }}>
        {Array.from({ length: Math.ceil(reviews.length / reviewsPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            style={{
              margin: "0 5px",
              padding: "8px",
              backgroundColor: currentPage === i + 1 ? "#555" : "#333",
              color: "#fff",
              border: "1px solid #555",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
export default ReviewsTable;