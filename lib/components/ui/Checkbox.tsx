import React from 'react'
import { cn } from '@/lib/utils/cn'

export interface ICheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
  indeterminate?: boolean
}

const Checkbox = React.forwardRef<HTMLInputElement, ICheckboxProps>(
  ({ className, label, error, indeterminate = false, id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`

    return (
      <div className="flex items-start space-x-2">
        <div className="relative">
          <input
            type="checkbox"
            id={checkboxId}
            ref={ref}
            className={cn(
              'w-5 h-5 rounded border-2 border-neutral-gray-400 bg-neutral-white',
              'focus:outline-none focus:ring-2 focus:ring-primary/20',
              'checked:bg-primary checked:border-primary',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error && 'border-semantic-error',
              className
            )}
            {...props}
          />
          {/* Custom checkmark */}
          <svg 
            className="absolute inset-0 w-5 h-5 text-white pointer-events-none opacity-0 peer-checked:opacity-100"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        {label && (
          <div>
            <label 
              htmlFor={checkboxId}
              className="text-lg text-neutral-gray-900 cursor-pointer"
            >
              {label}
            </label>
            {error && (
              <p className="text-md text-semantic-error mt-1">
                {error}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export default Checkbox