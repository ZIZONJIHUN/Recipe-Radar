'use client'

import React from 'react'
import { cn } from '@/lib/utils/cn'
import { useTheme } from '@/lib/hooks/use-theme'
import Button from './Button'
import Icon from './Icon'

export interface IThemeToggleProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'icon' | 'button'
}

const ThemeToggle: React.FC<IThemeToggleProps> = ({
  className,
  size = 'md',
  variant = 'icon'
}) => {
  const { theme, toggleTheme } = useTheme()

  const isDark = theme === 'dark'

  if (variant === 'button') {
    return (
      <Button
        variant="secondary"
        size={size}
        onClick={toggleTheme}
        className={cn('gap-2', className)}
      >
        {isDark ? (
          <>
            <Icon name="sun" size={size === 'lg' ? 'md' : 'sm'} />
            라이트 모드
          </>
        ) : (
          <>
            <Icon name="moon" size={size === 'lg' ? 'md' : 'sm'} />
            다크 모드
          </>
        )}
      </Button>
    )
  }

  return (
    <Button
      variant="icon"
      size={size}
      onClick={toggleTheme}
      className={cn(
        'transition-colors duration-200',
        isDark ? 'text-yellow-400 hover:text-yellow-300' : 'text-neutral-gray-700 hover:text-neutral-gray-900',
        className
      )}
    >
      {isDark ? (
        <Icon name="sun" size={size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'md'} />
      ) : (
        <Icon name="moon" size={size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'md'} />
      )}
    </Button>
  )
}

export default ThemeToggle