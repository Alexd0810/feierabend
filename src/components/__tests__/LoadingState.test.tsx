import { render, screen } from '@testing-library/react';
import LoadingState from '../LoadingState';

describe('LoadingState', () => {
  it('renders the loading text', () => {
    render(<LoadingState />);
    expect(screen.getByText('INITIALIZING FEIERABEND SYSTEM...')).toBeInTheDocument();
  });

  it('renders the spinner element', () => {
    const { container } = render(<LoadingState />);
    expect(container.querySelector('.loading-spinner')).toBeInTheDocument();
  });
});
