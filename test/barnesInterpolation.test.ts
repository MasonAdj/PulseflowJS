import { windToComponents, barnesInterpolation, barnesGrid } from "../src/barnesInterpolation";
import { testData } from "./testData";

describe("windToComponents", () => {
  test("correctly converts wind speed and direction to U and V components", () => {
    const result = windToComponents(10, 90); // Wind from the east
    expect(result.U).toBeCloseTo(10);
    expect(result.V).toBeCloseTo(0);
  });

  test("handles wind from the north (0 degrees)", () => {
    const result = windToComponents(10, 0);
    expect(result.U).toBeCloseTo(0);
    expect(result.V).toBeCloseTo(10);
  });

  test("throws error for negative wind speed", () => {
    expect(() => windToComponents(-5, 90)).toThrow("Invalid wind speed: Must be a non-negative number.");
  });

  test("throws error for invalid wind direction (negative)", () => {
    expect(() => windToComponents(10, -10)).toThrow("Invalid wind direction: Must be between 0 and 360 degrees.");
  });

  test("throws error for invalid wind direction (>= 360)", () => {
    expect(() => windToComponents(10, 360)).toThrow("Invalid wind direction: Must be between 0 and 360 degrees.");
  });

  test("throws error for NaN wind speed or direction", () => {
    expect(() => windToComponents(NaN, 90)).toThrow("Invalid wind speed: Must be a non-negative number.");
    expect(() => windToComponents(10, NaN)).toThrow("Invalid wind direction: Must be between 0 and 360 degrees.");
  });
});

describe("barnesInterpolation", () => {
  const knownPoints = testData.map((point) => ({
    lat: point.coords[0],
    lon: point.coords[1],
    speedKnots: point.speed,
    directionDegrees: point.angle,
  }));

  test("correctly interpolates wind components at a target location", () => {
    const result = barnesInterpolation(knownPoints, 32.08, -81.1, 1, 1);
    expect(result.U).toBeDefined();
    expect(result.V).toBeDefined();
  });
  test("correctly interpolates wind components at a target location with default passes", () => {
    const result = barnesInterpolation(knownPoints, 32.08, -81.1, 1);
    expect(result.U).toBeDefined();
    expect(result.V).toBeDefined();
  });
  test("correctly interpolates wind components at a target location with multiple passes", () => {
    const result = barnesInterpolation(knownPoints, 32.08, -81.1, 3);
    expect(result.U).toBeDefined();
    expect(result.V).toBeDefined();
  });
  test("throws error if knownPoints array is empty", () => {
    expect(() => barnesInterpolation([], 32.08, -81.1, 1, 1)).toThrow(
      "Invalid knownPoints array: Must contain at least one data point."
    );
  });

  test("throws error for invalid target latitude/longitude", () => {
    expect(() => barnesInterpolation(knownPoints, NaN, -81.1, 1, 1)).toThrow(
      "Invalid target coordinates: Must be finite numbers."
    );
    expect(() => barnesInterpolation(knownPoints, 32.08, NaN, 1, 1)).toThrow(
      "Invalid target coordinates: Must be finite numbers."
    );
  });

  test("throws error for invalid kappa value", () => {
    expect(() => barnesInterpolation(knownPoints, 32.08, -81.1, 0, 1)).toThrow(
      "Invalid kappa: Must be a positive number."
    );
    expect(() => barnesInterpolation(knownPoints, 32.08, -81.1, NaN, 1)).toThrow(
      "Invalid kappa: Must be a positive number."
    );
  });

  test("throws error for invalid passes value", () => {
    expect(() => barnesInterpolation(knownPoints, 32.08, -81.1, 1, 0)).toThrow(
      "Invalid passes: Must be an integer >= 1."
    );
    expect(() => barnesInterpolation(knownPoints, 32.08, -81.1, 1, NaN)).toThrow(
      "Invalid passes: Must be an integer >= 1."
    );
  });

  test("returns { U: 0, V: 0 } when all weights are zero", () => {
    const consoleWarnMock = jest.spyOn(console, "warn").mockImplementation(() => {});
  
    const result = barnesInterpolation(knownPoints, 100, 100, 1000, 1);
    expect(result).toEqual({ U: 0, V: 0 });
  
    consoleWarnMock.mockRestore(); // Restore original console.warn behavior
  });  

  test("covers line 55 - handles near-zero sumWeights case", () => {
    const consoleWarnMock = jest.spyOn(console, "warn").mockImplementation(() => {});

    const edgeCaseKnownPoints = [
      { lat: 0, lon: 0, speedKnots: 10, directionDegrees: 90 },
    ];
    const largeDistance = 1e6; // A large distance that results in very small weights
    const result = barnesInterpolation(edgeCaseKnownPoints, largeDistance, largeDistance, 1000, 1);
    expect(result).toEqual({ U: 0, V: 0 });
    consoleWarnMock.mockRestore(); // Restore original console.warn behavior

  });
});


describe("barnesGrid", () => {
  const knownPoints = testData.map((point) => ({
    lat: point.coords[0],
    lon: point.coords[1],
    speedKnots: point.speed,
    directionDegrees: point.angle,
  }));

  const gridBounds = {
    minLat: 32.05,
    maxLat: 32.10,
    minLon: -81.15,
    maxLon: -81.05,
  };

  test("correctly generates a Barnes interpolation grid", () => {
    const grid = barnesGrid(knownPoints, gridBounds, 5, 1, 1);
    expect(grid).toBeInstanceOf(Array);
    expect(grid.length).toBeGreaterThan(0);
    expect(grid[0]).toHaveProperty("coords");
    expect(grid[0]).toHaveProperty("speed");
    expect(grid[0]).toHaveProperty("angle");
  });

  test("throws error if knownPoints array is empty", () => {
    expect(() => barnesGrid([], gridBounds, 5, 1, 1)).toThrow(
      "Invalid knownPoints array: Must contain at least one data point."
    );
  });

  test("throws error for invalid grid bounds", () => {
    expect(() =>
      barnesGrid(knownPoints, { minLat: NaN, maxLat: 32.10, minLon: -81.15, maxLon: -81.05 }, 5, 1, 1)
    ).toThrow("Invalid gridBounds: Must contain finite numbers.");
    expect(() =>
      barnesGrid(knownPoints, { minLat: 32.05, maxLat: 32.10, minLon: NaN, maxLon: -81.05 }, 5, 1, 1)
    ).toThrow("Invalid gridBounds: Must contain finite numbers.");
  });

  test("throws error for invalid grid size", () => {
    expect(() => barnesGrid(knownPoints, gridBounds, 0, 1, 1)).toThrow(
      "Invalid gridSizeKm: Must be a positive number."
    );
    expect(() => barnesGrid(knownPoints, gridBounds, NaN, 1, 1)).toThrow(
      "Invalid gridSizeKm: Must be a positive number."
    );
  });
});
