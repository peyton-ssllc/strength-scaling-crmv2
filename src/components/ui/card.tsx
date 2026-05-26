import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-white/[0.045] shadow-[0_18px_70px_rgba(0,0,0,0.22)]",
        className,
      )}
      {...props}
    />
  );
}
