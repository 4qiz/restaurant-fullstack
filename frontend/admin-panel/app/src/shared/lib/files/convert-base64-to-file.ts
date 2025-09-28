export const convertBase64ToFile = (
  base64: string,
  fileName: string,
  mimeType: string = "image/png"
) => {
  // Remove the base64 prefix if present
  const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");

  // Decode base64 and convert to a Buffer
  const buffer = Buffer.from(base64Data, "base64");

  // Create a File instance from the Buffer
  const file = new File([buffer], fileName, { type: mimeType });

  return file;
};
