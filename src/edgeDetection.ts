/**
 * Edge detection for either:
 *  - P6 PPM data (Uint8Array), or
 *  - Canvas ImageData (typical RGBA).
 *
 * @param input  Either a PPM's raw bytes (Uint8Array) or an ImageData object.
 * @param options.threshold  (Optional) If provided, applies a binary threshold to edges.
 *                          E.g. threshold=50 means edge values <50 -> 0, >=50 -> 255.
 *
 * @returns
 *   - If input was a PPM (Uint8Array), returns a new PPM (Uint8Array).
 *   - If input was an ImageData, returns a new ImageData (the edges).
 */
export function edgeDetection(
    input: Uint8Array | ImageData,
    options: { threshold?: number } = {}
  ): Uint8Array | ImageData {
    const { threshold } = options;
  
    /** 
     * A helper to clamp and optionally threshold an edge value. 
     */
    const applyThreshold = (val: number): number => {
      let edgeVal = Math.min(255, val);
      if (threshold !== undefined) {
        edgeVal = edgeVal < threshold ? 0 : 255;
      }
      return edgeVal;
    };
  
    /** 
     * If the input is ImageData, we do an RGBA-based Sobel edge detection 
     * and return a new ImageData for direct use in a <canvas>. 
     */
    if (input instanceof ImageData) {
      const width = input.width;
      const height = input.height;
      const data = input.data; // Uint8ClampedArray (RGBA)
  
      // Convert to grayscale in a separate buffer
      const gray = new Uint8ClampedArray(width * height);
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const grayVal = Math.round(0.3 * r + 0.59 * g + 0.11 * b);
        gray[i / 4] = grayVal;
      }
  
      // Prepare output buffer
      const outData = new Uint8ClampedArray(data.length); // same length as RGBA
  
      // Helper to fetch grayscale
      const getGray = (x: number, y: number): number => {
        return gray[y * width + x];
      };
  
      // Sobel
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          const gx =
            -getGray(x - 1, y - 1) -
            2 * getGray(x - 1, y) -
            getGray(x - 1, y + 1) +
            getGray(x + 1, y - 1) +
            2 * getGray(x + 1, y) +
            getGray(x + 1, y + 1);
  
          const gy =
            -getGray(x - 1, y - 1) -
            2 * getGray(x, y - 1) -
            getGray(x + 1, y - 1) +
            getGray(x - 1, y + 1) +
            2 * getGray(x, y + 1) +
            getGray(x + 1, y + 1);
  
          const edgeVal = applyThreshold(Math.sqrt(gx * gx + gy * gy));
  
          const idx = (y * width + x) * 4;
          outData[idx + 0] = edgeVal; // R
          outData[idx + 1] = edgeVal; // G
          outData[idx + 2] = edgeVal; // B
          outData[idx + 3] = 255;     // A fully opaque
        }
      }
  
      // Fill in borders with 0 or copy edges as needed (simple approach: black)
      // so they don’t remain uninitialized:
      // (For brevity, we’ll just make them black/255 alpha)
      // Top/Bottom Row & Left/Right Columns
      for (let x = 0; x < width; x++) {
        // top row
        outData[x * 4 + 0] = 0;
        outData[x * 4 + 1] = 0;
        outData[x * 4 + 2] = 0;
        outData[x * 4 + 3] = 255;
  
        // bottom row
        const bottomIdx = ((height - 1) * width + x) * 4;
        outData[bottomIdx + 0] = 0;
        outData[bottomIdx + 1] = 0;
        outData[bottomIdx + 2] = 0;
        outData[bottomIdx + 3] = 255;
      }
      for (let y = 0; y < height; y++) {
        // left col
        const leftIdx = (y * width) * 4;
        outData[leftIdx + 0] = 0;
        outData[leftIdx + 1] = 0;
        outData[leftIdx + 2] = 0;
        outData[leftIdx + 3] = 255;
  
        // right col
        const rightIdx = (y * width + (width - 1)) * 4;
        outData[rightIdx + 0] = 0;
        outData[rightIdx + 1] = 0;
        outData[rightIdx + 2] = 0;
        outData[rightIdx + 3] = 255;
      }
  
      // Return a new ImageData for direct usage (putImageData, etc.)
      return new ImageData(outData, width, height);
    } 
    else {
      /**
       * Otherwise, assume the input is a P6 PPM stored in a Uint8Array, 
       * preserving the old logic so a user can still upload a PPM 
       * and get back a PPM.
       */
      const imageData = input;
      
      // --- Original parse logic ---
      let width = 0;
      let height = 0;
      let pixelData: Uint8ClampedArray;
  
      // Parse PPM header (P6 format)
      const headerEndIndex =
        imageData.indexOf(0x0a, imageData.indexOf(0x0a, imageData.indexOf(0x0a) + 1) + 1) + 1;
      const header = new TextDecoder().decode(imageData.slice(0, headerEndIndex));
  
      const [magicNumber, dimensions] = header
        .split("\n")
        .filter((line) => line.trim() !== "");
      if (magicNumber !== "P6") {
        throw new Error("Only P6 PPM images are supported.");
      }
  
      [width, height] = dimensions.split(" ").map(Number);
  
      // Extract pixel data
      pixelData = new Uint8ClampedArray(imageData.slice(headerEndIndex));
  
      // Convert to grayscale
      for (let i = 0; i < pixelData.length; i += 3) {
        const r = pixelData[i];
        const g = pixelData[i + 1];
        const b = pixelData[i + 2];
        const grayscale = Math.round(0.3 * r + 0.59 * g + 0.11 * b);
  
        pixelData[i] = pixelData[i + 1] = pixelData[i + 2] = grayscale;
      }
  
      // Detect edges (Sobel)
      const edgeData = new Uint8ClampedArray(pixelData.length);
  
      const getGray = (x: number, y: number): number => {
        const idx = (y * width + x) * 3;
        return pixelData[idx];
      };
  
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          const gx =
            -1 * getGray(x - 1, y - 1) +
            -2 * getGray(x - 1, y) +
            -1 * getGray(x - 1, y + 1) +
            1 * getGray(x + 1, y - 1) +
            2 * getGray(x + 1, y) +
            1 * getGray(x + 1, y + 1);
  
          const gy =
            -1 * getGray(x - 1, y - 1) +
            -2 * getGray(x, y - 1) +
            -1 * getGray(x + 1, y - 1) +
            1 * getGray(x - 1, y + 1) +
            2 * getGray(x, y + 1) +
            1 * getGray(x + 1, y + 1);
  
          const edgeValue = applyThreshold(Math.sqrt(gx * gx + gy * gy));
          const idx = (y * width + x) * 3;
  
          edgeData[idx] = edgeData[idx + 1] = edgeData[idx + 2] = edgeValue;
        }
      }
  
      // Create output PPM data
      const headerOutput = `P6\n${width} ${height}\n255\n`;
      const headerBuffer = new TextEncoder().encode(headerOutput);
      const outputData = new Uint8Array(headerBuffer.length + edgeData.length);
      outputData.set(headerBuffer);
      outputData.set(edgeData, headerBuffer.length);
  
      return outputData;
    }
  }
  