import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import InputOutput from "./InputOutput";

describe("<InputOutput/>", () => {
  it("should render the 'Input', 'Output' text fields, 'Reset', and 'Copy' button", () => {
    render(
      <InputOutput
        inputValue=""
        outputValue=""
        onInputChange={() => {}}
        onReset={() => {}}
      />
    );

    expect(screen.getByRole("textbox", { name: /input/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/output/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /copy/i })).toBeInTheDocument();
  });

  it("should render the 'Input' value when it is passed as a prop", () => {
    const testValue = "test";
    render(
      <InputOutput
        inputValue={testValue}
        outputValue=""
        onInputChange={() => {}}
        onReset={() => {}}
      />
    );

    expect(screen.getByRole("textbox", { name: /input/i })).toHaveValue(
      testValue
    );
  });

  it("should render the 'Output' value when it is passed as a prop", () => {
    const testValue = "test";
    render(
      <InputOutput
        inputValue=""
        outputValue={testValue}
        onInputChange={() => {}}
        onReset={() => {}}
      />
    );

    expect(screen.getByLabelText(/output/i)).toHaveTextContent(testValue);
  });

  it("should call the 'onInputChange' function when typing into the 'Input' value", async () => {
    const testFn = vi.fn();
    const testValue = "test";
    render(
      <InputOutput
        inputValue=""
        outputValue=""
        onInputChange={testFn}
        onReset={() => {}}
      />
    );

    await userEvent.type(
      screen.getByRole("textbox", { name: /input/i }),
      testValue
    );

    expect(testFn).toHaveBeenCalled();
  });

  it("should call the 'onReset' function when clicking on the 'Reset' button", async () => {
    const testFn = vi.fn();
    render(
      <InputOutput
        inputValue=""
        outputValue=""
        onInputChange={() => {}}
        onReset={testFn}
      />
    );

    await userEvent.click(screen.getByRole("button", { name: /reset/i }));

    expect(testFn).toHaveBeenCalledTimes(1);
  });
});
