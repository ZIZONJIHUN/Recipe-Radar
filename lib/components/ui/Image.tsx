'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils/cn'

export interface IImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string
  loading?: 'eager' | 'lazy'
  aspectRatio?: 'square' | 'video' | 'auto'
}

const Image = React.forwardRef<HTMLImageElement, IImageProps>(
  ({ 
    className, 
    src, 
    alt, 
    fallbackSrc, 
    loading = 'lazy', 
    aspectRatio = 'auto', 
    onError,
    ...props 
  }, ref) => {
    const [imgSrc, setImgSrc] = useState(src)
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    const aspectRatioClasses = {
      square: 'aspect-square',
      video: 'aspect-video', 
      auto: ''
    }

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setHasError(true)
      setIsLoading(false)
      if (fallbackSrc && imgSrc !== fallbackSrc) {
        setImgSrc(fallbackSrc)
        setHasError(false)
      }
      onError?.(e)
    }

    const handleLoad = () => {
      setIsLoading(false)
      setHasError(false)
    }

    if (hasError && !fallbackSrc) {
      return (
        <div className={cn(
          'flex items-center justify-center bg-neutral-gray-300 text-neutral-gray-700',
          aspectRatioClasses[aspectRatio],
          className
        )}>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )
    }

    return (
      <div className={cn('relative', aspectRatioClasses[aspectRatio])}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-gray-300 animate-pulse">
            <svg className="w-8 h-8 text-neutral-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <img
          ref={ref}
          src={imgSrc}
          alt={alt}
          loading={loading}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-300',
            isLoading ? 'opacity-0' : 'opacity-100',
            className
          )}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      </div>
    )
  }
)

Image.displayName = 'Image'

export default Image