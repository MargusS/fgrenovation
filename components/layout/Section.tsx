import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: "default" | "muted" | "dark";
  /** Tailwind max-height utility override, e.g. 'max-h-[800px]' */
  maxHeight?: string;
}

export function Section({
  children,
  className,
  id,
  background = "default",
  maxHeight,
}: SectionProps) {
  // default height: at most viewport height but capped at 1130px
  // (keeps full-screen feel up to a large viewport, then stops growing)
  const maxHClass = maxHeight ?? "h-[min(100vh,1130px)] overflow-hidden";

  return (
    <section
      id={id}
      className={cn(
        // keep vertical spacing but constrain height and ensure images adapt via global rule
        "py-20 md:py-28 lg:py-0 section-img-fit",
        maxHClass,
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
