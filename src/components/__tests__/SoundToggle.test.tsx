import { render, screen, fireEvent } from '@testing-library/react';
import SoundToggle from '../SoundToggle';

describe('SoundToggle', () => {
  it('renders a button', () => {
    render(<SoundToggle enabled={false} onToggle={jest.fn()} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('applies the "enabled" class when enabled is true', () => {
    render(<SoundToggle enabled={true} onToggle={jest.fn()} />);
    expect(screen.getByRole('button')).toHaveClass('enabled');
  });

  it('does not apply "enabled" class when disabled', () => {
    render(<SoundToggle enabled={false} onToggle={jest.fn()} />);
    expect(screen.getByRole('button')).not.toHaveClass('enabled');
  });

  it('calls onToggle when clicked', () => {
    const onToggle = jest.fn();
    render(<SoundToggle enabled={false} onToggle={onToggle} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
