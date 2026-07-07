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
        "py-20 lg:py-0 section-img-fit",
        // maxHClass,
        background === "default" && "bg-background",
        background === "muted" && "bg-muted",
        background === "dark" && "bg-foreground text-background",
        className
      )}
    >
      <div className="h-full flex flex-col">{children}</div>
    </section>
  );
}