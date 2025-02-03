export function cubicInterpolate(p: number[], x: number): number {
  /**
   * Performs cubic interpolation between four points.
   *
   * @param p - Array of four points to interpolate between.
   * @param x - Interpolation factor (typically between 0 and 1).
   * @returns Interpolated value.
   */
  return p[1] + 0.5 * x * (p[2] - p[0] + x * (2.0 * p[0] - 5.0 * p[1] + 4.0 * p[2] - p[3] + x * (3.0 * (p[1] - p[2]) + p[3] - p[0])));
}

export function biCubicInterpolate(p: number[][], x: number, y: number): number {
  /**
   * Performs bicubic interpolation using a 4x4 grid of points.
   *
   * @param p - 2D array (4x4) of points.
   * @param x - Interpolation factor along x-axis.
   * @param y - Interpolation factor along y-axis.
   * @returns Interpolated value.
   */
  const arr: number[] = [
      cubicInterpolate(p[0], y),
      cubicInterpolate(p[1], y),
      cubicInterpolate(p[2], y),
      cubicInterpolate(p[3], y)
  ];
  return cubicInterpolate(arr, x);
}

export function triCubicInterpolate(p: number[][][], x: number, y: number, z: number): number {
  /**
   * Performs tricubic interpolation using a 4x4x4 grid of points.
   *
   * @param p - 3D array (4x4x4) of points.
   * @param x - Interpolation factor along x-axis.
   * @param y - Interpolation factor along y-axis.
   * @param z - Interpolation factor along z-axis.
   * @returns Interpolated value.
   */
  const arr: number[] = [
      biCubicInterpolate(p[0], y, z),
      biCubicInterpolate(p[1], y, z),
      biCubicInterpolate(p[2], y, z),
      biCubicInterpolate(p[3], y, z)
  ];
  return cubicInterpolate(arr, x);
}

export function nCubicInterpolate(n: number, p: number[], coordinates: number[]): number {
  /**
   * Performs n-dimensional cubic interpolation.
   *
   * @param n - Number of dimensions.
   * @param p - Array of points to interpolate between.
   * @param coordinates - Interpolation factors for each dimension.
   * @returns Interpolated value.
   */
  if (n === 1) {
      return cubicInterpolate(p, coordinates[0]);
  } else {
      const arr: number[] = [];
      const skip = 1 << ((n - 1) * 2);

      // Recursively apply interpolation along each dimension
      arr[0] = nCubicInterpolate(n - 1, p.slice(0, skip), coordinates.slice(1));
      arr[1] = nCubicInterpolate(n - 1, p.slice(skip, 2 * skip), coordinates.slice(1));
      arr[2] = nCubicInterpolate(n - 1, p.slice(2 * skip, 3 * skip), coordinates.slice(1));
      arr[3] = nCubicInterpolate(n - 1, p.slice(3 * skip, 4 * skip), coordinates.slice(1));

      return cubicInterpolate(arr, coordinates[0]);
  }
}
