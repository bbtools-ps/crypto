import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ThemeContext } from "~/hooks";
import ThemeSwither from "./ThemeSwitcher";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeContext.Provider value={{ toggleTheme: vi.fn() }}>
    {children}
  </ThemeContext.Provider>
);

describe("<ThemeSwitcher/>", () => {
  it("should render the theme switcher button", () => {
    render(<ThemeSwither />, { wrapper: Wrapper });

    expect(
      screen.getByRole("button", { name: /theme switch/i })
    ).toBeInTheDocument();
  });
});
