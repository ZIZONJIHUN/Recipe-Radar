import React from 'react'
import { cn } from '@/lib/utils/cn'
import Icon from './Icon'

export interface IChipProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  closable?: boolean
  disabled?: boolean
  icon?: React.ReactNode
  onClose?: () => void
  onClick?: () => void
  className?: string
}

const Chip: React.FC<IChipProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  closable = false,
  disabled = false,
  icon,
  onClose,
  onClick,
  className
}) => {
  const baseClasses = 'inline-flex items-center font-medium transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#FF385C]/20'
  
  const variantClasses = {
    primary: 'bg-[#FF385C]/10 text-[#FF385C] border border-[#FF385C]/20 hover:bg-[#FF385C]/20',
    secondary: 'bg-[#F7F7F7] text-[#222222] border border-transparent hover:bg-[#EBEBEB]',
    outline: 'bg-transparent text-[#6A6A6A] border border-[#DDDDDD] hover:bg-[#F7F7F7]'
  }
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1 rounded-3xl',
    md: 'px-4 py-2 text-sm gap-1.5 rounded-3xl',
    lg: 'px-5 py-2.5 text-base gap-2 rounded-3xl'
  }

  const disabledClasses = 'opacity-50 cursor-not-allowed hover:bg-current'
  const clickableClasses = onClick && !disabled ? 'cursor-pointer' : ''

  return (
    <span
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled && disabledClasses,
        clickableClasses,
        className
      )}
      onClick={!disabled ? onClick : undefined}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {closable && !disabled && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClose?.()
          }}
          className="flex-shrink-0 ml-1 hover:bg-black/10 rounded-full p-0.5 transition-colors"
        >
          <Icon name="close" size="sm" />
        </button>
      )}
    </span>
  )
}

export default Chip