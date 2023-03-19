import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
    expect(() => screen.getByRole("menuitem", { name: /caesar/i })).toThrow();
    expect(() => screen.getByRole("menuitem", { name: /vigenère/i })).toThrow();
    expect(() => screen.getByRole("menuitem", { name: /emoji/i })).toThrow();
  });

  it("should open the menu with options for picking the cipher when user clicks on 'Ciphers' button", async () => {
    render(<MainMenu />, { wrapper: BrowserRouter });

    await userEvent.click(screen.getByRole("button", { name: /ciphers/i }));

    expect(
      screen.getByRole("menuitem", { name: /caesar/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("menuitem", { name: /vigenère/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("menuitem", { name: /emoji/i })
    ).toBeInTheDocument();
    expect(() => screen.getByRole("menuitem", { name: /about/i })).toThrow();
  });

  it("should close the sub-menu when user clicks on option", async () => {
    render(<MainMenu />, { wrapper: BrowserRouter });

    await userEvent.click(screen.getByRole("button", { name: /ciphers/i }));
    await userEvent.click(screen.getByRole("menuitem", { name: /caesar/i }));

    expect(() => screen.getByRole("menuitem", { name: /caesar/i })).toThrow();
  });

  it("should open the appropriate options when clicking on the hamburger menu on smaller screens", async () => {
    window.innerWidth = 375;
    render(<MainMenu />, { wrapper: BrowserRouter });

    await userEvent.click(screen.getByRole("button", { name: /menu/i }));

    expect(
      screen.getByRole("menuitem", { name: /caesar/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("menuitem", { name: /vigenère/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("menuitem", { name: /emoji/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("menuitem", { name: /about/i })
    ).toBeInTheDocument();
  });

  it("should close the hamburger menu when user clicks on option", async () => {
    window.innerWidth = 375;
    render(<MainMenu />, { wrapper: BrowserRouter });

    await userEvent.click(screen.getByRole("button", { name: /menu/i }));
    await userEvent.click(screen.getByRole("menuitem", { name: /caesar/i }));

    expect(() => screen.getByRole("menuitem", { name: /caesar/i })).toThrow();
  });
});
