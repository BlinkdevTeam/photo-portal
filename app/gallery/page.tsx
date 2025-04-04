"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PhotoCard from "@/components/PhotoCard";
import GalleryGrid from "@/components/GalleryGrid";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function GalleryPage() {
  const params = useSearchParams();
  const code = params.get("code") || "";
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    fetch(`/api/gallery?code=${code}`)
      .then((res) => res.json())
      .then((data) => setImages(data.images || []))
      .catch(() => setImages([]))
      .finally(() => setLoading(false));
  }, [code]);

  const handleDownloadAll = async () => {
    setDownloading(true);
    const zip = new JSZip();

    // Add each image to the zip folder
    const imagePromises = images.map(async (url, index) => {
      const response = await fetch(url);
      const blob = await response.blob();
      const fileName = url.split("/").pop() || `image-${index}.jpg`;
      zip.file(fileName, blob);
    });

    await Promise.all(imagePromises);

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, `${code}-photos.zip`);
    setDownloading(false);
  };

  return (
    <main className="p-4 text-black min-h-screen p-8">
      <h1 className="text-2xl mb-4">Gallery for Code: {code}</h1>
      <p>
        Below are your high-quality photos from our recent session. Click an
        image to download, or choose “Download All” to get everything in a ZIP
        file.
      </p>
      <div>
        {images.length > 0 && (
          <button
            onClick={handleDownloadAll}
            className="mt-6 mb-10 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            disabled={downloading}
          >
            {downloading ? "Zipping..." : "Download All"}
          </button>
        )}
      </div>
      <div className="py-4">
        {loading ? (
          <p>Loading...</p>
        ) : images.length ? (
          <GalleryGrid photos={images} />
        ) : (
          <p>
            We couldn’t find any photos for this code. Double-check the code and
            try again.
          </p>
        )}
      </div>
    </main>
  );
}
