export const colors = [
  '#8971fb',
  '#71c6fb',
  '#fb71b6',
  '#97e691',
  '#ffb47e',
  '#3bf0e9',
  '#ffe17e',
  '#d171fb',
  '#736af6',
  '#fb7171',
];
export function getColor(idx: number): string {
  return colors[colors.length % idx];
}
