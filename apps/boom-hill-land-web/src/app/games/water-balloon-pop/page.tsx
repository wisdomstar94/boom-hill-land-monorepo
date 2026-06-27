"use client";

import { useRef, useState } from "react";
import { GifMakerV2 } from "../../../components/gif-maker-v2";
import type { GifMakerV2TimelineInfo } from "../../../components/gif-maker-v2/_types";
import { CHARACTER_ANIMATIONS } from "../../../consts/characters/character-animation.consts";
import {
  CHARACTER_TARGET_NAMES,
  type CharacterTarget,
} from "../../../consts/characters/character-target.consts";
import { BASE_PATH } from "../../../consts/urls/base-path";
import { useCharacterSelectDialog } from "../../../hooks/use-character-select-dialog";
import { getCharacterImages } from "../../../macros/character/get-character-images";
import { getCharacterTimelineInfo } from "../../../macros/character/get-character-timeline-info";
import { Dart } from "./_components/dart/dart";
import { Hit } from "./_components/hit/hit";
import { Miss } from "./_components/miss/miss";

type CharacterItem = {
  characterTarget: CharacterTarget;
  characterTimelineInfo: GifMakerV2TimelineInfo;
  ballonTimelineInfos: GifMakerV2TimelineInfo[];
  explodedBallonCount: number;
  throwAt: string | null;
  hitAt: string | null;
  missAt: string | null;
  throwCount: number;
};

type RankCharacterItem = {
  characterTarget: CharacterTarget;
  endedAtTimestamp: number;
};

