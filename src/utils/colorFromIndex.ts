export function colorFromIndex(index: number) {
  const lightness = 35 + (index * 7) % 40;
  return `hsl(270, 65%, ${lightness}%)`;
}
