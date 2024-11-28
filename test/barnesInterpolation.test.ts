import {
  windToComponents,
  barnesInterpolation,
  barnesGrid,
} from "../src/barnesInterpolation";
import { degreesToRadians } from "../src/unitConversion";
import { haversineDistance } from "../src/mapDistances";
import { testData } from "./testData";
import { gaussianWeight } from "../src/gaussianAlgorithms";

describe("wind-related calculations", () => {
  it("should correctly convert wind speed and direction to U and V components compared to manually calculated values", () => {
    const { U, V } = windToComponents(testData[0].speed, testData[0].angle);
    // These are the numbers I got from my calculator, the received data adds more decimal points than I had, so I used toBeCloseTo
    expect(U).toBeCloseTo(-0.76778892744);
    expect(V).toBeCloseTo(21.9865981944);
  });

  it("should calculate accurate Gaussian weights based on distances", () => {
    const [lat, lon] = testData[0].coords; // Destructure coords into lat and lon
    const target = { lat: 32.09, lon: -81.12 };
    const distance = haversineDistance(lat, lon, target.lat, target.lon);
    const weight = gaussianWeight(distance, 3);
    expect(weight).toBeGreaterThan(0.3); // Check if the weight is within a reasonable range
    expect(weight).toBeLessThanOrEqual(1);
  });

  it("should interpolate wind vectors at specific target points", () => {
    const targetLat = 32.085;
    const targetLon = -81.105;
    const kappa = 3;

    // Map testData to match the structure expected by barnesInterpolation
    const formattedData = testData.map(({ coords, speed, angle }) => ({
      lat: coords[0],
      lon: coords[1],
      speedKnots: speed,
      directionDegrees: angle,
    }));

    // Calculate expected U and V components manually
    let sumWeightedU = 0;
    let sumWeightedV = 0;
    let sumWeights = 0;

    formattedData.forEach((point) => {
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
      const radianAngle = degreesToRadians(point.directionDegrees);
      const U = point.speedKnots * Math.sin(radianAngle); // East-West component
      const V = point.speedKnots * Math.cos(radianAngle); // North-South component

      // Update weighted sum of U and V components and total weight
      sumWeightedU += U * weight;
      sumWeightedV += V * weight;
      sumWeights += weight;
    });

    const expectedU = sumWeightedU / sumWeights;
    const expectedV = sumWeightedV / sumWeights;

    // Calculate interpolated wind vector using barnesInterpolation
    const { U, V } = barnesInterpolation(
      formattedData,
      targetLat,
      targetLon,
      kappa,
      1
    );

    // Compare the function's output to the calculated expected values
    expect(U).toBeCloseTo(expectedU, 2); // Allow small margin for floating-point precision
    expect(V).toBeCloseTo(expectedV, 2);
  });

  it("should interpolate wind vectors with multiple passes for refinement", () => {
    const targetLat = 32.085;
    const targetLon = -81.105;
    const kappa = 3;
    const passes = 3;

    // Map testData to match the structure expected by barnesInterpolation
    const formattedData = testData.map(({ coords, speed, angle }) => ({
      lat: coords[0],
      lon: coords[1],
      speedKnots: speed,
      directionDegrees: angle,
    }));

    // Perform manual multi-pass interpolation to get the expected result
    let interpolatedU = 0;
    let interpolatedV = 0;

    for (let pass = 0; pass < passes; pass++) {
      let sumWeightedU = 0;
      let sumWeightedV = 0;
      let sumWeights = 0;

      formattedData.forEach((point) => {
        const distance = haversineDistance(
          point.lat,
          point.lon,
          targetLat,
          targetLon
        );
        const weight = gaussianWeight(distance, kappa);

        const radianAngle = degreesToRadians(point.directionDegrees);
        const U = point.speedKnots * Math.sin(radianAngle);
        const V = point.speedKnots * Math.cos(radianAngle);

        sumWeightedU += U * weight;
        sumWeightedV += V * weight;
        sumWeights += weight;
      });

      interpolatedU = sumWeightedU / sumWeights;
      interpolatedV = sumWeightedV / sumWeights;
    }

    const { U, V } = barnesInterpolation(
      formattedData,
      targetLat,
      targetLon,
      kappa,
      passes
    );

    // Compare the function's output to the manually calculated expected values
    expect(U).toBeCloseTo(interpolatedU, 2);
    expect(V).toBeCloseTo(interpolatedV, 2);
  });

  it("should work when passes is set to 0", () => {
    const targetLat = 32.085;
    const targetLon = -81.105;
    const kappa = 3;
    const passes = 1;

    // Map testData to match the structure expected by barnesInterpolation
    const formattedData = testData.map(({ coords, speed, angle }) => ({
      lat: coords[0],
      lon: coords[1],
      speedKnots: speed,
      directionDegrees: angle,
    }));

    // Perform manual multi-pass interpolation to get the expected result
    let interpolatedU = 0;
    let interpolatedV = 0;

    for (let pass = 0; pass < passes; pass++) {
      let sumWeightedU = 0;
      let sumWeightedV = 0;
      let sumWeights = 0;

      formattedData.forEach((point) => {
        const distance = haversineDistance(
          point.lat,
          point.lon,
          targetLat,
          targetLon
        );
        const weight = gaussianWeight(distance, kappa);

        const radianAngle = degreesToRadians(point.directionDegrees);
        const U = point.speedKnots * Math.sin(radianAngle);
        const V = point.speedKnots * Math.cos(radianAngle);

        sumWeightedU += U * weight;
        sumWeightedV += V * weight;
        sumWeights += weight;
      });

      interpolatedU = sumWeightedU / sumWeights;
      interpolatedV = sumWeightedV / sumWeights;
    }

    const { U, V } = barnesInterpolation(
      formattedData,
      targetLat,
      targetLon,
      kappa,
      0
    );

    // Compare the function's output to the manually calculated expected values
    expect(U).toBeCloseTo(interpolatedU, 2);
    expect(V).toBeCloseTo(interpolatedV, 2);
  });

  it("should work when passes is set to -1", () => {
    const targetLat = 32.085;
    const targetLon = -81.105;
    const kappa = 3;
    const passes = 1;

    // Map testData to match the structure expected by barnesInterpolation
    const formattedData = testData.map(({ coords, speed, angle }) => ({
      lat: coords[0],
      lon: coords[1],
      speedKnots: speed,
      directionDegrees: angle,
    }));

    // Perform manual multi-pass interpolation to get the expected result
    let interpolatedU = 0;
    let interpolatedV = 0;

    for (let pass = 0; pass < passes; pass++) {
      let sumWeightedU = 0;
      let sumWeightedV = 0;
      let sumWeights = 0;

      formattedData.forEach((point) => {
        const distance = haversineDistance(
          point.lat,
          point.lon,
          targetLat,
          targetLon
        );
        const weight = gaussianWeight(distance, kappa);

        const radianAngle = degreesToRadians(point.directionDegrees);
        const U = point.speedKnots * Math.sin(radianAngle);
        const V = point.speedKnots * Math.cos(radianAngle);

        sumWeightedU += U * weight;
        sumWeightedV += V * weight;
        sumWeights += weight;
      });

      interpolatedU = sumWeightedU / sumWeights;
      interpolatedV = sumWeightedV / sumWeights;
    }

    const { U, V } = barnesInterpolation(
      formattedData,
      targetLat,
      targetLon,
      kappa,
      -1
    );

    // Compare the function's output to the manually calculated expected values
    expect(U).toBeCloseTo(interpolatedU, 2);
    expect(V).toBeCloseTo(interpolatedV, 2);
  });

  it("should do 1 pass even when a pass number is not supplied", () => {
    const targetLat = 32.085;
    const targetLon = -81.105;
    const kappa = 3;
    const passes = 3;

    // Map testData to match the structure expected by barnesInterpolation
    const formattedData = testData.map(({ coords, speed, angle }) => ({
      lat: coords[0],
      lon: coords[1],
      speedKnots: speed,
      directionDegrees: angle,
    }));

    // Perform manual multi-pass interpolation to get the expected result
    let interpolatedU = 0;
    let interpolatedV = 0;

    for (let pass = 0; pass < passes; pass++) {
      let sumWeightedU = 0;
      let sumWeightedV = 0;
      let sumWeights = 0;

      formattedData.forEach((point) => {
        const distance = haversineDistance(
          point.lat,
          point.lon,
          targetLat,
          targetLon
        );
        const weight = gaussianWeight(distance, kappa);

        const radianAngle = degreesToRadians(point.directionDegrees);
        const U = point.speedKnots * Math.sin(radianAngle);
        const V = point.speedKnots * Math.cos(radianAngle);

        sumWeightedU += U * weight;
        sumWeightedV += V * weight;
        sumWeights += weight;
      });

      interpolatedU = sumWeightedU / sumWeights;
      interpolatedV = sumWeightedV / sumWeights;
    }

    const { U, V } = barnesInterpolation(
      formattedData,
      targetLat,
      targetLon,
      kappa
    );

    // Compare the function's output to the manually calculated expected values
    expect(U).toBeCloseTo(interpolatedU, 2);
    expect(V).toBeCloseTo(interpolatedV, 2);
  });
});

