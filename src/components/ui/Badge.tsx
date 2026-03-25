import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "blue" | "orange" | "green" | "red" | "gray"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "border-transparent bg-zinc-900 text-zinc-50 hover:bg-zinc-900/80": variant === "default",
          "border-transparent bg-primary/10 text-primary": variant === "blue",
          "border-transparent bg-accent/10 text-accent-dark": variant === "orange",
          "border-transparent bg-green-100 text-green-700": variant === "green",
          "border-transparent bg-red-100 text-red-700": variant === "red",
          "border-transparent bg-zinc-100 text-zinc-700": variant === "gray",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
