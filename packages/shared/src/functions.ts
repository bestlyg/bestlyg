/*
   通过两点计算直线
   y1 = k * x1 + b
   y2 = k * x2 + b
   y1 - k * x1 = y2 - k * x2
   ( x2 - x1 ) * k = y2 - y1
   k = ( y2 - y1 ) / ( x2 - x1 )
   b = y1 - k * x1
 */
export function line(p1: [number, number], p2: [number, number]): (x: number) => number {
  const [x1, y1] = p1;
  const [x2, y2] = p2;
  if (x1 === x2) return () => x1;
  const k = (y2 - y1) / (x2 - x1);
  const b = y1 - k * x1;
  return (x: number) => k * x + b;
}
export function hexColorToWebglColor(color: number) {
  const r = (color & 0xff0000) / 0x10000 / 255;
  const g = (color & 0xff00) / 0x100 / 255;
  const b = (color & 0xff) / 255;
  return [r, g, b];
}
