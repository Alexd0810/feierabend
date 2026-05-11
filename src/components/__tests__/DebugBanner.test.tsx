import { render, screen } from '@testing-library/react';
import DebugBanner from '../DebugBanner';

describe('DebugBanner', () => {
  it('renders nothing when both mode and week are null', () => {
    const { container } = render(<DebugBanner mode={null} week={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders when mode is provided', () => {
    render(<DebugBanner mode="school" week={null} />);
    expect(screen.getByText(/DEBUG MODE ACTIVE/)).toBeInTheDocument();
    expect(screen.getByText('mode=school')).toBeInTheDocument();
  });

  it('renders when week is provided', () => {
    render(<DebugBanner mode={null} week="even" />);
    expect(screen.getByText('week=even')).toBeInTheDocument();
  });

  it('renders both params when both are provided', () => {
    render(<DebugBanner mode="work" week="odd" />);
    expect(screen.getByText('mode=work | week=odd')).toBeInTheDocument();
  });
});
