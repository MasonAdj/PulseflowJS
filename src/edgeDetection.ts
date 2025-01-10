export function edgeDetection(imageData: Uint8Array): Uint8Array {
    let width = 0;
    let height = 0;
    let pixelData: Uint8ClampedArray;

    // Parse PPM header (P6 format)
    const headerEndIndex = imageData.indexOf(0x0a, imageData.indexOf(0x0a, imageData.indexOf(0x0a) + 1) + 1) + 1;
    const header = new TextDecoder().decode(imageData.slice(0, headerEndIndex));

    const [magicNumber, dimensions] = header.split("\n").filter((line) => line.trim() !== "");
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

    // Detect edges
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

            const edgeValue = Math.sqrt(gx * gx + gy * gy);
            const idx = (y * width + x) * 3;

            edgeData[idx] = edgeData[idx + 1] = edgeData[idx + 2] = Math.min(255, edgeValue);
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