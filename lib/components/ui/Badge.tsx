import React from 'react'
import { cn } from '@/lib/utils/cn'

export interface IBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const Badge = React.forwardRef<HTMLSpanElement, IBadgeProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const variantClasses = {
      primary: 'bg-[#FF385C] text-white',
      secondary: 'bg-[#EBEBEB] text-[#222222]',
      success: 'bg-[#00A86B] text-white',
      warning: 'bg-[#FFB400] text-[#222222]',
      error: 'bg-[#FF385C] text-white'
    }
    
    const sizeClasses = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-2 py-1 text-xs font-semibold',
      lg: 'px-3 py-1.5 text-sm font-semibold'
    }

    return (
      <span
        className={cn(
          'inline-flex items-center rounded-sm',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export default Badge