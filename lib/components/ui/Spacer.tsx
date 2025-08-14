import React from 'react'
import { cn } from '@/lib/utils/cn'

export interface ISpacerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  direction?: 'vertical' | 'horizontal'
  className?: string
}

const Spacer: React.FC<ISpacerProps> = ({
  size = 'md',
  direction = 'vertical',
  className
}) => {
  const sizeClasses = {
    xs: direction === 'vertical' ? 'h-2' : 'w-2',
    sm: direction === 'vertical' ? 'h-4' : 'w-4',
    md: direction === 'vertical' ? 'h-6' : 'w-6',
    lg: direction === 'vertical' ? 'h-8' : 'w-8',
    xl: direction === 'vertical' ? 'h-12' : 'w-12',
    '2xl': direction === 'vertical' ? 'h-16' : 'w-16',
    '3xl': direction === 'vertical' ? 'h-24' : 'w-24'
  }

  return (
    <div 
      className={cn(
        'flex-shrink-0',
        sizeClasses[size],
        className
      )}
    />
  )
}

export default Spacer