import { render, screen, act } from '@testing-library/react';
import MilestoneToast from '../MilestoneToast';
import type { MilestoneData } from '../../types';

const milestone: MilestoneData = {
  time: 60,
  emoji: '⏰',
  text: '1 HOUR LEFT!',
  subtext: 'The final countdown begins!',
};

describe('MilestoneToast', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('does not apply "show" class when milestone is null', () => {
    const { container } = render(<MilestoneToast milestone={null} onDismiss={jest.fn()} />);
    expect(container.firstChild).not.toHaveClass('show');
  });

  it('applies "show" class when milestone is provided', () => {
    const { container } = render(<MilestoneToast milestone={milestone} onDismiss={jest.fn()} />);
    expect(container.firstChild).toHaveClass('show');
  });

  it('displays the milestone emoji, text and subtext', () => {
    render(<MilestoneToast milestone={milestone} onDismiss={jest.fn()} />);
    expect(screen.getByText('⏰')).toBeInTheDocument();
    expect(screen.getByText('1 HOUR LEFT!')).toBeInTheDocument();
    expect(screen.getByText('The final countdown begins!')).toBeInTheDocument();
  });

  it('auto-dismisses after 3 seconds', () => {
    const onDismiss = jest.fn();
    render(<MilestoneToast milestone={milestone} onDismiss={onDismiss} />);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('does not call onDismiss before 3 seconds', () => {
    const onDismiss = jest.fn();
    render(<MilestoneToast milestone={milestone} onDismiss={onDismiss} />);

    act(() => {
      jest.advanceTimersByTime(2999);
    });

    expect(onDismiss).not.toHaveBeenCalled();
  });
});
