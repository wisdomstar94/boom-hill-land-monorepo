export const CHARACTER_TARGETS = {
  DAO: "DAO",
  BAZZI: "BAZZI",
  UNI: "UNI",
  DIZNI: "DIZNI",
  MARID: "MARID",
  MOS: "MOS",
  EDDI: "EDDI",
  KEPI: "KEPI",
} as const;

export type CharacterTarget = (typeof CHARACTER_TARGETS)[keyof typeof CHARACTER_TARGETS];

export const CHARACTER_TARGET_NAMES = {
  [CHARACTER_TARGETS.DAO]: "다오",
  [CHARACTER_TARGETS.BAZZI]: "배찌",
  [CHARACTER_TARGETS.UNI]: "우니",
  [CHARACTER_TARGETS.DIZNI]: "디지니",
  [CHARACTER_TARGETS.MARID]: "마리드",
  [CHARACTER_TARGETS.MOS]: "모스",
  [CHARACTER_TARGETS.EDDI]: "에띠",
  [CHARACTER_TARGETS.KEPI]: "케피",
} as const;
