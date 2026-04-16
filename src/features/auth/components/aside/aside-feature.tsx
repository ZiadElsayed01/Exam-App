export interface IFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function AsideFeature({ icon, title, description }: IFeature) {
  return (
    <div className="flex gap-5">
      {/* Icon */}
      <div className="shrink-0 border-2 border-primary w-9 h-9 flex items-center justify-center text-primary">
        {icon}
      </div>
      {/* Title and description */}
      <div className="flex flex-col gap-2.5 font-geist-mono">
        <p className="text-primary font-semibold text-xl">{title}</p>
        <p className="text-gray-700 w-100.5">{description}</p>
      </div>
    </div>
  );
}
