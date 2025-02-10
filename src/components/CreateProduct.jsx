import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const CreateProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productName: "",
    description: "",
    price: "",
    status: "available",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/api/auth/saveProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (response.ok) {
      alert("✅ Product Created Successfully!");
      setProduct({ productName: "", description: "", price: "", status: "available" });
      navigate("/");
    } else {
      alert("❌ Failed to create product.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-4">
      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">🛒 Create Product</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            value={product.productName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            rows="4"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <select
            name="status"
            value={product.status}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="available">Available</option>
            <option value="out of stock">Out of Stock</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-600 transition-all duration-200"
          >
            ➕ Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
