import React from 'react'
import { cn } from '@/lib/utils/cn'

export interface ILabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const Label = React.forwardRef<HTMLLabelElement, ILabelProps>(
  ({ className, required = false, size = 'md', children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'text-md',
      md: 'text-lg',
      lg: 'text-xl'
    }

    return (
      <label
        className={cn(
          'font-medium text-neutral-gray-900',
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
        {required && <span className="text-semantic-error ml-1">*</span>}
      </label>
    )
  }
)

Label.displayName = 'Label'

export default Label