import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "danger";
type Size = "sm" | "md";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children: ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-emerald-500 text-white hover:bg-emerald-400 hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(52,211,153,0.3)]",
  ghost:
    "bg-transparent text-muted border border-border hover:bg-surface-2 hover:text-text hover:border-border-2",
  danger:
    "bg-red-500/10 text-red-400 border border-transparent hover:bg-red-500/20",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-[13px]",
  md: "px-4 py-2 text-[14px]",
};

export function Button({
  variant = "ghost",
  size = "md",
  loading,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg font-medium font-sans transition-all duration-150 whitespace-nowrap cursor-pointer",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {loading ? <span className="animate-spin">↻</span> : null}
      {children}
    </button>
  );
}
