import Image from "next/image";

export default function SideBarFooter() {
  return (
    <div className="flex items-center gap-2">
      <div>
        <Image src="/default-avatar.png" alt="User" width={40} height={40} />
      </div>
      <div>
        <p className="text-primary font-medium">John Doe</p>
        <p className="text-sm text-gray-400">john.doe@example.com</p>
      </div>
    </div>
  );
}
