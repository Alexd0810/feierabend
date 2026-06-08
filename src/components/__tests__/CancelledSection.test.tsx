import { render, screen } from '@testing-library/react';
import CancelledSection from '../CancelledSection';
import type { Lesson } from '../../types';

function makeLesson(overrides: Partial<Lesson> = {}): Lesson {
  return {
    subject: 'Math',
    room: '101',
    startMin: 480,
    endMin: 570,
    cancelled: true,
    ...overrides,
  };
}

describe('CancelledSection', () => {
  it('renders nothing when cancelled list is empty', () => {
    const { container } = render(
      <CancelledSection cancelled={[]} cancelledWithReplacement={new Map()} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders the correct count text for one cancelled lesson', () => {
    const lesson = makeLesson();
    render(<CancelledSection cancelled={[lesson]} cancelledWithReplacement={new Map()} />);
    expect(screen.getByText("Today's cancelled lessons")).toBeInTheDocument();
    expect(screen.getByText('1 total')).toBeInTheDocument();
  });

  it('renders plural text for multiple cancelled lessons', () => {
    const lessons = [makeLesson({ subject: 'A' }), makeLesson({ subject: 'B' })];
    render(<CancelledSection cancelled={lessons} cancelledWithReplacement={new Map()} />);
    expect(screen.getByText('2 total')).toBeInTheDocument();
    expect(screen.getByText('Open gaps')).toBeInTheDocument();
  });

  it('displays subject and time for a cancelled lesson', () => {
    const lesson = makeLesson({ subject: 'Math', startMin: 480, endMin: 570 });
    render(<CancelledSection cancelled={[lesson]} cancelledWithReplacement={new Map()} />);
    expect(screen.getByText('Math')).toBeInTheDocument();
    expect(screen.getByText('08:00 - 09:30')).toBeInTheDocument();
  });

  it('shows replacement info when a replacement lesson exists', () => {
    const cancelled = makeLesson({ subject: 'Math' });
    const replacement: Lesson = { ...makeLesson(), subject: 'History', cancelled: false };
    const map = new Map([[cancelled, replacement]]);
    const { container } = render(
      <CancelledSection cancelled={[cancelled]} cancelledWithReplacement={map} />
    );
    expect(screen.getAllByText('Covered').length).toBeGreaterThan(0);
    expect(container.querySelector('.cancelled-replacement-title')).toHaveTextContent(
      'Replaced by History'
    );
    expect(screen.getByText(/History/)).toBeInTheDocument();
  });
});
