import Image from "next/image";
import { Download, Trash2 } from "lucide-react";

interface UploadedImageProps {
  src: string;
  fileName?: string;
  fileSize?: string;
  onDownload?: () => void;
  onDelete?: () => void;
}

export default function UploadedImage({
  src,
  fileName,
  fileSize,
  onDownload,
  onDelete,
}: UploadedImageProps) {
  return (
    <div className="relative bg-gray-50 flex items-center gap-1 border border-gray-200 p-1 text-center cursor-pointer transition-colors">
      <div className="flex items-center gap-2.5">
        <Image
          src={src}
          alt="image"
          className="w-21.5 h-21.5 object-cover"
          width={86}
          height={86}
        />
      </div>
      <div className="flex items-center justify-between w-full p-2.5">
        <p>{fileName}</p>

        <div className="flex items-center gap-2.5 p-2.5">
          <p className="text-gray-400 text-sm">{fileSize}</p>
          <p className="text-gray-400 text-sm">|</p>
          {onDownload && (
            <Download
              className="text-primary w-4.5 h-4.5 cursor-pointer"
              onClick={onDownload}
            />
          )}
          {onDelete && (
            <Trash2
              className="text-red-600 w-4.5 h-4.5 cursor-pointer"
              onClick={onDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}
