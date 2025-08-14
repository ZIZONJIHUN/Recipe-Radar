'use client'

import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils/cn'
import Button from './Button'
import Icon from './Icon'

export interface INotificationProps {
  id?: string
  title: string
  description?: string
  variant?: 'info' | 'success' | 'warning' | 'error'
  duration?: number
  closable?: boolean
  actions?: {
    label: string
    onClick: () => void
    variant?: 'primary' | 'secondary'
  }[]
  onClose?: (id?: string) => void
}

const Notification: React.FC<INotificationProps> = ({
  id,
  title,
  description,
  variant = 'info',
  duration = 8000,
  closable = true,
  actions,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => onClose?.(id), 300)
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [duration, onClose, id])

  const variantClasses = {
    info: 'bg-semantic-info/10 border-semantic-info/20 text-semantic-info',
    success: 'bg-semantic-success/10 border-semantic-success/20 text-semantic-success',
    warning: 'bg-semantic-warning/10 border-semantic-warning/20 text-semantic-warning',
    error: 'bg-semantic-error/10 border-semantic-error/20 text-semantic-error'
  }

  const iconMap = {
    info: 'search',
    success: 'check',
    warning: 'minus',
    error: 'close'
  }

  return (
    <div
      className={cn(
        'fixed top-4 right-4 z-50 max-w-md rounded-lg border p-4 shadow-lg transition-all duration-300 bg-neutral-white',
        variantClasses[variant],
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <Icon name={iconMap[variant] as any} size="md" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-lg font-semibold text-neutral-gray-900 mb-1">
            {title}
          </h4>
          {description && (
            <p className="text-md text-neutral-gray-700 mb-3">
              {description}
            </p>
          )}
          
          {actions && actions.length > 0 && (
            <div className="flex gap-2">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant || 'secondary'}
                  size="sm"
                  onClick={action.onClick}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>

        {closable && (
          <button
            onClick={() => {
              setIsVisible(false)
              setTimeout(() => onClose?.(id), 300)
            }}
            className="flex-shrink-0 p-1 rounded-full hover:bg-neutral-gray-200 transition-colors text-neutral-gray-700"
          >
            <Icon name="close" size="sm" />
          </button>
        )}
      </div>
    </div>
  )
}

export default Notification