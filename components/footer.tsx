// components/Footer.tsx

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-12">
      <div className="container mx-auto flex flex-col items-center md:flex-row md:justify-between">
        <div className="text-center md:text-left flex flex-col gap-4">
          <p className="text-lg font-semibold">
            © 2025 Blink Creative Studio. All rights reserved.
          </p>
          <p className="text-sm">Ideas made effective</p>
        </div>
        <div className="md:mt-0 text-start flex flex-col gap-4">
          <p className="text-sm">
            📧{" "}
            <a href="mailto:hello@blinkcreativestudio.com" className="">
              hello@blinkcreativestudio.com
            </a>
          </p>
          <p className="text-sm">
            📍 2F Left Wing, ES Plaza, Los Baños, Laguna
          </p>
        </div>
      </div>
    </footer>
  );
}
