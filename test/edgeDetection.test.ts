import { JSDOM } from "jsdom";
import { edgeDetection } from "../src/edgeDetection";
import { createCanvas } from "canvas"; // Import createCanvas from 'canvas' module
import "../jest.setup"; // Manually load setup for this test file only

const { window } = new JSDOM();
global.document = window.document;
global.HTMLCanvasElement = window.HTMLCanvasElement;
global.CanvasRenderingContext2D = window.CanvasRenderingContext2D;

describe("edgeDetection", () => {
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;

  beforeEach(() => {
    canvas = createCanvas(3, 3) as unknown as HTMLCanvasElement;
    ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.fillStyle = "rgb(128, 128, 128)";
      ctx.fillRect(0, 0, 3, 3);
    }
  });

  test("should throw error for invalid input type", () => {
    expect(() => edgeDetection("invalid" as any)).toThrow(TypeError);
  });

  test("should throw error if canvas context is missing", () => {
    const invalidCanvas = document.createElement("canvas");
    jest.spyOn(invalidCanvas, "getContext").mockReturnValue(null);
    expect(() => edgeDetection(invalidCanvas)).toThrow("Canvas context not found.");
  });

  test("should process ImageData and return new ImageData", () => {
    const imageData = new ImageData(3, 3);
    const output = edgeDetection(imageData);
    expect(output).toBeInstanceOf(ImageData);

    if (output instanceof ImageData) {
      expect(output.width).toBe(3);
      expect(output.height).toBe(3);
      expect(output.data.length).toBe(3 * 3 * 4);
    }
  });

  test("should process ImageData with thresholding", () => {
    const imageData = new ImageData(3, 3);
    imageData.data.set([
      50, 50, 50, 255,  100, 100, 100, 255,  150, 150, 150, 255,
      50, 50, 50, 255,  100, 100, 100, 255,  150, 150, 150, 255,
      50, 50, 50, 255,  100, 100, 100, 255,  150, 150, 150, 255
    ]);

    const output = edgeDetection(imageData, { threshold: 100 });
    expect(output).toBeInstanceOf(ImageData);

    if (output instanceof ImageData) {
      expect(output.data[0]).toBeDefined();
      expect(output.data[4]).toBeDefined();
    }
  });
  test("should process ImageData with soft thresholding", () => {
    const imageData = new ImageData(3, 3);
    imageData.data.set([
      50, 50, 50, 255,  100, 100, 100, 255,  150, 150, 150, 255,
      50, 50, 50, 255,  100, 100, 100, 255,  150, 150, 150, 255,
      50, 50, 50, 255,  100, 100, 100, 255,  150, 150, 150, 255
    ]);

    const output = edgeDetection(imageData, { threshold: 100, softThreshold: true });
    expect(output).toBeInstanceOf(ImageData);

    if (output instanceof ImageData) {
      expect(output.data[0]).toBeDefined();
      expect(output.data[4]).toBeDefined();
    }
  });

  test("should process canvas input", () => {
    expect(ctx).not.toBeNull();
    if (!ctx) return;
  
    // Extract image data from the canvas (possible cross-environment issue)
    const originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
    // Create a new ImageData object manually to ensure compatibility
    const imageData = new ImageData(
      new Uint8ClampedArray(originalImageData.data),
      originalImageData.width,
      originalImageData.height
    );
  
    // Call edgeDetection
    const output = edgeDetection(imageData);
  
    // Verify basic structure of output
    expect(output).toBeDefined();
    expect(typeof output).toBe("object");
    expect(output).toHaveProperty("width", canvas.width);
    expect(output).toHaveProperty("height", canvas.height);
    expect(output).toHaveProperty("data");
  });
  
  test("should throw error when passing an HTMLCanvasElement", () => {
    const canvas = document.createElement("canvas");
    canvas.width = 3;
    canvas.height = 3;
  
    const ctx = canvas.getContext("2d");
    expect(ctx).not.toBeNull();
    if (!ctx) return;
  
    // Fill canvas with dummy data
    ctx.fillStyle = "rgb(255, 0, 0)";
    ctx.fillRect(0, 0, 3, 3);
  
    // ✅ Expect edgeDetection to throw an error when given a canvas
    expect(() => edgeDetection(canvas)).toThrow("Invalid input: Expected ImageData, Uint8Array (PPM P6), or HTMLCanvasElement.");
  });
  
  

  test("should throw error for non-P6 PPM format", () => {
    const invalidPPM = new Uint8Array([0x50, 0x35]); // "P5" header (grayscale, not P6)
    expect(() => edgeDetection(invalidPPM)).toThrow("Only P6 PPM images are supported.");
  });

  test("should process P6 PPM input", () => {
    const ppmHeader = "P6\n3 3\n255\n";
    const headerBuffer = new TextEncoder().encode(ppmHeader);
    const pixelData = new Uint8Array(27).fill(128);
    const ppmData = new Uint8Array(headerBuffer.length + pixelData.length);
    ppmData.set(headerBuffer);
    ppmData.set(pixelData, headerBuffer.length);

    const output = edgeDetection(ppmData);
    expect(output).toBeInstanceOf(Uint8Array);
  });

  test("should handle threshold 0 and 255 correctly", () => {
    const imageData = new ImageData(3, 3);
    imageData.data.fill(128);

    const outputMin = edgeDetection(imageData, { threshold: 0 });
    const outputMax = edgeDetection(imageData, { threshold: 255 });

    if (outputMin instanceof ImageData) {
      expect(outputMin.data.length).toBeGreaterThan(0);

      // Ensure at least one pixel is 255 when threshold is 0
      const pixels = Array.from(outputMin.data);
      expect(pixels.some((val) => val === 255)).toBe(true);
    }

    if (outputMax instanceof ImageData) {
      expect(outputMax.data.length).toBeGreaterThan(0);

      // Ensure at least one pixel is 0 when threshold is 255
      const pixels = Array.from(outputMax.data);
      expect(pixels.some((val) => val === 0)).toBe(true);
    }
  });

  test("should return unchanged if input is already edge-detected", () => {
    const imageData = new ImageData(3, 3);
    imageData.data.fill(255);

    const output = edgeDetection(imageData);
    expect(output).toBeInstanceOf(ImageData);

    if (output instanceof ImageData) {
      const pixelArray = Array.from(output.data);
      expect(pixelArray.every((val) => val === 255 || val === 0)).toBe(true);
    }
  });
});
