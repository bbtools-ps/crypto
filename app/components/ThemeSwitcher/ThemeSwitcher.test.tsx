import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ThemeSwither from "./ThemeSwitcher";

describe("<ThemeSwitcher/>", () => {
  it("should render the theme switcher button", () => {
    render(<ThemeSwither />);

    expect(
      screen.getByRole("button", { name: /theme switch/i })
    ).toBeInTheDocument();
  });
});
