export function colorFromIndex(index: number): string {
  const hue = (index * 137.508) % 360; // distribuição ótima
  return `hsl(${hue}, 75%, 55%)`;
}
