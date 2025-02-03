//barnesInterpolation.ts

import {
  degreesToRadians,
  radiansToDegrees,
  kilometersToDegrees,
} from "./unitConversion";
import { haversineDistance } from "./mapDistances";
import { gaussianWeight } from "./gaussianAlgorithms";

/**
 * Converts wind speed (in knots) and direction (in degrees) to U and V components.
 *
 * @param speedKnots - Wind speed in knots (must be >= 0).
 * @param directionDegrees - Wind direction in degrees (0-360).
 * @returns Object with U (east-west) and V (north-south) components.
 * @throws Error if inputs are invalid.
 */
export function windToComponents(
  speedKnots: number,
  directionDegrees: number
): { U: number; V: number } {
  if (speedKnots < 0 || !Number.isFinite(speedKnots)) {
    throw new Error("Invalid wind speed: Must be a non-negative number.");
  }
  if (directionDegrees < 0 || directionDegrees >= 360 || !Number.isFinite(directionDegrees)) {
    throw new Error("Invalid wind direction: Must be between 0 and 360 degrees.");
  }

  const rad = degreesToRadians(directionDegrees);
  const U = speedKnots * Math.sin(rad);
  const V = speedKnots * Math.cos(rad);
  return { U, V };
}

/**
 * Barnes interpolation for wind vectors (U and V components) at a target location.
 *
 * @param knownPoints - Array of known wind speed and direction data points.
 * @param targetLat - Latitude of the target location.
 * @param targetLon - Longitude of the target location.
 * @param kappa - Smoothing parameter (must be > 0).
 * @param passes - Number of refinement passes (default: 1, must be >= 1).
 * @returns Interpolated U and V components.
 * @throws Error if inputs are invalid.
 */
export function barnesInterpolation(
  knownPoints: {
    lat: number;
    lon: number;
    speedKnots: number;
    directionDegrees: number;
  }[],
  targetLat: number,
  targetLon: number,
  kappa: number,
  passes: number = 1
): { U: number; V: number } {
  if (!Array.isArray(knownPoints) || knownPoints.length === 0) {
    throw new Error("Invalid knownPoints array: Must contain at least one data point.");
  }
  if (!Number.isFinite(targetLat) || !Number.isFinite(targetLon)) {
    throw new Error("Invalid target coordinates: Must be finite numbers.");
  }
  if (kappa <= 0 || !Number.isFinite(kappa)) {
    throw new Error("Invalid kappa: Must be a positive number.");
  }
  if (passes < 1 || !Number.isInteger(passes)) {
    throw new Error("Invalid passes: Must be an integer >= 1.");
  }

  let interpolatedU = 0;
  let interpolatedV = 0;

  for (let pass = 0; pass < passes; pass++) {
    let sumWeightedU = 0;
    let sumWeightedV = 0;
    let sumWeights = 0;

    for (const point of knownPoints) {
      const distance = haversineDistance(
        point.lat,
        point.lon,
        targetLat,
        targetLon
      );
      const weight = gaussianWeight(distance, kappa);
      const { U, V } = windToComponents(point.speedKnots, point.directionDegrees);

      sumWeightedU += U * weight;
      sumWeightedV += V * weight;
      sumWeights += weight;
    }

    const TOLERANCE = 1e-10; // Numerical threshold for near-zero weights

    if (sumWeights < TOLERANCE) {
      console.warn("Warning: All weights are effectively zero, possibly due to large distances or inappropriate kappa.");
      return { U: 0, V: 0 };
    }
    
    

    interpolatedU = sumWeightedU / sumWeights;
    interpolatedV = sumWeightedV / sumWeights;
  }

  return { U: interpolatedU, V: interpolatedV };
}

// Type definition for a Barnes Grid Point.
type BarnesGridPoint = {
  coords: [number, number];
  speed: number;
  angle: number;
};

/**
 * Generates an array of values from min to max with a given step.
 *
 * @param min - Minimum value.
 * @param max - Maximum value.
 * @param step - Step size.
 * @returns Array of values.
 */
function generateGridPoints(min: number, max: number, step: number): number[] {
  const points = [];
  for (let value = min; value <= max; value += step) {
    points.push(value);
  }
  return points;
}

/**
 * Computes a Barnes interpolation grid for wind vectors over a geographical region.
 *
 * @param knownPoints - Array of known wind speed and direction data points.
 * @param gridBounds - Bounding box defining the grid (min/max latitudes and longitudes).
 * @param gridSizeKm - Grid spacing in kilometers.
 * @param kappa - Smoothing parameter for interpolation.
 * @param passes - Number of refinement passes.
 * @returns Array of interpolated Barnes grid points.
 * @throws Error if inputs are invalid.
 */
export function barnesGrid(
  knownPoints: {
    lat: number;
    lon: number;
    speedKnots: number;
    directionDegrees: number;
  }[],
  gridBounds: {
    minLat: number;
    minLon: number;
    maxLat: number;
    maxLon: number;
  },
  gridSizeKm: number,
  kappa: number,
  passes: number
): BarnesGridPoint[] {
  if (!Array.isArray(knownPoints) || knownPoints.length === 0) {
    throw new Error("Invalid knownPoints array: Must contain at least one data point.");
  }
  if (
    !Number.isFinite(gridBounds.minLat) || !Number.isFinite(gridBounds.maxLat) ||
    !Number.isFinite(gridBounds.minLon) || !Number.isFinite(gridBounds.maxLon)
  ) {
    throw new Error("Invalid gridBounds: Must contain finite numbers.");
  }
  if (gridSizeKm <= 0 || !Number.isFinite(gridSizeKm)) {
    throw new Error("Invalid gridSizeKm: Must be a positive number.");
  }

  const barnesGrid: BarnesGridPoint[] = [];
  const { latDeg, lonDeg } = kilometersToDegrees(gridBounds.minLat, gridSizeKm);

  const latPoints = generateGridPoints(gridBounds.minLat, gridBounds.maxLat, latDeg);
  const lonPoints = generateGridPoints(gridBounds.minLon, gridBounds.maxLon, lonDeg);

  for (const lat of latPoints) {
    for (const lon of lonPoints) {
      const { U, V } = barnesInterpolation(
        knownPoints,
        lat,
        lon,
        kappa,
        passes
      );

      const speed = Math.sqrt(U * U + V * V);
      const angle = (radiansToDegrees(Math.atan2(U, V)) + 360) % 360;

      barnesGrid.push({ coords: [lat, lon], speed, angle });
    }
  }

  return barnesGrid;
}
