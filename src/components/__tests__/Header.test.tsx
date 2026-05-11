import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
  it('renders the app title', () => {
    render(<Header now={new Date(2025, 0, 1, 8, 0, 0)} />);
    expect(screen.getByText('FEIERABEND TIMER')).toBeInTheDocument();
  });

  it('displays the formatted current time', () => {
    const date = new Date(2025, 0, 1, 8, 30, 5);
    render(<Header now={date} />);
    const timeEl = screen.getByText(/Current Time:/);
    expect(timeEl).toBeInTheDocument();
  });

  it('renders a header element', () => {
    const { container } = render(<Header now={new Date()} />);
    expect(container.querySelector('header')).toBeInTheDocument();
  });
});
