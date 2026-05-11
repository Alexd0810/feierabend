import type { VideoType } from '../types';

/**
 * Maps each {@link VideoType} to its YouTube video ID.
 *
 * To add a new background video:
 * 1. Extend the `VideoType` union in `src/types/index.ts`.
 * 2. Add the YouTube video ID here.
 * 3. Add the display label in {@link videoLabels}.
 */
export const videoOptions: Record<VideoType, string> = {
  minecraft: 'n_Dv4JMiwK8',
  subway:    'vTfD20dbxho',
  satisfying:'UZfHXOJVAJo',
  asmr:      'vHjHk1CXxbY',
};

/**
 * Human-readable display labels for each {@link VideoType}.
 * Rendered in the video switcher buttons inside {@link ParkourSection}.
 */
export const videoLabels: Record<VideoType, string> = {
  minecraft:  'Minecraft Parkour',
  subway:     'Subway Surfers',
  satisfying: 'Satisfying',
  asmr:       'Slime ASMR',
};
