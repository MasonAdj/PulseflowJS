import { binarySearchIterative, binarySearchRecursive, defaultComparator } from "../src/searchAndSorting"
import { testData } from "./testData";

describe("defaultComparator", () => {
  test("compares numbers correctly", () => {
    expect(defaultComparator(1, 2)).toBeLessThan(0);
    expect(defaultComparator(2, 1)).toBeGreaterThan(0);
    expect(defaultComparator(5, 5)).toBe(0);
  });

  test("compares strings correctly", () => {
    expect(defaultComparator("apple", "banana")).toBeLessThan(0);
    expect(defaultComparator("banana", "apple")).toBeGreaterThan(0);
    expect(defaultComparator("cherry", "cherry")).toBe(0);
  });

  test("throws error for unsupported types", () => {
    expect(() => defaultComparator([1, 2], [1, 2])).toThrow();
    expect(() => defaultComparator({ a: 1 }, { a: 1 })).toThrow();
  });
});

describe("binarySearchIterative", () => {
  test("finds numbers correctly", () => {
    const arr = [1, 2, 3, 4, 5, 5, 5, 6, 7, 8];
    expect(binarySearchIterative(arr, 5)).toEqual([4, 5, 6]);
    expect(binarySearchIterative(arr, 3)).toEqual([2]);
    expect(binarySearchIterative(arr, 10)).toEqual([]);
  });

  test("finds strings correctly", () => {
    const arr = ["apple", "banana", "cherry", "date", "fig"];
    expect(binarySearchIterative(arr, "cherry")).toEqual([2]);
    expect(binarySearchIterative(arr, "date")).toEqual([3]);
    expect(binarySearchIterative(arr, "grape")).toEqual([]);
  });

  test("handles empty and single-element arrays", () => {
    expect(binarySearchIterative([], 5)).toEqual([]);
    expect(binarySearchIterative([7], 7)).toEqual([0]);
    expect(binarySearchIterative([7], 5)).toEqual([]);
  });

  test("works with custom comparator", () => {
    const arr = testData.sort((a, b) => defaultComparator(a.speed, b.speed));
    const searchSpeed = 25;
    const searchTarget = arr.find(e => e.speed === searchSpeed); // Find an existing object
    
    if (searchTarget) { 
      const expectedIndices = arr.map((e, i) => (e.speed === searchSpeed ? i : -1)).filter((i) => i !== -1);
      expect(binarySearchIterative(arr, searchTarget, (a, b) => defaultComparator(a.speed, b.speed))).toEqual(expectedIndices);
    }
  });
  
});

describe("binarySearchRecursive", () => {
  test("finds numbers correctly", () => {
    const arr = [1, 2, 3, 4, 5, 5, 5, 6, 7, 8];
    expect(binarySearchRecursive(arr, 5)).toEqual([4, 5, 6]);
    expect(binarySearchRecursive(arr, 3)).toEqual([2]);
    expect(binarySearchRecursive(arr, 10)).toEqual([]);
  });

  test("finds strings correctly", () => {
    const arr = ["apple", "banana", "cherry", "date", "fig"];
    expect(binarySearchRecursive(arr, "cherry")).toEqual([2]);
    expect(binarySearchRecursive(arr, "date")).toEqual([3]);
    expect(binarySearchRecursive(arr, "grape")).toEqual([]);
  });

  test("handles empty and single-element arrays", () => {
    expect(binarySearchRecursive([], 5)).toEqual([]);
    expect(binarySearchRecursive([7], 7)).toEqual([0]);
    expect(binarySearchRecursive([7], 5)).toEqual([]);
  });

  test("works with custom comparator", () => {
    const arr = testData.sort((a, b) => defaultComparator(a.speed, b.speed));
    const searchSpeed = 25;
    const searchTarget = arr.find(e => e.speed === searchSpeed); // Find an existing object
    
    if (searchTarget) { 
      const expectedIndices = arr.map((e, i) => (e.speed === searchSpeed ? i : -1)).filter((i) => i !== -1);
      expect(binarySearchRecursive(arr, searchTarget, (a, b) => defaultComparator(a.speed, b.speed))).toEqual(expectedIndices);
    }
  });
  
});
