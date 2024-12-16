import * as React from "react"
import { cn } from "@/lib/utils"

export const Card = React.forwardRef(function Card({ 
  className, 
  ...props 
}: React.HTMLAttributes<HTMLDivElement>, 
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  )
})
Card.displayName = "Card"

export const CardContent = React.forwardRef(function CardContent({ 
  className, 
  ...props 
}: React.HTMLAttributes<HTMLDivElement>, 
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <div 
      ref={ref} 
      className={cn("p-6 pt-0", className)} 
      {...props} 
    />
  )
})
CardContent.displayName = "CardContent"

// Add similar export modifications for other components