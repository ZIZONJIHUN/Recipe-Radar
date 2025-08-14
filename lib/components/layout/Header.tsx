'use client'

import Link from 'next/link'
import { Navbar, NavbarBrand, NavbarContent, ThemeToggle, Icon } from '@/lib/components/ui'

export default function Header() {
  return (
    <Navbar className="border-b border-neutral-gray-400 bg-neutral-white dark:bg-neutral-gray-900 dark:border-neutral-gray-600">
      <NavbarBrand href="/">
        <Icon name="star" className="text-primary" size="lg" />
        <span className="text-2xl font-bold text-neutral-gray-900 dark:text-neutral-white font-primary">
          Recipe Rader
        </span>
      </NavbarBrand>
      
      <NavbarContent>
        <div className="flex items-center space-x-6">
          <Link 
            href="/" 
            className="text-lg text-neutral-gray-700 dark:text-neutral-gray-300 hover:text-primary transition-colors"
          >
            홈
          </Link>
          <Link 
            href="/components" 
            className="text-lg text-neutral-gray-700 dark:text-neutral-gray-300 hover:text-primary transition-colors"
          >
            컴포넌트
          </Link>
          <Link 
            href="/recipes" 
            className="text-lg text-neutral-gray-700 dark:text-neutral-gray-300 hover:text-primary transition-colors"
          >
            레시피
          </Link>
          <Link 
            href="/recipes/add" 
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            레시피 추가
          </Link>
          <Link 
            href="/login" 
            className="text-lg text-neutral-gray-700 dark:text-neutral-gray-300 hover:text-primary transition-colors"
          >
            로그인
          </Link>
          <ThemeToggle size="md" />
        </div>
      </NavbarContent>
    </Navbar>
  )
}