// Function to convert degrees to radians
export function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Haversine formula to compute the distance between two points (in km) on a globe
export function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Gaussian weight function for Barnes analysis
export function gaussianWeight(distance: number, kappa: number): number {
  return Math.exp(- (distance ** 2) / (kappa ** 2));
}

// Function to convert wind speed (in knots) and direction (in degrees) to U and V components
export function windToComponents(speedKnots: number, directionDegrees: number): { U: number, V: number } {
  const rad = toRadians(directionDegrees);
  const U = speedKnots * Math.sin(rad); // East-West component
  const V = speedKnots * Math.cos(rad); // North-South component
  return { U, V };
}

// Barnes interpolation function for wind vectors (U and V components)
export function barnesInterpolation(
  knownPoints: { lat: number, lon: number, speedKnots: number, directionDegrees: number }[],  // Data points with known wind speed and direction
  targetLat: number, targetLon: number,  // Target point where we interpolate
  kappa: number,  // Smoothing parameter
  passes: number = 1  // Number of refinement passes (default 1)
): { U: number, V: number } {
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
          const distance = haversineDistance(point.lat, point.lon, targetLat, targetLon);

          // Calculate the weight for this point based on the distance
          const weight = gaussianWeight(distance, kappa);

          // Convert wind speed and direction to U and V components
          const { U, V } = windToComponents(point.speedKnots, point.directionDegrees);

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
