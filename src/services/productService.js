// src/services/productService.js
const API_URL = process.env.NODE_ENV === 'production' 
  ? "/api/products"  // Relative path for production
  : "http://localhost:5000/api/products"; // Local path

export const getProducts = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const createProduct = async (fd) => {
  const res = await fetch(API_URL, { method: "POST", body: fd });
  
  // If the server sends a 500, don't just .json() it, log the text first
  if (!res.ok) {
    const errorText = await res.text(); // Get the raw error from the backend
    console.error("Backend Error Detail:", errorText);
    throw new Error("Server Error: Check Backend Console");
  }
  
  return res.json();
};

export const deleteProduct = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return res.json();
};

// 2. Add the updateProduct function using that API_URL
export const updateProduct = async (id, formData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      body: formData, 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update product");
    }

    return await response.json();
  } catch (error) {
    console.error("Update Error:", error);
    throw error;
  }
};