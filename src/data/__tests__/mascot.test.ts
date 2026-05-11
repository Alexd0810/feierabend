import { mascotStates } from '../mascot';

const MOODS = ['fresh', 'normal', 'tired', 'dying', 'hyped', 'celebration'] as const;

describe('mascotStates', () => {
  it('exports an entry for every mood', () => {
    MOODS.forEach(mood => {
      expect(mascotStates).toHaveProperty(mood);
    });
  });

  it('every mood has a non-empty emoji', () => {
    MOODS.forEach(mood => {
      expect(typeof mascotStates[mood].emoji).toBe('string');
      expect(mascotStates[mood].emoji.trim().length).toBeGreaterThan(0);
    });
  });

  it('every mood has at least one message', () => {
    MOODS.forEach(mood => {
      expect(mascotStates[mood].messages.length).toBeGreaterThan(0);
    });
  });

  it('every message is a non-empty string', () => {
    MOODS.forEach(mood => {
      mascotStates[mood].messages.forEach(msg => {
        expect(typeof msg).toBe('string');
        expect(msg.trim().length).toBeGreaterThan(0);
      });
    });
  });
});
