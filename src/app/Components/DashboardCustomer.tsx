"use client";
import { client } from "@/sanity/lib/client";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoTrash } from "react-icons/io5";
import { CustomerTypes } from "../../../types/ComponentsTypes";
const fetchCustomers = async (): Promise<CustomerTypes[]> => {
  const customers = await client.fetch(
    `*[_type == "customer"]{
      _id,
      fullName,
      phone,
      city,
      address,
      email
    }`
  );
  return customers;
};
const CustomerDashboard = () => {
  const [customers, setCustomers] = useState<CustomerTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedCustomer, setEditedCustomer] = useState<CustomerTypes | null>(
    null
  );
  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const allCustomers = await fetchCustomers();
        setCustomers(allCustomers);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCustomers();
  }, []);
  const handleEdit = (customer: CustomerTypes) => {
    setEditingId(customer._id);
    setEditedCustomer({ ...customer });
  };
  const handleSave = async () => {
    if (!editedCustomer) return;
    try {
      await client
        .patch(editedCustomer._id)
        .set({
          fullName: editedCustomer.fullName,
          phone: editedCustomer.phone,
          city: editedCustomer.city,
          address: editedCustomer.address,
          email: editedCustomer.email,
        })
        .commit();
      const updatedCustomers = customers.map((customer) =>
        customer._id === editedCustomer._id ? editedCustomer : customer
      );
      setCustomers(updatedCustomers);
      setEditingId(null);
      setEditedCustomer(null);
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };
  const handleDelete = async (id: string) => {
    try {
      await client.delete(id);
      const updatedCustomers = customers.filter(
        (customer) => customer._id !== id
      );
      setCustomers(updatedCustomers);
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };
  const filteredCustomers = customers.filter((customer) =>
    customer.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
<div className="bg-gray-800 text-white p-6">
  <div className="mb-6">
    <input
      type="text"
      placeholder="Search customers..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full p-2 rounded-lg bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
    />
  </div>

  <div className="overflow-x-auto lg:overflow-x-visible">
    <div className="grid grid-cols-6 font-bold text-lg py-3 border-b border-gray-700 text-center font-satoshiBold min-w-[800px] lg:min-w-0">
      <p>Name</p>
      <p>Phone</p>
      <p>Email</p>
      <p>City</p>
      <p>Address</p>
      <p>Actions</p>
    </div>

    <div className="mt-4 min-w-[800px] lg:min-w-0">
      {loading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-6 items-center py-4 border-b border-gray-700 text-center"
          >
            <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
          </div>
        ))
      ) : filteredCustomers.length === 0 ? (
        <div className="text-center text-white">No customers found</div>
      ) : (
        filteredCustomers.map((customer) => (
          <div
            key={customer._id}
            className="grid grid-cols-6 gap-x-2 items-center py-4 border-b border-gray-700 text-center"
          >
            {editingId === customer._id ? (
              <>
                <input
                  type="text"
                  value={editedCustomer?.fullName || ""}
                  onChange={(e) =>
                    setEditedCustomer({
                      ...editedCustomer!,
                      fullName: e.target.value,
                    })
                  }
                  className="p-1 rounded bg-gray-700 text-white font-satoshi"
                />
                <input
                  type="text"
                  value={editedCustomer?.phone || ""}
                  onChange={(e) =>
                    setEditedCustomer({
                      ...editedCustomer!,
                      phone: e.target.value,
                    })
                  }
                  className="p-1 rounded bg-gray-700 text-white font-satoshi"
                />
                <input
                  type="text"
                  value={editedCustomer?.email || ""}
                  onChange={(e) =>
                    setEditedCustomer({
                      ...editedCustomer!,
                      email: e.target.value,
                    })
                  }
                  className="p-1 rounded bg-gray-700 text-white font-satoshi"
                />
                <input
                  type="text"
                  value={editedCustomer?.city || ""}
                  onChange={(e) =>
                    setEditedCustomer({
                      ...editedCustomer!,
                      city: e.target.value,
                    })
                  }
                  className="p-1 rounded bg-gray-700 text-white font-satoshi"
                />
                <input
                  type="text"
                  value={editedCustomer?.address || ""}
                  onChange={(e) =>
                    setEditedCustomer({
                      ...editedCustomer!,
                      address: e.target.value,
                    })
                  }
                  className="p-1 rounded bg-gray-700 text-white font-satoshi"
                />
                <button
                  onClick={handleSave}
                  className="text-green-500 hover:underline hover:text-green-600 text-[12px]"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <p className="font-semibold font-satoshi">{customer.fullName}</p>
                <p className="text-gray-400 text-sm font-satoshi">
                  {customer.phone}
                </p>
                <p className="text-white font-bold font-satoshi">
                  {customer.email}
                </p>
                <p className="text-gray-400 text-sm font-satoshi">
                  {customer.city}
                </p>
                <p className="text-gray-400 text-sm font-satoshi">
                  {customer.address}
                </p>
                <div className="flex justify-center gap-x-4">
                  <button onClick={() => handleEdit(customer)}>
                    <CiEdit className="text-blue-500 h-5 w-5 hover:text-blue-600" />
                  </button>
                  <button onClick={() => handleDelete(customer._id)}>
                    <IoTrash className="text-red-500 h-5 w-5 hover:text-red-600" />
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

export default CustomerDashboard;
