// components/GalleryGrid.tsx
import PhotoCard from "./PhotoCard";

type Props = {
  photos: string[];
};

export default function GalleryGrid({ photos }: Props) {
  return (
    <div className="columns-1 sm:columns-1 md:columns-3 lg:columns-4 gap-4">
      {photos.map((src, index) => (
        <PhotoCard key={index} src={src} />
      ))}
    </div>
  );
}
