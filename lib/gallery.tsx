export function getGalleryPaths(code: string): string[] {
  try {
    const basePath = `/assets/${code}/`;
    const images = ["photo1.jpg", "photo2.jpg"]; // Hardcoded for now
    return images.map((img) => basePath + img);
  } catch (error) {
    return [];
  }
}
