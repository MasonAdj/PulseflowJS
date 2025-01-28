# Edge Detection

This segment provides a function for performing edge detection on either:
- **PPM images (P6 format, using a `Uint8Array`)**, or
- **Canvas ImageData (typical RGBA)**

Optionally, a binary threshold can be applied so that any detected edge below the threshold becomes black (`0`) and above (or equal to) the threshold becomes white (`255`).

---

### `edgeDetection(input: Uint8Array | ImageData, options?: { threshold?: number }): Uint8Array | ImageData`

- **Description**:  
  Detects edges by converting the input to grayscale and applying the Sobel operator. Depending on the input type:
  - If a **PPM (Uint8Array)** is provided, the output will be a **new PPM** (still in `Uint8Array` form).
  - If an **ImageData** object is provided, the output will be a **new ImageData** (suitable for direct use on a `<canvas>`).
  - If a **threshold** is provided via `options.threshold`, any edge magnitude below the threshold is set to `0` and any above or equal is set to `255`.

- **Inputs**:
  1. `input` (Uint8Array | ImageData):
     - `Uint8Array`: Raw binary data of a **P6** PPM image.
     - `ImageData`: Typical RGBA data from a canvas or other source.
  2. `options` (optional object):
     - `threshold` (number):  
       If specified, performs a binary threshold on the edges.

- **Outputs**:
  - A `Uint8Array` (if the input was a `Uint8Array`), containing the processed PPM image with edges detected.
  - An `ImageData` object (if the input was an `ImageData`), containing the processed RGBA data with edges detected.

---

### Examples

<details>
<summary><strong>1. Using a P6 PPM Image (Uint8Array)</strong></summary>

```typescript
import { edgeDetection } from "./pulesflowjs";
import * as fs from "fs";

// Load PPM image file
const inputPath = "input.ppm";
const outputPath = "output.ppm";
const inputImage = fs.readFileSync(inputPath);

// Perform edge detection with a threshold of 50
const outputImage = edgeDetection(inputImage, { threshold: 50 }) as Uint8Array;

// Save the processed image
fs.writeFileSync(outputPath, outputImage);

console.log(`Processed image saved to ${outputPath}`);
</details> <details> <summary><strong>2. Using an ImageData Object (RGBA)</strong></summary>
````
````typescript
import { edgeDetection } from "./pulesflowjs";

// Assume we have a <canvas> and we want to process its 2D context
const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
if (!ctx) throw new Error("Unable to get 2D context");

// Get the canvas ImageData
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

// Perform edge detection with no threshold
const outputImageData = edgeDetection(imageData) as ImageData;

// Draw the processed data back onto the canvas
ctx.putImageData(outputImageData, 0, 0);
````
## How It Works

### Type Check
- Detects if the input is **ImageData** or a **Uint8Array**.
- This determines whether to process RGBA data (ImageData) or raw P6 PPM data (Uint8Array).

### Grayscale Conversion
- Converts each pixel to grayscale:

  \[
  \text{grayscale} = 0.3 \times R + 0.59 \times G + 0.11 \times B
  \]

### Sobel Operator
- Applies the Sobel operator in both the **x** and **y** directions:

  \[
  G_x = \begin{bmatrix}
  -1 & 0 & 1 \\
  -2 & 0 & 2 \\
  -1 & 0 & 1
  \end{bmatrix}, 
  \quad
  G_y = \begin{bmatrix}
  -1 & -2 & -1 \\
   0 &  0 &  0 \\
   1 &  2 &  1
  \end{bmatrix}
  \]

- The total edge magnitude is:

  \[
  \text{edge} = \sqrt{G_x^2 + G_y^2}
  \]

### Threshold (optional)
- If `options.threshold` is provided, any edge magnitude below the threshold becomes **0** (black) and any above or equal becomes **255** (white).

### Output
- **For ImageData input**:  
  Creates a new **ImageData** object with the same dimensions, placing edge values in the RGB channels with full opacity in the alpha channel.
- **For PPM input**:  
  Creates a new **P6** PPM header and appends the edge-detected grayscale data (in triplets).

---

## Notes
- Only **P6 PPM** format is supported when using `Uint8Array` input.
- Throws an error if the PPM header indicates any format other than P6.
- The image borders (top/bottom rows, left/right columns) are filled with black to avoid uninitialized pixels.
- **Threshold** is optional. When omitted, the exact Sobel edge magnitude (clamped at 255) is used.

---

## Limitations
- No support for PPM formats other than **P6**.
- Sobel operator weights are fixed; no advanced customization is available.
- For **ImageData** input, only standard RGBA is assumed (no alpha premultiplication or other color space conversions).
- Edges at the outer border are set to black for simplicity.
