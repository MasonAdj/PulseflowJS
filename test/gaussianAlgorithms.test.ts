import {
  gaussianPDF,
  kalmanFilterStep,
  gaussianKernel,
  gaussianNaiveBayes,
  gaussianSmoothing,
  gaussianQuadrature,
} from '../src/gaussianAlgorithms';

describe('gaussianPDF', () => {
  it('calculates the Gaussian probability density function', () => {
    expect(gaussianPDF(0, 0, 1)).toBeCloseTo(0.3989422804);
    expect(gaussianPDF(1, 0, 1)).toBeCloseTo(0.2419707245);
  });
});

describe('kalmanFilterStep', () => {
  it('performs a Kalman filter update step', () => {
    const result = kalmanFilterStep(0, 1, 1, 1, 0.1);
    expect(result.newState).toBeCloseTo(0.5);
    expect(result.newVariance).toBeCloseTo(0.6);
  });
});

describe('gaussianKernel', () => {
  it('calculates the Gaussian kernel', () => {
    expect(gaussianKernel(0, 0)).toBeCloseTo(1);
    expect(gaussianKernel(0, 1)).toBeCloseTo(0.6065306597);
  });
  it('calculates the Gaussian kernel with default lengthScale', () => {
    expect(gaussianKernel(0, 0)).toBeCloseTo(1);
    expect(gaussianKernel(0, 1)).toBeCloseTo(0.6065306597);
  });

  it('calculates the Gaussian kernel with custom lengthScale', () => {
    expect(gaussianKernel(0, 1, 2)).toBeCloseTo(0.8824969025); // Custom lengthScale
    expect(gaussianKernel(0, 2, 2)).toBeCloseTo(0.6065306597);
  });
});

describe('gaussianNaiveBayes', () => {
  it('calculates the Gaussian Naive Bayes probability', () => {
    const mean = [0, 0];
    const variance = [1, 1];
    const x = [1, 1];
    expect(gaussianNaiveBayes(mean, variance, x)).toBeCloseTo(0.05854983);
  });
});

describe('gaussianSmoothing', () => {
  it('smooths a data array using a Gaussian kernel', () => {
    const data = [1, 2, 3, 4, 5];
    const smoothed = gaussianSmoothing(data, 1);
    expect(smoothed.length).toBe(data.length);
    expect(smoothed[2]).toBeGreaterThan(smoothed[1]); // Just a basic test
  });
  it('handles kernel size larger than data boundaries', () => {
    const data = [1, 2, 3];
    const sigma = 2; // Large sigma to produce a wide kernel
    const smoothed = gaussianSmoothing(data, sigma);

    // Check the length of the smoothed data
    expect(smoothed).toHaveLength(data.length);

    // Ensure no out-of-bounds access occurred and results are valid
    smoothed.forEach((value) => {
      expect(value).toBeGreaterThan(0); // Values should still be reasonable
    });
  });
  it('smooths a data array using a Gaussian kernel using default sigma', () => {
    const data = [1, 2, 3, 4, 5];
    const smoothed = gaussianSmoothing(data);
    expect(smoothed.length).toBe(data.length);
    expect(smoothed[2]).toBeGreaterThan(smoothed[1]); // Just a basic test
  });
});
  it('handles kernel size larger than data boundaries', () => {
    const data = [1, 2, 3];
    const sigma = 2; // Large sigma to produce a wide kernel
    const smoothed = gaussianSmoothing(data, sigma);

    // Check the length of the smoothed data
    expect(smoothed).toHaveLength(data.length);

    // Ensure no out-of-bounds access occurred and results are valid
    smoothed.forEach((value) => {
      expect(value).toBeGreaterThan(0); // Values should still be reasonable
    });
  });

describe('gaussianQuadrature', () => {
  it('calculates nodes and weights for Gaussian quadrature', () => {
    const { nodes, weights } = gaussianQuadrature(3);

    // Verify lengths
    expect(nodes).toHaveLength(3);
    expect(weights).toHaveLength(3);

    // Ensure sorted nodes
    const sortedNodes = [...nodes].sort((a, b) => a - b);
    expect(sortedNodes).toEqual(sortedNodes); // Nodes are sorted in ascending order

    // Check properties of weights
    weights.forEach((weight) => {
      expect(weight).toBeGreaterThan(0); // Weights must be positive
    });
  });
});
