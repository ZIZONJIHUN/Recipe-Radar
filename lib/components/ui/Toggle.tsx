'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils/cn'

export interface IToggleProps {
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
  label?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const Toggle: React.FC<IToggleProps> = ({
  checked,
  defaultChecked = false,
  disabled = false,
  onChange,
  label,
  size = 'md',
  className
}) => {
  const [isChecked, setIsChecked] = useState(checked ?? defaultChecked)
  
  const handleToggle = () => {
    if (disabled) return
    const newChecked = !isChecked
    setIsChecked(newChecked)
    onChange?.(newChecked)
  }

  const sizeClasses = {
    sm: {
      container: 'w-8 h-4',
      thumb: 'w-3 h-3'
    },
    md: {
      container: 'w-11 h-6',
      thumb: 'w-5 h-5'
    },
    lg: {
      container: 'w-14 h-7',
      thumb: 'w-6 h-6'
    }
  }

  const toggleId = `toggle-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={cn('flex items-center space-x-3', className)}>
      <button
        id={toggleId}
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={handleToggle}
        className={cn(
          'relative inline-flex flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          sizeClasses[size].container,
          isChecked ? 'bg-primary' : 'bg-neutral-gray-400'
        )}
      >
        <span
          className={cn(
            'pointer-events-none inline-block rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out',
            sizeClasses[size].thumb,
            isChecked 
              ? size === 'sm' ? 'translate-x-4' : size === 'md' ? 'translate-x-5' : 'translate-x-7'
              : 'translate-x-0'
          )}
        />
      </button>
      
      {label && (
        <label 
          htmlFor={toggleId}
          className="text-lg text-neutral-gray-900 cursor-pointer"
        >
          {label}
        </label>
      )}
    </div>
  )
}

export default Toggle