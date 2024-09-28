// src/services/dataService.js
const BASE_URL = "http://localhost:5001";

export const fetchItems = async (page = 2) => {
  try {
    const response = await fetch(`${BASE_URL}/items?_page=${page}`);
    if (!response.ok) {
      throw new Error("Failed to fetch items");
    }
    const items = await response.json();
    console.log(items);
    return items.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

