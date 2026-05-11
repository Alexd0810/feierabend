import { render, screen } from '@testing-library/react';
import LessonCards from '../LessonCards';
import type { Lesson } from '../../types';

function makeLesson(overrides: Partial<Lesson> = {}): Lesson {
  return {
    subject: 'Math',
    room: '101',
    startMin: 480,
    endMin: 570,
    cancelled: false,
    ...overrides,
  };
}

describe('LessonCards', () => {
  it('shows "Free Time" when there is no current lesson', () => {
    render(<LessonCards currentLesson={null} nextLesson={null} currentMin={600} />);
    expect(screen.getByText('Free Time')).toBeInTheDocument();
  });

  it('shows the current lesson subject', () => {
    const lesson = makeLesson({ subject: 'Biology' });
    render(<LessonCards currentLesson={lesson} nextLesson={null} currentMin={510} />);
    expect(screen.getByText('Biology')).toBeInTheDocument();
  });

  it('shows the next lesson subject', () => {
    const next = makeLesson({ subject: 'Chemistry', startMin: 600, endMin: 690 });
    render(<LessonCards currentLesson={null} nextLesson={next} currentMin={510} />);
    expect(screen.getByText('Chemistry')).toBeInTheDocument();
  });

  it('shows formatted times for the current lesson', () => {
    const lesson = makeLesson({ startMin: 480, endMin: 570 });
    render(<LessonCards currentLesson={lesson} nextLesson={null} currentMin={510} />);
    // Times are rendered as a combined string "08:00 - 09:30"
    expect(screen.getByText(/08:00/)).toBeInTheDocument();
    expect(screen.getByText(/09:30/)).toBeInTheDocument();
  });
});
