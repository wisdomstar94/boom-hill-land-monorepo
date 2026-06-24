"use client";

import { useEffect, useRef, useState } from "react";
import { AnimationDiv, type AnimationDivProps } from "../../../components/animation-div";
import { GameStartCountDown } from "../../../components/game-start-count-down";
import { GifMaker } from "../../../components/gif-maker";
import type { GifMakerTimelineInfo } from "../../../components/gif-maker/_types/gif-maker.types";
import { CHARACTER_ANIMATIONS } from "../../../consts/characters/character-animation.consts";
import type { CharacterTarget } from "../../../consts/characters/character-target.consts";
import { useCharacterSelectDialog } from "../../../hooks/use-character-select-dialog";
import { useRequestAnimationFrameManager } from "../../../hooks/use-request-animation-frame-manager";
import { getCharacterTimelineInfo } from "../../../macros/get-character-timeline-info";
import { getRandomNumber } from "../../../macros/get-random-number";

type CharacterItem = {
  characterTarget: CharacterTarget;
  characterTimelineInfo: GifMakerTimelineInfo;
  characterMovingAnimationInfo: AnimationDivProps["animationParams"];
  fallDownAt: string | null;
  fallDownCount: number;
  standUpAt: string | null;
  goalPassedAt: string | null;
};

type RankCharacterItem = {
  characterTarget: CharacterTarget;
  endedAtTimestamp: number;
};

const RANDOM_MOVE_MARGIN_LEFT_MIN = 5;
const RANDOM_MOVE_MARGIN_LEFT_MAX = 30;

const RANDOM_MOVE_DURATION_MIN = 300;
const RANDOM_MOVE_DURATION_MAX = 500;

function isRun(marginLeft: number) {
  return marginLeft > 20;
}

const MOVE_ANIMATION_NAMES = {
  STOP: "STOP",
  RUN: "RUN",
  WALK: "WALK",
} as const;

