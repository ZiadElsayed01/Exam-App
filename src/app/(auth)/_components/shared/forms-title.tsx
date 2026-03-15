interface FormsTitleProps {
  title: string;
}

export default function FormsTitle({ title }: FormsTitleProps) {
  return <h2 className="text-3xl font-bold font-inter">{title}</h2>;
}
