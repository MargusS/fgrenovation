import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
}

export function Container({
  children,
  className,
  size = "default",
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 md:px-8",
        size === "default" && "max-w-5xl",
        size === "wide" && "max-w-6xl",
        size === "narrow" && "max-w-3xl",
        className
      )}
    >
      {children}
    </div>
  );
}
