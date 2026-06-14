export const VARIANTS = {
  BLUE: "BLUE",
  OUTLINE: "OUTLINE",
} as const;

export type ButtonVariant = (typeof VARIANTS)[keyof typeof VARIANTS];
