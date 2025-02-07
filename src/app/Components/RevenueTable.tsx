"use client";
import React, { useEffect, useState } from "react";
import { getRevenueData } from "./FetchReveneu";
import { RevenueData } from "../../../types/ComponentsTypes";
export default function RevenueTable() {
  const [data, setData] = useState<RevenueData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<keyof RevenueData | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<{ [key: number]: Partial<RevenueData> }>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 5;
  useEffect(() => {
    async function fetchData() {
      const revenueData = await getRevenueData();
      setData(revenueData);
    }
    fetchData();
  }, []);
  const filteredData = data.filter(
    (item) =>
      item.totalSales.toString().includes(searchQuery) ||
      item.totalRevenue.toString().includes(searchQuery)
  );
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortColumn) {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];
      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      }
    }
    return 0;
  });
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const handleSort = (column: keyof RevenueData) => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setSortColumn(column);
  };
  const handleSelectAll = () => {
    if (selectedRows.length === paginatedData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedData.map((_, index) => index));
    }
  };
  const handleEdit = (index: number, field: keyof RevenueData, value: string) => {
    setEditedData({
      ...editedData,
      [index]: { ...editedData[index], [field]: parseFloat(value) },
    });
  };
  const handleSave = (index: number) => {
    const updatedData = [...data];
    updatedData[index] = { ...updatedData[index], ...editedData[index] };
    setData(updatedData);
    setEditingRow(null);
  };
  return (
    <div className="bg-gray-800 dark:bg-gray-900 shadow-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700 overflow-x-auto w-full">
      <h3 className="text-xl font-semibold text-white dark:text-white mb-4 font-satoshiBold">
        Revenue Details
      </h3>
      <input
        type="text"
        placeholder="Search..."
        className="mb-4 p-2 border-none outline-none rounded-lg w-full bg-gray-600 dark:bg-gray-800 text-white dark:text-white"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <table className="w-full border-collapse overflow-hidden rounded-lg">
        <thead className="bg-gray-800 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-3">
              <input type="checkbox" onChange={handleSelectAll} />
            </th>
            <th
              className="px-6 py-3 text-left text-sm text-white font-satoshiBold font-semibold cursor-pointer"
              onClick={() => handleSort("date")}
            >
              Date {sortColumn === "date" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th
              className="px-6 py-3 text-left text-sm text-white font-satoshiBold font-semibold cursor-pointer"
              onClick={() => handleSort("totalSales")}
            >
              Total Sales{" "}
              {sortColumn === "totalSales" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th
              className="px-6 py-3 text-left text-sm font-satoshiBold text-white font-semibold cursor-pointer"
              onClick={() => handleSort("totalRevenue")}
            >
              Total Revenue{" "}
              {sortColumn === "totalRevenue" &&
                (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th className="px-6 py-3 text-left text-sm text-white font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-600 dark:bg-gray-900 divide-y text-white divide-gray-200 dark:divide-gray-700">
          {paginatedData.length > 0 ? (
            paginatedData.map((item, index) => (
              <tr key={index} className=" dark:hover:bg-gray-800">
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(index)}
                    onChange={() =>
                      setSelectedRows((prev) =>
                        prev.includes(index)
                          ? prev.filter((i) => i !== index)
                          : [...prev, index]
                      )
                    }
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-satoshi dark:text-gray-200">
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-satoshi dark:text-gray-200">
                  {editingRow === index ? (
                    <input
                      type="number"
                      value={editedData[index]?.totalSales || item.totalSales}
                      onChange={(e) =>
                        handleEdit(index, "totalSales", e.target.value)
                      }
                      className="bg-gray-700 px-4 py-2 outline-none border-none"
                    />
                  ) : (
                    item.totalSales
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500 font-satoshi font-semibold">
                  {editingRow === index ? (
                    <input
                      type="number"
                      value={
                        editedData[index]?.totalRevenue || item.totalRevenue
                      }
                      onChange={(e) =>
                        handleEdit(index, "totalRevenue", e.target.value)
                      }
                      className="bg-gray-700 px-4 py-2 outline-none border-none"
                    />
                  ) : (
                    `$${item.totalRevenue.toLocaleString()}`
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingRow === index ? (
                    <button
                      onClick={() => handleSave(index)}
                      className="text-green-500  px-3 py-1 rounded-md"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditingRow(index)}
                      className=" text-blue-500 px-3 py-1 rounded-md font-satoshi"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-500">
                Loading revenue data...
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center space-x-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded-md ${
              currentPage === i + 1
                ? "bg-gray-500 hover:bg-gray-400 text-white"
                : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
