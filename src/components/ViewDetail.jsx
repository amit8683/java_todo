import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const ViewDetail = () => {
  const { id } = useParams(); // ✅ Get ID from URL
  const [product, setProduct] = useState(null);

  const getProductById = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/auth/${id}`, {
        method: "GET",
      });
      const result = await response.json();
      setProduct(result); // ✅ Set product details
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    getProductById(); // ✅ Fetch data on component mount
  }, [id]);

  // ✅ Loading state
  if (!product) {
    return <p className="text-center text-gray-600 mt-10">Loading product details...</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800">{product.productName}</h2>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <p className="text-gray-700 font-semibold mt-2">Price: ${product.price}</p>
      <p className={`mt-2 font-medium ${product.status === "available" ? "text-green-600" : "text-red-600"}`}>
        Status: {product.status}
      </p>
      <Link to="/" className="mt-4 block bg-blue-500 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-600 transition">
        Back to home
      </Link>
    </div>
  );
};

export default ViewDetail;
