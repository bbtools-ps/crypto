import { render, screen } from "@testing-library/react";
import PageNotFound from "./PageNotFound";

describe("<PageNotFound/>", () => {
  it("should render the heading with the text 'Page not found', and 'Go back home' link", () => {
    render(<PageNotFound />);

    expect(
      screen.getByRole("heading", { name: /page not found/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /go back home/i })
    ).toBeInTheDocument();
  });
});
