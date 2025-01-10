# Edge Detection

This segment provides a function for performing edge detection on PPM images (P6 format). The function processes input image data to produce a grayscale image with highlighted edges using the Sobel operator.

### `edgeDetection(imageData: Uint8Array): Uint8Array`

- **Description**: Detects edges in a PPM image (P6 format) by converting the image to grayscale and applying the Sobel operator for edge detection. The result is returned as a new PPM image in `Uint8Array` format.
- **Inputs**:
  - `imageData` (Uint8Array): The raw binary data of the input PPM image.
- **Outputs**:
  - A `Uint8Array` containing the processed PPM image with edges detected.
- **Example**:
  ```typescript
  import { edgeDetection } from "./pulesflowjs";
  import * as fs from "fs";

  // Load PPM image file
  const inputPath = "input.ppm";
  const outputPath = "output.ppm";
  const inputImage = fs.readFileSync(inputPath);

  // Perform edge detection
  const outputImage = edgeDetection(inputImage);

  // Save processed image
  fs.writeFileSync(outputPath, outputImage);

  console.log(`Processed image saved to ${outputPath}`);
  ```

### How It Works

1. **Header Parsing**:
   - Reads the PPM header to extract image dimensions and validate the format.
   - Supports only the `P6` magic number for binary PPM images.
2. **Grayscale Conversion**:
   - Converts each RGB pixel to grayscale using the formula:
     ```
     grayscale = 0.3 * red + 0.59 * green + 0.11 * blue
     ```
3. **Edge Detection**:
   - Applies the Sobel operator to calculate gradients in the horizontal and vertical directions.
   - Combines the gradients to determine edge intensity.
4. **Output Creation**:
   - Combines the processed pixel data with a new PPM header to create the output image.

### Example PPM Header

The PPM header for the `P6` format includes:
```
P6
<width> <height>
255
```

### Notes

- Only supports PPM images in the `P6` format.
- Throws an error if the input image is not in the correct format.
  - Example error message: `Only P6 PPM images are supported.`
- Outputs a grayscale image with edges highlighted.

### Limitations

- Does not support other PPM formats (e.g., `P3`).
- Uses fixed Sobel operator weights; customization is not available.