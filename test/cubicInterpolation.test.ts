import { cubicInterpolate, biCubicInterpolate, triCubicInterpolate, nCubicInterpolate } from '../src/cubicInterpolation';

describe("cubicInterpolate", () => {
    test("correctly interpolates between four points", () => {
        const points: [number, number, number, number] = [1, 2, 3, 4];
        expect(cubicInterpolate(points, 0)).toBe(points[1]);
        expect(cubicInterpolate(points, 1)).toBeCloseTo(3);
        expect(cubicInterpolate(points, 0.5)).toBeCloseTo(2.5);
    });

    test("throws error for incorrect input size", () => {
        expect(() => cubicInterpolate([1, 2, 3] as any, 0.5)).toThrow("cubicInterpolate expects an array of exactly 4 points.");
    });
});

describe("biCubicInterpolate", () => {
    const grid: [[number, number, number, number], [number, number, number, number], [number, number, number, number], [number, number, number, number]] = [
        [1, 2, 3, 4],
        [2, 3, 4, 5],
        [3, 4, 5, 6],
        [4, 5, 6, 7]
    ];

    test("correctly interpolates between a 4x4 grid", () => {
        expect(biCubicInterpolate(grid, 0, 0)).toBe(grid[1][1]);
        expect(biCubicInterpolate(grid, 1, 1)).toBeCloseTo(5);
        expect(biCubicInterpolate(grid, 0.5, 0.5)).toBeCloseTo(4);
    });

    test("throws error for incorrect input size", () => {
        expect(() => biCubicInterpolate([[1, 2], [3, 4]] as any, 0.5, 0.5)).toThrow("biCubicInterpolate expects a 4x4 grid.");
    });
});

describe("triCubicInterpolate", () => {
    const grid: [[[number, number, number, number], [number, number, number, number], [number, number, number, number], [number, number, number, number]], 
                  [[number, number, number, number], [number, number, number, number], [number, number, number, number], [number, number, number, number]], 
                  [[number, number, number, number], [number, number, number, number], [number, number, number, number], [number, number, number, number]], 
                  [[number, number, number, number], [number, number, number, number], [number, number, number, number], [number, number, number, number]]] =
        new Array(4).fill(0).map(() =>
            new Array(4).fill(0).map(() =>
                [1, 2, 3, 4]
            )
        ) as any;

    test("correctly interpolates between a 4x4x4 grid", () => {
        expect(triCubicInterpolate(grid, 0, 0, 0)).toBe(grid[1][1][1]);
        expect(triCubicInterpolate(grid, 1, 1, 1)).toBeCloseTo(3);
        expect(triCubicInterpolate(grid, 0.5, 0.5, 0.5)).toBeCloseTo(2.5);
    });

    test("throws error for incorrect input size", () => {
        expect(() => triCubicInterpolate([[[1, 2], [3, 4]]] as any, 0.5, 0.5, 0.5)).toThrow("triCubicInterpolate expects a 4x4x4 grid.");
    });
});

describe("nCubicInterpolate", () => {
    test("correctly interpolates in 1D", () => {
        const points: number[] = [1, 2, 3, 4];
        expect(nCubicInterpolate(1, points, [0.5])).toBeCloseTo(2.5);
    });

    test("correctly interpolates in 2D", () => {
        const points: number[] = [
            1, 2, 3, 4,
            2, 3, 4, 5,
            3, 4, 5, 6,
            4, 5, 6, 7
        ];
        expect(nCubicInterpolate(2, points, [0.5, 0.5])).toBeCloseTo(4);
    });

    test("correctly interpolates in 3D", () => {
        const points: number[] = new Array(64).fill(0).map((_, i) => i * 0.1);
        expect(nCubicInterpolate(3, points, [0.5, 0.5, 0.5])).toBeCloseTo(3.15, 2);
      });

    test("correctly interpolates in 5D", () => {
        const points: number[] = new Array(1024).fill(0).map((_, i) => i * 0.1);
        expect(nCubicInterpolate(5, points, [0.5, 0.5, 0.5, 0.5, 0.5])).toBeCloseTo(51.15, 2);
      });

    test("throws error for incorrect input size", () => {
        expect(() => nCubicInterpolate(2, [1, 2, 3], [0.5, 0.5])).toThrow("nCubicInterpolate expects 16 points for 2 dimensions.");
    });

    test("throws error for negative dimensions", () => {
        expect(() => nCubicInterpolate(0, [1, 2, 3, 4], [0.5])).toThrow("nCubicInterpolate requires at least one dimension.");
    });

    test("throws error for mismatched dimensions and factors", () => {
        expect(() => nCubicInterpolate(3, new Array(64).fill(0), [0.5, 0.5])).toThrow("Expected 3 interpolation factors, but got 2.");
    });

    test("throws error for incorrect number of points", () => {
        expect(() => nCubicInterpolate(3, new Array(63).fill(0), [0.5, 0.5, 0.5])).toThrow("nCubicInterpolate expects 64 points for 3 dimensions.");
    });
});
