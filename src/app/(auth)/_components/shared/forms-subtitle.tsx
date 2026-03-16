interface FormsSubtitleProps {
  text: string;
}

export default function FormsSubtitle({ text }: FormsSubtitleProps) {
  return (
    <div className="text-2xl text-primary font-inter font-bold">{text}</div>
  );
}
