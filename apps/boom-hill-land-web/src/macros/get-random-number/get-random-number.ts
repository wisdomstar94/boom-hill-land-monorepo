export function getRandomNumber(params: { min: number; max: number }): number {
  const { min, max } = params;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
