import React from 'react'
import { cn } from '@/lib/utils/cn'

export interface IProgressBarProps {
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'success' | 'warning' | 'error'
  showPercentage?: boolean
  className?: string
}

const ProgressBar: React.FC<IProgressBarProps> = ({
  value,
  max = 100,
  size = 'md',
  variant = 'primary',
  showPercentage = false,
  className
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  }

  const variantClasses = {
    primary: 'bg-primary',
    success: 'bg-semantic-success',
    warning: 'bg-semantic-warning',
    error: 'bg-semantic-error'
  }

  return (
    <div className={cn('w-full', className)}>
      <div className={cn(
        'w-full bg-neutral-gray-300 rounded-full overflow-hidden',
        sizeClasses[size]
      )}>
        <div
          className={cn(
            'h-full transition-all duration-300 ease-out rounded-full',
            variantClasses[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showPercentage && (
        <div className="mt-2 text-md text-neutral-gray-700">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  )
}

export default ProgressBar