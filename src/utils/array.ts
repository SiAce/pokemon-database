export function range(start: number, stop: number): number[] {
  return new Array(stop - start).fill(start).map((e, i) => e + i);
}