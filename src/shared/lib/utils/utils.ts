import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-");
}

export function sanitize(text: string): string {
  return text.replace(/[^a-zA-Z0-9]+/g, " ");
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const timeString = date.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const dateStringFormatted = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return {
    time: timeString,
    date: dateStringFormatted,
  };
};

export const getEntityLink = (
  entityType: string,
  entityId: string,
  metadata?: { title: string; diplomaId?: string; examId?: string },
) => {
  if (!metadata || !metadata.title) {
    return null;
  }

  const slug = metadata.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  switch (entityType.toLowerCase()) {
    case "diploma":
      return `/diplomas/${slug}/${entityId}`;
    case "exam":
      return `/exams/${slug}/${entityId}`;
    case "question":
      const examId = metadata.examId || entityId;
      return `/exams/exam/question/${examId}/${slug}/${entityId}`;
    default:
      return null;
  }
};

export const getRoleColor = (role: string) => {
  switch (role) {
    case "ADMIN":
      return "text-blue-600";
    case "SUPER_ADMIN":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

export const getActionColor = (action: string) => {
  switch (action) {
    case "CREATE":
      return "text-emerald-600";
    case "UPDATE":
      return "text-yellow-600";
    case "DELETE":
      return "text-red-600";
    case "SET_IMMUTABLE":
      return " text-purple-600";
    case "SEED_DATA":
      return "text-orange-600";
    default:
      return "text-gray-600";
  }
};
