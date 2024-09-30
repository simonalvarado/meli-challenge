const BASE_URL = "http://localhost:6001";

export const fetchItems = async (params) => {
  const { page = 1, perPage = 10, query = "" } = params;

  let url = `${BASE_URL}/api/items?page=${page}&per_page=${perPage}`;

  if (query.trim()) {
    url += `&query=${encodeURIComponent(query.trim())}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch items");
    }
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};
