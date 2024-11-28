import { degreesToRadians, radiansToDegrees, kilometersToDegrees } from "./unitConversion";
import { haversineDistance } from "./mapDistances";
import {gaussianWeight} from "./gaussianAlgorithms"


// Function to convert wind speed (in knots) and direction (in degrees) to U and V components
export function windToComponents(
  speedKnots: number,
  directionDegrees: number
): { U: number; V: number } {
  const rad = degreesToRadians(directionDegrees);
  const U = speedKnots * Math.sin(rad); // East-West component
  const V = speedKnots * Math.cos(rad); // North-South component
  return { U, V };
}

// Barnes interpolation function for wind vectors (U and V components)
export function barnesInterpolation(
  knownPoints: {
    lat: number;
    lon: number;
    speedKnots: number;
    directionDegrees: number;
  }[], // Data points with known wind speed and direction
  targetLat: number,
  targetLon: number, // Target point where we interpolate
  kappa: number, // Smoothing parameter
  passes: number = 1 // Number of refinement passes (default 1)
): { U: number; V: number } {
  // Ensure passes is at least 1
  if (passes < 1) {
    passes = 1;
  }

  let interpolatedU = 0;
  let interpolatedV = 0;

  // Perform multiple passes if required
  for (let pass = 0; pass < passes; pass++) {
    // Initialize sums for weighted average
    let sumWeightedU = 0;
    let sumWeightedV = 0;
    let sumWeights = 0;

    // Iterate over known points
    for (const point of knownPoints) {
      // Calculate the distance between the known point and the target point
      const distance = haversineDistance(
        point.lat,
        point.lon,
        targetLat,
        targetLon
      );

      // Calculate the weight for this point based on the distance
      const weight = gaussianWeight(distance, kappa);

      // Convert wind speed and direction to U and V components
      const { U, V } = windToComponents(
        point.speedKnots,
        point.directionDegrees
      );

      // Update weighted sum of U and V components and total weight
      sumWeightedU += U * weight;
      sumWeightedV += V * weight;
      sumWeights += weight;
    }

    // Calculate the interpolated U and V as the weighted average
    interpolatedU = sumWeightedU / sumWeights;
    interpolatedV = sumWeightedV / sumWeights;
  }

  return { U: interpolatedU, V: interpolatedV };
}
  // Define the type for a grid point
  type BarnesGridPoint = {
    coords: [number, number];
    speed: number;
    angle: number;
  };
  
export function barnesGrid(
    knownPoints: {
      lat: number;
      lon: number;
      speedKnots: number;
      directionDegrees: number;
    }[],
    gridBounds: { minLat: number; minLon: number; maxLat: number; maxLon: number },
    gridSizeKm: number,
    kappa: number,
    passes: number,
  ): BarnesGridPoint[] {
    // Initialize barnesGrid with an explicit type
    const barnesGrid: BarnesGridPoint[] = [];
  
    // Get the degree increments for the specified grid size in kilometers
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
        const speed = Math.sqrt(U * U + V * V); // Calculate resultant speed
        const angle = (radiansToDegrees(Math.atan2(U, V)) + 360) % 360; // Convert to degrees using radiansToDegrees
        barnesGrid.push({ coords: [lat, lon], speed, angle });
      }
    }
    return barnesGrid;
  }