import React, { useState, useEffect } from "react";
import { fetchItems } from "../../services/dataService";
import "./ItemList.scss";

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems().then((data) => setItems(data));
  }, []);

  const handleLoadMore = () => {
    fetchItems().then((data) => setItems(data));
  };

  return (
    <div className="item-list">
      <h1>Item List</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
      <button onClick={handleLoadMore}>Cargar Mas</button>
    </div>
  );
};

export default ItemList;
