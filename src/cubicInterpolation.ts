export function cubicInterpolate(p: number[], x: number): number {
  return p[1] + 0.5 * x * (p[2] - p[0] + x * (2.0 * p[0] - 5.0 * p[1] + 4.0 * p[2] - p[3] + x * (3.0 * (p[1] - p[2]) + p[3] - p[0])));
}

export function biCubicInterpolate(p: number[][], x: number, y: number): number {
  const arr: number[] = [
      cubicInterpolate(p[0], y),
      cubicInterpolate(p[1], y),
      cubicInterpolate(p[2], y),
      cubicInterpolate(p[3], y)
  ];
  return cubicInterpolate(arr, x);
}

export function triCubicInterpolate(p: number[][][], x: number, y: number, z: number): number {
  const arr: number[] = [
      biCubicInterpolate(p[0], y, z),
      biCubicInterpolate(p[1], y, z),
      biCubicInterpolate(p[2], y, z),
      biCubicInterpolate(p[3], y, z)
  ];
  return cubicInterpolate(arr, x);
}

export function nCubicInterpolate(n: number, p: number[], coordinates: number[]): number {
  if (n === 1) {
      return cubicInterpolate(p, coordinates[0]);
  } else {
      const arr: number[] = [];
      const skip = 1 << ((n - 1) * 2);0

      arr[0] = nCubicInterpolate(n - 1, p.slice(0, skip), coordinates.slice(1));
      arr[1] = nCubicInterpolate(n - 1, p.slice(skip, 2 * skip), coordinates.slice(1));
      arr[2] = nCubicInterpolate(n - 1, p.slice(2 * skip, 3 * skip), coordinates.slice(1));
      arr[3] = nCubicInterpolate(n - 1, p.slice(3 * skip, 4 * skip), coordinates.slice(1));

      return cubicInterpolate(arr, coordinates[0]);
  }
}
