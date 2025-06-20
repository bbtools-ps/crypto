import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import CopyButton from "./CopyButton";

describe("<CopyButton/>", () => {
  it("should render the button", () => {
    render(<CopyButton onClick={async () => {}} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it('should initially display the text "Copy to clipboard" on the button', () => {
    render(<CopyButton onClick={async () => {}} />);

    expect(screen.getByText(/copy to clipboard/i)).toBeInTheDocument();
  });

  it("should call the onClick function when user clicks on the button", async () => {
    const user = userEvent.setup();
    const testFn = vi.fn();
    render(<CopyButton onClick={testFn} />);

    await user.click(screen.getByRole("button"));

    expect(testFn).toHaveBeenCalled();
  });
});
