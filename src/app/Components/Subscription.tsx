"use client";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { SubscriptionManagementTypes } from "../../../types/ComponentsTypes";
const SubscriptionManagement = () => {
  const [subscriptions, setSubscriptions] = useState<
    SubscriptionManagementTypes[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  useEffect(() => {
    const fetchSubscriptions = async () => {
      const query = `*[_type == "subscription"] {
        name,
        email,
        plan,
        status,
        startDate,
        renewalDate,
        history
      }`;
      try {
        const data = await client.fetch(query);
        setSubscriptions(data);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscriptions();
  }, []);
  const filteredSubscriptions = subscriptions.filter(
    (subscription) =>
      subscription.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscription.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscription.plan.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredSubscriptions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSubscriptions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  return (
    <div className="bg-black text-white p-6 min-h-screen">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search subscriptions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>
      <div className="mb-4 text-end font-satoshiBold text-[16px] text-gray-500">
        Total Subscriptions: {filteredSubscriptions.length}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Plan</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Start Date</th>
              <th className="p-3 text-left">Renewal Date</th>
              <th className="p-3 text-left">History</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500"></div>
                  </div>
                </td>
              </tr>
            ) : currentItems.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-red-500">
                  No subscriptions found.
                </td>
              </tr>
            ) : (
              currentItems.map((subscription, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-700 hover:bg-gray-800 transition-colors"
                >
                  <td className="p-3">{subscription.name}</td>
                  <td className="p-3 text-gray-500">{subscription.email}</td>
                  <td className="p-3">{subscription.plan}</td>
                  <td className="p-3 text-green-500">{subscription.status}</td>
                  <td className="p-3">
                    {new Date(subscription.startDate).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    {new Date(subscription.renewalDate).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <ul>
                      {(subscription.history || []).map((historyItem, idx) => (
                        <li key={idx}>
                          <span className="text-green-500">
                            {historyItem.status}
                          </span>{" "}
                          - {new Date(historyItem.date).toLocaleDateString()}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
            } transition-colors`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SubscriptionManagement;
