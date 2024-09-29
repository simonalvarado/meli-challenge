import React, { useState, useEffect } from "react";
import { fetchItems } from "../../services/dataService";
import "./ItemList.scss";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadInitialItems = async () => {
      const newItems = await fetchItems(page); // Usa el page inicial
      setItems(newItems);
    };

    loadInitialItems();
  }, []);

  const loadItems = async () => {
    if (!hasMore) return;

    try {
      const nextPage = page + 1;
      const newItems = await fetchItems(nextPage);

      if (newItems.length < 10) {
        setHasMore(false);
      }

      setPage(nextPage);
      setItems((prevItems) => [...prevItems, ...newItems]); 
    } catch (error) {
      console.error("Error loading items:", error);
    }
  };

  return (
    <div className="item-list">
      <h1>Item List</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
      {hasMore && <button onClick={loadItems}>Cargar Mas</button>}
    </div>
  );
};

export default ItemList;
