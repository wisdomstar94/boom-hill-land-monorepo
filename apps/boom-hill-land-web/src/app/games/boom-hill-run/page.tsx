"use client";

import { animate, type JSAnimation } from "animejs";
import NextImage from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimationDiv, type AnimationDivProps } from "../../../components/animation-div";
import { GameStartCountDown } from "../../../components/game-start-count-down";
import { GifMakerV2 } from "../../../components/gif-maker-v2";
import type { GifMakerV2TimelineInfo } from "../../../components/gif-maker-v2/_types";
import { CHARACTER_ANIMATIONS } from "../../../consts/characters/character-animation.consts";
import {
  CHARACTER_TARGET_NAMES,
  CHARACTER_TARGETS,
  type CharacterTarget,
} from "../../../consts/characters/character-target.consts";
import { BASE_PATH } from "../../../consts/urls/base-path";
import { useCharacterSelectDialog } from "../../../hooks/use-character-select-dialog";
import { useRequestAnimationFrameManager } from "../../../hooks/use-request-animation-frame-manager";
import { getCharacterImages } from "../../../macros/character/get-character-images";
import { getCharacterTimelineInfo } from "../../../macros/character/get-character-timeline-info";
import { getRandomNumber } from "../../../macros/get-random-number";
import { Clouds } from "./_components/clouds";
import { Owl } from "./_components/owl";
import { Turtle } from "./_components/turtle";

