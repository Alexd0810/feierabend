import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock heavy hooks and audio to keep the test lightweight
jest.mock('../hooks/useTimetable', () => ({
  useTimetable: () => ({
    data: null,
    loading: true,
    error: false,
    refetch: jest.fn(),
  }),
}));

jest.mock('../utils/audio', () => ({
  playFeierabendSound: jest.fn(),
  playMilestoneSound: jest.fn(),
}));

describe('App', () => {
  it('renders the loading state while fetching timetable', () => {
    render(<App />);
    expect(screen.getByText('INITIALIZING FEIERABEND SYSTEM...')).toBeInTheDocument();
  });
});
