import { cn } from "@/lib/utils";

type Props = {
  label: string;
  className?: string;
};

export default function SectionLabel({ label, className }: Props) {
  return (
    <span
      className={cn(
        "block text-xs uppercase tracking-widest text-muted font-mono mb-4",
        className
      )}
    >
      {label}
    </span>
  );
}
