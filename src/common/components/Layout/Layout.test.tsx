import { render, screen } from "@testing-library/react";
import Layout from "./Layout";

describe("<Layout/>", () => {
  it("should render the children that are passed as a prop into the Layout component", () => {
    const testChildren = <button type="button">Test</button>;
    render(<Layout>{testChildren}</Layout>);

    expect(screen.getByRole("button", { name: /test/i })).toBeInTheDocument();
  });
});
