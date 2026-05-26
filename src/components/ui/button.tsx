import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-sky-400 text-slate-950 shadow-[0_0_28px_rgba(46,175,255,0.28)] hover:bg-sky-300",
  secondary:
    "border border-white/10 bg-white/[0.06] text-slate-100 hover:bg-white/[0.1]",
  ghost: "text-slate-300 hover:bg-white/[0.07] hover:text-white",
  danger:
    "border border-red-400/30 bg-red-500/10 text-red-200 hover:bg-red-500/20",
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
