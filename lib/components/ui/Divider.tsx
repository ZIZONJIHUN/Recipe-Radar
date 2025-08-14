import React from 'react'
import { cn } from '@/lib/utils/cn'

export interface IDividerProps {
  orientation?: 'horizontal' | 'vertical'
  variant?: 'solid' | 'dashed' | 'dotted'
  className?: string
  children?: React.ReactNode
}

const Divider: React.FC<IDividerProps> = ({
  orientation = 'horizontal',
  variant = 'solid',
  className,
  children
}) => {
  const orientationClasses = {
    horizontal: 'w-full border-t',
    vertical: 'h-full border-l'
  }

  const variantClasses = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted'
  }

  if (children && orientation === 'horizontal') {
    return (
      <div className={cn('flex items-center', className)}>
        <div className={cn('flex-1 border-t border-neutral-gray-400', variantClasses[variant])} />
        <div className="px-4 text-md text-neutral-gray-700">{children}</div>
        <div className={cn('flex-1 border-t border-neutral-gray-400', variantClasses[variant])} />
      </div>
    )
  }

  return (
    <hr
      className={cn(
        'border-neutral-gray-400',
        orientationClasses[orientation],
        variantClasses[variant],
        className
      )}
    />
  )
}

export default Divider