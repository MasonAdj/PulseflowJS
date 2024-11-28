# Gaussian Algorithms

This segment provides functions for a collection of functions that implement various Gaussian-based algorithms and statistical methods. These functions cover a range of topics commonly used in data science, machine learning, and statistical analysis.

### `gaussianPDF(x: number, mean: number, variance: number): number`

- **Description**: Computes the value of the probability density function (PDF) for a Gaussian (normal) distribution at a given point `x`, with a specified mean and variance.
- **Inputs**:
  - `x` (number): The point at which the PDF is evaluated.
  - `mean` (number): The mean (average) of the distribution.
  - `variance` (number): The variance of the distribution.
- **Outputs**:
  - The value of the Gaussian PDF at the point `x`.
- **Example**:
  ```javascript
  import { gaussianPDF } from "pulseflowjs";
  const pdfValue = gaussianPDF(2, 0, 1); // 0.05399096651318806
  ```

### `kalmanFilterStep(

priorState: number,
priorVariance: number,
measurement: number,
measurementVariance: number,
processVariance: number
): { newState: number; newVariance: number }`

- **Description**: Performs a single step of the Kalman filter algorithm, updating the state estimate and its variance based on the prior state, prior variance, measurement, measurement variance, and process variance.
- **Inputs**:
  - `priorState` (number): The prior state estimate.
  - `priorVariance` (number): The prior variance of the state estimate.
  - `measurement` (number): The new measurement to incorporate.
  - `measurementVariance` (number): The variance of the measurement.
  - `processVariance` (number): The process variance, which models the uncertainty in the state dynamics.
- **Outputs**:
  - An object containing:
    - `newState` (number): The updated state estimate after incorporating the measurement.
    - `newVariance` (number): The updated variance of the state estimate.
- **Example**:
  ```javascript
  import { kalmanFilterStep } from "pulseflowjs";
  const { newState, newVariance } = kalmanFilterStep(50, 10, 55, 5, 1);
  // newState: 53.162, newVariance: 8.5106
  ```

### `gaussianWeight(distance: number, kappa: number): number`

- **Description**: Computes the weight using a Gaussian function based on the distance and a given parameter `kappa`. The weight decreases as the square of the distance increases, controlled by `kappa`.
- **Inputs**:
  - `distance` (number): The distance between two points.
  - `kappa` (number): A parameter that controls the spread of the Gaussian function.
- **Outputs**:
  - The computed weight based on the Gaussian function.
- **Example**:
  ```javascript
  import { gaussianWeight } from "pulseflowjs";
  const weight = gaussianWeight(10, 2); // 0.01831563888873418
  ```

### `gaussianKernel(x1: number, x2: number, lengthScale: number = 1): number`

- **Description**: Computes the Gaussian kernel (similarity) between two values `x1` and `x2`, based on a given `lengthScale` parameter. The Gaussian kernel is commonly used in machine learning, especially in support vector machines and Gaussian processes.
- **Inputs**:
  - `x1` (number): The first value.
  - `x2` (number): The second value.
  - `lengthScale` (number, optional): A parameter that controls the width of the Gaussian. Defaults to `1`.
- **Outputs**:
  - The computed similarity (kernel value) between `x1` and `x2` using the Gaussian function.
- **Example**:
  ```javascript
  import { gaussianKernel } from "pulseflowjs";
  const similarity = gaussianKernel(5, 10, 2); // 0.6065306597126334
  ```

### `gaussianNaiveBayes(mean: number[], variance: number[], x: number[]): number`

- **Description**: Computes the likelihood of a given data point `x` under a Gaussian Naive Bayes model. It multiplies the individual Gaussian probability density functions (PDF) for each feature of `x` using the provided `mean` and `variance` for each feature.
- **Inputs**:
  - `mean` (array of numbers): An array of mean values for each feature.
  - `variance` (array of numbers): An array of variance values for each feature.
  - `x` (array of numbers): The data point (array) for which the likelihood is calculated.
- **Outputs**:
  - The overall likelihood of the data point `x` under the Gaussian Naive Bayes model, which is the product of the individual Gaussian PDFs for each feature.
- **Example**:
  ```javascript
  import { gaussianNaiveBayes } from "pulseflowjs";
  const likelihood = gaussianNaiveBayes([5, 10], [1, 2], [4, 12]); // 0.037978
  ```

### `gaussianSmoothing(data: number[], sigma: number = 1): number[]`

- **Description**: Applies Gaussian smoothing to an array of data. This technique is used to smooth out noise by convolving the data with a Gaussian kernel.
- **Inputs**:
  - `data` (array of numbers): The data to be smoothed.
  - `sigma` (number, optional): The standard deviation of the Gaussian kernel. Defaults to `1`.
- **Outputs**:
  - An array of smoothed data values.
- **Example**:
  ```javascript
  import { gaussianSmoothing } from "pulseflowjs";
  const smoothedData = gaussianSmoothing([1, 2, 3, 4, 5], 1); // [1.2247, 2.0574, 3.0000, 3.9426, 4.7753]
  ```
  ### `gaussianQuadrature(n: number): { nodes: number[]; weights: number[] }`
- **Description**: Computes the nodes and weights for Gaussian quadrature of a given degree `n`. This method is used for numerical integration based on the roots of Legendre polynomials.
- **Inputs**:
  - `n` (number): The degree of the quadrature (number of nodes).
- **Outputs**:
  - An object containing:
    - `nodes` (array of numbers): The roots of the Legendre polynomial, which are used as the nodes for the quadrature.
    - `weights` (array of numbers): The weights associated with each node for the quadrature.
- **Example**:
  ```javascript
  import { gaussianQuadrature } from "pulseflowjs";
  const { nodes, weights } = gaussianQuadrature(3);
  console.log(nodes); // [-0.7746, 0, 0.7746]
  console.log(weights); // [0.5555, 0.8888, 0.5555]
  ```
