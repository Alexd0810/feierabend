import type { MascotMood, MascotState } from '../types';

export const mascotStates: Record<MascotMood, MascotState> = {
  fresh:       { emoji: ':D', messages: ["Let's do this!", "New day, new grind!", "Full energy!"] },
  normal:      { emoji: ':)', messages: ["Keep going!", "You got this!", "Stay focused!"] },
  tired:       { emoji: ':|', messages: ["Halfway there...", "Coffee break?", "Almost...", "Ugh"] },
  dying:       { emoji: ':(', messages: ["Send help...", "Why...", "Pain.", "Is it over yet?"] },
  hyped:       { emoji: ':O', messages: ["SO CLOSE!", "ALMOST FREE!", "I CAN TASTE IT!"] },
  celebration: { emoji: 'B)', messages: ["FREEDOM!", "LET'S GOOOO!", "PARTY TIME!"] },
};
