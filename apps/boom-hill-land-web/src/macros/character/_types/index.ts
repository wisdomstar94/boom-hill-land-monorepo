import type { CharacterAnimation } from "../../../consts/characters/character-animation.consts";
import type { CharacterTarget } from "../../../consts/characters/character-target.consts";

export type GetTimelineInfoProps = {
  target: CharacterTarget;
  animation: CharacterAnimation;
  isRandomSpeed?: boolean;
  loopCount: number;
};
