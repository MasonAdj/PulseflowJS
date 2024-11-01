# PulseFlowJS

**PulseFlowJS** is an npm package designed to handle various types of data interpolation techniques in TypeScript. This package currently includes implementations for Barnes Interpolation and Cubic Interpolation.

## Installation

To install the **PulseFlowJS** package, use the following command:

```bash
npm install pulseflowjs
```

Overview of Included Files
1. barnesInterpolation.ts
Description
The barnesInterpolation.ts file contains the implementation of the Barnes Interpolation algorithm. This method is used for spatial data analysis and can be utilized to interpolate data points based on a weighted distance approach. It is particularly beneficial for processing irregularly spaced data and creating smoother surfaces in data visualization.

Key Features
Applies the Barnes interpolation technique for spatial data smoothing.
Provides flexible configuration for the user to modify parameters, such as influence radii and convergence thresholds.
Efficiently handles both small and large datasets.

Usage Example
```typescript
import { barnesInterpolation } from 'pulseflowjs';

const dataPoints = [
  { x: 10, y: 15, value: 2.5 },
  { x: 20, y: 25, value: 3.5 },
];

const interpolatedGrid = barnesInterpolation(dataPoints, { radius: 5, iterations: 3 });
console.log(interpolatedGrid);
```

2. cubicInterpolation.ts
Description
The cubicInterpolation.ts file provides an implementation for Cubic Interpolation. This interpolation method is utilized for creating a smooth curve that passes through a set of data points, offering higher accuracy compared to linear interpolation. It’s ideal for applications where maintaining smooth transitions between points is essential, such as in animations, graphical rendering, and data analysis.

Key Features
Implements cubic spline interpolation for smooth data transition.
Supports multi-dimensional data arrays for more complex interpolation requirements.
Customizable boundary conditions and coefficients to suit varied application needs.

Usage Example
```typescript
import { cubicInterpolation } from 'pulseflowjs';

// Example usage for cubic interpolation
const dataPoints = [0, 1, 4, 9, 16, 25]; // y-values corresponding to x-values

const interpolatedValue = cubicInterpolation(dataPoints, 2.5); // interpolate at x = 2.5
console.log(interpolatedValue);
```
