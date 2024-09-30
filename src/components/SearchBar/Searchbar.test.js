import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { SearchProvider } from "../../context/SearchContext";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  it("renders correctly", () => {
    render(
      <SearchProvider>
        <SearchBar />
      </SearchProvider>
    );
    expect(screen.getByPlaceholderText("Buscar producto")).toBeInTheDocument();
  });

  it("updates input value on change", () => {
    render(
      <SearchProvider>
        <SearchBar />
      </SearchProvider>
    );
    const input = screen.getByPlaceholderText("Buscar producto");
    fireEvent.change(input, { target: { value: "iPhone" } });
    expect(input.value).toBe("iPhone");
  });

  it("clears input when clear button is clicked", () => {
    render(
      <SearchProvider>
        <SearchBar />
      </SearchProvider>
    );
    const input = screen.getByPlaceholderText("Buscar producto");
    fireEvent.change(input, { target: { value: "iPhone" } });
    const clearButton = screen.getByLabelText("Limpiar búsqueda");
    fireEvent.click(clearButton);
    expect(input.value).toBe("");
  });
});
