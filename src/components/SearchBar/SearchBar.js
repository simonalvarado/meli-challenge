import React, { useState } from "react";
import "./SearchBar.scss";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        className="search-bar__input"
        type="text"
        placeholder="Buscar producto"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="search-bar__button" type="submit">
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
