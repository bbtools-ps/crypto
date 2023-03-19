import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import PageDescription from "./PageDescription";

describe("<PageDescription/>", () => {
  it("should render the heading that contains the title prop, and also the description and the icon props", () => {
    const testTitle = "test title";
    const testDescription = "test description";
    const testIcon = "test icon";
    render(
      <PageDescription
        title={testTitle}
        description={testDescription}
        icon={testIcon}
      />
    );

    expect(
      screen.getByRole("heading", { name: new RegExp(testTitle, "ig") })
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(testDescription, "ig"))
    ).toBeInTheDocument();
    expect(screen.getByText(new RegExp(testIcon, "ig"))).toBeInTheDocument();
  });
});
