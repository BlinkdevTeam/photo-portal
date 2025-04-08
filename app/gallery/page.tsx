"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const fetchGalleryImages = async (code: string) => {
  const res = await fetch(`/api/gallery?code=${code}`);
  const data = await res.json();
  return data.images || [];
};

const downloadFile = async (url: string, filename: string) => {
  try {
    const res = await fetch(url);
    const blob = await res.blob();

    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Download failed:", error);
  }
};

export default function GalleryPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!code) return;

    const getImages = async () => {
      setLoading(true);
      const urls = await fetchGalleryImages(code);
      setImages(urls);
      setLoading(false);
    };

    getImages();
  }, [code]);

  // Add conditional check for images length
  if (images.length === 0 && !loading) {
    return (
      <main className="min-h-screen p-6">
        <h1 className="text-2xl font-aileron mb-6">
          Gallery for Code: {code}
        </h1>
        <p className="text-center text-gray-500 font-inter">
          No images found for this code.
        </p>
      </main>
    );
  }

  const handleDownloadAll = async () => {
    await Promise.all(
      images.map(async (url) => {
        const filename = url.split("/").pop() || "image.jpg";
        await downloadFile(url, filename);
      })
    );
  };

  return (
    <main className="flex flex-col justify-center items-center min-h-screen p-6 text-black">
      <h1 className="text-[28px] font-aileron mb-6 text-center">
        Gallery for Code: <br />
        {code}
      </h1>
      <p className="text-center text-[16px] font-inter">
        Below are your high-quality photos from our recent session. Click an
        image to <span className="font-bold">download</span>, or choose{" "}
        <span className="font-bold">"Download All"</span> to get everything in a
        ZIP file.
      </p>

      {loading ? (
        <p className="text-center text-gray-500">Loading images...</p>
      ) : images.length > 0 ? (
        <>
          <button
            onClick={handleDownloadAll}
            className="block w-[194px] px-[22px] py-[8px] bg-[#A30A24] text-white transform -skew-x-[20deg] my-8"
          >
            <div className="transfrom skew-x-[20deg] font-inter">
              Download All
            </div>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {images.map((url, index) => {
              const filename = url.split("/").pop() || `image-${index + 1}.jpg`;
              return (
                <div
                  key={index}
                  className="bg-[#F2F2F2] flex flex-col items-start gap-2 p-4 rounded-2xl"
                >
                  <img
                    src={url}
                    alt={`Gallery image ${index + 1}`}
                    className="rounded shadow max-w-full"
                  />
                  <div className="flex justify-center items-center">
                    <svg
                      width="23"
                      height="23"
                      viewBox="0 0 23 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.875 14.625V18.7917C20.875 19.3442 20.6555 19.8741 20.2648 20.2648C19.8741 20.6555 19.3442 20.875 18.7917 20.875H4.20833C3.6558 20.875 3.12589 20.6555 2.73519 20.2648C2.34449 19.8741 2.125 19.3442 2.125 18.7917V14.625M6.29167 9.41667L11.5 14.625M11.5 14.625L16.7083 9.41667M11.5 14.625V2.125"
                        stroke="#900B09"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>

                    <button
                      onClick={() => downloadFile(url, filename)}
                      className="text-[#a30a24] text-[18px] px-3 py-1 rounded font-inter"
                    >
                      Download
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">No images found.</p>
      )}
    </main>
  );
}
