"use client";

import type { AnimationParams } from "animejs";
import { useRef, useState } from "react";
import { GameStartCountDown } from "../../../components/game-start-count-down";
import type { GifMakerTimelineInfo } from "../../../components/gif-maker/_types/gif-maker.types";
import { CHARACTER_ANIMATIONS } from "../../../consts/characters/character-animation.consts";
import type { CharacterTarget } from "../../../consts/characters/character-target.consts";
import { useCharacterSelectDialog } from "../../../hooks/use-character-select-dialog";
import { getCharacterTimelineInfo } from "../../../macros/get-character-timeline-info";

type CharacterItem = {
  characterTarget: CharacterTarget;
  characterTimelineInfo: GifMakerTimelineInfo;
  characterMovingAnimationInfo: AnimationParams;
  fallDownAt: string | null;
  fallDownCount: number;
  standUpAt: string | null;
};

type RankCharacterItem = {
  characterTarget: CharacterTarget;
  endedAtTimestamp: number;
};

export default function Page() {
  const [countStart, setCountStart] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const [characterItems, setCharacterItems] = useState<CharacterItem[]>([]);
  const [rankingCharacterTargets, setRankingCharacterTargets] = useState<RankCharacterItem[]>([]);

  const gameStartedTimestampRef = useRef<number>(0);

  const { characterSelectDialogComponent } = useCharacterSelectDialog({
    initialIsOpen: true,
    onCharacterSelectEnded(params) {
      gameStartedTimestampRef.current = Date.now();

      setCharacterItems(
        params.selectedCharacterTargets.map((characterTarget) => {
          return {
            characterTarget,
            characterTimelineInfo: getCharacterTimelineInfo({
              target: characterTarget,
              animation: CHARACTER_ANIMATIONS.RUNNING_PREPARE,
            }),
            characterMovingAnimationInfo: {
              marginLeft: 0,
              duration: 100,
              loop: Number.POSITIVE_INFINITY,
            },
            fallDownAt: null,
            fallDownCount: 0,
            standUpAt: null,
          };
        }),
      );
      setCountStart(true);
    },
  });

  return (
    <>
      <div className="w-full h-full fixed top-0 left-0 flex flex-col gap-2 p-10">
        {!gameStart ? "아직 게임 시작 안됨" : "게임 시작"}
      </div>
      {characterSelectDialogComponent}
      <GameStartCountDown
        start={countStart}
        count={3}
        onCountDownEnded={() => {
          setGameStart(true);
        }}
      />
    </>
  );
}
