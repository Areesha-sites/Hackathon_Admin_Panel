import { client } from "@/sanity/lib/client";
import { useState, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { IoTrash } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
interface UserTypes {
  _id: string;
  userId: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  zipCode: string;
  country: string;
  countryCode: string;
  city: string;
  state: string;
  orders: {
    orderId: string;
    productId?: string;
    productName?: string;
    productPrice?: number;
    quantity: number;
  }[];
  password?: string;
  createdAt: string;
  updatedAt: string;
}
const fetchUsers = async (): Promise<UserTypes[]> => {
  const users = await client.fetch(
    `*[_type == "checkUser"]{
      _id,
      userId,
      name,
      email,
      phoneNumber,
      address,
      zipCode,
      country,
      countryCode,
      city,
      state,
      orders,
      password,
      createdAt,
      updatedAt
    }`
  );
  return users;
};
const UsersDashboard = () => {
  const [users, setUsers] = useState<UserTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "email" | "createdAt">("name");
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editedUser, setEditedUser] = useState<Partial<UserTypes>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); 
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const allUsers = await fetchUsers();
        setUsers(allUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);
  const handleEdit = (userId: string) => {
    setEditingUserId(userId);
    const userToEdit = users.find((user) => user._id === userId);
    if (userToEdit) {
      setEditedUser(userToEdit);
    }
  };
  const handleSave = async () => {
    if (editingUserId) {
      try {
        await client.patch(editingUserId).set(editedUser).commit();
        const updatedUsers = users.map((user) =>
          user._id === editingUserId ? { ...user, ...editedUser } : user
        );
        setUsers(updatedUsers);
        setEditingUserId(null);
        setEditedUser({});
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };
  const handleDelete = async (userId: string) => {
    try {
      await client.delete(userId);
      const updatedUsers = users.filter((user) => user._id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };
  const filteredUsers = users.filter(
    (user) =>
      user.name &&
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "email") {
      return a.email.localeCompare(b.email);
    } else if (sortBy === "createdAt") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    return 0;
  });
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="bg-gray-800 text-white p-6 min-h-screen">
      <div className="mb-6 flex gap-4 flex-col md:flex-row">
        <input
          type="text"
          placeholder="Search users by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 rounded-lg bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value as "name" | "email" | "createdAt")
          }
          className="p-2 rounded-lg bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          <option value="name">Sort by Name</option>
          <option value="email">Sort by Email</option>
          <option value="createdAt">Sort by Created At</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-12 font-bold text-lg py-3 border-b border-gray-700 text-center font-satoshiBold min-w-[2000px]">
          <p>User ID</p>
          <p>Name</p>
          <p>Email</p>
          <p>Phone Number</p>
          <p>Address</p>
          <p>Zip Code</p>
          <p>Country</p>
          <p>Country Code</p>
          <p>City</p>
          <p>State</p>
          <p>Orders</p>
          <p>Actions</p>
        </div>
        <div className="mt-4">
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-x-2 items-center py-4 border-b border-gray-700 text-center min-w-[2000px]"
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
                <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
              </div>
            ))
          ) : currentUsers.length === 0 ? (
            <div className="text-center text-red-500">No users found</div>
          ) : (
            currentUsers.map((user) => (
              <div
                key={user._id}
                className="grid grid-cols-12 items-center gap-x-2 py-4 border-b border-gray-700 text-center min-w-[2000px]"
              >
                {editingUserId === user._id ? (
                  <>
                    <input
                      type="text"
                      name="userId"
                      value={editedUser.userId || ""}
                      onChange={handleChange}
                      className="p-1 rounded bg-gray-600 text-white text-center"
                    />
                    <input
                      type="text"
                      name="name"
                      value={editedUser.name || ""}
                      onChange={handleChange}
                      className="p-1 rounded bg-gray-600 text-white text-center"
                    />
                    <input
                      type="text"
                      name="email"
                      value={editedUser.email || ""}
                      onChange={handleChange}
                      className="p-1 rounded bg-gray-600 text-white text-center"
                    />
                    <input
                      type="text"
                      name="phoneNumber"
                      value={editedUser.phoneNumber || ""}
                      onChange={handleChange}
                      className="p-1 rounded bg-gray-600 text-white text-center"
                    />
                    <input
                      type="text"
                      name="address"
                      value={editedUser.address || ""}
                      onChange={handleChange}
                      className="p-1 rounded bg-gray-600 text-white text-center"
                    />
                    <input
                      type="text"
                      name="zipCode"
                      value={editedUser.zipCode || ""}
                      onChange={handleChange}
                      className="p-1 rounded bg-gray-600 text-white text-center"
                    />
                    <input
                      type="text"
                      name="country"
                      value={editedUser.country || ""}
                      onChange={handleChange}
                      className="p-1 rounded bg-gray-600 text-white text-center"
                    />
                    <input
                      type="text"
                      name="countryCode"
                      value={editedUser.countryCode || ""}
                      onChange={handleChange}
                      className="p-1 rounded bg-gray-600 text-white text-center"
                    />
                    <input
                      type="text"
                      name="city"
                      value={editedUser.city || ""}
                      onChange={handleChange}
                      className="p-1 rounded bg-gray-600 text-white text-center"
                    />
                    <input
                      type="text"
                      name="state"
                      value={editedUser.state || ""}
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
                      <button onClick={() => setEditingUserId(null)}>
                        <RxCross2 className="text-white h-5 w-5 hover:text-gray-200" />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="font-semibold font-satoshi">{user.userId}</p>
                    <p className="text-gray-400 text-sm font-satoshi">{user.name}</p>
                    <p className="text-gray-400 text-sm font-satoshi">{user.email}</p>
                    <p className="text-gray-400 text-sm font-satoshi">{user.phoneNumber}</p>
                    <p className="text-gray-400 text-sm font-satoshi">{user.address}</p>
                    <p className="text-gray-400 text-sm font-satoshi">{user.zipCode}</p>
                    <p className="text-gray-400 text-sm font-satoshi">{user.country}</p>
                    <p className="text-gray-400 text-sm font-satoshi">{user.countryCode}</p>
                    <p className="text-gray-400 text-sm font-satoshi">{user.city}</p>
                    <p className="text-gray-400 text-sm font-satoshi">{user.state}</p>
                    <p className="text-gray-400 text-sm font-satoshi">
                      {user.orders.length} orders
                    </p>
                    <div className="flex gap-5 justify-center">
                      <button onClick={() => handleEdit(user._id)}>
                        <CiEdit className="text-blue-500 h-5 w-5 hover:text-blue-400 cursor-pointer" />
                      </button>
                      <button onClick={() => handleDelete(user._id)}>
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

export default UsersDashboard;