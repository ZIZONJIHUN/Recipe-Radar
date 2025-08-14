import React from 'react'
import { cn } from '@/lib/utils/cn'

export interface IRadioOption {
  value: string
  label: string
  disabled?: boolean
}

export interface IRadioGroupProps {
  name: string
  options: IRadioOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  error?: string
  className?: string
}

const RadioGroup: React.FC<IRadioGroupProps> = ({
  name,
  options,
  value,
  defaultValue,
  onChange,
  error,
  className
}) => {
  return (
    <div className={cn('space-y-3', className)}>
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <input
            type="radio"
            id={`${name}-${option.value}`}
            name={name}
            value={option.value}
            checked={value === option.value}
            defaultChecked={defaultValue === option.value}
            disabled={option.disabled}
            onChange={(e) => onChange?.(e.target.value)}
            className={cn(
              'w-5 h-5 border-2 border-neutral-gray-400 bg-neutral-white rounded-full',
              'focus:outline-none focus:ring-2 focus:ring-primary/20',
              'checked:border-primary checked:bg-primary',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error && 'border-semantic-error'
            )}
          />
          <label 
            htmlFor={`${name}-${option.value}`}
            className="text-lg text-neutral-gray-900 cursor-pointer"
          >
            {option.label}
          </label>
        </div>
      ))}
      {error && (
        <p className="text-md text-semantic-error">
          {error}
        </p>
      )}
    </div>
  )
}

export default RadioGroup