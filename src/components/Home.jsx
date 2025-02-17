import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getAllProduct = async () => {
    const response = await fetch("http://localhost:8080/api/auth/", {
      method: "GET",
    });
    const result = await response.json();
    console.log(result);
    setProducts(result);
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/auth/deleteProduct/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Product deleted successfully!");
        setProducts(products.filter((product) => product.id !== id));
      } else {
        alert("Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Something went wrong!");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">🛒 Product List</h1>
      
      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-2xl transition duration-300">
            <h2 className="text-2xl font-semibold text-gray-800">{product.productName}</h2>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="text-gray-700 font-bold mt-2">
              Price: <span className="text-green-600">${product.price}</span>
            </p>
            <p className={`mt-2 font-medium ${product.status === "available" ? "text-green-600" : "text-red-600"}`}>
              Status: {product.status}
            </p>

            {/* Action Buttons */}
            <div className="mt-4 flex justify-between gap-2">
              <Link
                to={`/${product.id}`}
                className="flex-1 text-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                View
              </Link>
              <Link
                to={`editProduct/${product.id}`}
                className="flex-1 text-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
              >
                Update
              </Link>
            </div>

            {/* Delete Button - Full Width */}
            <button
              onClick={() => handleDelete(product.id)}
              className="mt-3 block w-full text-center px-4 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
            >
              ❌ Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
