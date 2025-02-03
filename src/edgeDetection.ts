/**
 * Edge detection for either:
 *  - P6 PPM data (Uint8Array), or
 *  - Canvas ImageData (typical RGBA).
 *
 * @param input  Either a PPM's raw bytes (Uint8Array), an ImageData object, or an HTMLCanvasElement.
 * @param options.threshold  (Optional) Applies a binary threshold to edges.
 *                          E.g., threshold=50 means edge values <50 → 0, >=50 → 255.
 * @param options.softThreshold  (Optional) If true, scales edge values instead of hard thresholding.
 *
 * @returns
 *   - If input was a PPM (Uint8Array), returns a new PPM (Uint8Array).
 *   - If input was an ImageData or Canvas, returns a new ImageData (the edges).
 */
/**
 * Edge detection for either:
 *  - P6 PPM data (Uint8Array), or
 *  - Canvas ImageData (typical RGBA).
 *
 * @param input  Either a PPM's raw bytes (Uint8Array), an ImageData object, or an HTMLCanvasElement.
 * @param options.threshold  (Optional) Applies a binary threshold to edges.
 *                          E.g., threshold=50 means edge values <50 → 0, >=50 → 255.
 * @param options.softThreshold  (Optional) If true, scales edge values instead of hard thresholding.
 *
 * @returns
 *   - If input was a PPM (Uint8Array), returns a new PPM (Uint8Array).
 *   - If input was an ImageData or Canvas, returns a new ImageData (the edges).
 */
export function edgeDetection(
  input: Uint8Array | ImageData | HTMLCanvasElement,
  options: { threshold?: number; softThreshold?: boolean } = {}
): Uint8Array | ImageData {
  const { threshold, softThreshold = false } = options;

  const toGrayscale = (r: number, g: number, b: number): number =>
    Math.round(0.3 * r + 0.59 * g + 0.11 * b);

  const applyThreshold = (val: number): number => {
    let edgeVal = Math.min(255, val);
    if (threshold !== undefined) {
      if (softThreshold) {
        return Math.max(0, Math.min(255, ((edgeVal - threshold) / (255 - threshold)) * 255));
      }
      return edgeVal < threshold ? 0 : 255;
    }
    return edgeVal;
  };

  const getImageDataFromCanvas = (canvas: HTMLCanvasElement): ImageData => {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context not found.");
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  };

  const sobelFilter = (gray: Uint8ClampedArray, width: number, height: number): Uint8ClampedArray => {
    const outData = new Uint8ClampedArray(width * height);
    const getGray = (x: number, y: number): number => gray[y * width + x];

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const gx =
          -getGray(x - 1, y - 1) - 2 * getGray(x - 1, y) - getGray(x - 1, y + 1) +
          getGray(x + 1, y - 1) + 2 * getGray(x + 1, y) + getGray(x + 1, y + 1);

        const gy =
          -getGray(x - 1, y - 1) - 2 * getGray(x, y - 1) - getGray(x + 1, y - 1) +
          getGray(x - 1, y + 1) + 2 * getGray(x, y + 1) + getGray(x + 1, y + 1);

        outData[y * width + x] = applyThreshold(Math.sqrt(gx * gx + gy * gy));
      }
    }
    return outData;
  };

  if (input instanceof HTMLCanvasElement) {
    input = getImageDataFromCanvas(input);
  }

  if (input instanceof ImageData) {
    const width = input.width;
    const height = input.height;
    const data = input.data;
    const gray = new Uint8ClampedArray(width * height);

    for (let i = 0; i < data.length; i += 4) {
      gray[i / 4] = toGrayscale(data[i], data[i + 1], data[i + 2]);
    }

    const edgeData = sobelFilter(gray, width, height);
    const formattedEdgeData = new Uint8ClampedArray(width * height * 4);

    for (let i = 0; i < edgeData.length; i++) {
      formattedEdgeData[i * 4] = edgeData[i];
      formattedEdgeData[i * 4 + 1] = edgeData[i];
      formattedEdgeData[i * 4 + 2] = edgeData[i];
      formattedEdgeData[i * 4 + 3] = 255;
    }

    return new ImageData(new Uint8ClampedArray(formattedEdgeData), width, height);
  }

  if (input instanceof Uint8Array) {
    const headerEndIndex =
      input.indexOf(0x0a, input.indexOf(0x0a, input.indexOf(0x0a) + 1) + 1) + 1;
    const header = new TextDecoder().decode(input.slice(0, headerEndIndex));

    const [magicNumber, dimensions] = header.split("\n").filter((line) => line.trim() !== "");
    if (magicNumber !== "P6") {
      throw new Error("Only P6 PPM images are supported.");
    }

    const [width, height] = dimensions.split(" ").map(Number);
    const pixelData = new Uint8ClampedArray(input.slice(headerEndIndex));
    const gray = new Uint8ClampedArray(width * height);

    for (let i = 0; i < pixelData.length; i += 3) {
      gray[i / 3] = toGrayscale(pixelData[i], pixelData[i + 1], pixelData[i + 2]);
    }

    const edgeData = sobelFilter(gray, width, height);
    const headerOutput = `P6\n${width} ${height}\n255\n`;
    const headerBuffer = new TextEncoder().encode(headerOutput);
    const outputData = new Uint8Array(headerBuffer.length + edgeData.length);

    outputData.set(headerBuffer);
    outputData.set(edgeData, headerBuffer.length);
    return outputData;
  }

  throw new TypeError("Invalid input: Expected ImageData, Uint8Array (PPM P6), or HTMLCanvasElement.");
}


