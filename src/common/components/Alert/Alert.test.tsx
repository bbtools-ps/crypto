import { render, screen } from "@testing-library/react";
import Alert from "./Alert";

describe("<Alert/>", () => {
  it("should render the Alert with the message that is passed as a prop", () => {
    const testMessage = "test";
    render(<Alert message={testMessage} />);

    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });
});
