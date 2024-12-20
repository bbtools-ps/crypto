import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { vigenereEncrypt } from "~/utils/ciphers";
import VigenereCipher from "./vigenere-cipher";

describe("<VigenereCipher/>", () => {
  it("should render the heading with the text 'Vigenère', short description, modes for 'Encrypt' and 'Decrypt', 'Secret key', 'Input', 'Output' text fields, 'Copy', and 'Reset' buttons", () => {
    render(<VigenereCipher />);

    expect(
      screen.getByRole("heading", { name: /vigenère/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/interwoven/i)).toBeInTheDocument();
    expect(
      screen.getByRole("radiogroup", { name: /mode/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /encrypt/i })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /decrypt/i })).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /secret/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /input/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/output/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /copy/i })).toBeInTheDocument();
  });

  it("should render 'Encrypt' as a default selected value for the encryption modes", () => {
    render(<VigenereCipher />);

    expect(screen.getByRole("radio", { name: /encrypt/i })).toBeChecked();
    expect(screen.getByRole("radio", { name: /decrypt/i })).not.toBeChecked();
  });

  it("should change the checked radio button to 'Decrypt' when user clicks on it", async () => {
    render(<VigenereCipher />);
    const radioDecrypt = screen.getByRole("radio", { name: /decrypt/i });

    await userEvent.click(radioDecrypt);

    expect(screen.getByRole("radio", { name: /encrypt/i })).not.toBeChecked();
    expect(radioDecrypt).toBeChecked();
  });

  it("should render empty string as a default value for the 'Secret key' text field", () => {
    render(<VigenereCipher />);

    expect(screen.getByRole("textbox", { name: /secret/i })).toHaveValue("");
  });

  it("should change the value for the 'Secret key' text field when user types something into it", async () => {
    const testValue = "test";
    render(<VigenereCipher />);
    const fieldSecret = screen.getByRole("textbox", { name: /secret/i });

    await userEvent.type(fieldSecret, testValue);

    expect(fieldSecret).toHaveValue(testValue);
  });

  it("should render empty string as a default value for the 'Input' text field", () => {
    render(<VigenereCipher />);

    expect(screen.getByRole("textbox", { name: /input/i })).toHaveValue("");
  });

  it("should change the value for the 'Input' text field when user types something into it", async () => {
    const testValue = "test";
    render(<VigenereCipher />);
    const fieldInput = screen.getByRole("textbox", { name: /input/i });

    await userEvent.type(fieldInput, testValue);

    expect(fieldInput).toHaveValue(testValue);
  });

  it("should render empty string as a default value for the 'Output' text field", () => {
    render(<VigenereCipher />);

    expect(screen.getByLabelText(/output/i)).toHaveTextContent("");
  });

  it("should encrypt the value from the 'Input' to the 'Output' text field", async () => {
    render(<VigenereCipher />);
    const testSecretKeyValue = "pizza";
    const testValue = "test";
    const testResult = vigenereEncrypt(testSecretKeyValue, testValue);
    const fieldSecret = screen.getByRole("textbox", { name: /secret/i });
    const fieldInput = screen.getByRole("textbox", { name: /input/i });

    await userEvent.type(fieldSecret, testSecretKeyValue);
    await userEvent.type(fieldInput, testValue);

    expect(screen.getByLabelText(/output/i)).toHaveTextContent(testResult);
  });

  it("should decrypt the value from the 'Input' to the 'Output' text field", async () => {
    render(<VigenereCipher />);
    const testSecretKeyValue = "pizza";
    const testResult = "test";
    const testResultEncrypt = vigenereEncrypt(testSecretKeyValue, testResult);
    const fieldSecret = screen.getByRole("textbox", { name: /secret/i });
    const fieldInput = screen.getByRole("textbox", { name: /input/i });
    const radioDecrypt = screen.getByRole("radio", { name: /decrypt/i });

    await userEvent.type(fieldSecret, testSecretKeyValue);
    await userEvent.type(fieldInput, testResultEncrypt);
    await userEvent.click(radioDecrypt);

    expect(screen.getByLabelText(/output/i)).toHaveTextContent(testResult);
  });

  it("should reset everything to default values when user clicks on the Reset button", async () => {
    render(<VigenereCipher />);
    const defaultSecretKeyValue = "";
    const defaultInputValue = "";
    const defaultOutputValue = "";
    const fieldSecret = screen.getByRole("textbox", { name: /secret/i });
    const fieldInput = screen.getByRole("textbox", { name: /input/i });
    const radioDecrypt = screen.getByRole("radio", { name: /decrypt/i });
    const btnReset = screen.getByRole("button", { name: /reset/i });

    await userEvent.type(fieldSecret, "pizza");
    await userEvent.type(fieldInput, "test");
    await userEvent.click(radioDecrypt);
    await userEvent.click(btnReset);

    expect(fieldSecret).toHaveValue(defaultSecretKeyValue);
    expect(fieldInput).toHaveValue(defaultInputValue);
    expect(screen.getByLabelText(/output/i)).toHaveTextContent(
      defaultOutputValue
    );
    expect(radioDecrypt).not.toBeChecked();
    expect(screen.getByRole("radio", { name: /encrypt/i })).toBeChecked();
  });
});
