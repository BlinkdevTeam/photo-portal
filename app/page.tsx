"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "@/components/modal";

export default function Home() {
  const [code, setCode] = useState("");
  const router = useRouter();

  const [modalType, setModalType] = useState<"terms" | "privacy" | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/gallery?code=${code}`);
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
    <main className="flex flex-col items-center justify-center gap-10 min-h-screen p-4 text-center text-black">
      <div>
        <h1 className="text-4xl mb-4">
          Welcome to{" "}
          <span className="font-bold">
            <span className="text-[#a30a24]">Blink</span> Creative Studio{" "}
          </span>{" "}
          Digital Photo Access Portal
        </h1>
        <p className="mb-6">
          Easily view and download your professionally captured memories. Just
          enter your access code to view your private gallery.
        </p>
      </div>
      <div>
        <h2 className="text-2xl mb-4">Access Your Photo Gallery</h2>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md flex flex-col sm:flex-row gap-2 mb-4"
        >
          <input
            className="flex-1 border px-4 py-2 rounded w-full"
            placeholder="Enter access code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto">
            Enter
          </button>
        </form>
      </div>
      <div className="text-sm text-gray-600 mt-4">
        By accessing your gallery, you agree to our{" "}
        <button
          onClick={() => setModalType("terms")}
          className="text-blue-500 hover:underline"
        >
          Terms of Use
        </button>{" "}
        and{" "}
        <button
          onClick={() => setModalType("privacy")}
          className="text-blue-500 hover:underline"
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
