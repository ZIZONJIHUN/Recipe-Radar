import React from 'react'
import { cn } from '@/lib/utils/cn'
import Link from 'next/link'

export interface INavbarProps {
  className?: string
  children?: React.ReactNode
}

const Navbar: React.FC<INavbarProps> = ({ className, children }) => {
  return (
    <nav className={cn(
      'sticky top-0 z-40 bg-transparent border-b-0',
      'h-24 px-12',
      className
    )}>
      <div className="max-w-container mx-auto h-full flex items-center justify-between">
        {children}
      </div>
    </nav>
  )
}

export interface INavbarBrandProps {
  href?: string
  children: React.ReactNode
  className?: string
}

const NavbarBrand: React.FC<INavbarBrandProps> = ({ href = '/', children, className }) => {
  return (
    <Link href={href} className={cn('flex items-center space-x-2', className)}>
      {children}
    </Link>
  )
}

export interface INavbarContentProps {
  children: React.ReactNode
  className?: string
}

const NavbarContent: React.FC<INavbarContentProps> = ({ children, className }) => {
  return (
    <div className={cn('flex items-center space-x-6', className)}>
      {children}
    </div>
  )
}

export { Navbar, NavbarBrand, NavbarContent }