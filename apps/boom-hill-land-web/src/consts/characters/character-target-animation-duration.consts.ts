import { CHARACTER_ANIMATIONS, type CharacterAnimation } from "./character-animation.consts";
import { CHARACTER_TARGETS, type CharacterTarget } from "./character-target.consts";

export const CHARACTER_TARGET_ANIMATION_DURATIONS = {
  [CHARACTER_TARGETS.DAO]: {
    [CHARACTER_ANIMATIONS.IDLE]: 2000,
  },
} as const satisfies Record<CharacterTarget, Record<CharacterAnimation, number>>;
