// src/services/dataService.js
const BASE_URL = "http://localhost:6001";

export const fetchItems = async (params) => {
  const { page = 1, perPage = 10, query = "" } = params;
  try {
    const response = await fetch(
      `${BASE_URL}/api/items?page=${page}&per_page=${perPage}&query=${query}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch items");
    }
    const data = await response.json();
    console.log(data);
    return data.items;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};
