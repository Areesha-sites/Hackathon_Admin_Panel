import React from "react";
import { RevenueCardProps } from "../../../types/ComponentsTypes";
export default function RevenueCard({ date, totalSales, totalRevenue }: RevenueCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6 w-full max-w-sm border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
        Revenue Summary
      </h3>
      <p className="text-gray-500 text-sm mb-4">
        {new Date(date).toLocaleDateString()}
      </p>
      <div className="space-y-3">
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Total Sales:</strong> {totalSales}
        </p>
        <p className="text-green-500 font-bold text-2xl">
          ${totalRevenue.toLocaleString()}
        </p>
      </div>
    </div>
  );
}