import { playFeierabendSound, playMilestoneSound } from '../audio';

type WindowWithAudio = Window & { AudioContext?: typeof AudioContext };

function makeMockAudioContext() {
  const oscillator = {
    connect: jest.fn(),
    frequency: { value: 0 },
    type: 'sine' as OscillatorType,
    start: jest.fn(),
    stop: jest.fn(),
  };
  const gainNode = {
    connect: jest.fn(),
    gain: {
      setValueAtTime: jest.fn(),
      exponentialRampToValueAtTime: jest.fn(),
    },
  };
  return {
    createOscillator: jest.fn(() => oscillator),
    createGain: jest.fn(() => gainNode),
    destination: {},
    currentTime: 0,
  };
}

describe('playFeierabendSound', () => {
  it('does nothing when window.AudioContext is not available', () => {
    const original = (window as WindowWithAudio).AudioContext;
    delete (window as WindowWithAudio).AudioContext;
    expect(() => playFeierabendSound()).not.toThrow();
    (window as WindowWithAudio).AudioContext = original;
  });

  it('creates an AudioContext and plays notes when Web Audio API is available', () => {
    const mockCtx = makeMockAudioContext();
    const MockAudioContext = jest.fn(() => mockCtx);
    (window as WindowWithAudio).AudioContext = MockAudioContext as unknown as typeof AudioContext;

    playFeierabendSound();

    // 4 notes → 4 oscillators and 4 gain nodes
    expect(mockCtx.createOscillator).toHaveBeenCalledTimes(4);
    expect(mockCtx.createGain).toHaveBeenCalledTimes(4);

    delete (window as WindowWithAudio).AudioContext;
  });
});

describe('playMilestoneSound', () => {
  it('does nothing when window.AudioContext is not available', () => {
    const original = (window as WindowWithAudio).AudioContext;
    delete (window as WindowWithAudio).AudioContext;
    expect(() => playMilestoneSound()).not.toThrow();
    (window as WindowWithAudio).AudioContext = original;
  });

  it('creates an AudioContext and plays one note when Web Audio API is available', () => {
    const mockCtx = makeMockAudioContext();
    const MockAudioContext = jest.fn(() => mockCtx);
    (window as WindowWithAudio).AudioContext = MockAudioContext as unknown as typeof AudioContext;

    playMilestoneSound();

    expect(mockCtx.createOscillator).toHaveBeenCalledTimes(1);
    expect(mockCtx.createGain).toHaveBeenCalledTimes(1);

    delete (window as WindowWithAudio).AudioContext;
  });
});
