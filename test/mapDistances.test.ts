import {
  haversineDistance,
  generateRandomPoint,
  calcStandardDeviationOfDistances,
  calcStandardDeviationOfDistancesProbabilities,
} from "../src/mapDistances"; // replace 'yourModule' with the actual file name
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

    //This is the number I got from my calculator, the received data adds more decimal points than I had, so I used toBeCloseTo
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

describe("calcStandardDeviation", () => {
  it("should calculate distances, mean, and boundaries correctly", () => {
    const lat = 40.7128; // Example latitude (New York)
    const lon = -74.006; // Example longitude (New York)
    const radiusKm = 20; // 20 km radius
    const numPoints = 1000; // Number of points

    const result = calcStandardDeviationOfDistances(
      lat,
      lon,
      radiusKm,
      numPoints
    );

    expect(result.distances.length).toBe(numPoints);
    expect(result.mean).toBeGreaterThan(0);
    expect(result.boundaries.length).toBe(4);
    expect(result.boundaries[1]).toBeGreaterThan(result.mean);
  });
});

describe("calcStandardDeviationProbabilities", () => {
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
