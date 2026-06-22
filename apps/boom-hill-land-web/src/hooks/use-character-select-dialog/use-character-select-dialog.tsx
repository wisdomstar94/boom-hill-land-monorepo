"use client";

import { useState } from "react";
import type { CharacterTarget } from "../../consts/characters/character-target.consts";
import { CharacterSelectDialog } from "./_components/character-select-dialog";

export function useCharacterSelectDialog(props: {
  initialIsOpen?: boolean;
  onCharacterSelectEnded: (params: { selectedCharacterTargets: CharacterTarget[] }) => void;
}) {
  const { initialIsOpen = false, onCharacterSelectEnded } = props;
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  const [selectedCharacterTargets, setSelectedCharacterTargets] = useState<CharacterTarget[]>([]);

  const characterSelectDialogComponent = (
    <>
      {isOpen ? (
        <CharacterSelectDialog
          onCharacterSelect={(characterTarget) => {
            setSelectedCharacterTargets((prev) => {
              const arr = [...prev];
              if (!arr.includes(characterTarget)) {
                arr.push(characterTarget);
              } else {
                arr.splice(arr.indexOf(characterTarget), 1);
              }
              return arr;
            });
          }}
          onGameStart={() => {
            if (selectedCharacterTargets.length === 0) {
              alert("캐릭터를 선택해주세요.");
              return;
            }

            onCharacterSelectEnded({ selectedCharacterTargets });
            setIsOpen(false);
          }}
          selectedCharacterTargets={selectedCharacterTargets}
        />
      ) : null}
    </>
  );

  function openCharacterSelectDialog() {
    setIsOpen(true);
  }

  return {
    characterSelectDialogComponent,
    openCharacterSelectDialog,
    selectedCharacterTargets,
  };
}