export default function Page() {
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
              animation: CHARACTER_ANIMATIONS.THROW_BALLON,
              isRandomSpeed: true,
              loopCount: 0,
            }),
            ballonTimelineInfos: Array.from({ length: 5 }).map(() => {
              return {
                timelineName: "ballon",
                timelines: [
                  {
                    uniqueKey: "001",
                    imageUrl: `${BASE_PATH}/things/ballon/ballon-001.png`,
                    durationMs: 200,
                  },
                  {
                    uniqueKey: "002",
                    imageUrl: `${BASE_PATH}/things/ballon/ballon-002.png`,
                    durationMs: 200,
                  },
                  {
                    uniqueKey: "003",
                    imageUrl: `${BASE_PATH}/things/ballon/ballon-003.png`,
                    durationMs: 200,
                  },
                  {
                    uniqueKey: "004",
                    imageUrl: `${BASE_PATH}/things/ballon/ballon-002.png`,
                    durationMs: 200,
                  },
                ],
                loopCount: Number.POSITIVE_INFINITY,
              };
            }),
            throwAt: null,
            hitAt: null,
            missAt: null,
            explodedBallonCount: 0,
            throwCount: 0,
          };
        }),
      );
    },
  });

  return (
    <>
      <div className="w-full h-full fixed top-0 left-0 box-border p-8 flex items-center justify-center">
        <div className="h-[280px] max-h-[calc(100%-18px)] inline-flex max-w-[800px] gap-2">
          {characterItems.map((characterItem, characterIndex) => {
            return (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: _
                key={characterIndex}
                className="w-[80px] h-full relative flex flex-col border border-gray-400"
              >
                <div className="relative flex flex-wrap gap-1 shrink-0 grow-0 justify-center">
                  {characterItem.ballonTimelineInfos.map((item, itemIndex) => {
                    return (
                      <GifMakerV2
                        key={`${item.timelineName}-${
                          // biome-ignore lint/suspicious/noArrayIndexKey: _
                          itemIndex
                        }`}
                        imageSources={[
                          { imageUrl: `${BASE_PATH}/things/ballon/ballon-001.png` },
                          { imageUrl: `${BASE_PATH}/things/ballon/ballon-002.png` },
                          { imageUrl: `${BASE_PATH}/things/ballon/ballon-003.png` },
                          { imageUrl: `${BASE_PATH}/things/ballon-explode/ballon-explode-001.png` },
                          { imageUrl: `${BASE_PATH}/things/ballon-explode/ballon-explode-002.png` },
                          { imageUrl: `${BASE_PATH}/things/ballon-explode/ballon-explode-003.png` },
                        ]}
                        timelineInfo={item}
                        classNames={{
                          root: "size-[28px]",
                        }}
                      />
                    );
                  })}
                </div>
                <div className="w-full flex-1 min-h-0 flex items-end">
                  <div className="inline-flex relative w-full">
                    <GifMakerV2
                      imageSources={getCharacterImages({
                        target: characterItem.characterTarget,
                      }).map((value) => {
                        return {
                          imageUrl: value,
                        };
                      })}
                      classNames={{
                        root: "w-full aspect-140/200",
                        imagesContainer: "scale-150 origin-center",
                        image: "",
                      }}
                      timelineInfo={characterItem.characterTimelineInfo}
                      onTimelineStarted={(params) => {
                        const { imageUrl } = params;
                        if (imageUrl.includes("throw-ballon-003")) {
                          setCharacterItems((prevCharacterItems) => {
                            return prevCharacterItems.map(
                              (prevCharacterItem, prevCharacterIndex) => {
                                if (prevCharacterIndex === characterIndex) {
                                  return {
                                    ...prevCharacterItem,
                                    throwAt: new Date().toISOString(),
                                    throwCount: prevCharacterItem.throwCount + 1,
                                  };
                                }
                                return prevCharacterItem;
                              },
                            );
                          });
                        }
                      }}
                    />
                    <div className="absolute left-1/2 top-0 w-px flex items-center justify-center">
                      <div className="shrink-0 grow-0">
                        {CHARACTER_TARGET_NAMES[characterItem.characterTarget]}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="left-1/2 bottom-[62px] absolute flex items-center justify-center w-px">
                  <div className="inline-flex items-center justify-center shrink-0 grow-0">
                    <Dart
                      throwAt={characterItem.throwAt}
                      onDartHit={() => {
                        const nextExplodedBallonCount = characterItem.explodedBallonCount + 1;

                        if (nextExplodedBallonCount >= characterItem.ballonTimelineInfos.length) {
                          setRankingCharacterTargets((prev) => {
                            const arr = [...prev];
                            if (
                              !arr.find(
                                (item) => item.characterTarget === characterItem.characterTarget,
                              )
                            ) {
                              arr.push({
                                characterTarget: characterItem.characterTarget,
                                endedAtTimestamp: Date.now(),
                              });
                            }
                            return arr;
                          });
                        }

                        setCharacterItems((prevCharacterItems) => {
                          return prevCharacterItems.map((prevCharacterItem, prevCharacterIndex) => {
                            if (prevCharacterIndex === characterIndex) {
                              return {
                                ...prevCharacterItem,
                                characterTimelineInfo:
                                  nextExplodedBallonCount >=
                                  characterItem.ballonTimelineInfos.length
                                    ? getCharacterTimelineInfo({
                                        target: prevCharacterItem.characterTarget,
                                        animation: CHARACTER_ANIMATIONS.IDLE,
                                        loopCount: Number.POSITIVE_INFINITY,
                                      })
                                    : getCharacterTimelineInfo({
                                        target: prevCharacterItem.characterTarget,
                                        animation: CHARACTER_ANIMATIONS.THROW_BALLON,
                                        isRandomSpeed: true,
                                        loopCount: 0,
                                      }),
                                explodedBallonCount: nextExplodedBallonCount,
                                hitAt: new Date().toISOString(),
                                ballonTimelineInfos: prevCharacterItem.ballonTimelineInfos.map(
                                  (ballonTimelineInfo, index) => {
                                    const value =
                                      prevCharacterItem.ballonTimelineInfos.length -
                                      nextExplodedBallonCount -
                                      1;
                                    if (
                                      index > value &&
                                      ballonTimelineInfo.timelineName === "ballon"
                                    ) {
                                      return {
                                        timelineName: "ballon-exploded",
                                        timelines: [
                                          {
                                            imageUrl: `${BASE_PATH}/things/ballon-explode/ballon-explode-001.png`,
                                            durationMs: 100,
                                          },
                                          {
                                            imageUrl: `${BASE_PATH}/things/ballon-explode/ballon-explode-002.png`,
                                            durationMs: 100,
                                          },
                                          {
                                            imageUrl: `${BASE_PATH}/things/ballon-explode/ballon-explode-003.png`,
                                            durationMs: 100,
                                          },
                                        ],
                                        loopCount: 0,
                                      };
                                    }
                                    return ballonTimelineInfo;
                                  },
                                ),
                              };
                            }
                            return prevCharacterItem;
                          });
                        });
                      }}
                      onDartMiss={() => {
                        setCharacterItems((prevCharacterItems) => {
                          return prevCharacterItems.map((prevCharacterItem, prevCharacterIndex) => {
                            if (prevCharacterIndex === characterIndex) {
                              return {
                                ...prevCharacterItem,
                                characterTimelineInfo: getCharacterTimelineInfo({
                                  target: prevCharacterItem.characterTarget,
                                  animation: CHARACTER_ANIMATIONS.THROW_BALLON,
                                  isRandomSpeed: true,
                                  loopCount: 0,
                                }),
                                missAt: new Date().toISOString(),
                              };
                            }
                            return prevCharacterItem;
                          });
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="left-1/2 bottom-full absolute flex items-center justify-center w-px">
                  <div className="inline-flex items-center justify-center shrink-0 grow-0">
                    <Hit hitAt={characterItem.hitAt} />
                  </div>
                </div>
                <div className="left-1/2 bottom-full absolute flex items-center justify-center w-px">
                  <div className="inline-flex items-center justify-center shrink-0 grow-0">
                    <Miss missAt={characterItem.missAt} />
                  </div>
                </div>

                {rankingCharacterTargets.find(
                  (item) => item.characterTarget === characterItem.characterTarget,
                ) && (
                  <div className="w-full absolute left-0 -bottom-7 text-center">
                    <div className="absolute left-1/2 bottom-full w-px flex items-center justify-center text-sm">
                      <div className="text-nowrap whitespace-nowrap bg-red-600/70 text-white border border-gray-400 min-w-[80px] flex flex-col items-center">
                        <div>{characterItem.throwCount}회</div>
                        <div>
                          {(
                            ((rankingCharacterTargets.find(
                              (item) => item.characterTarget === characterItem.characterTarget,
                            )?.endedAtTimestamp ?? 0) -
                              gameStartedTimestampRef.current) /
                            1000
                          ).toFixed(3)}
                          초
                        </div>
                      </div>
                    </div>
                    {rankingCharacterTargets.findIndex(
                      (item) => item.characterTarget === characterItem.characterTarget,
                    ) + 1}
                    등
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {characterSelectDialogComponent}
    </>
  );
}
