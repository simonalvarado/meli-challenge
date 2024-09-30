import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Card from "./Card";

const mockItem = {
  id: 1,
  title: "iPhone 12",
  description: "A great phone",
  image: "iphone.jpg",
  detail: {
    price: "$999",
    info: "Some info",
    address: "123 Apple St",
  },
};

describe("Card", () => {
  it("renders card content correctly", () => {
    render(<Card item={mockItem} />);
    expect(screen.getByText("iPhone 12")).toBeInTheDocument();
    expect(screen.getByText("A great phone")).toBeInTheDocument();
    expect(screen.getByText("$999")).toBeInTheDocument();
  });

  it('opens modal when "Ver detalles" button is clicked', () => {
    render(<Card item={mockItem} />);
    fireEvent.click(screen.getByText("Ver detalles"));
    expect(screen.getByText("Información del producto")).toBeInTheDocument();
  });
});
