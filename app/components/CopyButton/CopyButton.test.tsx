import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import CopyButton from "./CopyButton";
import { describe, it, expect } from "vitest";

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
    const testFn = vi.fn();
    render(<CopyButton onClick={testFn} />);

    await userEvent.click(screen.getByRole("button"));

    expect(testFn).toHaveBeenCalled();
  });
});
