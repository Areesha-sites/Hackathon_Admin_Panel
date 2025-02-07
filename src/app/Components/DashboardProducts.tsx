"use client";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ProductType } from "../../../types/ComponentsTypes";
const fetchProducts = async (category: string): Promise<ProductType[]> => {
  const products = await client.fetch(
    `*[_type=="${category}"]{
      _id,
      name,
      price,
      "imageUrl" : image.asset->url,
      category,
      discountPercent,
      ratingReviews
    }`
  );
  return products;
};
const ProductDashboard = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const categories = [
          "casual",
          "women",
          "men",
          "kids",
          "newArrivals",
          "topSelling",
        ];
        const allProducts = await Promise.all(
          categories.map((category) => fetchProducts(category))
        );
        const combinedProducts = allProducts.flat();
        setProducts(combinedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
    return (
      <div className="flex justify-center items-center w-full lg:ml-[-20px]">
      <div className="sm:w-[355px] md:w-[480px] lg:w-full w-[310px] overflow-hidden px-0">
        <div className="md:ml-[-30px]">
          <div className="bg-gray-800 text-white p-6 md:p-14 lg:p-8">
            <div className="mb-6 ml-3">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 rounded-lg bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
    
            <div className="mb-4 text-right font-bold text-white/60 font-satoshi">
              Total Products: {filteredProducts.length}
            </div>
    
            <div className="overflow-x-auto">
              <div className="grid grid-cols-6 font-bold text-lg py-3 border-b border-gray-700 text-center min-w-[800px]">
                <p>Image</p>
                <p>Name</p>
                <p>Category</p>
                <p>Price</p>
                <p>Discount</p>
                <p>Rating</p>
              </div>
    
              <div className="mt-4 min-w-[800px]">
                {loading ? (
                  <p className="text-center">Loading...</p>
                ) : currentItems.length === 0 ? (
                  <div className="text-center text-white">No products found</div>
                ) : (
                  currentItems.map((product) => (
                    <div
                      key={product._id}
                      className="grid grid-cols-6 items-center py-4 border-b border-gray-700 text-center"
                    >
                      <Image
                        height={64}
                        width={64}
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-16 h-16 object-cover mx-auto rounded-lg"
                      />
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-gray-400 text-sm">{product.category}</p>
                      <p className="text-white font-bold">${product.price}</p>
                      <p className="text-red-500">
                        {product.discountPercent
                          ? `${product.discountPercent}% Off`
                          : "-"}
                      </p>
                      <p className="text-yellow-400">⭐ {product.ratingReviews}</p>
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
                        ? "bg-gray-500 text-white"
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
        </div>
      </div>
    </div>
);
};

export default ProductDashboard;
