# Barnes Interpolation

This segment provides functions for a series of functions that implement Barnes interpolation for wind speed and direction data. 

### `windToComponents(speedKnots: number, directionDegrees: number): { U: number; V: number }`

- **Description**: Converts wind speed and direction (in knots and degrees) into its U (East-West) and V (North-South) components. This is useful in meteorology and navigation to break down wind vectors into orthogonal components.
- **Inputs**:
  - `speedKnots` (number): The wind speed in knots.
  - `directionDegrees` (number): The wind direction in degrees (measured clockwise from North).
- **Outputs**:
  - An object containing:
    - `U` (number): The East-West component of the wind vector.
    - `V` (number): The North-South component of the wind vector.
- **Example**:
  ```javascript
  import { windToComponents } from "pulseflowjs";
  const { U, V } = windToComponents(10, 45); // U: 7.071, V: 7.071
  ```

### `barnesInterpolation(

knownPoints: { lat: number; lon: number; speedKnots: number; directionDegrees: number }[],
targetLat: number,
targetLon: number,
kappa: number,
passes: number = 1
): { U: number; V: number }`

- **Description**: Performs Barnes interpolation to estimate the U (East-West) and V (North-South) wind components at a target point, based on known wind speed and direction data points. This method uses a weighted average of nearby points, with smoothing applied using a Gaussian weight function.
- **Inputs**:
  - `knownPoints` (array of objects): A list of known points, where each object contains:
    - `lat` (number): Latitude of the known point.
    - `lon` (number): Longitude of the known point.
    - `speedKnots` (number): Wind speed in knots at the known point.
    - `directionDegrees` (number): Wind direction in degrees at the known point (measured clockwise from North).
  - `targetLat` (number): Latitude of the target point where interpolation is performed.
  - `targetLon` (number): Longitude of the target point where interpolation is performed.
  - `kappa` (number): Smoothing parameter that controls the influence of distant points (higher values result in smoother interpolation).
  - `passes` (number, optional): The number of refinement passes to perform. Defaults to 1.
- **Outputs**:
  - An object containing:
    - `U` (number): The interpolated East-West component of the wind at the target point.
    - `V` (number): The interpolated North-South component of the wind at the target point.
- **Example**:
  ```javascript
  import { barnesInterpolation } from "pulseflowjs";
  const knownPoints = [
    { lat: 52.2296756, lon: 21.0122287, speedKnots: 10, directionDegrees: 45 },
    { lat: 52.2306756, lon: 21.0132287, speedKnots: 12, directionDegrees: 90 },
  ];
  const { U, V } = barnesInterpolation(knownPoints, 52.23, 21.013, 1.5, 2);
  console.log(U, V); // Interpolated U and V components
  ```

### `barnesGrid(

knownPoints: { lat: number; lon: number; speedKnots: number; directionDegrees: number }[],
gridBounds: { minLat: number; minLon: number; maxLat: number; maxLon: number },
gridSizeKm: number,
kappa: number,
passes: number
): BarnesGridPoint[]`

- **Description**: Generates a grid of interpolated wind speed and direction values over a specified area using Barnes interpolation. The grid points are created by interpolating known wind data at various points within the specified grid bounds and size.
- **Inputs**:
  - `knownPoints` (array of objects): A list of known data points containing:
    - `lat` (number): Latitude of the known point.
    - `lon` (number): Longitude of the known point.
    - `speedKnots` (number): Wind speed at the known point, in knots.
    - `directionDegrees` (number): Wind direction at the known point, in degrees (measured clockwise from North).
  - `gridBounds` (object): Defines the bounding box of the grid, with properties:
    - `minLat` (number): Minimum latitude of the grid.
    - `minLon` (number): Minimum longitude of the grid.
    - `maxLat` (number): Maximum latitude of the grid.
    - `maxLon` (number): Maximum longitude of the grid.
  - `gridSizeKm` (number): The size of each grid cell in kilometers.
  - `kappa` (number): Smoothing parameter used in Barnes interpolation.
  - `passes` (number): Number of refinement passes for Barnes interpolation.
- **Outputs**:
  - An array of `BarnesGridPoint` objects, each containing:
    - `coords` (array of numbers): The latitude and longitude of the grid point.
    - `speed` (number): The interpolated wind speed at the grid point, calculated from the U and V components.
    - `angle` (number): The interpolated wind direction at the grid point, in degrees.
- **Example**:
  ```javascript
  import { barnesGrid } from "pulseflowjs";
  const knownPoints = [
    { lat: 52.2296756, lon: 21.0122287, speedKnots: 10, directionDegrees: 45 },
    { lat: 52.2306756, lon: 21.0132287, speedKnots: 12, directionDegrees: 90 },
  ];
  const gridBounds = { minLat: 52.0, minLon: 21.0, maxLat: 53.0, maxLon: 22.0 };
  const grid = barnesGrid(knownPoints, gridBounds, 50, 1.5, 2);
  console.log(grid); // Array of grid points with wind speed and direction
  ```