export default function Page() {
  const [countStart, setCountStart] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const [characterItems, setCharacterItems] = useState<CharacterItem[]>([]);

  const [rankingCharacterTargets, setRankingCharacterTargets] = useState<RankCharacterItem[]>([]);
  const rankingCharacterTargetsRef = useRef<RankCharacterItem[]>([]);
  function insertRankingCharacterTargets(characterTarget: CharacterTarget) {
    rankingCharacterTargetsRef.current.push({
      characterTarget,
      endedAtTimestamp: Date.now(),
    });
    setRankingCharacterTargets((prev) => {
      const arr = [...prev];
      if (!arr.find((item) => item.characterTarget === characterTarget)) {
        arr.push({
          characterTarget,
          endedAtTimestamp: Date.now(),
        });
      }
      return arr;
    });
  }

  const gameStartedTimestampRef = useRef<number>(0);
  const goalRef = useRef<HTMLDivElement>(null);
  const goalClientRectRef = useRef<DOMRect | null>(null);

  const requestAnimationFrameManager = useRequestAnimationFrameManager({
    isAutoStart: false,
    callback: () => {
      if (goalClientRectRef.current === null) {
        return;
      }
      const goalClientRect = goalClientRectRef.current;

      for (const characterItem of characterItems) {
        const characterElement = document.querySelector(
          `.character-${characterItem.characterTarget}`,
        );
        if (characterElement === null) {
          continue;
        }

        const characterClientRect = characterElement.getBoundingClientRect();
        if (
          characterClientRect.left + characterClientRect.width > goalClientRect.left &&
          rankingCharacterTargetsRef.current.find(
            (item) => item.characterTarget === characterItem.characterTarget,
          ) === undefined
        ) {
          insertRankingCharacterTargets(characterItem.characterTarget);
          setCharacterItems((prev) => {
            return prev.map((prevCharacterItem) => {
              if (
                prevCharacterItem.characterTarget === characterItem.characterTarget &&
                prevCharacterItem.goalPassedAt === null
              ) {
                return {
                  ...prevCharacterItem,
                  goalPassedAt: new Date().toISOString(),
                  characterMovingAnimationInfo: {
                    animationName: MOVE_ANIMATION_NAMES.STOP,
                    marginLeft: "+=0",
                    duration: 10000,
                    loop: Number.POSITIVE_INFINITY,
                  },
                  characterTimelineInfo: getCharacterTimelineInfo({
                    target: prevCharacterItem.characterTarget,
                    animation: CHARACTER_ANIMATIONS.IDLE,
                  }),
                };
              }
              return prevCharacterItem;
            });
          });
        }
      }
    },
  });

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
              animationName: MOVE_ANIMATION_NAMES.STOP,
              marginLeft: 0,
              duration: 100,
              loop: Number.POSITIVE_INFINITY,
            },
            fallDownAt: null,
            fallDownCount: 0,
            standUpAt: null,
            goalPassedAt: null,
          };
        }),
      );
      setCountStart(true);
    },
  });

  function onStart() {
    requestAnimationFrameManager.start();
    goalClientRectRef.current = goalRef.current?.getBoundingClientRect() ?? null;
    setCharacterItems((prev) => {
      return prev.map((characterItem) => {
        const randomMarginLeft = getRandomNumber({
          min: RANDOM_MOVE_MARGIN_LEFT_MIN,
          max: RANDOM_MOVE_MARGIN_LEFT_MAX,
        });
        return {
          ...characterItem,
          characterTimelineInfo: getCharacterTimelineInfo({
            target: characterItem.characterTarget,
            animation: isRun(randomMarginLeft)
              ? CHARACTER_ANIMATIONS.RUN
              : CHARACTER_ANIMATIONS.WALK,
          }),
          characterMovingAnimationInfo: {
            ...characterItem.characterMovingAnimationInfo,
            loop: 0,
            marginLeft: `+=${randomMarginLeft}`,
            animationName: isRun(randomMarginLeft)
              ? MOVE_ANIMATION_NAMES.RUN
              : MOVE_ANIMATION_NAMES.WALK,
            duration: getRandomNumber({
              min: RANDOM_MOVE_DURATION_MIN,
              max: RANDOM_MOVE_DURATION_MAX,
            }),
          },
        };
      });
    });
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: _
  useEffect(() => {
    if (!gameStart) {
      return;
    }

    onStart();
  }, [gameStart]);

  return (
    <>
      <div className="w-full h-full fixed top-0 left-0 flex items-center justify-center">
        {/* field */}
        <div className="w-[calc(100%-28px)] h-[calc(100%-28px)] rounded-md relative flex items-center justify-center">
          {/* scroll container */}
          <div className="w-full overflow-y-scroll block relative">
            <div className="w-full h-auto flex flex-col relative items-start">
              {characterItems.map((characterItem) => {
                return (
                  <AnimationDiv
                    className="w-auto! h-auto!"
                    key={characterItem.characterTarget}
                    animationParams={characterItem.characterMovingAnimationInfo}
                    onComplete={() => {
                      const isNextFallDown = getRandomNumber({ min: 0, max: 100 }) <= 10;
                      const isNextRun = getRandomNumber({ min: 0, max: 100 }) <= 45;
                      const randomMarginLeft = getRandomNumber({
                        min: RANDOM_MOVE_MARGIN_LEFT_MIN,
                        max: RANDOM_MOVE_MARGIN_LEFT_MAX,
                      });

                      setCharacterItems((prev) => {
                        return prev.map((prevCharacterItem) => {
                          if (prevCharacterItem.characterTarget === characterItem.characterTarget) {
                            return {
                              ...prevCharacterItem,
                              characterMovingAnimationInfo: {
                                animationName: (() => {
                                  if (isNextFallDown) {
                                    return MOVE_ANIMATION_NAMES.STOP;
                                  }
                                  return isRun(randomMarginLeft)
                                    ? MOVE_ANIMATION_NAMES.RUN
                                    : MOVE_ANIMATION_NAMES.WALK;
                                })(),
                                marginLeft: isNextFallDown ? "+=0" : `+=${randomMarginLeft}`,
                                duration: isNextFallDown
                                  ? Number.POSITIVE_INFINITY
                                  : getRandomNumber({
                                      min: RANDOM_MOVE_DURATION_MIN,
                                      max: RANDOM_MOVE_DURATION_MAX,
                                    }),
                                loop: 0,
                              },
                              characterTimelineInfo: getCharacterTimelineInfo({
                                target: prevCharacterItem.characterTarget,
                                animation: isNextFallDown
                                  ? CHARACTER_ANIMATIONS.FALL_DOWN
                                  : isNextRun
                                    ? CHARACTER_ANIMATIONS.RUN
                                    : CHARACTER_ANIMATIONS.WALK,
                                isRandomSpeed: isNextFallDown,
                              }),
                              fallDownCount: isNextFallDown
                                ? prevCharacterItem.fallDownCount + 1
                                : prevCharacterItem.fallDownCount,
                              fallDownAt: isNextFallDown
                                ? new Date().toISOString()
                                : prevCharacterItem.fallDownAt,
                            };
                          }
                          return prevCharacterItem;
                        });
                      });
                    }}
                  >
                    <GifMaker
                      classNames={{
                        root: `w-[28px] aspect-140/200 character-${characterItem.characterTarget}`,
                        image: "scale-170",
                      }}
                      timelineInfo={characterItem.characterTimelineInfo}
                      loopCount={
                        characterItem.characterTimelineInfo.timelineName.includes("run") ||
                        characterItem.characterTimelineInfo.timelineName.includes("walk") ||
                        characterItem.goalPassedAt !== null
                          ? 99999
                          : 0
                      }
                      onAnimationRealEnded={(params) => {
                        if (params.timelineInfo.timelineName.includes("fall-down")) {
                          setCharacterItems((prev) => {
                            return prev.map((prevCharacterItem) => {
                              if (
                                prevCharacterItem.characterTarget === characterItem.characterTarget
                              ) {
                                return {
                                  ...prevCharacterItem,
                                  characterTimelineInfo: getCharacterTimelineInfo({
                                    target: prevCharacterItem.characterTarget,
                                    animation: CHARACTER_ANIMATIONS.WAKE_UP,
                                    isRandomSpeed: true,
                                  }),
                                };
                              }
                              return prevCharacterItem;
                            });
                          });
                        }

                        if (params.timelineInfo.timelineName.includes("wake-up")) {
                          setCharacterItems((prev) => {
                            return prev.map((prevCharacterItem) => {
                              if (
                                prevCharacterItem.characterTarget !== characterItem.characterTarget
                              ) {
                                return prevCharacterItem;
                              }

                              const randomMarginLeft = getRandomNumber({
                                min: RANDOM_MOVE_MARGIN_LEFT_MIN,
                                max: RANDOM_MOVE_MARGIN_LEFT_MAX,
                              });
                              return {
                                ...prevCharacterItem,
                                characterTimelineInfo: getCharacterTimelineInfo({
                                  target: prevCharacterItem.characterTarget,
                                  animation: isRun(randomMarginLeft)
                                    ? CHARACTER_ANIMATIONS.RUN
                                    : CHARACTER_ANIMATIONS.WALK,
                                }),
                                characterMovingAnimationInfo: {
                                  ...prevCharacterItem.characterMovingAnimationInfo,
                                  loop: 0,
                                  marginLeft: `+=${randomMarginLeft}`,
                                  animationName: isRun(randomMarginLeft)
                                    ? MOVE_ANIMATION_NAMES.RUN
                                    : MOVE_ANIMATION_NAMES.WALK,
                                  duration: getRandomNumber({
                                    min: RANDOM_MOVE_DURATION_MIN,
                                    max: RANDOM_MOVE_DURATION_MAX,
                                  }),
                                },
                              };
                            });
                          });
                        }
                      }}
                    />
                    {characterItem.goalPassedAt !== null && (
                      <div className="absolute w-[100px] bottom-0 right-0 bg-black/70 text-white text-xs text-left px-1 inline-flex gap-1">
                        <span>
                          {rankingCharacterTargets.findIndex(
                            (item) => item.characterTarget === characterItem.characterTarget,
                          ) + 1}
                          등
                        </span>
                        <span>/</span>
                        <span>
                          {(
                            ((rankingCharacterTargets.find(
                              (item) => item.characterTarget === characterItem.characterTarget,
                            )?.endedAtTimestamp ?? 0) -
                              gameStartedTimestampRef.current) /
                            1000
                          ).toFixed(3)}
                          초
                        </span>
                      </div>
                    )}
                  </AnimationDiv>
                );
              })}
            </div>

            {/* goal */}
            <div
              ref={goalRef}
              className="bg-red-500 text-white w-[32px] text-xs h-full absolute right-0 top-0 flex items-center justify-center"
            >
              Goal
            </div>
          </div>
        </div>
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
