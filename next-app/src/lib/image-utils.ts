/**
 * Compresses an image to a given width, height and quality using the canvas API.
 *
 * @param dataURL - The data URL of the image to compress.
 * @param width - The width of the compressed image.
 * @param height - The height of the compressed image.
 * @param quality - The quality of the compressed image.
 * @param callback - The callback function to call with the compressed data URL.
 * @returns void
 */
export function compressImage(
  dataURL: string,
  width: number = 500,
  height: number = 500,
  quality: number = 0.3,
  callback: (compressedDataURL: string) => void
) {
  const image = new Image();

  // When image loaded, draw to canvas and call callback with compressed data URL
  image.onload = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    const imageAspectRatio = image.width / image.height;
    const canvasAspectRatio = width / height;
    let drawWidth = width;
    let drawHeight = height;

    if (imageAspectRatio > canvasAspectRatio) {
      drawHeight = height;
      drawWidth = height * imageAspectRatio;
    } else {
      drawWidth = width;
      drawHeight = width / imageAspectRatio;
    }

    const x = (width - drawWidth) / 2;
    const y = (height - drawHeight) / 2;

    context?.drawImage(image, x, y, drawWidth, drawHeight);
    const compressedDataURL = canvas.toDataURL("image/jpeg", quality);
    callback(compressedDataURL);
  };

  // Set image source to data URL
  image.src = dataURL;
}
