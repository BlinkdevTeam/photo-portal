"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "@/components/modal";
import Image from "next/image";

export default function Home() {
  const [code, setCode] = useState("");
  const [imagesFound, setImagesFound] = useState<boolean | null>(null); // to track if images are found
  const [modalType, setModalType] = useState<"terms" | "privacy" | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    // Check for images before proceeding to the gallery
    const response = await fetch(`/api/gallery?code=${code.trim()}`);
    const data = await response.json();

    if (data && data.images && data.images.length > 0) {
      // If images are found, redirect to the gallery page
      router.push(`/gallery?code=${code.trim()}`);
    } else {
      // If no images found, show an error message or stay on the page
      setImagesFound(false);
    }
  };

  const termsContent = (
    <>
      <p>
        By accessing your gallery, you agree not to share your private access
        code with others. All photos are confidential and for personal use only.
      </p>
      <ul className="list-disc pl-4 mt-2">
        <li>You may download and store your photos for personal use.</li>
        <li>Photos remain copyrighted to Blink Creative Studio.</li>
        <li>Do not upload to public sites without permission.</li>
      </ul>
    </>
  );

  const privacyContent = (
    <>
      <p>
        We respect your privacy. Your images are stored securely and are only
        accessible through your unique access code.
      </p>
      <ul className="list-disc pl-4 mt-2">
        <li>We do not share or sell your data.</li>
        <li>Only you have access to your gallery via your code.</li>
        <li>Your photos are not publicly listed or searchable.</li>
      </ul>
    </>
  );

  return (
    <main
      className="flex flex-col items-center justify-center gap-10 min-h-screen p-4 text-center text-white relative overflow-hidden"
      style={{
        backgroundImage: "url('/assets/BCS_CP_CAPABILITIES.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="fixed top-25 flex flex-col justify-center items-center z-10 gap-6">
        <Image
          src="/assets/BCS_10TH_LOGO_WHITE@4x.png"
          alt="10 years Blink Creative Studio Logo"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "136px", height: "auto" }}
          priority
        />
        <div>
          <h1 className="text-[28px] leading-9 font-aileron">
            Welcome to <br />
            Blink Creative Studio's <br />
            Digital Photo Access Portal
          </h1>
        </div>
        <div className="px-6">
          <p className="text-[16px] font-inter">
            Easily view and download your professionally captured memories.
          </p>
        </div>
        <div className="z-10">
          {/* <h2 className="text-2xl mb-4">Access Your Photo Gallery</h2> */}
          <form
            onSubmit={handleSubmit}
            className="w-screen flex flex-col justify-center items-center gap-2 mb-4 px-12"
          >
            <input
              className="flex-1 border px-4 py-2 w-full text-black bg-white"
              placeholder="Enter access code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button className="block w-[194px] px-[22px] py-[8px] bg-[#A30A24] text-white transform -skew-x-[20deg]">
              <div className="transfrom skew-x-[20deg] font-inter">Submit</div>
            </button>
          </form>

          {/* Show 'No images found' message if no images found */}
          {imagesFound === false && (
            <p className="text-red-500 mt-4">
              No images found for the entered code.
            </p>
          )}
        </div>
      </div>

      {/* Bottom image absolutely placed */}
      <div className="flex justify-center items-center">
        <Image
          src="/assets/DIGITAL PHOTO ACCESS Main Photo.png"
          alt="Bottom Illustration"
          width={0}
          height={0}
          sizes="100vw"
          style={{
            position: "absolute",
            bottom: -200,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            height: "auto",
            zIndex: 0,
          }}
        />
      </div>

      {/* Sticky bottom text */}
      <div className="fixed bottom-0 w-full text-sm text-white bg-gradient-to-t from-black/80 to-transparent text-center p-4 z-20 font-inter">
        By accessing your gallery, you agree to our{" "}
        <button
          onClick={() => setModalType("terms")}
          className="text-[#a30a24] hover:underline"
        >
          Terms of Use
        </button>{" "}
        and{" "}
        <button
          onClick={() => setModalType("privacy")}
          className="text-[#a30a24] hover:underline"
        >
          Privacy Notice
        </button>
        .
      </div>

      {modalType && (
        <Modal
          title={modalType === "terms" ? "Terms of Use" : "Privacy Notice"}
          content={modalType === "terms" ? termsContent : privacyContent}
          onClose={() => setModalType(null)}
        />
      )}
    </main>
  );
}