type CharacterItem = {
  characterTarget: CharacterTarget;
  characterTimelineInfo: GifMakerV2TimelineInfo;
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

const RANDOM_MOVE_MARGIN_LEFT_MIN = 25;
const RANDOM_MOVE_MARGIN_LEFT_MAX = 50;

const RANDOM_MOVE_DURATION_MIN = 300;
const RANDOM_MOVE_DURATION_MAX = 500;

function isRun(marginLeft: number) {
  return marginLeft > 40;
}

const MOVE_ANIMATION_NAMES = {
  STOP: "STOP",
  RUN: "RUN",
  WALK: "WALK",
} as const;

const FIELD_WIDTH = 1200;

const CHARACTER_FALL_DOWN_LABEL = {
  [CHARACTER_TARGETS.DAO]: "넘어짐",
  [CHARACTER_TARGETS.BAZZI]: "잠듬",
  [CHARACTER_TARGETS.DIZNI]: "넘어짐",
  [CHARACTER_TARGETS.UNI]: "울음",
  [CHARACTER_TARGETS.MOS]: "넘어짐",
  [CHARACTER_TARGETS.EDDI]: "넘어짐",
  [CHARACTER_TARGETS.KEPI]: "넘어짐",
  [CHARACTER_TARGETS.MARID]: "거울봄",
} satisfies Record<CharacterTarget, string>;

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
  // const goalClientRectRef = useRef<DOMRect | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animateObjRef = useRef<JSAnimation | null>(null);

  const requestAnimationFrameManager = useRequestAnimationFrameManager({
    isAutoStart: false,
    callback: () => {
      if (scrollContainerRef.current === null) {
        return;
      }

      const goalElement = goalRef.current;
      if (goalElement === null) {
        return;
      }

      const characterBoxElements = document.querySelectorAll<HTMLElement>(".character-box");
      let bestMovedCharacterBoxElement: HTMLElement | null = null;
      for (const characterBoxElement of characterBoxElements) {
        const characterBoxElementClientRect = characterBoxElement.getBoundingClientRect();
        if (bestMovedCharacterBoxElement === null) {
          bestMovedCharacterBoxElement = characterBoxElement;
        } else {
          const bestMovedCharacterBoxElementClientRect =
            bestMovedCharacterBoxElement.getBoundingClientRect();
          if (characterBoxElementClientRect.left > bestMovedCharacterBoxElementClientRect.left) {
            bestMovedCharacterBoxElement = characterBoxElement;
          }
        }
      }
      if (bestMovedCharacterBoxElement !== null) {
        const scrollContainerClientRect = scrollContainerRef.current.getBoundingClientRect();
        const scrollContainerEndX = scrollContainerClientRect.x + scrollContainerClientRect.width;
        const bestMovedCharacterBoxElementClientRect =
          bestMovedCharacterBoxElement.getBoundingClientRect();
        const bestMovedCharacterBoxElementEndX =
          bestMovedCharacterBoxElementClientRect.x + bestMovedCharacterBoxElementClientRect.width;

        if (
          scrollContainerEndX - bestMovedCharacterBoxElementEndX < 200 &&
          scrollContainerRef.current.scrollWidth >
            scrollContainerRef.current.clientWidth + scrollContainerRef.current.scrollLeft
        ) {
          if (animateObjRef.current === null || animateObjRef.current.completed === true) {
            animateObjRef.current = animate(scrollContainerRef.current, {
              scrollLeft: "+=1",
              duration: 5,
            });
          }
        }
      }

      for (const characterItem of characterItems) {
        const characterElement = document.querySelector(
          `.character-${characterItem.characterTarget}`,
        );
        if (characterElement === null) {
          continue;
        }
        const characterParentElement = characterElement.parentElement;
        if (characterParentElement === null) {
          continue;
        }

        if (
          characterParentElement.offsetLeft + characterParentElement.clientWidth >
            goalElement.offsetLeft &&
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
                    loopCount: Number.POSITIVE_INFINITY,
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
              loopCount: Number.POSITIVE_INFINITY,
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
            loopCount: Number.POSITIVE_INFINITY,
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: _
  useEffect(() => {
    if (rankingCharacterTargets.length === characterItems.length) {
      // 게임 종료
      requestAnimationFrameManager.stop();
    }
  }, [rankingCharacterTargets]);

  return (
    <>
      <div className="w-full h-full fixed top-0 left-0 flex items-center justify-center box-border">
        {/* field */}
        <div className="w-full h-full relative flex items-center justify-center">
          {/* scroll container */}
          <div
            className="w-full h-full overflow-x-scroll scrollbar-hide flex relative items-center"
            ref={scrollContainerRef}
          >
            <div
              className="h-full absolute top-0 left-0"
              style={{
                width: `${FIELD_WIDTH + 100}px`,
                backgroundImage: `url('${BASE_PATH}/background/ground/soil-ground.png')`,
                backgroundSize: "200px auto",
                backgroundRepeat: "repeat",
                backgroundPosition: "center",
              }}
            />

            <div className="w-10 h-px shrink-0 grow-0" />
            <div
              className="h-auto relative shrink-0 grow-0 box-border"
              style={{ width: `${FIELD_WIDTH}px` }}
            >
              <div className="w-full h-auto flex flex-col gap-1.5 relative items-start py-14">
                {characterItems.map((characterItem) => {
                  // 순위
                  const rank =
                    rankingCharacterTargets.findIndex(
                      (item) => item.characterTarget === characterItem.characterTarget,
                    ) + 1;

                  // 완주까지 걸린 소요 시간
                  const takeUntilSecond =
                    ((rankingCharacterTargets.find(
                      (item) => item.characterTarget === characterItem.characterTarget,
                    )?.endedAtTimestamp ?? 0) -
                      gameStartedTimestampRef.current) /
                    1000;

                  return (
                    <div
                      key={characterItem.characterTarget}
                      className="h-[28px] hmin-[326px]:h-[32px] hmin-[360px]:h-[36px] hmin-[400px]:h-[40px] min- w-full relative pl-2 box-border"
                    >
                      <div
                        className="w-[calc(100%-14px)] h-2.5 left-0 -bottom-2.5 absolute"
                        style={{
                          backgroundImage: `url('${BASE_PATH}/paint/spray-line/spray-white-line.png')`,
                          backgroundSize: "100px auto",
                          backgroundRepeat: "repeat",
                          backgroundPosition: "center",
                        }}
                      ></div>
                      <div className="w-[300px] absolute h-full bottom-0 right-0 flex justify-end">
                        {characterItem.goalPassedAt !== null && (
                          <div
                            data-rank-first={rank === 1}
                            data-rank-last={rank === characterItems.length}
                            className="h-full bottom-0 right-0 bg-black/60 data-[rank-first=true]:bg-custom-gradient data-[rank-first=true]:[--color-custom-gradient-from:#b18cff] data-[rank-first=true]:[--color-custom-gradient-to:#5ac8c8] data-[rank-last=true]:bg-custom-gradient data-[rank-last=true]:[--color-custom-gradient-from:#ff5e62] data-[rank-last=true]:[--color-custom-gradient-to:#ff9966] text-white text-xs text-left inline-flex gap-1 items-center animate-width-fade-in overflow-hidden"
                          >
                            <div className="w-[300px] relative h-full flex flex-col pl-1">
                              <div className="text-xs underline">
                                {CHARACTER_TARGET_NAMES[characterItem.characterTarget]}
                              </div>
                              <div className="flex gap-1">
                                <div className="w-full h-full items-center flex gap-1 box-border">
                                  <div className="text-xs shrink-0 grow-0 font-extrabold">
                                    {rank}등
                                  </div>
                                  <div className="text-xs shrink-0 grow-0">
                                    ({takeUntilSecond.toFixed(3)}초 / {characterItem.fallDownCount}
                                    번 {CHARACTER_FALL_DOWN_LABEL[characterItem.characterTarget]})
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <AnimationDiv
                        className="animation-div w-auto! h-full! shrink-0 grow-0 inline-flex items-end box-border pb-2"
                        animationParams={characterItem.characterMovingAnimationInfo}
                        onComplete={() => {
                          // 다음에 넘어지는가?
                          const isNextFallDown = getRandomNumber({ min: 0, max: 100 }) <= 10;

                          // 다음에 달리는가?
                          const isNextRun = getRandomNumber({ min: 0, max: 100 }) <= 45;

                          // 다음에 이동할 거리
                          const randomMarginLeft = getRandomNumber({
                            min: RANDOM_MOVE_MARGIN_LEFT_MIN,
                            max: RANDOM_MOVE_MARGIN_LEFT_MAX,
                          });

                          setCharacterItems((prev) => {
                            return prev.map((prevCharacterItem) => {
                              if (
                                prevCharacterItem.characterTarget === characterItem.characterTarget
                              ) {
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
                                    loopCount: isNextFallDown ? 0 : Number.POSITIVE_INFINITY,
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
                        <GifMakerV2
                          imageSources={getCharacterImages({
                            target: characterItem.characterTarget,
                          }).map((value) => {
                            return {
                              imageUrl: value,
                            };
                          })}
                          classNames={{
                            root: `w-[27px] hmin-[326px]:w-[29px] hmin-[360px]:w-[34px] hmin-[400px]:w-[38px] shrink-0 grow-0 aspect-400/500 character-box character-${characterItem.characterTarget}`,
                            image: "scale-170",
                          }}
                          timelineInfo={characterItem.characterTimelineInfo}
                          onAnimationRealEnded={(params) => {
                            if (params.timelineInfo.timelineName.includes("fall-down")) {
                              setCharacterItems((prev) => {
                                return prev.map((prevCharacterItem) => {
                                  if (
                                    prevCharacterItem.characterTarget ===
                                    characterItem.characterTarget
                                  ) {
                                    return {
                                      ...prevCharacterItem,
                                      characterTimelineInfo: getCharacterTimelineInfo({
                                        target: prevCharacterItem.characterTarget,
                                        animation: CHARACTER_ANIMATIONS.WAKE_UP,
                                        isRandomSpeed: true,
                                        loopCount: 0,
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
                                    prevCharacterItem.characterTarget !==
                                    characterItem.characterTarget
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
                                      loopCount: Number.POSITIVE_INFINITY,
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
                      </AnimationDiv>
                    </div>
                  );
                })}
              </div>

              {/* goal */}
              <div
                ref={goalRef}
                data-goal={true}
                className="text-white w-[36px] text-xs h-full absolute -right-8 top-0 flex items-center justify-center"
              >
                {/* top */}
                <div className="w-full absolute -top-2 left-0">
                  <Owl />
                </div>

                {/* rope */}
                <div
                  className="w-[10px] h-[calc(100%-64px)] top-8 left-[calc(50%-5px)] absolute bg-blue-500"
                  style={{
                    backgroundImage: `url('${BASE_PATH}/things/rope/rope-unit.png')`,
                    backgroundSize: "10px auto",
                    backgroundRepeat: "repeat",
                    backgroundPosition: "center",
                  }}
                >
                  {/* goal flag */}
                  <div className="w-5 h-full absolute top-0 -left-4 flex flex-col min-h-0">
                    {/* head */}
                    <NextImage
                      src={`${BASE_PATH}/things/goal-flag/goal-flag-head.png`}
                      alt="flag head"
                      width={100}
                      height={100}
                      className="w-full h-auto shrink-0 grow-0"
                    />
                    {/* body */}
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{
                        backgroundImage: `url('${BASE_PATH}/things/goal-flag/goal-flag-body.png')`,
                        backgroundSize: "100% auto",
                        backgroundRepeat: "repeat",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="text-white text-sm font-bold">
                        골<br />인
                      </div>
                    </div>
                    {/* tail */}
                    <NextImage
                      src={`${BASE_PATH}/things/goal-flag/goal-flag-tail.png`}
                      alt="flag head"
                      width={100}
                      height={100}
                      className="w-full h-auto shrink-0 grow-0"
                    />
                  </div>
                </div>

                {/* bottom */}
                <div className="w-full absolute bottom-0 left-0">
                  <Turtle />
                </div>
              </div>
            </div>

            {/* 구름 효과 */}
            <Clouds width={FIELD_WIDTH + 100} />
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
