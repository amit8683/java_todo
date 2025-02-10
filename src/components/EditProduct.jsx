import React,{useState,useEffect} from 'react'
import { useParams, Link,useNavigate } from "react-router-dom";
const EditProduct = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [product,setProduct]=useState({
            productName: "",
            description: "",
            price: "",
            status: "available",
        })
    
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



    const handleChange = (e) => {
        setProduct({...product,[e.target.name]:e.target.value});
    }

    const handleSubmit =async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:8080/api/auth/editProduct/${id}`,{
            method: 'PUT',
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        })
        if (response.ok) {
            alert("Product Updated Successfully!");
            navigate("/");
          } else {
            alert("Failed to Updated product.");
          }

    }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6 border border-gray-200">
    <h1 className="text-2xl font-bold text-gray-800 mb-4">Edit Product</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="productName"
        placeholder="Product Name"
        value={product.productName}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
        required
      />
      <select
        name="status"
        value={product.status}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      >
        <option value="available">Available</option>
        <option value="out of stock">Out of Stock</option>
      </select>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Update
      </button>
    </form>
  </div>
  )
}

export default EditProduct
