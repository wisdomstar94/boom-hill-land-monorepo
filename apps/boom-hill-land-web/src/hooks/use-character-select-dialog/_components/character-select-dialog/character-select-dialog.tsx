"use client";

import { GifMaker } from "../../../../components/gif-maker";
import {
  CHARACTER_ANIMATIONS,
  type CharacterAnimation,
} from "../../../../consts/characters/character-animation.consts";
import {
  CHARACTER_TARGETS,
  type CharacterTarget,
} from "../../../../consts/characters/character-target.consts";
import { getCharacterTimelineInfo } from "../../../../macros/get-character-timeline-info";

export function CharacterSelectDialog(props: {
  onCharacterSelect: (characterTarget: CharacterTarget) => void;
  onGameStart: () => void;
  selectedCharacterTargets: CharacterTarget[];
}) {
  const { onCharacterSelect, onGameStart, selectedCharacterTargets } = props;

  return (
    <div className="w-full h-full fixed top-0 left-0 z-2 flex items-center justify-center bg-black/70">
      <div className="w-[calc(100%-32px)] h-[calc(100%-32px)] bg-white rounded-md flex flex-col relative">
        {/* top bar */}
        <div className="w-full p-4 box-border bg-blue-500 text-white shrink-0 grow-0 rounded-tl-md rounded-tr-md flex justify-between items-center gap-2 z-1">
          <div>캐릭터 선택</div>
          <button
            type="button"
            className="border border-white rounded-md px-2.5 py-1 cursor-pointer hover:bg-white/10"
            onClick={onGameStart}
          >
            게임 시작
          </button>
        </div>
        {/* content */}
        <div className="w-full flex-1 min-h-0 relative">
          <div className="w-full h-full relative">
            <div className="w-full h-full grid grid-cols-4 grid-rows-2 gap-2 relative">
              {/* 다오 */}
              <CharacterSelectItem
                characterTarget={CHARACTER_TARGETS.DAO}
                characterAnimation={CHARACTER_ANIMATIONS.IDLE}
                characterName="다오"
                onClick={() => onCharacterSelect(CHARACTER_TARGETS.DAO)}
                selectedCharacterTargets={selectedCharacterTargets}
              />
              {/* 배찌 */}
              <CharacterSelectItem
                characterTarget={CHARACTER_TARGETS.BAZZI}
                characterAnimation={CHARACTER_ANIMATIONS.IDLE}
                characterName="배찌"
                onClick={() => onCharacterSelect(CHARACTER_TARGETS.BAZZI)}
                selectedCharacterTargets={selectedCharacterTargets}
              />
              {/* 디지니 */}
              <CharacterSelectItem
                characterTarget={CHARACTER_TARGETS.DIZNI}
                characterAnimation={CHARACTER_ANIMATIONS.IDLE}
                characterName="디지니"
                onClick={() => onCharacterSelect(CHARACTER_TARGETS.DIZNI)}
                selectedCharacterTargets={selectedCharacterTargets}
              />
              {/* 우니 */}
              <CharacterSelectItem
                characterTarget={CHARACTER_TARGETS.UNI}
                characterAnimation={CHARACTER_ANIMATIONS.IDLE}
                characterName="우니"
                onClick={() => onCharacterSelect(CHARACTER_TARGETS.UNI)}
                selectedCharacterTargets={selectedCharacterTargets}
              />
              {/* 모스 */}
              <CharacterSelectItem
                characterTarget={CHARACTER_TARGETS.MOS}
                characterAnimation={CHARACTER_ANIMATIONS.IDLE}
                characterName="모스"
                onClick={() => onCharacterSelect(CHARACTER_TARGETS.MOS)}
                selectedCharacterTargets={selectedCharacterTargets}
              />
              {/* 에띠 */}
              <CharacterSelectItem
                characterTarget={CHARACTER_TARGETS.EDDI}
                characterAnimation={CHARACTER_ANIMATIONS.IDLE}
                characterName="에띠"
                onClick={() => onCharacterSelect(CHARACTER_TARGETS.EDDI)}
                selectedCharacterTargets={selectedCharacterTargets}
              />
              {/* 마리드 */}
              <CharacterSelectItem
                characterTarget={CHARACTER_TARGETS.MARID}
                characterAnimation={CHARACTER_ANIMATIONS.IDLE}
                characterName="마리드"
                onClick={() => onCharacterSelect(CHARACTER_TARGETS.MARID)}
                selectedCharacterTargets={selectedCharacterTargets}
              />
              {/* 케피 */}
              <CharacterSelectItem
                characterTarget={CHARACTER_TARGETS.KEPI}
                characterAnimation={CHARACTER_ANIMATIONS.IDLE}
                characterName="케피"
                onClick={() => onCharacterSelect(CHARACTER_TARGETS.KEPI)}
                selectedCharacterTargets={selectedCharacterTargets}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const CharacterSelectItem = (props: {
  characterTarget: CharacterTarget;
  characterAnimation: CharacterAnimation;
  characterName: string;
  onClick: () => void;
  selectedCharacterTargets: CharacterTarget[];
}) => {
  const { characterTarget, characterAnimation, characterName, onClick, selectedCharacterTargets } =
    props;

  const index = selectedCharacterTargets.indexOf(characterTarget);
  const isSelected = index !== -1;

  return (
    <button
      type="button"
      data-selected={isSelected}
      className={`relative box-border border border-gray-200 rounded-md flex flex-col items-center justify-center data-[selected=true]:border-blue-500`}
      onClick={onClick}
    >
      <div className="flex-1 min-h-0">
        <GifMaker
          classNames={{
            root: "outline outline-red-500 h-full aspect-140/200",
            imagesContainer: "scale-150 origin-center",
            image: "",
          }}
          timelineInfo={getCharacterTimelineInfo({
            target: characterTarget,
            animation: characterAnimation,
          })}
          loopCount={Number.POSITIVE_INFINITY}
        />
      </div>
      <div className="shrink-0 grow-0">{characterName}</div>
      {isSelected ? (
        <div className="absolute top-0 right-0">
          <div className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center">
            {index + 1}
          </div>
        </div>
      ) : null}
    </button>
  );
};
