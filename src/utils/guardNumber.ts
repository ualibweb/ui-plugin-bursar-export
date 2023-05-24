export default function guardNumber(
  value: string | undefined,
  fallback: number
): number {
  const parsed = parseFloat(value ?? '');

  if (isNaN(parsed)) {
    return fallback;
  }

  return parsed;
}
