import React, { useContext } from "react";
import { render, act } from "@testing-library/react";
import { SearchProvider, SearchContext } from "./SearchContext";
import { screen } from "@testing-library/react";

describe("SearchContext", () => {
  it("provides the correct context value", () => {
    const TestComponent = () => {
      const { searchQuery, handleSearch } = useContext(SearchContext);
      return (
        <div>
          <span data-testid="search-query">{searchQuery}</span>
          <button onClick={() => handleSearch("test query")}>Search</button>
        </div>
      );
    };

    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    );

    expect(screen.getByTestId("search-query").textContent).toBe("");

    act(() => {
      screen.getByText("Search").click();
    });

    expect(screen.getByTestId("search-query").textContent).toBe("test query");
  });
});
