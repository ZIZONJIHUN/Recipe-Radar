import React from 'react'
import NextLink from 'next/link'
import { cn } from '@/lib/utils/cn'

export interface ILinkProps extends React.ComponentProps<typeof NextLink> {
  variant?: 'primary' | 'secondary' | 'underlined' | 'subtle'
  size?: 'sm' | 'md' | 'lg'
  external?: boolean
  children: React.ReactNode
  className?: string
}

const Link = React.forwardRef<HTMLAnchorElement, ILinkProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    external = false, 
    children, 
    href,
    ...props 
  }, ref) => {
    const baseClasses = 'transition-colors duration-normal focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded-sm'
    
    const variantClasses = {
      primary: 'text-primary hover:text-primary-dark',
      secondary: 'text-neutral-gray-700 hover:text-neutral-gray-900',
      underlined: 'text-neutral-gray-900 underline hover:text-primary',
      subtle: 'text-neutral-gray-700 hover:underline'
    }
    
    const sizeClasses = {
      sm: 'text-md',
      md: 'text-lg',
      lg: 'text-xl'
    }

    if (external) {
      return (
        <a
          href={href as string}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            baseClasses,
            variantClasses[variant],
            sizeClasses[size],
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
          <svg 
            className="inline w-4 h-4 ml-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
            />
          </svg>
        </a>
      )
    }

    return (
      <NextLink
        href={href}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </NextLink>
    )
  }
)

Link.displayName = 'Link'

export default Link