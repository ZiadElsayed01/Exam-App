import Image from "next/image";
import { IDiploma } from "../types/diploma";
import { cn } from "@/shared/lib/utils/utils";
import Link from "next/link";

interface IDiplomaItemProps {
  diploma: IDiploma;
}

export default function DiplomaItem({ diploma }: IDiplomaItemProps) {
  return (
    <Link
      href={`/${diploma.title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, "-")}/exams/${diploma.id}`}
    >
      <article
        className={cn(
          "min-h-96 p-2.5 flex flex-col justify-end relative",
          !diploma.image && "bg-blue-50",
        )}
      >
        {/* Diploma Image */}
        {diploma.image && (
          <Image
            src={diploma.image}
            alt={diploma.title}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 90vw, 400vw"
            loading="eager"
          />
        )}

        {/* Diploma Content */}
        <div className="space-y-1 z-10 bg-primary/75 text-white backdrop-blur-md p-4 h-24.5 hover:h-69.5 w-full transition-all duration-300 group">
          {/* Diploma Title */}
          <h2 className="text-xl font-semibold ">{diploma.title}</h2>

          {/* Diploma Description */}
          <p className="text-sm line-clamp-2 group-hover:overflow-auto group-hover:line-clamp-none">
            {diploma.description}
          </p>
        </div>
      </article>
    </Link>
  );
}
