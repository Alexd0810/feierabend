import { render, screen } from '@testing-library/react';
import StatsGrid from '../StatsGrid';
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

describe('StatsGrid', () => {
  it('shows "N/A" for lessons done when there are no lessons', () => {
    render(<StatsGrid lessons={[]} currentMin={600} feierabendMin={960} />);
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('shows 100% lessons done when all lessons are finished', () => {
    const lesson = makeLesson({ startMin: 480, endMin: 570 });
    render(<StatsGrid lessons={[lesson]} currentMin={600} feierabendMin={960} />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('shows 0% lessons done when no lessons have ended yet', () => {
    const lesson = makeLesson({ startMin: 700, endMin: 800 });
    render(<StatsGrid lessons={[lesson]} currentMin={600} feierabendMin={960} />);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('shows "PEAK" vibe when feierabend is reached', () => {
    render(<StatsGrid lessons={[]} currentMin={960} feierabendMin={960} />);
    expect(screen.getByText('PEAK')).toBeInTheDocument();
  });

  it('shows "Hyped" vibe when less than 30 min remain', () => {
    render(<StatsGrid lessons={[]} currentMin={935} feierabendMin={960} />);
    expect(screen.getByText('Hyped')).toBeInTheDocument();
  });

  it('shows hours survived label', () => {
    render(<StatsGrid lessons={[]} currentMin={600} feierabendMin={960} />);
    expect(screen.getByText(/Hours Survived/i)).toBeInTheDocument();
  });
});
