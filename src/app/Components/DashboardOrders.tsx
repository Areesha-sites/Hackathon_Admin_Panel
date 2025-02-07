"use client";
import { client } from "@/sanity/lib/client";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoTrash } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { OrderTypes } from "../../../types/ComponentsTypes";
const fetchOrders = async (): Promise<OrderTypes[]> => {
  const orders = await client.fetch(
    `*[_type == "order"]{
      orderId,
      customerName,
      status,
      totalItems,
      totalQuantity,
      orderDate,
      totalAmount,
      shippingAddress
    }`
  );
  return orders;
};
const OrdersDashboard = () => {
  const [orders, setOrders] = useState<OrderTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"orderDate" | "totalAmount" | "status">(
    "orderDate"
  );
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [editedOrder, setEditedOrder] = useState<Partial<OrderTypes>>({});
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const allOrders = await fetchOrders();
        setOrders(allOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);
  const handleEdit = (orderId: string) => {
    setEditingOrderId(orderId);
    const orderToEdit = orders.find((order) => order.orderId === orderId);
    if (orderToEdit) {
      setEditedOrder(orderToEdit);
    }
  };
  const handleSave = async () => {
    if (editingOrderId) {
      try {
        await client.patch(editingOrderId).set(editedOrder).commit();
        const updatedOrders = orders.map((order) =>
          order.orderId === editingOrderId
            ? { ...order, ...editedOrder }
            : order
        );
        setOrders(updatedOrders);
        setEditingOrderId(null);
        setEditedOrder({});
      } catch (error) {
        console.error("Error updating order:", error);
      }
    }
  };
  const handleDelete = async (orderId: string) => {
    try {
      await client.delete(orderId);
      const updatedOrders = orders.filter((order) => order.orderId !== orderId);
      setOrders(updatedOrders);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedOrder((prev) => ({ ...prev, [name]: value }));
  };
  const filteredOrders = orders.filter(
    (order) =>
      order.customerName &&
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === "orderDate") {
      return new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime();
    } else if (sortBy === "totalAmount") {
      return a.totalAmount - b.totalAmount;
    } else if (sortBy === "status") {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });
  return (
    <div className="bg-gray-800 text-white p-6 min-h-screen">
    <div className="mb-6 flex gap-4 flex-col md:flex-row">
      <input
        type="text"
        placeholder="Search orders by customer name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 rounded-lg bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
      />
      <select
        value={sortBy}
        onChange={(e) =>
          setSortBy(e.target.value as "orderDate" | "totalAmount" | "status")
        }
        className="p-2 rounded-lg bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        <option value="orderDate">Sort by Order Date</option>
        <option value="totalAmount">Sort by Total Amount</option>
        <option value="status">Sort by Status</option>
      </select>
    </div>
      <div className="overflow-x-auto">
      <div className="grid grid-cols-8 font-bold text-lg py-3 border-b border-gray-700 text-center font-satoshiBold min-w-[800px]">
        <p>Order ID</p>
        <p>Customer Name</p>
        <p>Status</p>
        <p>Total Items</p>
        <p>Total Quantity</p>
        <p>Order Date</p>
        <p>Total Amount</p>
        <p>Actions</p>
      </div>
      <div className="mt-4">
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-8 items-center py-4 border-b border-gray-700 text-center min-w-[800px]"
            >
              <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
            </div>
          ))
        ) : sortedOrders.length === 0 ? (
          <div className="text-center text-white">No orders found</div>
        ) : (
          sortedOrders.map((order) => (
            <div
              key={order.orderId}
              className="grid grid-cols-8 items-center gap-x-2 py-4 border-b border-gray-700 text-center min-w-[800px]"
            >
              {editingOrderId === order.orderId ? (
                <>
                  <input
                    type="text"
                    name="orderId"
                    value={editedOrder.orderId || ""}
                    onChange={handleChange}
                    className="p-1 rounded bg-gray-800 text-white text-center"
                  />
                  <input
                    type="text"
                    name="customerName"
                    value={editedOrder.customerName || ""}
                    onChange={handleChange}
                    className="p-1 rounded bg-gray-800 text-white text-center"
                  />
                  <select
                    name="status"
                    value={editedOrder.status || ""}
                    onChange={handleChange}
                    className="p-1 rounded bg-gray-800 font-satoshi text-center"
                  >
                    <option value="Pending" className="text-yellow-500">
                      Pending
                    </option>
                    <option value="Processing" className="text-blue-500">
                      Processing
                    </option>
                    <option value="Shipped" className="text-green-500">
                      Shipped
                    </option>
                    <option value="Delivered" className="text-purple-500">
                      Delivered
                    </option>
                    <option value="Delivered" className="text-red-500">
                      Cancelled
                    </option>
                  </select>
                  <input
                    type="number"
                    name="totalItems"
                    value={editedOrder.totalItems || ""}
                    onChange={handleChange}
                    className="p-1 rounded bg-gray-800 text-white text-center"
                  />
                  <input
                    type="number"
                    name="totalQuantity"
                    value={editedOrder.totalQuantity || ""}
                    onChange={handleChange}
                    className="p-1 rounded bg-gray-800 text-white text-center"
                  />
                  <input
                    type="date"
                    name="orderDate"
                    value={editedOrder.orderDate || ""}
                    onChange={handleChange}
                    className="p-1 rounded bg-gray-800 text-white text-center"
                  />
                  <input
                    type="number"
                    name="totalAmount"
                    value={editedOrder.totalAmount || ""}
                    onChange={handleChange}
                    className="p-1 rounded bg-gray-800 text-white text-center"
                  />
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={handleSave}
                      className="text-green-500 hover:underline cursor-pointer rounded hover:text-green-600"
                    >
                      Save
                    </button>
                    <button onClick={() => setEditingOrderId(null)}>
                      <RxCross2 className="text-white h-5 w-5 hover:text-gray-200" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="font-semibold font-satoshi">{order.orderId}</p>
                  <p className="text-gray-400 text-sm font-satoshi">
                    {order.customerName}
                  </p>
                  <p
                    className={`text-sm font-satoshi ${
                      order.status === "Pending"
                        ? "text-yellow-500"
                        : order.status === "Processing"
                          ? "text-blue-500"
                          : order.status === "Shipped"
                            ? "text-green-500"
                            : order.status === "Delivered"
                              ? "text-purple-500"
                              : "text-red-500"
                    }`}
                  >
                    {order.status}
                  </p>
                  <p className="text-white font-bold font-satoshi">
                    {order.totalItems}
                  </p>
                  <p className="text-gray-400 text-sm font-satoshi">
                    {order.totalQuantity}
                  </p>
                  <p className="text-gray-400 text-sm font-satoshi">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                  <p className="text-white font-bold font-satoshi">
                    ${order.totalAmount.toFixed(2)}
                  </p>
                  <div className="flex gap-5 justify-center">
                    <button onClick={() => handleEdit(order.orderId)}>
                      <CiEdit className="text-blue-500 h-5 w-5 hover:text-blue-400 cursor-pointer" />
                    </button>
                    <button onClick={() => handleDelete(order.orderId)}>
                      <IoTrash className="text-red-500 h-5 w-5 hover:text-red-400 cursor-pointer" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  </div>
  );
};

export default OrdersDashboard;
