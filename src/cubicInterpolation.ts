//cubicInterpolation.ts

type Point4D = [number, number, number, number];
type Grid4x4 = [Point4D, Point4D, Point4D, Point4D];
type Grid4x4x4 = [Grid4x4, Grid4x4, Grid4x4, Grid4x4];

/**
 * Performs cubic interpolation between four points.
 *
 * @param points - Array of four points to interpolate between.
 * @param t - Interpolation factor (typically between 0 and 1).
 * @returns Interpolated value.
 * @throws Error if `points` array does not have exactly 4 elements.
 */
export function cubicInterpolate(points: Point4D, t: number): number {
    if (points.length !== 4) {
        throw new Error("cubicInterpolate expects an array of exactly 4 points.");
    }
    return points[1] + 0.5 * t * (points[2] - points[0] +
        t * (2.0 * points[0] - 5.0 * points[1] + 4.0 * points[2] - points[3] +
            t * (3.0 * (points[1] - points[2]) + points[3] - points[0])));
}

/**
 * Performs bicubic interpolation using a 4x4 grid of points.
 *
 * @param grid - 2D array (4x4) of points.
 * @param x - Interpolation factor along x-axis.
 * @param y - Interpolation factor along y-axis.
 * @returns Interpolated value.
 * @throws Error if `grid` is not 4x4.
 */
export function biCubicInterpolate(grid: Grid4x4, x: number, y: number): number {
    if (grid.length !== 4 || grid.some(row => row.length !== 4)) {
        throw new Error("biCubicInterpolate expects a 4x4 grid.");
    }

    const interpolatedRows: Point4D = [
        cubicInterpolate(grid[0], y),
        cubicInterpolate(grid[1], y),
        cubicInterpolate(grid[2], y),
        cubicInterpolate(grid[3], y)
    ];
    return cubicInterpolate(interpolatedRows, x);
}

/**
 * Performs tricubic interpolation using a 4x4x4 grid of points.
 *
 * @param grid - 3D array (4x4x4) of points.
 * @param x - Interpolation factor along x-axis.
 * @param y - Interpolation factor along y-axis.
 * @param z - Interpolation factor along z-axis.
 * @returns Interpolated value.
 * @throws Error if `grid` is not 4x4x4.
 */
export function triCubicInterpolate(grid: Grid4x4x4, x: number, y: number, z: number): number {
    if (grid.length !== 4 || grid.some(layer => layer.length !== 4 || layer.some(row => row.length !== 4))) {
        throw new Error("triCubicInterpolate expects a 4x4x4 grid.");
    }

    const interpolatedPlanes: Point4D = [
        biCubicInterpolate(grid[0], y, z),
        biCubicInterpolate(grid[1], y, z),
        biCubicInterpolate(grid[2], y, z),
        biCubicInterpolate(grid[3], y, z)
    ];
    return cubicInterpolate(interpolatedPlanes, x);
}

/**
 * Performs n-dimensional cubic interpolation.
 *
 * @param dimensions - Number of dimensions.
 * @param points - Flattened array of points to interpolate between.
 * @param factors - Interpolation factors for each dimension.
 * @returns Interpolated value.
 * @throws Error if `points` length is incorrect for given dimensions.
 */
export function nCubicInterpolate(dimensions: number, points: number[], factors: number[]): number {
    if (dimensions < 1) {
        throw new Error("nCubicInterpolate requires at least one dimension.");
    }
    if (factors.length !== dimensions) {
        throw new Error(`Expected ${dimensions} interpolation factors, but got ${factors.length}.`);
    }

    const requiredLength = 4 ** dimensions;
    if (points.length !== requiredLength) {
        throw new Error(`nCubicInterpolate expects ${requiredLength} points for ${dimensions} dimensions.`);
    }

    if (dimensions === 1) {
        return cubicInterpolate(points as Point4D, factors[0]);
    }

    const skip = 4 ** (dimensions - 1);
    const interpolatedSlices: Point4D = [
        nCubicInterpolate(dimensions - 1, points.slice(0, skip), factors.slice(1)),
        nCubicInterpolate(dimensions - 1, points.slice(skip, 2 * skip), factors.slice(1)),
        nCubicInterpolate(dimensions - 1, points.slice(2 * skip, 3 * skip), factors.slice(1)),
        nCubicInterpolate(dimensions - 1, points.slice(3 * skip, 4 * skip), factors.slice(1))
    ];

    return cubicInterpolate(interpolatedSlices, factors[0]);
}  