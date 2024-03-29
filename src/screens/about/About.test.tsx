import { render, screen } from "@testing-library/react";
import { Component as About } from "./About";

describe("<About/>", () => {
  it("should render the heading with the text 'About' and the short description", () => {
    render(<About />);

    expect(screen.getByRole("heading", { name: /about/i })).toBeInTheDocument();
    expect(screen.getByText(/collection/i)).toBeInTheDocument();
  });
});