describe("barnesGrid function", () => {
  it("should generate a grid of interpolated wind vectors", () => {
    const gridBounds = {
      minLat: 32.05,
      minLon: -81.13,
      maxLat: 32.1,
      maxLon: -81.05,
    };

    const gridSizeKm = 5; // Grid spacing of 5 km
    const kappa = 2; // Smoothing parameter
    const passes = 1; // Single interpolation pass

    const result = barnesGrid(
      testData.map(({ coords, speed, angle }) => ({
        lat: coords[0],
        lon: coords[1],
        speedKnots: speed,
        directionDegrees: angle,
      })),
      gridBounds,
      gridSizeKm,
      kappa,
      passes
    );

    // Validate the grid size
    const expectedGridPoints =
      Math.ceil((gridBounds.maxLat - gridBounds.minLat) / (gridSizeKm / 111)) *
      Math.ceil((gridBounds.maxLon - gridBounds.minLon) / (gridSizeKm / 111));
    expect(result).toHaveLength(expectedGridPoints);

    // Check a few properties of grid points
    result.forEach((point) => {
      expect(point).toHaveProperty("coords");
      expect(point).toHaveProperty("speed");
      expect(point).toHaveProperty("angle");
      expect(point.coords[0]).toBeGreaterThanOrEqual(gridBounds.minLat);
      expect(point.coords[0]).toBeLessThanOrEqual(gridBounds.maxLat);
      expect(point.coords[1]).toBeGreaterThanOrEqual(gridBounds.minLon);
      expect(point.coords[1]).toBeLessThanOrEqual(gridBounds.maxLon);
    });

    // Validate specific points (for known behavior)
    const firstPoint = result[0];
    expect(firstPoint.coords[0]).toBeCloseTo(gridBounds.minLat, 5);
    expect(firstPoint.coords[1]).toBeCloseTo(gridBounds.minLon, 5);
    expect(firstPoint.speed).toBeGreaterThan(0);
    expect(firstPoint.angle).toBeGreaterThanOrEqual(0);
    expect(firstPoint.angle).toBeLessThan(360);
  });

  it("should handle cases with no input points", () => {
    const gridBounds = {
      minLat: 32.05,
      minLon: -81.13,
      maxLat: 32.1,
      maxLon: -81.05,
    };

    const gridSizeKm = 5;
    const kappa = 2;
    const passes = 1;

    const result = barnesGrid([], gridBounds, gridSizeKm, kappa, passes);
    expect(result[0].angle).toBeNaN();
    expect(result[0].speed).toBeNaN()
  });

  it("should handle a single input point", () => {
    const gridBounds = {
      minLat: 32.05,
      minLon: -81.13,
      maxLat: 32.1,
      maxLon: -81.05,
    };

    const gridSizeKm = 5;
    const kappa = 2;
    const passes = 1;

    const singlePoint = [
      {
        lat: 32.09,
        lon: -81.12,
        speedKnots: 26,
        directionDegrees: 345,
      },
    ];

    const result = barnesGrid(
      singlePoint,
      gridBounds,
      gridSizeKm,
      kappa,
      passes
    );
    expect(result).not.toHaveLength(0);

    result.forEach((point) => {
      expect(point.speed).toBeGreaterThan(0);
      expect(point.angle).toBeGreaterThanOrEqual(0);
      expect(point.angle).toBeLessThan(360);
    });
  });
});
