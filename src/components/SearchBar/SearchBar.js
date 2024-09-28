import React, { useState } from "react";
import { ReactComponent as SearchIcon } from "../../assets/search-icon.svg";
import "./SearchBar.scss";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="search-bar">
      <form className="search-bar__form" onSubmit={handleSubmit}>
        <input
          className="search-bar__input"
          type="text"
          placeholder="Buscar producto"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Buscar producto"
        />
        <button
          className="search-bar__button"
          type="submit"
          aria-label="Buscar"
        >
          <SearchIcon className="search-bar__icon" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
