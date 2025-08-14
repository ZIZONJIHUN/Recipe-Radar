import React from 'react'
import { cn } from '@/lib/utils/cn'

export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

let inputCounter = 0;

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ className, label, error, helperText, type = 'text', id, ...props }, ref) => {
    const inputId = React.useMemo(() => {
      return id || `input-${++inputCounter}`;
    }, [id]);
    
    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-[#222222] mb-2"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          className={cn(
            'w-full px-4 py-3 bg-white border border-[#DDDDDD] rounded-lg text-base text-[#222222] placeholder-[#6A6A6A]',
            'focus:outline-none focus:border-[#FF385C] focus:ring-2 focus:ring-[#FF385C]/20',
            'disabled:bg-[#F7F7F7] disabled:cursor-not-allowed',
            error && 'border-[#FF385C] focus:border-[#FF385C] focus:ring-[#FF385C]/20',
            className
          )}
          ref={ref}
          {...props}
        />
        {(error || helperText) && (
          <p className={cn(
            'mt-1 text-md',
            error ? 'text-[#FF385C]' : 'text-[#6A6A6A]'
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input