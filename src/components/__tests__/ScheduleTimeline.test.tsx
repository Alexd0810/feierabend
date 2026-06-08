import { render, screen } from '@testing-library/react';
import ScheduleTimeline from '../ScheduleTimeline';
import type { DayInfo, Lesson } from '../../types';

function makeDayInfo(overrides: Partial<DayInfo> = {}): DayInfo {
  return {
    isSchoolDay: true,
    isWorkDay: false,
    isWeekend: false,
    isEvenWeek: true,
    weekNumber: 24,
    dayOfWeek: 2,
    debugMode: false,
    debugParams: { mode: null, week: null },
    ...overrides,
  };
}

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

describe('ScheduleTimeline', () => {
  it('renders the updated schedule overview cards', () => {
    render(
      <ScheduleTimeline
        lessons={[
          makeLesson(),
          makeLesson({ subject: 'English', room: '102', startMin: 600, endMin: 690 }),
        ]}
        currentMin={500}
        dayInfo={makeDayInfo()}
        replacements={new Map()}
      />
    );

    expect(screen.getByText("Today's Schedule")).toBeInTheDocument();
    expect(screen.getByText('Current focus')).toBeInTheDocument();
    expect(screen.getByText('Upcoming')).toBeInTheDocument();
    expect(screen.getByText('Changes today')).toBeInTheDocument();
  });

  it('shows live and upcoming status badges for active schedules', () => {
    render(
      <ScheduleTimeline
        lessons={[
          makeLesson({ subject: 'Math', startMin: 480, endMin: 570 }),
          makeLesson({ subject: 'English', room: '102', startMin: 600, endMin: 690 }),
        ]}
        currentMin={500}
        dayInfo={makeDayInfo()}
        replacements={new Map()}
      />
    );

    expect(screen.getByText('Live Now')).toBeInTheDocument();
    expect(screen.getByText('Up Next')).toBeInTheDocument();
  });

  it('shows replacement messaging when a lesson replaces a cancelled slot', () => {
    const cancelled = makeLesson({
      subject: 'History',
      room: '103',
      startMin: 600,
      endMin: 660,
      cancelled: true,
    });
    const replacement = makeLesson({
      subject: 'Physics',
      room: '104',
      startMin: 600,
      endMin: 660,
    });

    const { container } = render(
      <ScheduleTimeline
        lessons={[cancelled, replacement]}
        currentMin={610}
        dayInfo={makeDayInfo()}
        replacements={new Map([[replacement, cancelled]])}
      />
    );

    expect(screen.getByText('Live Replacement')).toBeInTheDocument();
    expect(screen.getByText(/Replaces History/i)).toBeInTheDocument();
    expect(container.querySelectorAll('.schedule-item')).toHaveLength(1);
  });

  it('shows the richer empty state on work days', () => {
    render(
      <ScheduleTimeline
        lessons={[]}
        currentMin={540}
        dayInfo={makeDayInfo({ isSchoolDay: false, isWorkDay: true })}
        replacements={new Map()}
      />
    );

    expect(screen.getByText(/Work day - No school lessons today/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Check the day mode card above if you need to confirm/i)
    ).toBeInTheDocument();
  });
});
