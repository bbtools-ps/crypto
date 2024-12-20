import { render, screen } from "@testing-library/react";
import ThemeSwither from "./ThemeSwitcher";
import { describe, it, expect } from "vitest";

describe("<ThemeSwitcher/>", () => {
  it("should render the theme switcher button", () => {
    render(<ThemeSwither />);

    expect(
      screen.getByRole("button", { name: /theme switch/i })
    ).toBeInTheDocument();
  });
});
