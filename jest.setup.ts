import { createCanvas, Image, CanvasRenderingContext2D } from "canvas";

// Ensure that HTMLCanvasElement exists before modifying it
if (typeof global.HTMLCanvasElement !== "undefined") {
  global.HTMLCanvasElement.prototype.getContext = function (
    contextId: "2d",
    options?: CanvasRenderingContext2DSettings
  ): CanvasRenderingContext2D | null {
    if (contextId === "2d") {
      return createCanvas(1, 1).getContext("2d") as CanvasRenderingContext2D;
    }
    return null; // Return null for unsupported contexts
  } as HTMLCanvasElement["getContext"];
}

// Ensure ImageData exists before defining it
if (typeof global.ImageData === "undefined") {
  global.ImageData = class ImageData {
    width: number;
    height: number;
    data: Uint8ClampedArray;
    colorSpace: PredefinedColorSpace;

    constructor(
      dataOrWidth: Uint8ClampedArray | number,
      widthOrHeight: number,
      heightOrSettings?: number | ImageDataSettings,
      settings?: ImageDataSettings
    ) {
      if (typeof dataOrWidth === "number" && typeof widthOrHeight === "number") {
        // Standard constructor: new ImageData(width, height, optional settings)
        this.width = dataOrWidth;
        this.height = widthOrHeight;
        this.data = new Uint8ClampedArray(this.width * this.height * 4);
        this.colorSpace = (heightOrSettings as ImageDataSettings)?.colorSpace ?? "srgb";
      } else if (dataOrWidth instanceof Uint8ClampedArray && typeof widthOrHeight === "number") {
        // Alternative constructor: new ImageData(data, width, height, optional settings)
        this.data = dataOrWidth;
        this.width = widthOrHeight;
        this.height = heightOrSettings as number;
        this.colorSpace = settings?.colorSpace ?? "srgb";
      } else {
        throw new TypeError("Invalid ImageData constructor arguments");
      }
    }
  } as unknown as typeof global.ImageData;
}


// Ensure Image exists before defining it
if (typeof global.Image === "undefined") {
  global.Image = Image as unknown as typeof global.Image;
}
