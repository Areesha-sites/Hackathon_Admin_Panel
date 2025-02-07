"use client";
import { client } from "@/sanity/lib/client";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoTrash } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { ShipmentTypes } from "../../../types/ComponentsTypes";
const fetchShipments = async (): Promise<ShipmentTypes[]> => {
  const shipments = await client.fetch(
    `*[_type == "shipment"]{
      _id,
      orderId,
      userName,
      userEmail,
      userPassword,
      countryCode,
      userPhone,
      shippingAddress,
      status,
      trackingNumber,
      shipmentDate,
      deliveryDate,
      carrier,
      createdAt,
      updatedAt
    }`
  );
  return shipments;
};

const ShipmentsDashboard = () => {
  const [shipments, setShipments] = useState<ShipmentTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"shipmentDate" | "deliveryDate" | "status">("shipmentDate");
  const [editingShipmentId, setEditingShipmentId] = useState<string | null>(null);
  const [editedShipment, setEditedShipment] = useState<Partial<ShipmentTypes>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); 
  useEffect(() => {
    const loadShipments = async () => {
      try {
        const allShipments = await fetchShipments();
        setShipments(allShipments);
      } catch (error) {
        console.error("Error fetching shipments:", error);
      } finally {
        setLoading(false);
      }
    };
    loadShipments();
  }, []);
  const handleEdit = (shipmentId: string) => {
    setEditingShipmentId(shipmentId);
    const shipmentToEdit = shipments.find((shipment) => shipment._id === shipmentId);
    if (shipmentToEdit) {
      setEditedShipment(shipmentToEdit);
    }
  };
  const handleSave = async () => {
    if (editingShipmentId) {
      try {
        await client.patch(editingShipmentId).set(editedShipment).commit();
        const updatedShipments = shipments.map((shipment) =>
          shipment._id === editingShipmentId ? { ...shipment, ...editedShipment } : shipment
        );
        setShipments(updatedShipments);
        setEditingShipmentId(null);
        setEditedShipment({});
      } catch (error) {
        console.error("Error updating shipment:", error);
      }
    }
  };
  const handleDelete = async (shipmentId: string) => {
    try {
      await client.delete(shipmentId);
      const updatedShipments = shipments.filter((shipment) => shipment._id !== shipmentId);
      setShipments(updatedShipments);
    } catch (error) {
      console.error("Error deleting shipment:", error);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedShipment((prev) => ({ ...prev, [name]: value }));
  };
  const filteredShipments = shipments.filter(
    (shipment) =>
      shipment.userName &&
      shipment.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const sortedShipments = [...filteredShipments].sort((a, b) => {
    if (sortBy === "shipmentDate") {
      return new Date(a.shipmentDate).getTime() - new Date(b.shipmentDate).getTime();
    } else if (sortBy === "deliveryDate") {
      return new Date(a.deliveryDate).getTime() - new Date(b.deliveryDate).getTime();
    } else if (sortBy === "status") {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentShipments = sortedShipments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedShipments.length / itemsPerPage);
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="bg-gray-800 text-white p-6 min-h-screen">
      <div className="mb-6 flex gap-4 flex-col md:flex-row">
        <input
          type="text"
          placeholder="Search shipments by user name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 rounded-lg bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value as "shipmentDate" | "deliveryDate" | "status")
          }
          className="p-2 rounded-lg bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          <option value="shipmentDate">Sort by Shipment Date</option>
          <option value="deliveryDate">Sort by Delivery Date</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-10 font-bold text-lg py-3 border-b border-gray-700 text-center font-satoshiBold min-w-[2000px]">
          <p>Order ID</p>
          <p>User Name</p>
          <p>User Email</p>
          <p>User Phone</p>
          <p>Shipping Address</p>
          <p>Status</p>
          <p>Tracking Number</p>
          <p>Shipment Date</p>
          <p>Delivery Date</p>
          <p>Actions</p>
        </div>
        <div className="mt-4">
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-10 gap-x-2 items-center py-4 border-b border-gray-700 text-center min-w-[1600px]"
              >
                <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
              </div>
            ))
          ) : currentShipments.length === 0 ? (
            <div className="text-center text-red-500">No shipments found</div>
          ) : (
            currentShipments.map((shipment) => (
              <div
                key={shipment._id}
                className="grid grid-cols-10 items-center gap-x-2 py-4 border-b border-gray-700 text-center min-w-[2000px]"
              >
                {editingShipmentId === shipment._id ? (
                  <>
                    <input
                      type="text"
                      name="orderId"
                      value={editedShipment.orderId || ""}
                      onChange={handleChange}
                      className="p-1 rounded bg-gray-600 text-white text-center"
                    />
                    <input
                      type="text"
                      name="userName"
                      value={editedShipment.userName || ""}
                      onChange={handleChange}
                      className="p-1 rounded bg-gray-600 text-white text-center"
                    />
                    <input
                      type="text"
                      name="userEmail"
                      value={editedShipment.userEmail || ""}
                      onChange={handleChange}
                      className="p-1 rounded bg-gray-600 text-white text-center "
                    />
                    <input
                      type="text"
                      name="userPhone"
                      value={editedShipment.userPhone || ""}
                      onChange={handleChange}
                      className="p-1 rounded bg-gray-600 text-white text-center"
                    />
                    <input
                      type="text"
                      name="shippingAddress"
                      value={editedShipment.shippingAddress || ""}
                      onChange={handleChange}
                      className="p-1 rounded bg-gray-600 text-white text-center"
                    />
                    <select
                      name="status"
                      value={editedShipment.status || ""}
                      onChange={handleChange}
                      className="p-1 rounded bg-gray-600 font-satoshi text-center"
                    >
                      <option value="Pending" className="text-yellow-500">
                        Pending
                      </option>
                      <option value="Shipped" className="text-blue-500">
                        Shipped
                      </option>
                      <option value="Delivered" className="text-green-500">
                        Delivered
                      </option>
                      <option value="Transit" className="text-purple-500">
                        Transit
                      </option>
                    </select>
                    <input
                      type="text"
                      name="trackingNumber"
                      value={editedShipment.trackingNumber || ""}
                      onChange={handleChange}
                      className="p-1 rounded bg-gray-600 text-white text-center"
                    />
                    <input
                      type="datetime-local"
                      name="shipmentDate"
                      value={editedShipment.shipmentDate || ""}
                      onChange={handleChange}
                      className="p-1 rounded bg-gray-600 text-white text-center"
                    />
                    <input
                      type="datetime-local"
                      name="deliveryDate"
                      value={editedShipment.deliveryDate || ""}
                      onChange={handleChange}
                      className="p-1 rounded bg-gray-600 text-white text-center"
                    />
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={handleSave}
                        className="text-green-500 hover:underline cursor-pointer rounded hover:text-green-600"
                      >
                        Save
                      </button>
                      <button onClick={() => setEditingShipmentId(null)}>
                        <RxCross2 className="text-white h-5 w-5 hover:text-gray-200" />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="font-semibold font-satoshi">{shipment.orderId}</p>
                    <p className="text-gray-400 text-sm font-satoshi">{shipment.userName}</p>
                    <p className="text-gray-400 text-sm font-satoshi">{shipment.userEmail}</p>
                    <p className="text-gray-400 text-sm font-satoshi">{shipment.userPhone}</p>
                    <p className="text-gray-400 text-sm font-satoshi">{shipment.shippingAddress}</p>
                    <p
                      className={`text-sm font-satoshi ${
                        shipment.status === "Pending"
                          ? "text-yellow-500"
                          : shipment.status === "Shipped"
                            ? "text-blue-500"
                            : shipment.status === "Delivered"
                              ? "text-green-500"
                              : "text-purple-500"
                      }`}
                    >
                      {shipment.status}
                    </p>
                    <p className="text-gray-400 text-sm font-satoshi">{shipment.trackingNumber}</p>
                    <p className="text-gray-400 text-sm font-satoshi">
                      {new Date(shipment.shipmentDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-400 text-sm font-satoshi">
                      {new Date(shipment.deliveryDate).toLocaleDateString()}
                    </p>
                    <div className="flex gap-5 justify-center">
                      <button onClick={() => handleEdit(shipment._id)}>
                        <CiEdit className="text-blue-500 h-5 w-5 hover:text-blue-400 cursor-pointer" />
                      </button>
                      <button onClick={() => handleDelete(shipment._id)}>
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
      <div className="overflow-x-auto mt-6">
        <div className="flex justify-center items-center space-x-2 min-w-[800px]">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border-[1px] border-white/20 text-gray-400 disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-4 py-2 rounded-lg ${
                currentPage === index + 1
                  ? "bg-gray-700 text-white"
                  : "bg-gray-800 text-gray-400"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border-[1px] border-white/20 text-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShipmentsDashboard;