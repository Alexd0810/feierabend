import { render, screen } from '@testing-library/react';
import Mascot from '../Mascot';

describe('Mascot', () => {
  it('renders the mascot container', () => {
    const { container } = render(<Mascot minutesLeft={120} totalMinutes={480} />);
    expect(container.querySelector('.mascot-container')).toBeInTheDocument();
  });

  it('renders a speech bubble', () => {
    const { container } = render(<Mascot minutesLeft={120} totalMinutes={480} />);
    expect(container.querySelector('.mascot-speech')).toBeInTheDocument();
  });

  it('shows celebration mood when minutesLeft is 0', () => {
    render(<Mascot minutesLeft={0} totalMinutes={480} />);
    expect(screen.getByText('B)')).toBeInTheDocument();
  });

  it('shows hyped mood when minutesLeft is 30', () => {
    render(<Mascot minutesLeft={30} totalMinutes={480} />);
    expect(screen.getByText(':O')).toBeInTheDocument();
  });

  it('shows fresh mood at the very start of the day', () => {
    render(<Mascot minutesLeft={480} totalMinutes={480} />);
    expect(screen.getByText(':D')).toBeInTheDocument();
  });

  it('applies "happy" class for celebration mood', () => {
    const { container } = render(<Mascot minutesLeft={0} totalMinutes={480} />);
    expect(container.querySelector('.mascot.happy')).toBeInTheDocument();
  });

  it('applies "dying" class when progress is over 75%', () => {
    // 100 min left out of 480 total → progress ≈ 79% → dying mood
    const { container } = render(<Mascot minutesLeft={100} totalMinutes={480} />);
    expect(container.querySelector('.mascot.dying')).toBeInTheDocument();
  });
});
