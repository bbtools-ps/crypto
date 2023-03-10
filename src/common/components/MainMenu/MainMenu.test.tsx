import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it } from "vitest";
import MainMenu from "./MainMenu";

describe("<MainMenu/>", () => {
  it("should render the main menu with the Logo, Ciphers, About and the Theme switcher button", () => {
    render(<MainMenu />, { wrapper: BrowserRouter });
    const btnLogo = screen.getByRole("button", { name: /logo/i });
    const btnCiphers = screen.getByRole("button", { name: /ciphers/i });
    const btnAbout = screen.getByRole("button", { name: /about/i });
    const btnTheme = screen.getByRole("button", { name: /theme switch/i });

    expect(btnLogo).toBeInTheDocument();
    expect(btnCiphers).toBeInTheDocument();
    expect(btnAbout).toBeInTheDocument();
    expect(btnTheme).toBeInTheDocument();
  });
});
