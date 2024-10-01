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
    handleSearch("");
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el envío del formulario
  };

  return (
    <div className="search-bar">
      <form
        onSubmit={handleSubmit}
        className="search-bar__container"
        role="search"
      >
        <label htmlFor="search-input" className="visually-hidden">
          Buscar producto
        </label>
        <SearchIcon
          className="search-bar__icon search-bar__icon--search"
          aria-hidden="true"
        />
        <input
          id="search-input"
          className="search-bar__input"
          type="search"
          placeholder="Buscar producto"
          value={input}
          onChange={handleInputChange}
        />
        {input && (
          <button
            type="button"
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
      </form>
    </div>
  );
};

export default SearchBar;
