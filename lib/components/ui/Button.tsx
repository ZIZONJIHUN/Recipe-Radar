import React from 'react'
import { cn } from '@/lib/utils/cn'

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'icon'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    loading = false, 
    disabled, 
    children, 
    ...props 
  }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-150 ease-in-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variantClasses = {
      primary: 'bg-[#FF385C] text-white border-none hover:bg-[#E31E3F] focus:outline focus:outline-2 focus:outline-[#FF385C]',
      secondary: 'bg-transparent text-[#222222] border border-[#DDDDDD] hover:bg-[#F7F7F7] focus:outline focus:outline-2 focus:outline-[#FF385C]',
      icon: 'bg-transparent text-[#222222] border-none hover:bg-[#F7F7F7] rounded-full focus:outline focus:outline-2 focus:outline-[#FF385C]'
    }
    
    const sizeClasses = {
      sm: variant === 'icon' ? 'p-2' : 'px-4 py-2 text-sm rounded-lg',
      md: variant === 'icon' ? 'p-2' : 'px-6 py-[14px] text-base font-semibold rounded-lg',
      lg: variant === 'icon' ? 'p-3' : 'px-8 py-4 text-lg font-semibold rounded-lg'
    }

    return (
      <button
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          loading && 'opacity-75 cursor-wait',
          className
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading ? (
          <>
            <svg 
              className="animate-spin -ml-1 mr-2 h-4 w-4" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            로딩 중...
          </>
        ) : children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button