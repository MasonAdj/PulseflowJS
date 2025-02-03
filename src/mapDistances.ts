import {
  degreesToRadians,
  kilometersToDegrees,
  radiansToDegrees,
} from "./unitConversion";

// Haversine formula to compute the distance between two points (in km) on a globe
export function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of Earth in kilometers
  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(degreesToRadians(lat1)) *
      Math.cos(degreesToRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Generate random points within a given radius
export function generateRandomPoint(
  lat: number,
  lon: number,
  radiusKm: number
): { lat: number; lon: number } {
  // Use kilometersToDegrees to convert radius in kilometers to degrees
  const { latDeg, lonDeg } = kilometersToDegrees(lat, radiusKm);

  // Generate random offsets in degrees within the radius
  const u = Math.random();
  const v = Math.random();
  const w = latDeg * Math.sqrt(u); // Use latitude degree equivalent of the radius
  const t = 2 * Math.PI * v;
  const offsetLat = w * Math.cos(t);
  const offsetLon = (w * Math.sin(t)) / Math.cos(degreesToRadians(lat));

  return {
    lat: lat + offsetLat,
    lon: lon + offsetLon,
  };
}

export function calcStandardDeviationOfDistances(
  lat: number,
  lon: number,
  radiusKm: number,
  numPoints: number
): { distances: number[]; mean: number; boundaries: number[] } {
  const distances: number[] = [];

  for (let i = 0; i < numPoints; i++) {
    const randomPoint = generateRandomPoint(lat, lon, radiusKm);
    const distance = haversineDistance(
      lat,
      lon,
      randomPoint.lat,
      randomPoint.lon
    );
    distances.push(distance);
  }

  const mean =
    distances.reduce((sum, distance) => sum + distance, 0) / distances.length;
  const squaredDifferences = distances.map(
    (distance) => (distance - mean) ** 2
  );
  const variance =
    squaredDifferences.reduce((sum, sqDiff) => sum + sqDiff, 0) /
    distances.length;
  const standardDeviation = Math.sqrt(variance);

  // Marking boundaries at 1σ, 2σ, and 3σ from the mean
  const boundaries = [
    mean,
    mean + standardDeviation,
    mean + 2 * standardDeviation,
    mean + 3 * standardDeviation,
  ];

  return { distances, mean, boundaries };
}
export function calcStandardDeviationOfDistancesProbabilities(
  lat: number,
  lon: number,
  radiusKm: number,
  numPoints: number
): { boundaries: number[]; probabilities: number[] } {
  const distances: number[] = [];

  // Generate random distances from the center
  for (let i = 0; i < numPoints; i++) {
    const randomPoint = generateRandomPoint(lat, lon, radiusKm);
    const distance = haversineDistance(
      lat,
      lon,
      randomPoint.lat,
      randomPoint.lon
    );
    distances.push(distance);
  }

  // Sort distances to make it easier to count points within boundaries
  distances.sort((a, b) => a - b);

  const mean =
    distances.reduce((sum, distance) => sum + distance, 0) / distances.length;
  const squaredDifferences = distances.map(
    (distance) => (distance - mean) ** 2
  );
  const variance =
    squaredDifferences.reduce((sum, sqDiff) => sum + sqDiff, 0) /
    distances.length;
  const standardDeviation = Math.sqrt(variance);

  // Calculate the boundaries at mean, mean + 1σ, mean + 2σ, mean + 3σ
  const boundaries = [
    mean,
    mean + standardDeviation,
    mean + 2 * standardDeviation,
    mean + 3 * standardDeviation,
  ];

  // Calculate probabilities for each ring
  const probabilities: number[] = [];
  for (let i = 0; i < boundaries.length; i++) {
    const pointsInCurrentCircle = distances.filter(
      (distance) => distance <= boundaries[i]
    ).length;
    const pointsInPreviousCircle =
      i > 0
        ? distances.filter((distance) => distance <= boundaries[i - 1]).length
        : 0;
    const pointsInRing = pointsInCurrentCircle - pointsInPreviousCircle;

    const probability = (pointsInRing / numPoints) * 100;
    probabilities.push(probability);
  }

  return { boundaries, probabilities };
}

export function getAzimuth(
  lat1Deg: number,
  lon1Deg: number,
  lat2Deg: number,
  lon2Deg: number
): number {
  // 1) Convert degrees -> radians
  const lat1 = degreesToRadians(lat1Deg);
  const lon1 = degreesToRadians(lon1Deg);
  const lat2 = degreesToRadians(lat2Deg);
  const lon2 = degreesToRadians(lon2Deg);

  // 2) Calculate delta longitude in radians
  let deltaLon = lon2 - lon1;

  // Force deltaLon into the range -π to π
  if (deltaLon > Math.PI) {
    deltaLon -= 2 * Math.PI;
  } else if (deltaLon < -Math.PI) {
    deltaLon += 2 * Math.PI;
  }

  // 3) Use the inverse formula for bearing:
  const y = Math.sin(deltaLon) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLon);

  let bearingRadians = Math.atan2(y, x);

  // 4) Convert radians -> degrees, normalize to [0, 360)
  let bearingDeg = radiansToDegrees(bearingRadians);
  bearingDeg = (bearingDeg + 360) % 360;

  return bearingDeg;
}
