import { ChevronDown } from "lucide-react";

export default function ScrollToView() {
  return (
    <div className="sticky flex items-center flex-col gap-1 z-50 bottom-0 left-0 right-0 p-2.5 bg-white text-center text-gray-600">
      <p>Scroll to view more</p>
      <ChevronDown width={18} height={18} />
    </div>
  );
}
