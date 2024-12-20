import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Footer from "./Footer";

describe("<Footer/>", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  it("should render the current year and the label value (string)", () => {
    const mockDate = new Date(2022, 0, 1);
    vi.setSystemTime(mockDate);
    const testLabel = "test";
    render(<Footer copyrightLabel={testLabel} />);

    expect(screen.getByText(testLabel)).toBeInTheDocument();
    expect(screen.getByText(/2022/i)).toBeInTheDocument();
  });
});
