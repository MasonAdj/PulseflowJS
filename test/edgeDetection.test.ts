/**
 * edgeDetection.test.ts
 *
 * Jest tests for the `edgeDetection` function.
 */

import { edgeDetection } from '../src/edgeDetection';
beforeAll(() => {
  // Provide a minimal mock of ImageData globally so `instanceof ImageData` checks pass in Node.
  class MockImageData {
    data: Uint8ClampedArray;
    width: number;
    height: number;

    constructor(data: Uint8ClampedArray, width: number, height: number) {
      this.data = data;
      this.width = width;
      this.height = height;
    }
  }
  // Cast to `any` so TS won't complain about assigning to global.ImageData
  global.ImageData = MockImageData as any;
});

describe('edgeDetection', () => {
  describe('ImageData branch', () => {
    test('returns an ImageData of the same dimensions, with no threshold (undefined)', () => {
      // 3×3 with top 2 rows white, bottom row black => strong horizontal boundary
      const inputData = new Uint8ClampedArray([
        // Row 0 (3 white)
        255, 255, 255, 255,
        255, 255, 255, 255,
        255, 255, 255, 255,

        // Row 1 (3 white)
        255, 255, 255, 255,
        255, 255, 255, 255,
        255, 255, 255, 255,

        // Row 2 (3 black)
        0,   0,   0,   255,
        0,   0,   0,   255,
        0,   0,   0,   255,
      ]);
      const width = 3;
      const height = 3;
      const imgData = new ImageData(inputData, width, height);

      const result = edgeDetection(imgData);

      expect(result).toBeInstanceOf(ImageData);
      const out = (result as ImageData).data;

      // Check dimension matches
      expect((result as ImageData).width).toBe(width);
      expect((result as ImageData).height).toBe(height);

      // Borders => black
      // top-left corner
      expect(out[0]).toBe(0);
      expect(out[1]).toBe(0);
      expect(out[2]).toBe(0);
      expect(out[3]).toBe(255);

      // bottom-right corner => index=32..35
      expect(out[32]).toBe(0);
      expect(out[33]).toBe(0);
      expect(out[34]).toBe(0);
      expect(out[35]).toBe(255);

      // center => row=1,col=1 => index=16..19 => strong edge => 255
      const centerR = out[16];
      const centerG = out[17];
      const centerB = out[18];
      const centerA = out[19];
      expect(centerR).toBe(255);
      expect(centerG).toBe(255);
      expect(centerB).toBe(255);
      expect(centerA).toBe(255);
    });

    test('applies threshold if provided (e.g. threshold=128)', () => {
      // Same 3×3 (top 2 rows white, bottom row black)
      const inputData = new Uint8ClampedArray([
        255, 255, 255, 255,
        255, 255, 255, 255,
        255, 255, 255, 255,

        255, 255, 255, 255,
        255, 255, 255, 255,
        255, 255, 255, 255,

        0,   0,   0,   255,
        0,   0,   0,   255,
        0,   0,   0,   255,
      ]);
      const width = 3;
      const height = 3;
      const imgData = new ImageData(inputData, width, height);

      const result = edgeDetection(imgData, { threshold: 128 });
      expect(result).toBeInstanceOf(ImageData);

      const out = (result as ImageData).data;

      // center => index=16..19 => should remain 255 after threshold
      const centerIdx = (1 * width + 1) * 4;
      expect(out[centerIdx + 0]).toBe(255);
      expect(out[centerIdx + 1]).toBe(255);
      expect(out[centerIdx + 2]).toBe(255);
      expect(out[centerIdx + 3]).toBe(255);

      // corner (0,0) => black
      expect(out[0]).toBe(0);
      expect(out[1]).toBe(0);
      expect(out[2]).toBe(0);
      expect(out[3]).toBe(255);
    });

    test('handles a small 1x1 ImageData gracefully (no interior iteration)', () => {
      const inputData = new Uint8ClampedArray([50, 100, 150, 255]);
      const imgData = new ImageData(inputData, 1, 1);

      const result = edgeDetection(imgData);
      expect(result).toBeInstanceOf(ImageData);

      const out = (result as ImageData).data;
      expect(out).toHaveLength(4);

      // 1×1 => entire border => black
      expect(out[0]).toBe(0);
      expect(out[1]).toBe(0);
      expect(out[2]).toBe(0);
      expect(out[3]).toBe(255);
    });

    test('forces large gradient >255 to be clamped at 255', () => {
      // 3×3 image: left side black, right side white => strong horizontal gradient
      const data = new Uint8ClampedArray([
        // Row 0: black, black, white
        0, 0, 0, 255,   0, 0, 0, 255,   255, 255, 255, 255,
        // Row 1: black, black, white
        0, 0, 0, 255,   0, 0, 0, 255,   255, 255, 255, 255,
        // Row 2: black, black, white
        0, 0, 0, 255,   0, 0, 0, 255,   255, 255, 255, 255,
      ]);
      const imgData = new ImageData(data, 3, 3);

      const result = edgeDetection(imgData) as ImageData;
      const out = result.data;

      // Check the middle pixel (row=1, col=1 => index=16..19). It should clamp to 255, not exceed it.
      const centerIdx = (1 * 3 + 1) * 4;
      expect(out[centerIdx + 0]).toBe(255);
      expect(out[centerIdx + 1]).toBe(255);
      expect(out[centerIdx + 2]).toBe(255);
      expect(out[centerIdx + 3]).toBe(255);
    });
  });

  // ---------------------------
  // PPM (Uint8Array) tests
  // ---------------------------
  describe('PPM (Uint8Array) branch', () => {
    test('throws error if not a P6 PPM', () => {
      const fakePPM = new TextEncoder().encode('P3\n2 2\n255\nsome data');
      expect(() => edgeDetection(fakePPM)).toThrow('Only P6 PPM images are supported.');
    });

    test('returns a valid P6 PPM (no threshold) for a small 2x2 image', () => {
      const headerStr = 'P6\n2 2\n255\n';
      const headerBytes = new TextEncoder().encode(headerStr);

      const pixelBytes = new Uint8Array([
        0, 0, 0,       // top-left
        255, 255, 255, // top-right
        255, 255, 255, // bottom-left
        0, 0, 0,       // bottom-right
      ]);

      const ppmData = new Uint8Array(headerBytes.length + pixelBytes.length);
      ppmData.set(headerBytes);
      ppmData.set(pixelBytes, headerBytes.length);

      const result = edgeDetection(ppmData) as Uint8Array;

      const resultHeader = new TextDecoder().decode(result.slice(0, headerBytes.length));
      expect(resultHeader).toContain('P6');
      expect(resultHeader).toContain('2 2');
      expect(resultHeader).toContain('255');

      const edgePixelData = result.slice(headerBytes.length);
      expect(edgePixelData.length).toBe(12);

      edgePixelData.forEach((val) => {
        expect(val).toBeGreaterThanOrEqual(0);
        expect(val).toBeLessThanOrEqual(255);
      });
    });

    test('applies threshold if provided (e.g. threshold=50) in PPM flow', () => {
      const headerStr = 'P6\n2 2\n255\n';
      const headerBytes = new TextEncoder().encode(headerStr);
      const pixelBytes = new Uint8Array([
        0,   0,   0,
        255, 255, 255,
        255, 255, 255,
        0,   0,   0,
      ]);
      const ppmData = new Uint8Array(headerBytes.length + pixelBytes.length);
      ppmData.set(headerBytes);
      ppmData.set(pixelBytes, headerBytes.length);

      const result = edgeDetection(ppmData, { threshold: 50 }) as Uint8Array;
      const edgePixelData = result.slice(headerBytes.length);

      const uniqueVals = new Set(edgePixelData);
      for (const val of uniqueVals) {
        expect([0, 255]).toContain(val);
      }
    });
    test('PPM 3x3 triggers Sobel code coverage (lines 167–195) with a clear vertical edge', () => {
      // Construct a 3×3 PPM:
      //   Row 0: black (0,0,0)
      //   Row 1: black (0,0,0)
      //   Row 2: white (255,255,255)
      //
      // After grayscaling, Row 0 & 1 => 0, Row 2 => 255. 
      // This creates a strong vertical gradient between row=1 and row=2.
    
      const headerStr = 'P6\n3 3\n255\n';
      const headerBytes = new TextEncoder().encode(headerStr);
    
      // 3 rows × 3 columns × 3 bytes/pixel = 27 bytes
      const pixelBytes = new Uint8Array([
        // Row 0 (all black)
        0,   0,   0,
        0,   0,   0,
        0,   0,   0,
    
        // Row 1 (all black)
        0,   0,   0,
        0,   0,   0,
        0,   0,   0,
    
        // Row 2 (all white)
        255, 255, 255,
        255, 255, 255,
        255, 255, 255,
      ]);
    
      // Combine header + pixel data
      const ppmData = new Uint8Array(headerBytes.length + pixelBytes.length);
      ppmData.set(headerBytes);
      ppmData.set(pixelBytes, headerBytes.length);
    
      // Run edge detection
      const result = edgeDetection(ppmData) as Uint8Array;
    
      // Separate out header vs. pixel data in the result
      const resultHeader = new TextDecoder().decode(result.slice(0, headerBytes.length));
      expect(resultHeader).toContain('P6');
      expect(resultHeader).toContain('3 3');
      expect(resultHeader).toContain('255');
    
      const edgePixelData = result.slice(headerBytes.length);
      expect(edgePixelData).toHaveLength(27); // 3×3×3
    
      // The Sobel loop processes (x=1, y=1). We expect a large vertical gradient 
      // because row 2 is white and row 1 is black. Let's check the center pixel:
      //   index = (y * width + x) * 3 = (1*3 + 1)*3 = 12
      const centerIndex = 12;
      const centerR = edgePixelData[centerIndex + 0];
      const centerG = edgePixelData[centerIndex + 1];
      const centerB = edgePixelData[centerIndex + 2];
    
      // We expect a strong edge => values around 255 (since the default code clamps at 255).
      // At minimum, it's definitely nonzero if the Sobel loop ran.
      expect(centerR).toBe(255);
      expect(centerG).toBe(255);
      expect(centerB).toBe(255);
    });
    test('applyThreshold is triggered with a small edge value < threshold => results in 0', () => {
      // Create a tiny image (2×2) where all pixels are black.
      // Sobel magnitude will be 0 (no edges).
      // Then we pass a threshold > 0, ensuring "edgeVal < threshold" => edgeVal=0.
    
      const data = new Uint8ClampedArray([
        // 4 pixels × RGBA = 16 values
        0, 0, 0, 255,
        0, 0, 0, 255,
        0, 0, 0, 255,
        0, 0, 0, 255,
      ]);
      const imgData = new ImageData(data, 2, 2);
    
      // Use threshold=50 so that the Sobel magnitude (0) is < 50 => gets forced to 0 in applyThreshold.
      const result = edgeDetection(imgData, { threshold: 50 }) as ImageData;
      const out = result.data;
    
      // The entire resulting image should remain black
      for (let i = 0; i < out.length; i += 4) {
        // R, G, B => 0, A => 255
        expect(out[i + 0]).toBe(0);
        expect(out[i + 1]).toBe(0);
        expect(out[i + 2]).toBe(0);
        expect(out[i + 3]).toBe(255);
      }
    });
    test('PPM threshold => small Sobel magnitude < threshold becomes 0', () => {
      // 3x3 PPM:
      //   Row 0: near-dark gray (10,10,10)
      //   Row 1: slightly lighter gray (12,12,12)
      //   Row 2: near-dark gray (10,10,10)
      //
      // The difference of 2 between rows is small. Sobel should yield a magnitude
      // well under 50, so if threshold=50 => final edgeVal => 0.
    
      const headerStr = 'P6\n3 3\n255\n';
      const headerBytes = new TextEncoder().encode(headerStr);
    
      // 3 × 3 × 3 bytes = 27
      const pixelBytes = new Uint8Array([
        // Row 0
        10, 10, 10,   10, 10, 10,   10, 10, 10,
        // Row 1
        12, 12, 12,   12, 12, 12,   12, 12, 12,
        // Row 2
        10, 10, 10,   10, 10, 10,   10, 10, 10,
      ]);
    
      const ppmData = new Uint8Array(headerBytes.length + pixelBytes.length);
      ppmData.set(headerBytes);
      ppmData.set(pixelBytes, headerBytes.length);
    
      // Run edge detection with threshold=50
      // => we expect the small Sobel magnitude to be < 50 => forced to 0.
      const result = edgeDetection(ppmData, { threshold: 50 }) as Uint8Array;
    
      // Extract just the pixel data
      const edgePixelData = result.slice(headerBytes.length);
    
      // The entire 3×3 region after Sobel + threshold < 50 => 0
      for (let i = 0; i < edgePixelData.length; i++) {
        expect(edgePixelData[i]).toBe(0);
      }
    });
    test('PPM threshold => large Sobel magnitude >= threshold becomes 255', () => {
      // 3x3 PPM:
      //   Row 0: black (0,0,0)
      //   Row 1: black (0,0,0)
      //   Row 2: white (255,255,255)
      //
      // This vertical jump from black to white yields a big Sobel magnitude 
      // for the middle row => well over 50 => forced to 255.
    
      const headerStr = 'P6\n3 3\n255\n';
      const headerBytes = new TextEncoder().encode(headerStr);
    
      const pixelBytes = new Uint8Array([
        // Row 0
        0,   0,   0,    0,   0,   0,    0,   0,   0,
        // Row 1
        0,   0,   0,    0,   0,   0,    0,   0,   0,
        // Row 2
        255, 255, 255,  255, 255, 255,  255, 255, 255,
      ]);
    
      const ppmData = new Uint8Array(headerBytes.length + pixelBytes.length);
      ppmData.set(headerBytes);
      ppmData.set(pixelBytes, headerBytes.length);
    
      // Again, threshold=50 => the huge jump (0->255) in row 1 -> row 2 
      // yields a Sobel magnitude >= 50 => final edgeVal => 255.
      const result = edgeDetection(ppmData, { threshold: 50 }) as Uint8Array;
      const edgePixelData = result.slice(headerBytes.length);
    
      // At least the "center" region (or many pixels) should end up 255.
      // For simplicity, let's check the entire buffer for nonzero.
      // Some boundary pixels might remain 0, but let's check 
      // at least the center row to confirm.
      
      // Let's specifically check the "center" pixel (x=1, y=1) => index = (1*3 + 1)*3 = 12
      // We expect it to be 255 after threshold.
      const centerIdx = 12;
      expect(edgePixelData[centerIdx + 0]).toBe(255);
      expect(edgePixelData[centerIdx + 1]).toBe(255);
      expect(edgePixelData[centerIdx + 2]).toBe(255);
    });
    
  });
});

