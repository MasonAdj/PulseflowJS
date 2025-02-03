# Binary Search Utilities

This module provides efficient searching functions using binary search algorithms. It includes an iterative and a recursive approach to searching for values in sorted arrays.

## Comparator Type

```typescript
export type Comparator<T> = (firstValue: T, secondValue: T) => number;
```

### Description
A generic comparator function type used to compare two values of type `T`. The function returns:
- A negative number if `firstValue` is less than `secondValue`.
- Zero if `firstValue` is equal to `secondValue`.
- A positive number if `firstValue` is greater than `secondValue`.

### Usage Example
```typescript
const numberComparator: Comparator<number> = (a, b) => a - b;
const result = numberComparator(5, 10); // result is -5
```

---

## `defaultComparator`

```typescript
export function defaultComparator<T>(a: T, b: T): number;
```

### Description
Provides a default comparator function for primitive types (numbers and strings). Throws an error for unsupported types.

### Parameters
- `a: T` – The first value to compare.
- `b: T` – The second value to compare.

### Returns
- A negative number if `a` is less than `b`.
- Zero if `a` is equal to `b`.
- A positive number if `a` is greater than `b`.

### Example
```typescript
const result1 = defaultComparator(5, 10); // result1 is -5
const result2 = defaultComparator('apple', 'banana'); // result2 is a negative number
```

---

## `binarySearchIterative`

```typescript
export function binarySearchIterative<T>(
  sortedArray: T[],
  targetValue: T,
  comparisonFunction: Comparator<T> = defaultComparator
): number[];
```

### Description
Performs an iterative binary search on a sorted array and returns all indices where the `targetValue` occurs.

### Parameters
- `sortedArray: T[]` – A sorted array of type `T`.
- `targetValue: T` – The value to search for.
- `comparisonFunction: Comparator<T>` – A comparator function for type `T`. Defaults to `defaultComparator`.

### Returns
- An array of indices where the `targetValue` is found.
- An empty array if the `targetValue` is not found.

### Example
```typescript
const numbers = [1, 3, 5, 5, 5, 7, 9];
const indices = binarySearchIterative(numbers, 5); // indices are [2, 3, 4]
```

---

## `binarySearchRecursive`

```typescript
export function binarySearchRecursive<T>(
  sortedArray: T[],
  targetValue: T,
  comparisonFunction: Comparator<T> = defaultComparator,
  leftBoundaryIndex: number = 0,
  rightBoundaryIndex: number = sortedArray.length - 1
): number[];
```

### Description
Performs a recursive binary search on a sorted array and returns all indices where the `targetValue` occurs.

### Parameters
- `sortedArray: T[]` – A sorted array of type `T`.
- `targetValue: T` – The value to search for.
- `comparisonFunction: Comparator<T>` – A comparator function for type `T`. Defaults to `defaultComparator`.
- `leftBoundaryIndex: number` – The starting index for the search. Defaults to `0`.
- `rightBoundaryIndex: number` – The ending index for the search. Defaults to `sortedArray.length - 1`.

### Returns
- An array of indices where the `targetValue` is found.
- An empty array if the `targetValue` is not found.

### Example
```typescript
const numbers = [1, 3, 5, 5, 5, 7, 9];
const indices = binarySearchRecursive(numbers, 5); // indices are [2, 3, 4]
```

