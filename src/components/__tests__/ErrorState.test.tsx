import { render, screen, fireEvent } from '@testing-library/react';
import ErrorState from '../ErrorState';

describe('ErrorState', () => {
  it('renders the error message', () => {
    render(<ErrorState onRetry={jest.fn()} />);
    expect(screen.getByText('Connection failed')).toBeInTheDocument();
  });

  it('renders a RETRY button', () => {
    render(<ErrorState onRetry={jest.fn()} />);
    expect(screen.getByRole('button', { name: 'RETRY' })).toBeInTheDocument();
  });

  it('calls onRetry when the RETRY button is clicked', () => {
    const onRetry = jest.fn();
    render(<ErrorState onRetry={onRetry} />);
    fireEvent.click(screen.getByRole('button', { name: 'RETRY' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
