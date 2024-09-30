import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { SearchProvider } from "../../context/SearchContext";
import ItemList from "./ItemList";
import * as dataService from "../../services/dataService";

class MockIntersectionObserver {
  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

jest.mock("../../services/dataService");

const mockItems = [
  {
    id: 1,
    title: "iPhone 12",
    description: "A great phone",
    image: "iphone.jpg",
    detail: { price: "$999" },
  },
  {
    id: 2,
    title: "Samsung Galaxy",
    description: "Another great phone",
    image: "samsung.jpg",
    detail: { price: "$899" },
  },
];

describe("ItemList", () => {
  it("renders items correctly", async () => {
    dataService.fetchItems.mockResolvedValue(mockItems);

    render(
      <SearchProvider>
        <ItemList />
      </SearchProvider>
    );

    // Espera a que los elementos aparezcan en el DOM
    await waitFor(
      () => {
        expect(screen.getByText("iPhone 12")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    expect(screen.getByText("Samsung Galaxy")).toBeInTheDocument();
  });

  it("displays error message when fetch fails", async () => {
    dataService.fetchItems.mockRejectedValue(new Error("Failed to fetch"));

    render(
      <SearchProvider>
        <ItemList />
      </SearchProvider>
    );

    await waitFor(
      () => {
        expect(
          screen.getByText("Failed to load items. Please try again later.")
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
