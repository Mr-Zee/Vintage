// Determine the base API URL
const BASE_URL = import.meta.env.MODE === 'production' 
  ? "https://vintag-backend.vercel.app"  
  : "http://localhost:5000/api";

const API_URL = `${BASE_URL}/products`;

export const getProducts = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) return []; 
    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

export const createProduct = async (fd) => {
  const res = await fetch(API_URL, { method: "POST", body: fd });
  if (!res.ok) {
    const errorText = await res.text();
    console.error("Backend Error Detail:", errorText);
    throw new Error("Server Error: Check Backend Console");
  }
  return res.json();
};

export const deleteProduct = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return res.json();
};

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