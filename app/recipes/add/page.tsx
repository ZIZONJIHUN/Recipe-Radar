'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import RecipeForm from './components/RecipeForm'
import { IRecipeCreate } from '@/types'

const RecipeAddPage: React.FC = () => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (recipe: IRecipeCreate) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || '레시피 저장에 실패했습니다.')
      }

      if (result.success) {
        // 성공 시 레시피 상세 페이지로 이동
        router.push(`/recipes/${result.data.id}`)
      } else {
        throw new Error(result.error || '알 수 없는 오류가 발생했습니다.')
      }
    } catch (error) {
      console.error('레시피 저장 오류:', error)
      alert(error instanceof Error ? error.message : '레시피 저장 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <RecipeForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  )
}

export default RecipeAddPage