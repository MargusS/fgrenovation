import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: "default" | "muted" | "dark";
}

export function Section({
  children,
  className,
  id,
  background = "default",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 md:py-28 lg:py-0",
        background === "default" && "bg-background",
        background === "muted" && "bg-muted",
        background === "dark" && "bg-foreground text-background",
        className
      )}
    >
      {children}
    </section>
  );
}
