import { render, screen } from '@testing-library/react';
import TimerSection from '../TimerSection';
import type { DayInfo } from '../../types';

function makeDayInfo(overrides: Partial<DayInfo> = {}): DayInfo {
  return {
    isSchoolDay: false,
    isWorkDay: false,
    isWeekend: false,
    isEvenWeek: true,
    weekNumber: 20,
    dayOfWeek: 3,
    debugMode: false,
    debugParams: { mode: null, week: null },
    ...overrides,
  };
}

describe('TimerSection', () => {
  const now = new Date(2025, 0, 1, 10, 30, 0); // 10:30:00

  it('displays the countdown with hours, minutes, seconds', () => {
    render(
      <TimerSection
        secondsLeft={3661}
        feierabendMin={960}
        dayInfo={makeDayInfo({ isWorkDay: true })}
        hasLessons={false}
        now={now}
      />
    );
    // 3661s = 01h 01m 01s — all three units show "01"
    expect(screen.getAllByText('01').length).toBeGreaterThanOrEqual(3);
  });

  it('shows the feierabend time', () => {
    render(
      <TimerSection
        secondsLeft={3600}
        feierabendMin={960}
        dayInfo={makeDayInfo({ isWorkDay: true })}
        hasLessons={false}
        now={now}
      />
    );
    expect(screen.getByText('16:00')).toBeInTheDocument();
  });

  it('shows "ENJOY YOUR WEEKEND" label on weekends', () => {
    render(
      <TimerSection
        secondsLeft={0}
        feierabendMin={630}
        dayInfo={makeDayInfo({ isWeekend: true })}
        hasLessons={false}
        now={now}
      />
    );
    expect(screen.getByText('ENJOY YOUR WEEKEND')).toBeInTheDocument();
  });

  it('shows "TIME UNTIL WORK ENDS" label for work days', () => {
    render(
      <TimerSection
        secondsLeft={3600}
        feierabendMin={960}
        dayInfo={makeDayInfo({ isWorkDay: true })}
        hasLessons={false}
        now={now}
      />
    );
    expect(screen.getByText('TIME UNTIL WORK ENDS')).toBeInTheDocument();
  });

  it('shows school badge on school days with lessons', () => {
    render(
      <TimerSection
        secondsLeft={3600}
        feierabendMin={960}
        dayInfo={makeDayInfo({ isSchoolDay: true })}
        hasLessons={true}
        now={now}
      />
    );
    expect(screen.getByText('School Day')).toBeInTheDocument();
  });

  it('renders a progress bar', () => {
    const { container } = render(
      <TimerSection
        secondsLeft={3600}
        feierabendMin={960}
        dayInfo={makeDayInfo({ isWorkDay: true })}
        hasLessons={false}
        now={now}
      />
    );
    expect(
      container.querySelector('.progress-bar') ?? container.querySelector('[class*="progress"]')
    ).toBeInTheDocument();
  });
});
