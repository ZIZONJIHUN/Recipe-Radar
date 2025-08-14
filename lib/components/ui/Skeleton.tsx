import React from 'react'
import { cn } from '@/lib/utils/cn'

export interface ISkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
  variant?: 'text' | 'rectangular' | 'circular'
  animation?: 'pulse' | 'wave' | 'none'
}

const Skeleton: React.FC<ISkeletonProps> = ({
  className,
  width,
  height,
  variant = 'rectangular',
  animation = 'pulse'
}) => {
  const variantClasses = {
    text: 'rounded',
    rectangular: 'rounded-md',
    circular: 'rounded-full'
  }

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-bounce',
    none: ''
  }

  const style: React.CSSProperties = {}
  if (width) style.width = typeof width === 'number' ? `${width}px` : width
  if (height) style.height = typeof height === 'number' ? `${height}px` : height

  return (
    <div
      className={cn(
        'bg-neutral-gray-300',
        variantClasses[variant],
        animationClasses[animation],
        !width && 'w-full',
        !height && variant === 'text' && 'h-4',
        !height && variant === 'rectangular' && 'h-20',
        !height && variant === 'circular' && 'h-12 w-12',
        className
      )}
      style={style}
    />
  )
}

export default Skeleton