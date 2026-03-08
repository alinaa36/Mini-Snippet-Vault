import {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

interface FormGroupProps {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}


export function FormGroup({
  label,
  required,
  error,
  hint,
  children,
}: FormGroupProps) {
  return (
    <div className="mb-4">
      <label className="block font-mono text-[11px] font-medium tracking-widest uppercase text-muted mb-1.5">
        {label} {required && <span className="text-emerald-400">*</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-[12px] text-red-400">{error}</p>}
      {hint && !error && (
        <p className="mt-1.5 text-[11.5px] text-subtle">{hint}</p>
      )}
    </div>
  );
}

export function Input({ error, className, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={cn(
        "w-full bg-surface-2 border rounded-lg text-text font-sans text-[14px] px-3.5 py-2.5",
        "placeholder:text-subtle outline-none transition-all duration-150",
        error
          ? "border-red-500/60 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.12)]"
          : "border-border focus:border-emerald-500/60 focus:shadow-[0_0_0_3px_rgba(52,211,153,0.10)]",
        className,
      )}
    />
  );
}

export function Textarea({ error, className, ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full bg-surface-2 border rounded-lg text-text font-mono text-[13px] px-3.5 py-2.5 resize-y min-h-[100px] leading-relaxed",
        "placeholder:text-subtle outline-none transition-all duration-150",
        error
          ? "border-red-500/60 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.12)]"
          : "border-border focus:border-emerald-500/60 focus:shadow-[0_0_0_3px_rgba(52,211,153,0.10)]",
        className,
      )}
    />
  );
}

export function Select({ error, className, children, ...props }: SelectProps) {
  return (
    <select
      {...props}
      className={cn(
        "w-full bg-surface-2 border rounded-lg text-text font-sans text-[14px] px-3.5 py-2.5 appearance-none",
        "outline-none transition-all duration-150 cursor-pointer",
        "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238a8278' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")] bg-no-repeat bg-[right_14px_center] pr-9",
        error
          ? "border-red-500/60"
          : "border-border focus:border-emerald-500/60 focus:shadow-[0_0_0_3px_rgba(52,211,153,0.10)]",
        className,
      )}
    >
      {children}
    </select>
  );
}
