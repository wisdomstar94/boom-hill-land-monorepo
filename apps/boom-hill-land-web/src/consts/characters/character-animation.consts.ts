export const CHARACTER_ANIMATIONS = {
  IDLE: "idle",
  THROW_BALLON: "throw-ballon",
  RUNNING_PREPARE: "running-prepare",
  FALL_DOWN: "fall-down",
  WAKE_UP: "wake-up",
  WALK: "walk",
  RUN: "run",
} as const;

export type CharacterAnimation = (typeof CHARACTER_ANIMATIONS)[keyof typeof CHARACTER_ANIMATIONS];

export const CHARACTER_ANIMATION_THROW_BALLON_DEFAULT_DURATIONS = {
  "001": 300,
  "002": 400,
  "003": 400,
} as const satisfies Record<string, number>;

export const CHARACTER_ANIMATION_THROW_BALLON_RANDOM_SPEED_RANGE = {
  MIN: 100,
  MAX: 1000,
} as const;

export const CHARACTER_ANIMATION_FALL_DOWN_RANDOM_SPEED_RANGE = {
  MIN: 300,
  MAX: 1000,
} as const;

export const CHARACTER_ANIMATION_WAKE_UP_RANDOM_SPEED_RANGE = {
  MIN: 100,
  MAX: 1000,
} as const;

export const CHARACTER_ANIMATION_WALK_DEFAULT_DURATIONS = {
  "001": 300,
  "002": 300,
  "003": 300,
} as const satisfies Record<string, number>;

export const CHARACTER_ANIMATION_RUN_DEFAULT_DURATIONS = {
  "001": 150,
  "002": 150,
  "003": 150,
} as const satisfies Record<string, number>;

export const CHARACTER_ANIMATION_FALL_DOWN_DEFAULT_DURATIONS = {
  "001": 150,
  "002": 150,
} as const satisfies Record<string, number>;

export const CHARACTER_ANIMATION_WAKE_UP_DEFAULT_DURATIONS = {
  "001": 300,
  "002": 300,
} as const satisfies Record<string, number>;
