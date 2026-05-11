import { videoOptions, videoLabels } from '../videos';

const VIDEO_TYPES = ['minecraft', 'subway', 'satisfying', 'asmr'] as const;

describe('videoOptions', () => {
  it('exports an entry for every video type', () => {
    VIDEO_TYPES.forEach(type => {
      expect(videoOptions).toHaveProperty(type);
    });
  });

  it('every video ID is a non-empty string', () => {
    VIDEO_TYPES.forEach(type => {
      expect(typeof videoOptions[type]).toBe('string');
      expect(videoOptions[type].trim().length).toBeGreaterThan(0);
    });
  });

  it('video IDs look like valid YouTube IDs (11 characters)', () => {
    VIDEO_TYPES.forEach(type => {
      expect(videoOptions[type]).toHaveLength(11);
    });
  });
});

describe('videoLabels', () => {
  it('exports a label for every video type', () => {
    VIDEO_TYPES.forEach(type => {
      expect(videoLabels).toHaveProperty(type);
    });
  });

  it('every label is a non-empty string', () => {
    VIDEO_TYPES.forEach(type => {
      expect(typeof videoLabels[type]).toBe('string');
      expect(videoLabels[type].trim().length).toBeGreaterThan(0);
    });
  });
});
