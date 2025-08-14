'use client'

import React, { useEffect } from 'react'
import { cn } from '@/lib/utils/cn'
import Button from './Button'

export interface IDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm?: () => void
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'destructive'
  children?: React.ReactNode
  className?: string
}

const Dialog: React.FC<IDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = '확인',
  cancelText = '취소',
  variant = 'default',
  children,
  className
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className={cn(
        'relative bg-neutral-white rounded-lg shadow-xl w-full max-w-md animate-scale',
        className
      )}>
        <div className="p-6">
          {title && (
            <h2 className="text-2xl font-semibold text-neutral-gray-900 mb-4">
              {title}
            </h2>
          )}
          
          {description && (
            <p className="text-lg text-neutral-gray-700 mb-6">
              {description}
            </p>
          )}
          
          {children}
          
          <div className="flex justify-end space-x-3 mt-6">
            <Button 
              variant="secondary" 
              onClick={onClose}
            >
              {cancelText}
            </Button>
            {onConfirm && (
              <Button 
                variant={variant === 'destructive' ? 'primary' : 'primary'}
                onClick={() => {
                  onConfirm()
                  onClose()
                }}
                className={variant === 'destructive' ? 'bg-semantic-error hover:bg-semantic-error/80' : ''}
              >
                {confirmText}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dialog