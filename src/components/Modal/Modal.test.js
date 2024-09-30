import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Modal from "./Modal";

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

describe("Modal", () => {
  it("renders modal content when open", () => {
    render(<Modal isOpen={true} onClose={() => {}} item={mockItem} />);
    expect(screen.getByText("iPhone 12")).toBeInTheDocument();
    expect(screen.getByText("A great phone")).toBeInTheDocument();
    expect(screen.getByText("$999")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onCloseMock = jest.fn();
    render(<Modal isOpen={true} onClose={onCloseMock} item={mockItem} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("does not render when isOpen is false", () => {
    render(<Modal isOpen={false} onClose={() => {}} item={mockItem} />);
    expect(screen.queryByText("iPhone 12")).not.toBeInTheDocument();
  });
});
