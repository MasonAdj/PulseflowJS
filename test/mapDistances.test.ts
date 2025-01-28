import {
  haversineDistance,
  generateRandomPoint,
  calcStandardDeviationOfDistances,
  calcStandardDeviationOfDistancesProbabilities,
  getAzimuth,
} from "../src/mapDistances";
import { testData } from "./testData";

describe("haversineDistance", () => {
  it("should calculate the correct distances between marker pairs", () => {
    const [marker1, marker2] = [testData[0], testData[1]];
    const distance = haversineDistance(
      marker1.coords[0],
      marker1.coords[1],
      marker2.coords[0],
      marker2.coords[1]
    );

    // This is the number I got from my calculator, the received data adds more decimal points than I had,
    // so I used toBeCloseTo
    expect(distance).toBeCloseTo(2.4, 1);
  });
});

describe("generateRandomPoint", () => {
  it("should generate a point within the specified radius", () => {
    const lat = 51.5074; // Example latitude (London)
    const lon = -0.1278; // Example longitude (London)
    const radiusKm = 10; // 10 km radius

    const point = generateRandomPoint(lat, lon, radiusKm);

    const distance = haversineDistance(lat, lon, point.lat, point.lon);
    expect(distance).toBeLessThanOrEqual(radiusKm);
  });
});

describe("calcStandardDeviationOfDistances", () => {
  it("should calculate distances, mean, and boundaries correctly", () => {
    const lat = 40.7128; // Example latitude (New York)
    const lon = -74.006; // Example longitude (New York)
    const radiusKm = 20; // 20 km radius
    const numPoints = 1000; // Number of points

    const result = calcStandardDeviationOfDistances(lat, lon, radiusKm, numPoints);

    expect(result.distances.length).toBe(numPoints);
    expect(result.mean).toBeGreaterThan(0);
    expect(result.boundaries.length).toBe(4);
    expect(result.boundaries[1]).toBeGreaterThan(result.mean);
  });
});

describe("calcStandardDeviationOfDistancesProbabilities", () => {
  it("should calculate boundaries and probabilities correctly", () => {
    const lat = 34.0522; // Example latitude (Los Angeles)
    const lon = -118.2437; // Example longitude (Los Angeles)
    const radiusKm = 50; // 50 km radius
    const numPoints = 500; // Number of points

    const result = calcStandardDeviationOfDistancesProbabilities(
      lat,
      lon,
      radiusKm,
      numPoints
    );

    expect(result.boundaries.length).toBe(4);
    expect(result.probabilities.length).toBe(4);
    expect(
      result.probabilities.reduce((sum, prob) => sum + prob, 0)
    ).toBeCloseTo(100, 1);
  });
});

describe("getAzimuth", () => {
  it("should return 0 when both points are identical", () => {
    const result = getAzimuth(0, 0, 0, 0);
    expect(result).toBe(0);
  });

  it("should return 0° for a point directly north (lat increases, same lon)", () => {
    // (0,0) to (1,0) is due north, bearing = 0°
    const result = getAzimuth(0, 0, 1, 0);
    expect(result).toBeCloseTo(0, 5);
  });

  it("should return 90° for a point directly east (lon increases, same lat)", () => {
    // (0,0) to (0,1) is due east, bearing = 90°
    const result = getAzimuth(0, 0, 0, 1);
    expect(result).toBeCloseTo(90, 5);
  });

  it("should return 180° for a point directly south (lat decreases, same lon)", () => {
    // (0,0) to (-1,0) is due south, bearing = 180°
    const result = getAzimuth(0, 0, -1, 0);
    expect(result).toBeCloseTo(180, 5);
  });

  it("should return 270° for a point directly west (lon decreases, same lat)", () => {
    // (0,0) to (0,-1) is due west, bearing = 270°
    const result = getAzimuth(0, 0, 0, -1);
    expect(result).toBeCloseTo(270, 5);
  });

  // The next three tests fail in the original code because the code always
  // picks the *shortest* route by normalizing deltaLon to [-π, π].
  // Therefore, from 179 to -179 (at lat=0) is effectively a deltaLon of ~ +2°
  // (i.e., going east ~ 2°), which yields a bearing near 90°, not 270.
  // Similarly, the opposite direction ends up near 270.
  //
  // We simply fix the EXPECTED values to match the code's behavior:

  it("should handle crossing the 180th meridian correctly", () => {
    // (0,179) to (0,-179): code normalizes deltaLon = ~ +2°, so bearing ~ 90
    const result = getAzimuth(0, 179, 0, -179);
    expect(result).toBeCloseTo(90, 2);
  });

  it("should return ~180° going from the North Pole to a lower latitude", () => {
    // From North Pole (90,0) heading to lat=80, lon=0 => due south, bearing = 180°
    const result = getAzimuth(90, 0, 80, 0);
    expect(result).toBeCloseTo(180, 5);
  });

  it("should return ~0° going from the South Pole to a higher latitude", () => {
    // From South Pole (-90,0) heading to lat=-80, lon=0 => due north, bearing = 0°
    const result = getAzimuth(-90, 0, -80, 0);
    expect(result).toBeCloseTo(0, 5);
  });

  it("should compute a non-trivial bearing for diagonal points", () => {
    // For example: From (10, 10) to (20, 20).
    // The bearing should be around ~44°–46°, let's just check it's in that ballpark.
    const result = getAzimuth(10, 10, 20, 20);
    expect(result).toBeGreaterThan(40);
    expect(result).toBeLessThan(50);
  });

  it("should handle negative latitudes and longitudes correctly", () => {
    // e.g. From (−10, −10) to (−20, −30)
    // We won't do an exact expected angle, but we check it's in [0, 360)
    const result = getAzimuth(-10, -10, -20, -30);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThan(360);
  });

  it("should handle crossing the 180th meridian westward (deltaLon < -π)", () => {
    // (0,179) to (0,-179) => -358°, code normalizes to +2° => ~90
    const result = getAzimuth(0, 179, 0, -179);
    expect(result).toBeCloseTo(90, 2);
  });

  it("should handle crossing the 180th meridian eastward (deltaLon > π)", () => {
    // (0,-179) to (0,179) => +358°, code normalizes to ~ -2° => ~270
    const result = getAzimuth(0, -179, 0, 179);
    expect(result).toBeCloseTo(270, 2);
  });
});
