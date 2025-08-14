'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils/cn'

export interface ISelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface ISelectProps {
  options: ISelectOption[]
  value?: string
  defaultValue?: string
  placeholder?: string
  label?: string
  error?: string
  helperText?: string
  disabled?: boolean
  onChange?: (value: string) => void
  className?: string
}

let selectCounter = 0;

const Select: React.FC<ISelectProps> = ({
  options,
  value,
  defaultValue,
  placeholder = '선택하세요',
  label,
  error,
  helperText,
  disabled = false,
  onChange,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value || defaultValue || '')
  
  const selectedOption = options?.find(opt => opt.value === selectedValue)
  const selectId = React.useMemo(() => `select-${++selectCounter}`, [])

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue)
    onChange?.(optionValue)
    setIsOpen(false)
  }

  return (
    <div className={cn('relative w-full', className)}>
      {label && (
        <label 
          htmlFor={selectId}
          className="block text-sm font-medium text-[#222222] mb-2"
        >
          {label}
        </label>
      )}
      
      <button
        type="button"
        id={selectId}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          'w-full px-4 py-3 bg-white border border-[#DDDDDD] rounded-lg text-base text-left',
          'focus:outline-none focus:border-[#FF385C] focus:ring-2 focus:ring-[#FF385C]/20',
          'disabled:bg-[#F7F7F7] disabled:cursor-not-allowed',
          'flex items-center justify-between',
          error && 'border-[#FF385C] focus:border-[#FF385C] focus:ring-[#FF385C]/20'
        )}
      >
        <span className={cn(
          selectedOption ? 'text-[#222222]' : 'text-[#6A6A6A]'
        )}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg 
          className={cn(
            'w-5 h-5 transition-transform',
            isOpen && 'transform rotate-180'
          )} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-[#DDDDDD] rounded-lg shadow-lg">
          <div className="py-1 max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                disabled={option.disabled}
                onClick={() => !option.disabled && handleSelect(option.value)}
                className={cn(
                  'w-full px-4 py-2 text-left text-base hover:bg-[#F7F7F7]',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  selectedValue === option.value && 'bg-[#FF385C]/10 text-[#FF385C]'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {(error || helperText) && (
        <p className={cn(
          'mt-1 text-md',
          error ? 'text-[#FF385C]' : 'text-[#6A6A6A]'
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  )
}

export default Select