# Cubic Interpolation

This segment provides functions for a series of functions related to cubic interpolation, a technique used for estimating values between known data points in various dimensions.

### `cubicInterpolate(p: number[], x: number): number`

- **Description**: Performs cubic interpolation to estimate a value at a given point `x` based on four surrounding data points. This method provides smooth interpolation between points, commonly used in graphics and data visualization.
- **Inputs**:
  - `p` (array of numbers): An array of four data points, typically representing the surrounding points for interpolation.
  - `x` (number): The point at which the interpolation is calculated, typically between 0 and 1.
- **Outputs**:
  - The interpolated value at the given point `x`.
- **Example**:
  ```javascript
  import { cubicInterpolate } from "pulseflowjs";
  const value = cubicInterpolate([0, 1, 4, 9], 0.5); // 2.25
  ```

### `biCubicInterpolate(p: number[][], x: number, y: number): number`

- **Description**: Performs bi-cubic interpolation to estimate a value at the point `(x, y)` based on a 2D grid of four points. This method is commonly used in image scaling or when interpolating over two variables in 2D data.
- **Inputs**:
  - `p` (2D array of numbers): A 2D array representing the surrounding data points. Each sub-array contains four values, corresponding to a row of points in the grid.
  - `x` (number): The horizontal position between 0 and 1 within the grid.
  - `y` (number): The vertical position between 0 and 1 within the grid.
- **Outputs**:
  - The interpolated value at the point `(x, y)`.
- **Example**:
  ```javascript
  import { biCubicInterpolate } from "pulseflowjs";
  const value = biCubicInterpolate(
    [
      [0, 1, 4, 9],
      [0, 1, 4, 9],
      [0, 1, 4, 9],
      [0, 1, 4, 9],
    ],
    0.5,
    0.5
  ); // 2.25
  ```

### `triCubicInterpolate(p: number[][][], x: number, y: number, z: number): number`

- **Description**: Performs tri-cubic interpolation to estimate a value at the point `(x, y, z)` based on a 3D grid of four points. This method extends bi-cubic interpolation to three dimensions and is used in fields like 3D graphics or volumetric data interpolation.
- **Inputs**:
  - `p` (3D array of numbers): A 3D array representing the surrounding data points. Each element of the array corresponds to a 2D grid at a particular `z` slice.
  - `x` (number): The horizontal position between 0 and 1 within the grid.
  - `y` (number): The vertical position between 0 and 1 within the grid.
  - `z` (number): The depth position between 0 and 1 within the 3D grid.
- **Outputs**:
  - The interpolated value at the point `(x, y, z)`.
- **Example**:
  ```javascript
  import { triCubicInterpolate } from "pulseflowjs";
  const value = triCubicInterpolate(
    [
      [
        [0, 1, 4, 9],
        [0, 1, 4, 9],
        [0, 1, 4, 9],
        [0, 1, 4, 9],
      ],
      [
        [0, 1, 4, 9],
        [0, 1, 4, 9],
        [0, 1, 4, 9],
        [0, 1, 4, 9],
      ],
      [
        [0, 1, 4, 9],
        [0, 1, 4, 9],
        [0, 1, 4, 9],
        [0, 1, 4, 9],
      ],
    ],
    0.5,
    0.5,
    0.5
  ); // 2.25
  ```

### `nCubicInterpolate(n: number, p: number[], coordinates: number[]): number`

- **Description**: Performs n-dimensional cubic interpolation to estimate a value at a given set of coordinates. This method extends cubic interpolation to multiple dimensions by recursively applying lower-dimensional cubic interpolations.
- **Inputs**:
  - `n` (number): The number of dimensions for interpolation (1D, 2D, 3D, etc.).
  - `p` (array of numbers): The data points to interpolate, which should be an array of values.
  - `coordinates` (array of numbers): The coordinate values for each dimension where the interpolation is calculated. The length of this array should match the dimensionality `n`.
- **Outputs**:
  - The interpolated value at the given coordinates.
- **Example**:
  ```javascript
  import { nCubicInterpolate } from "pulseflowjs";
  const value = nCubicInterpolate(2, [0, 1, 4, 9], [0.5, 0.5]); // Interpolated value for 2D
  ```
