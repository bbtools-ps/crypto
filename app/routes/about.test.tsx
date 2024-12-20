import { render, screen } from '@testing-library/react';
import About from './about';
import { describe, it, expect } from 'vitest';

describe('<About/>', () => {
  it("should render the heading with the text 'About' and the short description", () => {
    render(<About />);

    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByText(/collection/i)).toBeInTheDocument();
  });
});
