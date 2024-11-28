# Map Distances

This segment provides functions for a series of functions designed to handle geographic distance calculations and related statistics.

### `haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number`

- **Description**: Calculates the Haversine distance between two points on the Earth's surface, given their latitude and longitude coordinates. This distance is the shortest path over the Earth's surface, assuming a spherical Earth.
- **Inputs**:
  - `lat1` (number): Latitude of the first point in degrees.
  - `lon1` (number): Longitude of the first point in degrees.
  - `lat2` (number): Latitude of the second point in degrees.
  - `lon2` (number): Longitude of the second point in degrees.
- **Outputs**:
  - The distance between the two points in kilometers.
- **Example**:
  ```javascript
  import { haversineDistance } from "pulseflowjs";
  const distance = haversineDistance(
    52.2296756,
    21.0122287,
    41.89193,
    12.51133
  ); // 1314.24 km
  ```

### `generateRandomPoint(lat: number, lon: number, radiusKm: number): { lat: number, lon: number }`

- **Description**: Generates a random geographic point within a specified radius (in kilometers) from a given latitude and longitude.
- **Inputs**:
  - `lat` (number): Latitude of the center point in degrees.
  - `lon` (number): Longitude of the center point in degrees.
  - `radiusKm` (number): Radius in kilometers within which the random point will be generated.
- **Outputs**:
  - An object containing:
    - `lat` (number): The latitude of the generated point.
    - `lon` (number): The longitude of the generated point.
- **Example**:
  ```javascript
  import { generateRandomPoint } from "pulseflowjs";
  const randomPoint = generateRandomPoint(52.2296756, 21.0122287, 50); // Random point within 50 km radius
  console.log(randomPoint); // { lat: 52.287890, lon: 21.060902 }
  ```

### `calcStandardDeviationOfDistances(lat: number, lon: number, radiusKm: number, numPoints: number): { distances: number[], mean: number, boundaries: number[] }`

- **Description**: Calculates the standard deviation of the distances between a given geographic point and a specified number of random points within a radius. This function also returns the distances, the mean distance, and the boundaries for 1σ, 2σ, and 3σ from the mean.
- **Inputs**:
  - `lat` (number): Latitude of the center point in degrees.
  - `lon` (number): Longitude of the center point in degrees.
  - `radiusKm` (number): The radius in kilometers within which the random points are generated.
  - `numPoints` (number): The number of random points to generate for calculating distances.
- **Outputs**:
  - An object containing:
    - `distances` (array of numbers): The array of distances from the center point to each random point.
    - `mean` (number): The mean of the distances.
    - `boundaries` (array of numbers): The boundaries at 1σ, 2σ, and 3σ from the mean.
- **Example**:
  ```javascript
  import { calcStandardDeviationOfDistances } from "pulseflowjs";
  const result = calcStandardDeviationOfDistances(
    52.2296756,
    21.0122287,
    50,
    100
  );
  console.log(result.distances); // [32.1, 28.4, ...]
  console.log(result.mean); // 30.6
  console.log(result.boundaries); // [30.6, 32.1, 33.6, 35.1]
  ```

### `calcStandardDeviationOfDistancesProbabilities(

lat: number,
lon: number,
radiusKm: number,
numPoints: number
): { boundaries: number[], probabilities: number[] }`

- **Description**: Calculates the standard deviation of distances between a given geographic point and a specified number of random points within a radius. It also computes the probabilities for each boundary at 1σ, 2σ, and 3σ from the mean, based on the distribution of distances.
- **Inputs**:
  - `lat` (number): Latitude of the center point in degrees.
  - `lon` (number): Longitude of the center point in degrees.
  - `radiusKm` (number): The radius in kilometers within which the random points are generated.
  - `numPoints` (number): The number of random points to generate for calculating distances.
- **Outputs**:
  - An object containing:
    - `boundaries` (array of numbers): The boundaries at the mean, mean + 1σ, mean + 2σ, and mean + 3σ.
    - `probabilities` (array of numbers): The probabilities for each boundary, representing the percentage of points within each boundary.
- **Example**:
  ```javascript
  import { calcStandardDeviationOfDistancesProbabilities } from "pulseflowjs";
  const result = calcStandardDeviationOfDistancesProbabilities(
    52.2296756,
    21.0122287,
    50,
    100
  );
  console.log(result.boundaries); // [30.6, 32.1, 33.6, 35.1]
  console.log(result.probabilities); // [25.0, 45.0, 20.0, 10.0]
  ```
