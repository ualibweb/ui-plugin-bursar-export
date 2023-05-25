/** Guarantees an integer */
export default function guardNumber(
  value: string | undefined,
  fallback: number,
  preRound: (value: number) => number = (v) => v
): number {
  const parsed = parseFloat(value ?? '');

  if (isNaN(parsed)) {
    return fallback;
  }

  return Math.round(preRound(parsed));
}
