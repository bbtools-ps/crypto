import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import CopyButton from "./CopyButton";

describe("<CopyButton/>", () => {
  it("should render the button", () => {
    render(<CopyButton onClick={() => {}} isCopied={false} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it('should initially display the text "Copy to clipboard" on the button', () => {
    render(<CopyButton onClick={() => {}} isCopied={false} />);

    expect(screen.getByText(/copy to clipboard/i)).toBeInTheDocument();
  });

  it("should call the onClick function when user clicks on the button", async () => {
    const testFn = vi.fn();
    render(<CopyButton onClick={testFn} isCopied={false} />);

    await userEvent.click(screen.getByRole("button"));

    expect(testFn).toHaveBeenCalled();
  });

  it('should change the text to "Copied!" when isCopied prop is set to true', async () => {
    render(<CopyButton onClick={() => {}} isCopied={true} />);

    expect(screen.getByText(/copied/i)).toBeInTheDocument();
  });
});
