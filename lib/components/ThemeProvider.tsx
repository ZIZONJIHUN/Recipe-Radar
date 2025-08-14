'use client'

import React, { useEffect, useState } from 'react'
import { ThemeContext, type Theme } from '@/lib/hooks/use-theme'

interface IThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
}

export function ThemeProvider({ 
  children, 
  defaultTheme = 'light' 
}: IThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    // 로컬 스토리지에서 저장된 테마 불러오기
    const savedTheme = localStorage.getItem('theme') as Theme | null
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme)
    } else {
      // 시스템 선호도 확인
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
    }
  }, [])

  useEffect(() => {
    // DOM에 테마 클래스 적용 및 로컬 스토리지에 저장
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    localStorage.setItem('theme', theme)

    // CSS 변수 업데이트
    if (theme === 'dark') {
      root.style.setProperty('--background', '#222222')
      root.style.setProperty('--foreground', '#FFFFFF')
    } else {
      root.style.setProperty('--background', '#FFFFFF')
      root.style.setProperty('--foreground', '#222222')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const value = {
    theme,
    setTheme,
    toggleTheme
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}