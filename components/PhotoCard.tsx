type Props = { src: string };

export default function PhotoCard({ src }: Props) {
  return (
    <div className="break-inside-avoid mb-4 bg-white rounded shadow p-2">
      <img
        src={src}
        alt="client photo"
        className="w-full h-auto object-cover rounded mb-2"
      />
      <a href={src} download className="text-sm text-blue-500 hover:underline">
        Download
      </a>
    </div>
  );
}
