import { render, screen } from '@testing-library/react';
import DayTypeCard from '../DayTypeCard';
import type { DayInfo } from '../../types';

function makeDayInfo(overrides: Partial<DayInfo> = {}): DayInfo {
  return {
    isSchoolDay: false,
    isWorkDay: false,
    isWeekend: false,
    isEvenWeek: true,
    weekNumber: 20,
    dayOfWeek: 3, // Wednesday
    debugMode: false,
    debugParams: { mode: null, week: null },
    ...overrides,
  };
}

describe('DayTypeCard', () => {
  it('shows "Weekend Mode" for weekend days', () => {
    render(<DayTypeCard dayInfo={makeDayInfo({ isWeekend: true })} />);
    expect(screen.getByText('Weekend Mode')).toBeInTheDocument();
  });

  it('shows "School Day" for school days', () => {
    render(<DayTypeCard dayInfo={makeDayInfo({ isSchoolDay: true })} />);
    expect(screen.getByText('School Day')).toBeInTheDocument();
  });

  it('shows "Work Day" for work days', () => {
    render(<DayTypeCard dayInfo={makeDayInfo({ isWorkDay: true })} />);
    expect(screen.getByText('Work Day')).toBeInTheDocument();
  });

  it('mentions week number in the explanation text', () => {
    render(<DayTypeCard dayInfo={makeDayInfo({ isSchoolDay: true, weekNumber: 42 })} />);
    expect(screen.getByText(/42/)).toBeInTheDocument();
  });

  it('shows "even week" text for even weeks on school days', () => {
    render(<DayTypeCard dayInfo={makeDayInfo({ isSchoolDay: true, isEvenWeek: true })} />);
    expect(screen.getByText(/even week/i)).toBeInTheDocument();
  });

  it('shows "odd week" text for odd weeks on school days', () => {
    render(<DayTypeCard dayInfo={makeDayInfo({ isSchoolDay: true, isEvenWeek: false })} />);
    expect(screen.getByText(/odd week/i)).toBeInTheDocument();
  });

  it('renders the weekly schedule strip with all 7 day labels', () => {
    render(<DayTypeCard dayInfo={makeDayInfo()} />);
    // The "today" day cell appends " (Today)", so use regex matching for all
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach((day) => {
      expect(screen.getByText(new RegExp(day))).toBeInTheDocument();
    });
  });
});
