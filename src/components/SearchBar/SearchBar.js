import React, { useState, useEffect, useContext } from "react";
import { ReactComponent as SearchIcon } from "../../assets/search-icon.svg";
import { ReactComponent as ClearIcon } from "../../assets/x-icon.svg";
import { SearchContext } from "../../context/SearchContext.js";
import "./SearchBar.scss";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const { handleSearch } = useContext(SearchContext);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(input);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [input, handleSearch]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleClearInput = () => {
    setInput("");
  };

  return (
    <div className="search-bar">
      <div className="search-bar__container">
        <SearchIcon
          className="search-bar__icon search-bar__icon--search"
          aria-hidden="true"
        />
        <input
          className="search-bar__input"
          type="text"
          placeholder="Buscar producto"
          value={input}
          onChange={handleInputChange}
          aria-label="Buscar producto"
        />
        {input && (
          <button
            className="search-bar__clear-button"
            onClick={handleClearInput}
            aria-label="Limpiar búsqueda"
          >
            <ClearIcon
              className="search-bar__icon search-bar__icon--clear"
              aria-hidden="true"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
