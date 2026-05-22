import * as React from "react";

import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        variant === "primary" && "bg-primary text-white hover:opacity-90",
        variant === "secondary" && "bg-secondary text-white hover:opacity-90",
        variant === "ghost" && "bg-transparent hover:bg-muted",
        size === "sm" && "h-9 px-4 text-sm",
        size === "md" && "h-11 px-5",
        size === "lg" && "h-12 px-6 text-base",
        className
      )}
      {...props}
    />
  );
}
