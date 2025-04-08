// components/Modal.tsx
type ModalProps = {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
};

export default function Modal({ title, content, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center text-start z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full p-4 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold text-[#a30a24] mb-4">{title}</h2>
        <div className="text-sm text-gray-700 max-h-96 overflow-y-auto">
          {content}
        </div>
      </div>
    </div>
  );
}
