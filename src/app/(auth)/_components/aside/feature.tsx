interface AuthFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function AuthFeature({
  icon,
  title,
  description,
}: AuthFeatureProps) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 border-2 border-primary w-9 h-9 flex items-center justify-center text-primary">
        {icon}
      </div>
      <div className="flex flex-col gap-2.5 font-geist-mono">
        <p className="text-primary font-semibold text-xl">{title}</p>
        <p className="text-gray-700 w-96">{description}</p>
      </div>
    </div>
  );
}
