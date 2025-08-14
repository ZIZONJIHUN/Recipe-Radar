import React from 'react'
import { cn } from '@/lib/utils/cn'

export interface ITagProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  closable?: boolean
  onClose?: () => void
  className?: string
}

const Tag: React.FC<ITagProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  closable = false,
  onClose,
  className
}) => {
  const variantClasses = {
    primary: 'bg-primary/10 text-primary border border-primary/20',
    secondary: 'bg-neutral-gray-200 text-neutral-gray-900 border border-neutral-gray-300',
    outline: 'bg-transparent text-neutral-gray-700 border border-neutral-gray-400'
  }
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-md',
    lg: 'px-4 py-2 text-lg'
  }

  return (
    <span className={cn(
      'inline-flex items-center rounded-full font-medium',
      variantClasses[variant],
      sizeClasses[size],
      className
    )}>
      {children}
      {closable && (
        <button
          onClick={onClose}
          className="ml-2 hover:bg-black/10 rounded-full p-0.5 transition-colors"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  )
}

export default Tag