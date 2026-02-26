import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export default function Divider({ className }: Props) {
  return (
    <hr className={cn("border-0 border-t border-border", className)} />
  );
}
