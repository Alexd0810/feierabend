import { render } from '@testing-library/react';
import QuoteSection from '../QuoteSection';

describe('QuoteSection', () => {
  it('renders a quote for "done" category when minutesLeft <= 0', () => {
    const { container } = render(<QuoteSection minutesLeft={0} />);
    expect(container.querySelector('.quote-text')).toBeInTheDocument();
    expect(container.querySelector('.quote-vibe')).toBeInTheDocument();
  });

  it('renders a quote for "close" category when minutesLeft <= 60', () => {
    const { container } = render(<QuoteSection minutesLeft={30} />);
    expect(container.querySelector('.quote-text')).toBeInTheDocument();
  });

  it('renders a quote for "medium" category when minutesLeft <= 180', () => {
    const { container } = render(<QuoteSection minutesLeft={120} />);
    expect(container.querySelector('.quote-text')).toBeInTheDocument();
  });

  it('renders a quote for "far" category when minutesLeft > 180', () => {
    const { container } = render(<QuoteSection minutesLeft={300} />);
    expect(container.querySelector('.quote-text')).toBeInTheDocument();
  });

  it('renders the quote section element', () => {
    const { container } = render(<QuoteSection minutesLeft={100} />);
    expect(container.querySelector('.quote-section')).toBeInTheDocument();
  });

  it('renders a non-empty quote text', () => {
    render(<QuoteSection minutesLeft={100} />);
    const quoteEl = document.querySelector('.quote-text');
    expect(quoteEl?.textContent?.trim().length).toBeGreaterThan(0);
  });
});
