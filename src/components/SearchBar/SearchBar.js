import React, { useState, useEffect, useContext } from "react";
import { ReactComponent as SearchIcon } from "../../assets/search-icon.svg";
import { SearchContext } from "../../context/SearchContext.js";
import "./SearchBar.scss";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const { handleSearch } = useContext(SearchContext);

  useEffect(() => {
    // Debounce function
    const timeoutId = setTimeout(() => {
      handleSearch(input);
    }, 300); // 300ms delay

    // Cleanup function
    return () => clearTimeout(timeoutId);
  }, [input, handleSearch]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="search-bar">
      <div className="search-bar__container">
        <input
          className="search-bar__input"
          type="text"
          placeholder="Buscar producto"
          value={input}
          onChange={handleInputChange}
          aria-label="Buscar producto"
        />
        <SearchIcon className="search-bar__icon" aria-hidden="true" />
      </div>
    </div>
  );
};

export default SearchBar;
