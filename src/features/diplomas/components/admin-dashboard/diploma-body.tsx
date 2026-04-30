import { Label } from "@/shared/components/ui/label";
import { IDiploma } from "../../types/diploma";
import Image from "next/image";

interface DiplomaBodyProps {
  diplomaData: IDiploma;
}

export default function DiplomaBody({ diplomaData }: DiplomaBodyProps) {
  return (
    <div className="p-4 flex flex-col gap-4 bg-white">
      <div className="space-y-1">
        <Label className="text-sm text-gray-400 font-normal">Image</Label>

        {diplomaData.image ? (
          <div className="relative w-75 h-75">
            <Image
              className="h-10 w-10 object-cover"
              src={diplomaData.image}
              alt={diplomaData.title}
              fill
            />
          </div>
        ) : (
          <div className="relative flex items-center justify-center bg-gray-100 text-lg w-75 h-75 text-gray-800">
            No Image
          </div>
        )}
      </div>

      <div className="space-y-1">
        <Label className="text-sm text-gray-400 font-normal">Title</Label>
        <p className="text-gray-800 text-sm">{diplomaData.title}</p>
      </div>

      <div className="space-y-1">
        <Label className="text-sm text-gray-400 font-normal">Description</Label>
        <p className="text-gray-800 text-sm">{diplomaData.description}</p>
      </div>
    </div>
  );
}
