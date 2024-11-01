import {
  haversineDistance,
  gaussianWeight,
  windToComponents,
  barnesInterpolation,
  toRadians,
} from "./src/barnesInterpolation";

// Marker data with wind speed, angle, and typed coordinates within Savannah, Georgia
const testData = [
  {
    coords: [32.096, -81.095] as [number, number],
    name: "Sensor Tower 5",
    speed: 22,
    angle: 358,
  },
  {
    coords: [32.095, -81.12] as [number, number],
    name: "Sensor Tower 6",
    speed: 28,
    angle: 345,
  },
  {
    coords: [32.093, -81.085] as [number, number],
    name: "Sensor Tower 14",
    speed: 24,
    angle: 348,
  },
  {
    coords: [32.0915, -81.111] as [number, number],
    name: "Sensor Tower 20",
    speed: 280,
    angle: 347,
  },
  {
    coords: [32.09, -81.13] as [number, number],
    name: "Sensor Tower 10",
    speed: 26,
    angle: 345,
  },
  {
    coords: [32.0865, -81.106] as [number, number],
    name: "Sensor Tower 17",
    speed: 21,
    angle: 340,
  },
  {
    coords: [32.085, -81.08] as [number, number],
    name: "Sensor Tower 9",
    speed: 21,
    angle: 337,
  },
  {
    coords: [32.0835, -81.0998] as [number, number],
    name: "Sensor Tower 1",
    speed: 24,
    angle: 349,
  },
  {
    coords: [32.082, -81.118] as [number, number],
    name: "Sensor Tower 15",
    speed: 27,
    angle: 350,
  },
  {
    coords: [32.0785, -81.135] as [number, number],
    name: "Sensor Tower 13",
    speed: 25,
    angle: 330,
  },
  {
    coords: [32.0765, -81.11] as [number, number],
    name: "Sensor Tower 11",
    speed: 23,
    angle: 353,
  },
  {
    coords: [32.0745, -81.089] as [number, number],
    name: "Sensor Tower 16",
    speed: 26,
    angle: 343,
  },
  {
    coords: [32.075, -81.127] as [number, number],
    name: "Sensor Tower 19",
    speed: 20,
    angle: 325,
  },
  {
    coords: [32.0725, -81.07] as [number, number],
    name: "Sensor Tower 7",
    speed: 25,
    angle: 300,
  },
  {
    coords: [32.07, -81.12] as [number, number],
    name: "Sensor Tower 2",
    speed: 26,
    angle: 345,
  },
  {
    coords: [32.0675, -81.098] as [number, number],
    name: "Sensor Tower 18",
    speed: 24,
    angle: 320,
  },
  {
    coords: [32.066, -81.113] as [number, number],
    name: "Sensor Tower 12",
    speed: 22,
    angle: 297,
  },
  {
    coords: [32.065, -81.06] as [number, number],
    name: "Sensor Tower 23",
    speed: 24,
    angle: 310,
  },
  {
    coords: [32.063, -81.07] as [number, number],
    name: "Sensor Tower 24",
    speed: 23,
    angle: 300,
  },
  {
    coords: [32.062, -81.088] as [number, number],
    name: "Sensor Tower 3",
    speed: 23,
    angle: 305,
  },
  {
    coords: [32.06, -81.1] as [number, number],
    name: "Sensor Tower 8",
    speed: 20,
    angle: 294,
  },
  {
    coords: [32.06, -81.055] as [number, number],
    name: "Sensor Tower 27",
    speed: 27,
    angle: 290,
  },
  {
    coords: [32.058, -81.105] as [number, number],
    name: "Sensor Tower 4",
    speed: 27,
    angle: 300,
  },
  {
    coords: [32.057, -81.08] as [number, number],
    name: "Sensor Tower 25",
    speed: 21,
    angle: 315,
  },
  {
    coords: [32.055, -81.05] as [number, number],
    name: "Sensor Tower 22",
    speed: 26,
    angle: 294,
  },
  {
    coords: [32.052, -81.065] as [number, number],
    name: "Sensor Tower 26",
    speed: 25,
    angle: 307,
  },
  {
    coords: [32.05, -81.06] as [number, number],
    name: "Sensor Tower 21",
    speed: 22,
    angle: 290,
  },
];
describe("wind-related calculations", () => {
  it("should correctly convert degrees to radians", () => {
    let result = toRadians(testData[0].angle);
    //This is the number I got from my calculator, the received data adds more decimal points than I had, so I used toBeCloseTo
    expect(result).toBeCloseTo(6.24827872214);
  });

  it("should correctly convert wind speed and direction to U and V components", () => {
    testData.forEach((marker) => {
      const { speed, angle } = marker;
      const { U, V } = windToComponents(speed, angle);

      // Verify U and V components using expected trigonometric transformations
      expect(U).toBeCloseTo(speed * Math.sin(toRadians(angle)));
      expect(V).toBeCloseTo(speed * Math.cos(toRadians(angle)));
    });
  });

  it("should correctly convert wind speed and direction to U and V components compared to manually calculated values", () => {
    const { U, V } = windToComponents(testData[0].speed, testData[0].angle);
    // These are the numbers I got from my calculator, the received data adds more decimal points than I had, so I used toBeCloseTo
    expect(U).toBeCloseTo(-0.76778892744);
    expect(V).toBeCloseTo(21.9865981944);
  });

  it("should calculate the correct distances between marker pairs", () => {
    const [marker1, marker2] = [testData[0], testData[1]];
    const distance = haversineDistance(
      marker1.coords[0],
      marker1.coords[1],
      marker2.coords[0],
      marker2.coords[1]
    );

    //This is the number I got from my calculator, the received data adds more decimal points than I had, so I used toBeCloseTo
    expect(distance).toBeCloseTo(2.4, 1);
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
      const radianAngle = toRadians(point.directionDegrees);
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

        const radianAngle = toRadians(point.directionDegrees);
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

        const radianAngle = toRadians(point.directionDegrees);
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

        const radianAngle = toRadians(point.directionDegrees);
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

        const radianAngle = toRadians(point.directionDegrees);
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
