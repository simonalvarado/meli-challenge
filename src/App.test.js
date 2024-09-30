import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

// Mock los componentes hijos para aislar el test de App
jest.mock("./components/Header/Header", () => () => (
  <header data-testid="mock-header" />
));
jest.mock("./components/ItemList/ItemList", () => () => (
  <div data-testid="mock-item-list" />
));
jest.mock("./context/SearchContext", () => ({
  SearchProvider: ({ children }) => (
    <div data-testid="mock-search-provider">{children}</div>
  ),
}));

describe("App Component", () => {
  it("renders Header and ItemList within SearchProvider", () => {
    render(<App />);

    const searchProvider = screen.getByTestId("mock-search-provider");
    expect(searchProvider).toBeInTheDocument();

    const header = screen.getByTestId("mock-header");
    expect(header).toBeInTheDocument();
    expect(searchProvider).toContainElement(header);

    const itemList = screen.getByTestId("mock-item-list");
    expect(itemList).toBeInTheDocument();
    expect(searchProvider).toContainElement(itemList);

    const mainElement = screen.getByRole("main");
    expect(mainElement).toContainElement(itemList);
  });
});
