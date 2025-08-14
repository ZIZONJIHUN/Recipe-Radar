import React from 'react'
import { cn } from '@/lib/utils/cn'

export interface ITextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}

const Textarea = React.forwardRef<HTMLTextAreaElement, ITextareaProps>(
  ({ className, label, error, helperText, resize = 'vertical', id, ...props }, ref) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`
    
    const resizeClasses = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize'
    }

    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={textareaId}
            className="block text-lg font-medium text-neutral-gray-900 mb-2"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          className={cn(
            'w-full px-4 py-3 bg-neutral-white border border-neutral-gray-400 rounded-md text-xl text-neutral-gray-900 placeholder-neutral-gray-700',
            'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20',
            'disabled:bg-neutral-gray-200 disabled:cursor-not-allowed',
            'min-h-[100px]',
            resizeClasses[resize],
            error && 'border-semantic-error focus:border-semantic-error focus:ring-semantic-error/20',
            className
          )}
          ref={ref}
          {...props}
        />
        {(error || helperText) && (
          <p className={cn(
            'mt-1 text-md',
            error ? 'text-semantic-error' : 'text-neutral-gray-700'
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export default Textarea