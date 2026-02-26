import { cn } from "@/lib/utils";

type Props = {
  children: string;
  variant?: "default" | "accent";
  className?: string;
};

export default function Tag({
  children,
  variant = "default",
  className,
}: Props) {
  return (
    <span
      className={cn(
        "inline-block text-xs px-2.5 py-1 rounded border font-mono",
        variant === "default"
          ? "bg-surface border-border text-muted"
          : "bg-accent/10 border-accent/30 text-glow",
        className
      )}
    >
      {children}
    </span>
  );
}
