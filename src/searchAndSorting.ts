/**
 * A generic comparator function type.
 * - Returns a negative number if firstValue < secondValue
 * - Returns 0 if firstValue == secondValue
 * - Returns a positive number if firstValue > secondValue
 */
export type Comparator<T> = (firstValue: T, secondValue: T) => number;

/**
 * Default comparator function for primitive types (numbers, strings).
 * - Works for numbers and strings automatically.
 */
export function defaultComparator<T>(a: T, b: T): number {
  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  }
  if (typeof a === "string" && typeof b === "string") {
    return a.localeCompare(b);
  }
  throw new Error("No default comparator available for this type. Please provide a custom comparator.");
}

/**
 * Performs an iterative binary search on a sorted array.
 *
 * @param sortedArray - A sorted array of type T.
 * @param targetValue - The value to search for.
 * @param comparisonFunction - A comparator function for type T (defaults to a generic comparator for numbers and strings).
 * @returns The index of the targetValue if found, otherwise -1.
 *
 * @example
 * ```ts
 * const numbers = [1, 3, 5, 7, 9];
 * console.log(binarySearchIterative(numbers, 5)); // Output: 2
 * ```
 */
/**
 * Performs an iterative binary search on a sorted array and returns all indices where the targetValue occurs.
 *
 * @param sortedArray - A sorted array of type T.
 * @param targetValue - The value to search for.
 * @param comparisonFunction - A comparator function for type T (defaults to a generic comparator for numbers and strings).
 * @returns An array of indices where the targetValue is found, or an empty array if not found.
 */
export function binarySearchIterative<T>(
  sortedArray: T[],
  targetValue: T,
  comparisonFunction: Comparator<T> = defaultComparator
): number[] {
  if (!Array.isArray(sortedArray) || sortedArray.length === 0) return []; // Handle empty array

  let leftBoundaryIndex = 0;
  let rightBoundaryIndex = sortedArray.length - 1;
  let foundIndex = -1;

  while (leftBoundaryIndex <= rightBoundaryIndex) {
    const middleIndex = Math.floor((leftBoundaryIndex + rightBoundaryIndex) / 2);
    const middleElement = sortedArray[middleIndex];

    const comparisonResult = comparisonFunction(middleElement, targetValue);

    if (comparisonResult === 0) {
      foundIndex = middleIndex; // Found an occurrence
      break;
    } else if (comparisonResult < 0) {
      leftBoundaryIndex = middleIndex + 1;
    } else {
      rightBoundaryIndex = middleIndex - 1;
    }
  }

  if (foundIndex === -1) return []; // Target not found

  // Expand left and right to find all occurrences
  const indices = [foundIndex];

  // Search to the left
  let leftIndex = foundIndex - 1;
  while (leftIndex >= 0 && comparisonFunction(sortedArray[leftIndex], targetValue) === 0) {
    indices.unshift(leftIndex);
    leftIndex--;
  }

  // Search to the right
  let rightIndex = foundIndex + 1;
  while (rightIndex < sortedArray.length && comparisonFunction(sortedArray[rightIndex], targetValue) === 0) {
    indices.push(rightIndex);
    rightIndex++;
  }

  return indices;
}

/**
 * Performs a recursive binary search on a sorted array and returns all indices where the targetValue occurs.
 *
 * @param sortedArray - A sorted array of type T.
 * @param targetValue - The value to search for.
 * @param comparisonFunction - A comparator function for type T (defaults to a generic comparator for numbers and strings).
 * @param leftBoundaryIndex - The starting index (defaults to 0).
 * @param rightBoundaryIndex - The ending index (defaults to sortedArray.length - 1).
 * @returns An array of indices where the targetValue is found, or an empty array if not found.
 */
export function binarySearchRecursive<T>(
  sortedArray: T[],
  targetValue: T,
  comparisonFunction: Comparator<T> = defaultComparator,
  leftBoundaryIndex: number = 0,
  rightBoundaryIndex: number = sortedArray.length - 1
): number[] {
  if (!Array.isArray(sortedArray) || sortedArray.length === 0) return []; // Handle empty array
  if (leftBoundaryIndex > rightBoundaryIndex) return []; // Target not found

  const middleIndex = Math.floor((leftBoundaryIndex + rightBoundaryIndex) / 2);
  const middleElement = sortedArray[middleIndex];
  const comparisonResult = comparisonFunction(middleElement, targetValue);

  if (comparisonResult === 0) {
    // Expand left and right to find all occurrences
    const indices = [middleIndex];

    // Search left
    let leftIndex = middleIndex - 1;
    while (leftIndex >= 0 && comparisonFunction(sortedArray[leftIndex], targetValue) === 0) {
      indices.unshift(leftIndex);
      leftIndex--;
    }

    // Search right
    let rightIndex = middleIndex + 1;
    while (rightIndex < sortedArray.length && comparisonFunction(sortedArray[rightIndex], targetValue) === 0) {
      indices.push(rightIndex);
      rightIndex++;
    }

    return indices;
  } else if (comparisonResult < 0) {
    return binarySearchRecursive(sortedArray, targetValue, comparisonFunction, middleIndex + 1, rightBoundaryIndex);
  } else {
    return binarySearchRecursive(sortedArray, targetValue, comparisonFunction, leftBoundaryIndex, middleIndex - 1);
  }
}

