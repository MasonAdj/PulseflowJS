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
 * @param speedKnots - Wind speed in knots.
 * @param directionDegrees - Wind direction in degrees.
 * @returns Object with U (east-west) and V (north-south) components.
 */
export function windToComponents(
  speedKnots: number,
  directionDegrees: number
): { U: number; V: number } {
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
 * @param kappa - Smoothing parameter.
 * @param passes - Number of refinement passes (default: 1).
 * @returns Interpolated U and V components.
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
  if (passes < 1) passes = 1;

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
      const { U, V } = windToComponents(
        point.speedKnots,
        point.directionDegrees
      );
      sumWeightedU += U * weight;
      sumWeightedV += V * weight;
      sumWeights += weight;
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
 * Computes a Barnes interpolation grid for wind vectors over a geographical region.
 *
 * @param knownPoints - Array of known wind speed and direction data points.
 * @param gridBounds - Bounding box defining the grid (min/max latitudes and longitudes).
 * @param gridSizeKm - Grid spacing in kilometers.
 * @param kappa - Smoothing parameter for interpolation.
 * @param passes - Number of refinement passes.
 * @returns Array of interpolated Barnes grid points.
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
  const barnesGrid: BarnesGridPoint[] = [];
  const { latDeg, lonDeg } = kilometersToDegrees(gridBounds.minLat, gridSizeKm);

  for (let lat = gridBounds.minLat; lat <= gridBounds.maxLat; lat += latDeg) {
    for (let lon = gridBounds.minLon; lon <= gridBounds.maxLon; lon += lonDeg) {
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
