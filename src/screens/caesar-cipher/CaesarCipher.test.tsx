import { caesarEncryptDecrypt } from "@/utils/ciphers";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Component as CaesarCipher } from "./CaesarCipher";

describe("<CaesarCipher/>", () => {
  it("should render the heading with the text 'Caesar', short description, 'Shift value', 'Input', 'Output' text fields, 'Copy', and 'Reset' buttons", () => {
    render(<CaesarCipher />);

    expect(
      screen.getByRole("heading", { name: /caesar/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/cryptography/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /shift/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /input/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/output/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /copy/i })).toBeInTheDocument();
  });

  it("should render '13' as the default value of the 'Shift value' field", () => {
    render(<CaesarCipher />);

    expect(screen.getByRole("textbox", { name: /shift/i })).toHaveValue("13");
  });

  it("should change the 'Shift value' when typing a new value into the input field", async () => {
    const testValue = "1";
    render(<CaesarCipher />);
    const fieldShift = screen.getByRole("textbox", { name: /shift/i });

    await userEvent.clear(fieldShift);
    await userEvent.type(fieldShift, testValue);

    expect(fieldShift).toHaveValue(testValue);
  });

  it("should allow only numbers to be typed into the 'Shift value' field", async () => {
    const testValue = "test";
    render(<CaesarCipher />);
    const fieldShift = screen.getByRole("textbox", { name: /shift/i });

    await userEvent.clear(fieldShift);
    await userEvent.type(fieldShift, testValue);

    expect(fieldShift).toHaveValue("");
  });

  it("should change the 'Shift value' to '26' if user types value that is > 26 (maximum value)", async () => {
    const testValue = "100";
    render(<CaesarCipher />);
    const fieldShift = screen.getByRole("textbox", { name: /shift/i });

    await userEvent.clear(fieldShift);
    await userEvent.type(fieldShift, testValue);

    expect(fieldShift).toHaveValue("26");
  });

  it("should change the 'Shift value' to '0' if user types value that is < 0 (minimum value)", async () => {
    const testValue = "-1";
    render(<CaesarCipher />);
    const fieldShift = screen.getByRole("textbox", { name: /shift/i });

    await userEvent.clear(fieldShift);
    await userEvent.type(fieldShift, testValue);

    expect(fieldShift).toHaveValue("0");
  });

  it("should change the 'Shift value' to '0' if user clears the input field and leaves it", async () => {
    render(<CaesarCipher />);
    const fieldShift = screen.getByRole("textbox", { name: /shift/i });

    await userEvent.clear(fieldShift);
    await userEvent.tab();

    expect(fieldShift).toHaveValue("0");
  });

  it("should render the empty string value as the default value for the 'Input' field", () => {
    render(<CaesarCipher />);
    const fieldInput = screen.getByRole("textbox", { name: /input/i });

    expect(fieldInput).toHaveValue("");
  });

  it("should change the value for the 'Input' when user types some text into it", async () => {
    const testValue = "test";
    render(<CaesarCipher />);
    const fieldInput = screen.getByRole("textbox", { name: /input/i });

    await userEvent.type(fieldInput, testValue);

    expect(fieldInput).toHaveValue(testValue);
  });

  it("should render empty string as a default value for the 'Output' field", () => {
    render(<CaesarCipher />);

    expect(screen.getByLabelText(/output/i)).toHaveTextContent("");
  });

  it("should translate the entered text from the 'Input' field to the 'Output' field", async () => {
    const testValue = "test";
    const testResult = caesarEncryptDecrypt(13, testValue);
    render(<CaesarCipher />);
    const fieldInput = screen.getByRole("textbox", { name: /input/i });

    await userEvent.type(fieldInput, testValue);

    expect(screen.getByLabelText(/output/i)).toHaveTextContent(testResult);
  });

  it("should update the value in the 'Output' field when 'Shift value' changes", async () => {
    const testValue = "test";
    const testShiftValue = 1;
    const testResult = caesarEncryptDecrypt(testShiftValue, testValue);
    render(<CaesarCipher />);
    const fieldShift = screen.getByRole("textbox", { name: /shift/i });
    const fieldInput = screen.getByRole("textbox", { name: /input/i });

    await userEvent.type(fieldInput, testValue);
    await userEvent.clear(fieldShift);
    await userEvent.type(fieldShift, testShiftValue.toString());
    await userEvent.tab();

    expect(screen.getByLabelText(/output/i)).toHaveTextContent(testResult);
  });

  it("should reset everything to defaults when user clicks the 'Reset' button", async () => {
    const defaultShiftValue = "13";
    const defaultInputValue = "";
    const defaultOutputValue = "";
    render(<CaesarCipher />);
    const fieldShift = screen.getByRole("textbox", { name: /shift/i });
    const fieldInput = screen.getByRole("textbox", { name: /input/i });

    await userEvent.type(fieldInput, "test");
    await userEvent.clear(fieldShift);
    await userEvent.type(fieldShift, "1");
    await userEvent.click(screen.getByRole("button", { name: /reset/i }));

    expect(fieldShift).toHaveValue(defaultShiftValue);
    expect(fieldInput).toHaveValue(defaultInputValue);
    expect(screen.getByLabelText(/output/i)).toHaveTextContent(
      defaultOutputValue
    );
  });
});
