export async function fetchGallery(code: string) {
  const res = await fetch(`http://localhost:4000/gallery/${code}`);
  if (!res.ok) throw new Error("Gallery not found");
  return res.json();
}