/** 
 * NEW TEST to cover lines 168–169 and 173–193 in edgeDetection.ts 
 * (the loops that fill the top/bottom rows and left/right columns with black). 
 */
describe('edgeDetection - Border filling checks', () => {
  test('sets top/bottom rows and left/right columns to black', () => {
    // Create a 4×4 all-white RGBA image
    const width = 4;
    const height = 4;
    const pixelData = new Uint8ClampedArray(width * height * 4).fill(255);

    const imgData = new ImageData(pixelData, width, height);

    // Run edge detection
    const result = edgeDetection(imgData) as ImageData;
    const out = result.data;

    // Check top row (y=0) => x=0..3
    for (let x = 0; x < width; x++) {
      const idx = (0 * width + x) * 4;
      expect([out[idx], out[idx + 1], out[idx + 2], out[idx + 3]]).toEqual([0, 0, 0, 255]);
    }

    // Check bottom row (y=3) => x=0..3
    for (let x = 0; x < width; x++) {
      const idx = (3 * width + x) * 4;
      expect([out[idx], out[idx + 1], out[idx + 2], out[idx + 3]]).toEqual([0, 0, 0, 255]);
    }

    // Check left column (x=0) => y=0..3
    for (let y = 0; y < height; y++) {
      const idx = (y * width + 0) * 4;
      expect([out[idx], out[idx + 1], out[idx + 2], out[idx + 3]]).toEqual([0, 0, 0, 255]);
    }

    // Check right column (x=3) => y=0..3
    for (let y = 0; y < height; y++) {
      const idx = (y * width + (width - 1)) * 4;
      expect([out[idx], out[idx + 1], out[idx + 2], out[idx + 3]]).toEqual([0, 0, 0, 255]);
    }
  });
});
