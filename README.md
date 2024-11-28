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

### 1. **Gaussian Algorithms**

- **Gaussian Distribution**: Functions to work with Gaussian (normal) distributions, including calculating the probability density function (PDF), kernel functions, and weighted values.
- **Kalman Filtering**: Implements the Kalman filter, a method used for estimation in the presence of noise, with updates to state estimates based on measurements.
- **Gaussian Smoothing & Naive Bayes**: Methods for smoothing data with Gaussian kernels and calculating likelihoods using the Gaussian Naive Bayes model.

### 2. **Map Distances**

- **Haversine Distance**: A function to calculate the shortest distance between two points on the Earth's surface, based on latitude and longitude.
- **Random Point Generation**: Methods to generate random points within a specific radius from a given geographical location.
- **Standard Deviation of Distances**: Functions to calculate the standard deviation of distances between points and assess the spatial distribution of data.
- **Probability Boundaries**: Tools for calculating the probabilities within certain distance boundaries, based on standard deviation.

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

## Installation

To install PulseFlowJS, use npm:

```bash
npm install pulseflowjs
```
