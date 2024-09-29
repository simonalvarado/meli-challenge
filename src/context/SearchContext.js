import React, { createContext, useState, useCallback } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  return (
    <SearchContext.Provider value={{ searchQuery, handleSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
