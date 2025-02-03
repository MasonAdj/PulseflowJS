# PulseFlowJS Library

PulseFlowJS is a JavaScript library designed to provide a suite of advanced algorithms and mathematical tools for working with data. It includes functions for statistical analysis, spatial interpolation, and various techniques commonly used in data science, machine learning, and meteorological applications. The library aims to make complex calculations more accessible with easy-to-use, well-documented functions.

## Features

The PulseFlowJS library includes the following core functionality:

### Table of Contents

- [Gaussian Algorithms](gaussianAlgorithms.md)
- [Map Distances](mapDistances.md)
- [Cubic Interpolation](cubicInterpolation.md)
- [Barnes Interpolation](barnesInterpolation.md)
- [Unit Conversions](unitConversions.md)
- [Edge Detection](edgeDetection.md)
- [Binary Search](searchAndSorting.md)

### 1. **Gaussian Algorithms**

- **Gaussian Distribution**: Functions to work with Gaussian (normal) distributions, including calculating the probability density function (PDF), kernel functions, and weighted values.
- **Kalman Filtering**: Implements the Kalman filter, a method used for estimation in the presence of noise, with updates to state estimates based on measurements.
- **Gaussian Smoothing & Naive Bayes**: Methods for smoothing data with Gaussian kernels and calculating likelihoods using the Gaussian Naive Bayes model.

### 2. **Map Distances**

- **Haversine Distance**: A function to calculate the shortest distance between two points on the Earth's surface, based on latitude and longitude.
- **Random Point Generation**: Methods to generate random points within a specific radius from a given geographical location.
- **Standard Deviation of Distances**: Functions to calculate the standard deviation of distances between points and assess the spatial distribution of data.
- **Probability Boundaries**: Tools for calculating the probabilities within certain distance boundaries, based on standard deviation.
- **Get Azimuth**: Calculates the initial bearing (azimuth) in degrees from one geographic point to another.

### 3. **Cubic Interpolation**

- **Cubic Interpolation**: Provides interpolation methods for estimating values between data points in 1D, 2D, 3D, and n-dimensional spaces. These methods offer smooth, continuous transitions between points.
- **Multi-dimensional Interpolation**: Extends cubic interpolation to multiple dimensions, such as bi-cubic (2D), tri-cubic (3D), and n-dimensional cubic interpolation, useful for complex data analysis in fields like graphics and volumetric data.

### 4. **Barnes Interpolation**

- **Wind Vector Analysis**: Tools for converting wind speed and direction into their orthogonal U and V components for meteorological analysis.
- **Barnes Interpolation**: A method to estimate wind vector components at unknown points based on surrounding known data, applying Gaussian smoothing to ensure more accurate and smooth estimates.
- **Barnes Grid Generation**: Methods to create a grid of interpolated wind data, providing wind speed and direction estimates over a defined geographic area.

### 5. **Unit Conversions**

PulseFlowJS provides an extensive set of unit conversion functions across multiple categories, making it easier to work with various units commonly used in scientific and engineering applications. These conversions cover:

- **Length**: Kilometers to miles, meters to feet, etc.
- **Speed**: Miles per hour to kilometers per hour, knots to kph, etc.
- **Temperature**: Celsius to Fahrenheit, Kelvin to Celsius, etc.
- **Weight**: Kilograms to pounds, pounds to kilograms.
- **Distance**: Meters to feet, feet to meters.
- **Area**: Square meters to square feet, square feet to square meters.
- **Volume**: Liters to gallons, gallons to liters.
- **Math**: Degrees to radians, radians to degrees, and more.

These unit conversion functions ensure that data can be easily transformed to the required units for use in other algorithms or applications.

### 6. **Edge Detection for PPM and Canvas ImageData**

- **Versatile Edge Detection**: Supports both P6 PPM image data (Uint8Array) and Canvas ImageData (RGBA), providing flexibility for various image processing workflows.
- **Sobel Operator Implementation**: Uses the Sobel edge detection method to compute gradients and identify edges in grayscale-converted images.
- **Optional Thresholding**: Allows users to apply a binary threshold to edge intensities, ensuring a clear distinction between edges and non-edges.
- **Canvas Integration**: Returns an ImageData object when processing canvas images, making it easy to visualize edges directly in a `<canvas>`.
- **PPM Compatibility**: Maintains support for raw PPM image formats, converting them to grayscale and outputting edge-detected PPM data in the same format.

### 7. **Binary Search**

The Comparator type and associated functions provide a robust mechanism for comparing values and performing binary searches within sorted arrays. The defaultComparator function offers out-of-the-box support for numbers and strings, while the binarySearchIterative and binarySearchRecursive functions enable efficient searching, returning all indices of a target value within the array.

- **Comparator Functionality**: Provides a generic comparator type and a default comparator for sorting and searching operations on numbers and strings.

- **Iterative Binary Search**: Efficiently searches for target values in sorted arrays using an iterative approach, returning all matching indices.

- **Recursive Binary Search**: Implements a recursive binary search to locate target values in sorted arrays, ensuring full coverage of duplicate values.

## Installation

To install PulseFlowJS, use npm:

```bash
npm install pulseflowjs
```

## Contributions

To contribute to Pulseflowjs, follow our contributions guide below:

- [Contributions Guide](contributions.md)