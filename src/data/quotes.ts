import type { Quote } from '../types';

/**
 * Motivational / humorous quotes grouped by how close to Feierabend the user is.
 *
 * | Key      | Shown when minutes remaining is… |
 * |----------|----------------------------------|
 * | `far`    | > 180 min                        |
 * | `medium` | 61 – 180 min                     |
 * | `close`  | 1 – 60 min                       |
 * | `done`   | ≤ 0 min (Feierabend reached)      |
 *
 * Add new entries to any bucket to expand the rotation.
 * The displayed quote rotates every {@link QUOTE_ROTATION_INTERVAL_MS} ms.
 */
export const quotes: Record<'far' | 'medium' | 'close' | 'done', Quote[]> = {
  far: [
    { text: "The journey of a thousand miles begins with a single step. Unfortunately, you have about 999 miles to go.", vibe: "REALISTIC" },
    { text: "Time is an illusion. Lunchtime doubly so.", vibe: "DOUGLAS ADAMS" },
    { text: "Every minute you spend here is a minute closer to leaving.", vibe: "MATHEMATICALLY CORRECT" },
    { text: "Remember: somewhere in the world, someone is on vacation right now.", vibe: "JEALOUSY FUEL" },
    { text: "Coffee: because adulting is hard and mornings are harder.", vibe: "CAFFEINATED" },
  ],
  medium: [
    { text: "You're doing amazing sweetie. Well, you're doing.", vibe: "SUPPORTIVE-ISH" },
    { text: "Halfway there! Or as I call it, still not there.", vibe: "HALF EMPTY" },
    { text: "The light at the end of the tunnel is getting brighter. It might be a train.", vibe: "OPTIMISTIC?" },
    { text: "Keep going! The couch misses you.", vibe: "MOTIVATIONAL" },
    { text: "You've survived this long. What's a few more hours?", vibe: "SURVIVOR MODE" },
  ],
  close: [
    { text: "SO CLOSE! You can almost taste the freedom!", vibe: "HYPED" },
    { text: "Final stretch! Your bed is warming up for you!", vibe: "COZY ALERT" },
    { text: "The finish line is in sight! SPRINT!", vibe: "MAXIMUM HYPE" },
    { text: "Less than an hour! This is not a drill!", vibe: "EMERGENCY FREEDOM" },
    { text: "Soon you'll be free. Start planning your evening NOW.", vibe: "TACTICAL" },
  ],
  done: [
    { text: "FREEDOM! GO! RUN! DON'T LOOK BACK!", vibe: "LIBERATED" },
    { text: "You did it! Time to touch grass!", vibe: "VICTORY" },
    { text: "Feierabend achieved! +1000 happiness points!", vibe: "GAMER MOMENT" },
  ],
};
