export function gaussianPDF(x: number, mean: number, variance: number): number {
  // Computes the probability density function of a Gaussian distribution
  return (
    (1 / Math.sqrt(2 * Math.PI * variance)) *
    Math.exp(-((x - mean) ** 2) / (2 * variance))
  );
}

export function kalmanFilterStep(
  priorState: number,
  priorVariance: number,
  measurement: number,
  measurementVariance: number,
  processVariance: number
): { newState: number; newVariance: number } {
  // Computes the Kalman filter update step
  const kalmanGain = priorVariance / (priorVariance + measurementVariance);
  const newState = priorState + kalmanGain * (measurement - priorState);
  const newVariance = (1 - kalmanGain) * priorVariance + processVariance;
  return { newState, newVariance };
}

export function gaussianWeight(distance: number, kappa: number): number {
  // Computes a Gaussian weight based on distance and kappa (scale factor)
  return Math.exp(-(distance ** 2) / kappa ** 2);
}

export function gaussianKernel(
  x1: number,
  x2: number,
  lengthScale: number = 1
): number {
  // Computes the Gaussian kernel (radial basis function) similarity between two points
  return Math.exp(-((x1 - x2) ** 2) / (2 * lengthScale ** 2));
}

export function gaussianNaiveBayes(
  mean: number[],
  variance: number[],
  x: number[]
): number {
  // Computes the likelihood of a sample x given Gaussian distributions for each feature
  return x.reduce(
    (product, xi, i) => product * gaussianPDF(xi, mean[i], variance[i]),
    1
  );
}

export function gaussianSmoothing(data: number[], sigma: number = 1): number[] {
  // Applies Gaussian smoothing to a 1D data array using a Gaussian kernel
  const kernelSize = Math.ceil(6 * sigma); // Define kernel size based on sigma
  const kernel = Array.from({ length: kernelSize }, (_, i) => {
    const x = i - Math.floor(kernelSize / 2);
    return gaussianPDF(x, 0, sigma ** 2);
  });
  const sum = kernel.reduce((a, b) => a + b, 0); // Normalize kernel values

  return data.map((_, index) => {
    let smoothedValue = 0;
    for (let j = 0; j < kernelSize; j++) {
      const dataIndex = index + j - Math.floor(kernelSize / 2);
      if (dataIndex >= 0 && dataIndex < data.length) {
        smoothedValue += data[dataIndex] * kernel[j];
      }
    }
    return smoothedValue / sum; // Normalize output value
  });
}

export function gaussianQuadrature(n: number): {
  nodes: number[];
  weights: number[];
} {
  // Computes Gaussian quadrature nodes and weights for numerical integration

  // Computes the Legendre polynomial of a given degree
  const legendrePolynomial = (x: number, degree: number): number => {
    if (degree === 0) return 1;
    if (degree === 1) return x;
    return (
      ((2 * degree - 1) * x * legendrePolynomial(x, degree - 1) -
        (degree - 1) * legendrePolynomial(x, degree - 2)) /
      degree
    );
  };

  // Computes the derivative of the Legendre polynomial
  const legendrePolynomialDerivative = (x: number, degree: number): number => {
    return (
      (degree / (x * x - 1)) *
      (x * legendrePolynomial(x, degree) - legendrePolynomial(x, degree - 1))
    );
  };

  // Finds roots of the Legendre polynomial, which are the quadrature nodes
  const findRoots = (degree: number): number[] => {
    const roots: number[] = [];
    const tolerance = 1e-10; // Convergence tolerance for Newton's method
    let root: number;

    for (let i = 1; i <= degree; i++) {
      // Initial approximation of root using a cosine formula
      root = Math.cos((Math.PI * (i - 0.25)) / (degree + 0.5));
      let delta = 1;
      // Refine root using Newton's method
      while (Math.abs(delta) > tolerance) {
        delta =
          legendrePolynomial(root, degree) /
          legendrePolynomialDerivative(root, degree);
        root -= delta;
      }
      roots.push(root);
    }
    return roots;
  };

  // Computes weights for Gaussian quadrature
  const calculateWeights = (nodes: number[], degree: number): number[] => {
    return nodes.map((node) => {
      const derivative = legendrePolynomialDerivative(node, degree);
      return 2 / ((1 - node * node) * derivative * derivative);
    });
  };

  // Compute nodes and weights for the given degree
  const nodes = findRoots(n);
  const weights = calculateWeights(nodes, n);

  return { nodes, weights };
}
