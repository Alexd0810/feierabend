import { quotes } from '../quotes';

describe('quotes', () => {
  const categories = ['far', 'medium', 'close', 'done'] as const;

  it('exports all four categories', () => {
    categories.forEach(cat => {
      expect(quotes).toHaveProperty(cat);
    });
  });

  it('each category contains at least one entry', () => {
    categories.forEach(cat => {
      expect(quotes[cat].length).toBeGreaterThan(0);
    });
  });

  it('every quote has a non-empty text', () => {
    categories.forEach(cat => {
      quotes[cat].forEach(q => {
        expect(typeof q.text).toBe('string');
        expect(q.text.trim().length).toBeGreaterThan(0);
      });
    });
  });

  it('every quote has a non-empty vibe', () => {
    categories.forEach(cat => {
      quotes[cat].forEach(q => {
        expect(typeof q.vibe).toBe('string');
        expect(q.vibe.trim().length).toBeGreaterThan(0);
      });
    });
  });
});
