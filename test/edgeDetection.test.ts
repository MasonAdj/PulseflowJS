import { edgeDetection } from '../src/edgeDetection';
import * as fs from "fs";

describe('edgeDetection', () => {
  const createPPM = (width: number, height: number, pixelData: Uint8Array): Uint8Array => {
    const header = `P6\n${width} ${height}\n255\n`;
    const headerBuffer = new TextEncoder().encode(header);
    const dataBuffer = new Uint8Array(headerBuffer.length + pixelData.length);
    dataBuffer.set(headerBuffer);
    dataBuffer.set(pixelData, headerBuffer.length);
    return dataBuffer;
};


it('should process a valid PPM image and return edge-detected output', () => {
  const width = 3;
  const height = 3;
  const pixelData = new Uint8Array([
      255, 0, 0, 0, 255, 0, 0, 0, 255, // Row 1
      255, 255, 255, 128, 128, 128, 0, 0, 0, // Row 2
      0, 0, 255, 0, 255, 0, 255, 0, 0 // Row 3
  ]);
  const ppm = createPPM(width, height, pixelData);

  const result = edgeDetection(ppm);

  // Validate that the result is a Uint8Array
  expect(result).toBeInstanceOf(Uint8Array);

  // Validate the header
  const headerEndIndex = result.indexOf(0x0a, result.indexOf(0x0a, result.indexOf(0x0a) + 1) + 1) + 1;
  const header = new TextDecoder().decode(result.slice(0, headerEndIndex));
  const [magicNumber, dimensions, maxVal] = header.trim().split('\n');
  expect(magicNumber).toBe('P6');
  const [parsedWidth, parsedHeight] = dimensions.split(' ').map(Number);
  expect(parsedWidth).toBe(width);
  expect(parsedHeight).toBe(height);
  expect(maxVal).toBe('255');

  // Validate the output size
  const expectedLength = headerEndIndex + width * height * 3;
  expect(result.length).toBe(expectedLength);

  // Validate pixel intensities
  const pixelDataResult = result.slice(headerEndIndex);
  for (let i = 0; i < pixelDataResult.length; i += 3) {
      const intensity = pixelDataResult[i]; // Since grayscale, R=G=B
      expect(intensity).toBeGreaterThanOrEqual(0);
      expect(intensity).toBeLessThanOrEqual(255);
  }

  // Ensure edge detection has modified the output
  let edgePixels = 0;
  for (let i = 0; i < pixelDataResult.length; i += 3) {
      const intensity = pixelDataResult[i];
      if (intensity > 0 && intensity <= 255) edgePixels++;
  }
  expect(edgePixels).toBeGreaterThan(0); // Ensure some edges were detected

});


    it('should throw an error for non-P6 formatted images', () => {
        const invalidHeader = new Uint8Array([80, 51, 10, 50, 53, 53, 10]); // P3\n255\n
        expect(() => edgeDetection(invalidHeader)).toThrow("Only P6 PPM images are supported.");
    });

    it('should handle images with missing or malformed headers', () => {
        const malformedHeader = new Uint8Array([80, 54]); // P6

        expect(() => edgeDetection(malformedHeader)).toThrow();
    });

    it('should handle edge cases with very small images (1x1, 1x2, 2x2)', () => {
        const pixelData1x1 = new Uint8Array([255, 255, 255]);
        const ppm1x1 = createPPM(1, 1, pixelData1x1);
        const result1x1 = edgeDetection(ppm1x1);
        expect(result1x1).toBeInstanceOf(Uint8Array);

        const pixelData1x2 = new Uint8Array([255, 0, 0, 0, 255, 0]);
        const ppm1x2 = createPPM(1, 2, pixelData1x2);
        const result1x2 = edgeDetection(ppm1x2);
        expect(result1x2).toBeInstanceOf(Uint8Array);

        const pixelData2x2 = new Uint8Array([
            255, 255, 255, 0, 0, 0,
            128, 128, 128, 64, 64, 64,
        ]);
        const ppm2x2 = createPPM(2, 2, pixelData2x2);
        const result2x2 = edgeDetection(ppm2x2);
        expect(result2x2).toBeInstanceOf(Uint8Array);
    });
    it('should throw an error if magic number is not P6', () => {
      const header = new TextEncoder().encode("P3\n3 3\n255\n");
      const pixelData = new Uint8Array([
          255, 0, 0, 0, 255, 0, 0, 0, 255, // Row 1
          255, 255, 255, 128, 128, 128, 0, 0, 0, // Row 2
          0, 0, 255, 0, 255, 0, 255, 0, 0 // Row 3
      ]);
      const invalidMagicNumber = new Uint8Array(header.length + pixelData.length);
      invalidMagicNumber.set(header);
      invalidMagicNumber.set(pixelData, header.length);
  
      expect(() => edgeDetection(invalidMagicNumber)).toThrow("Only P6 PPM images are supported.");
  });
  it('should handle a minimal valid P6 PPM image correctly', () => {
    const header = new TextEncoder().encode("P6\n2 2\n255\n");
    const pixelData = new Uint8Array([
        255, 0, 0, 0, 255, 0, // Row 1
        0, 0, 255, 255, 255, 255 // Row 2
    ]);
    const validPPM = new Uint8Array(header.length + pixelData.length);
    validPPM.set(header);
    validPPM.set(pixelData, header.length);

    const result = edgeDetection(validPPM);

    expect(result).toBeInstanceOf(Uint8Array);

    const resultHeaderEndIndex = result.indexOf(0x0a, result.indexOf(0x0a, result.indexOf(0x0a) + 1) + 1) + 1;
    const resultHeader = new TextDecoder().decode(result.slice(0, resultHeaderEndIndex));
    const [magicNumber, dimensions, maxVal] = resultHeader.trim().split('\n');
    expect(magicNumber).toBe('P6');
    expect(dimensions).toBe('2 2');
    expect(maxVal).toBe('255');
});

    it('should return empty output for completely black images', () => {
        const width = 3;
        const height = 3;
        const pixelData = new Uint8Array(27).fill(0); // Black image
        const ppm = createPPM(width, height, pixelData);

        const result = edgeDetection(ppm);
        expect(result).toStrictEqual(ppm);
    });
});
