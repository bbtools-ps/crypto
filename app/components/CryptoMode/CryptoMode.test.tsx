import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import CryptoMode from "./CryptoMode";

describe("<CryptoMode/>", () => {
  it("should render the label 'Mode', and the radio buttons with 'Encrypt' and 'Decrypt' options", () => {
    render(<CryptoMode value="encrypt" onChange={() => {}} />);
    const radioDecrypt = screen.getByRole("radio", { name: /decrypt/i });
    const radioEncrypt = screen.getByRole("radio", { name: /encrypt/i });

    expect(
      screen.getByRole("radiogroup", { name: /mode/i })
    ).toBeInTheDocument();
    expect(radioEncrypt).toBeInTheDocument();
    expect(radioDecrypt).toBeInTheDocument();
  });

  it("should change the encryption mode when it is set by the value prop", () => {
    render(<CryptoMode value="decrypt" onChange={() => {}} />);

    expect(screen.getByRole("radio", { name: /decrypt/i })).toBeChecked();
  });

  it("should call the onChange function when clicking radio button", async () => {
    const user = userEvent.setup();
    const testFn = vi.fn();

    render(<CryptoMode value="encrypt" onChange={testFn} />);

    await user.click(screen.getByRole("radio", { name: /decrypt/i }));

    expect(testFn).toHaveBeenCalled();
  });
});
