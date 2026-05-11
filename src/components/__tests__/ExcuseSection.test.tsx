import { render, screen, fireEvent } from '@testing-library/react';
import ExcuseSection from '../ExcuseSection';

describe('ExcuseSection', () => {
  it('renders the generate button', () => {
    render(<ExcuseSection />);
    expect(screen.getByRole('button', { name: /Generate Excuse/i })).toBeInTheDocument();
  });

  it('shows no excuse text initially', () => {
    const { container } = render(<ExcuseSection />);
    expect(container.querySelector('.excuse-result')).not.toBeInTheDocument();
  });

  it('displays an excuse after clicking the button', () => {
    render(<ExcuseSection />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/".*"/)).toBeInTheDocument();
  });

  it('updates the excuse when the button is clicked multiple times', () => {
    render(<ExcuseSection />);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    const first = screen.getByText(/".*"/).textContent;
    // Click many times — eventually a different excuse should appear
    let found = false;
    for (let i = 0; i < 30; i++) {
      fireEvent.click(btn);
      if (screen.getByText(/".*"/).textContent !== first) {
        found = true;
        break;
      }
    }
    // With 20 excuses, after 30 clicks it's overwhelmingly likely to change
    expect(found).toBe(true);
  });
});
