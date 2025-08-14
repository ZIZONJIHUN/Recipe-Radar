import React from 'react'
import { cn } from '@/lib/utils/cn'

export interface IAvatarProps {
  src?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fallback?: string
  className?: string
}

const Avatar: React.FC<IAvatarProps> = ({
  src,
  alt = '아바타',
  size = 'md',
  fallback,
  className
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-md',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-24 h-24 text-2xl'
  }

  const fallbackText = fallback || alt?.charAt(0)?.toUpperCase() || 'U'

  return (
    <div className={cn(
      'relative inline-flex items-center justify-center overflow-hidden rounded-full bg-neutral-gray-300',
      sizeClasses[size],
      className
    )}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="font-medium text-neutral-gray-700">
          {fallbackText}
        </span>
      )}
    </div>
  )
}

export default Avatar