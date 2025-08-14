'use client'

import React, { useState } from 'react'
import { IRecipeCreate } from '@/types'
import Input from '@/lib/components/ui/Input'
import Textarea from '@/lib/components/ui/Textarea'
import Select from '@/lib/components/ui/Select'
import Button from '@/lib/components/ui/Button'
import Card from '@/lib/components/ui/Card'
import { cn } from '@/lib/utils/cn'

interface IRecipeFormProps {
  onSubmit: (recipe: IRecipeCreate) => Promise<void>
  isSubmitting?: boolean
}

const difficultyOptions = [
  { value: 'easy', label: '쉬움' },
  { value: 'medium', label: '보통' },
  { value: 'hard', label: '어려움' }
]

const RecipeForm: React.FC<IRecipeFormProps> = ({ onSubmit, isSubmitting = false }) => {
  const [formData, setFormData] = useState<IRecipeCreate>({
    title: '',
    description: '',
    ingredients: [''],
    instructions: [''],
    prep_time: undefined,
    cook_time: undefined,
    servings: undefined,
    difficulty: undefined,
    image_url: '',
    tags: ['']
  })

  const [errors, setErrors] = useState<Partial<Record<keyof IRecipeCreate, string>>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof IRecipeCreate, string>> = {}

    if (!formData.title.trim()) {
      newErrors.title = '레시피 제목을 입력해주세요'
    }

    const validIngredients = formData.ingredients.filter(ingredient => ingredient.trim())
    if (validIngredients.length === 0) {
      newErrors.ingredients = '재료를 최소 1개 이상 입력해주세요'
    }

    const validInstructions = formData.instructions.filter(instruction => instruction.trim())
    if (validInstructions.length === 0) {
      newErrors.instructions = '조리 과정을 최소 1개 이상 입력해주세요'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const cleanedData: IRecipeCreate = {
      ...formData,
      ingredients: formData.ingredients.filter(ingredient => ingredient.trim()),
      instructions: formData.instructions.filter(instruction => instruction.trim()),
      tags: formData.tags.filter(tag => tag.trim())
    }

    try {
      await onSubmit(cleanedData)
    } catch (error) {
      console.error('레시피 저장 오류:', error)
    }
  }

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, '']
    }))
  }

  const removeIngredient = (index: number) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }))
  }

  const updateIngredient = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.map((ingredient, i) => 
        i === index ? value : ingredient
      )
    }))
  }

  const addInstruction = () => {
    setFormData(prev => ({
      ...prev,
      instructions: [...prev.instructions, '']
    }))
  }

  const removeInstruction = (index: number) => {
    setFormData(prev => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index)
    }))
  }

  const updateInstruction = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      instructions: prev.instructions.map((instruction, i) => 
        i === index ? value : instruction
      )
    }))
  }

  const addTag = () => {
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, '']
    }))
  }

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }))
  }

  const updateTag = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.map((tag, i) => 
        i === index ? value : tag
      )
    }))
  }

  return (
    <Card className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#222222] mb-2">새 레시피 추가</h2>
        <p className="text-[#6A6A6A]">맛있는 레시피를 공유해보세요!</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 기본 정보 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#222222]">기본 정보</h3>
          
          <Input
            label="레시피 제목 *"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            error={errors.title}
            placeholder="예: 김치볶음밥"
          />

          <Textarea
            label="레시피 설명"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="레시피에 대한 간단한 설명을 입력해주세요"
            rows={3}
            className="text-sm focus:border-[#FF385C] focus:ring-[#FF385C]/20"
          />

          <Input
            label="이미지 URL"
            value={formData.image_url}
            onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* 레시피 세부사항 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="준비 시간 (분)"
            type="number"
            value={formData.prep_time || ''}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              prep_time: e.target.value ? parseInt(e.target.value) : undefined 
            }))}
            placeholder="15"
            min="0"
          />

          <Input
            label="조리 시간 (분)"
            type="number"
            value={formData.cook_time || ''}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              cook_time: e.target.value ? parseInt(e.target.value) : undefined 
            }))}
            placeholder="20"
            min="0"
          />

          <Input
            label="인분"
            type="number"
            value={formData.servings || ''}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              servings: e.target.value ? parseInt(e.target.value) : undefined 
            }))}
            placeholder="2"
            min="1"
          />
        </div>

        <Select
          label="난이도"
          options={difficultyOptions}
          value={formData.difficulty}
          onChange={(value) => setFormData(prev => ({ 
            ...prev, 
            difficulty: value as 'easy' | 'medium' | 'hard' 
          }))}
          placeholder="난이도를 선택하세요"
        />

        {/* 재료 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#222222]">재료 *</h3>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={addIngredient}
            >
              재료 추가
            </Button>
          </div>
          
          {errors.ingredients && (
            <p className="text-[#FF385C] text-sm">{errors.ingredients}</p>
          )}

          <div className="space-y-2">
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={ingredient}
                  onChange={(e) => updateIngredient(index, e.target.value)}
                  placeholder={`재료 ${index + 1}`}
                  className="flex-1"
                />
                {formData.ingredients.length > 1 && (
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => removeIngredient(index)}
                    className="px-3"
                  >
                    삭제
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 조리 과정 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#222222]">조리 과정 *</h3>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={addInstruction}
            >
              단계 추가
            </Button>
          </div>

          {errors.instructions && (
            <p className="text-[#FF385C] text-sm">{errors.instructions}</p>
          )}

          <div className="space-y-2">
            {formData.instructions.map((instruction, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex-shrink-0 w-8 h-12 bg-[#FF385C]/10 rounded-lg flex items-center justify-center text-sm font-medium text-[#FF385C]">
                  {index + 1}
                </div>
                <Textarea
                  value={instruction}
                  onChange={(e) => updateInstruction(index, e.target.value)}
                  placeholder={`조리 과정 ${index + 1}번`}
                  rows={2}
                  className="flex-1 text-sm focus:border-[#FF385C] focus:ring-[#FF385C]/20"
                />
                {formData.instructions.length > 1 && (
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => removeInstruction(index)}
                    className="px-3 self-start"
                  >
                    삭제
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 태그 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#222222]">태그</h3>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={addTag}
            >
              태그 추가
            </Button>
          </div>

          <div className="space-y-2">
            {formData.tags.map((tag, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={tag}
                  onChange={(e) => updateTag(index, e.target.value)}
                  placeholder={`태그 ${index + 1} (예: 한식, 간단)`}
                  className="flex-1"
                />
                {formData.tags.length > 1 && (
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => removeTag(index)}
                    className="px-3"
                  >
                    삭제
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="flex gap-4 pt-6">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? '저장 중...' : '레시피 저장'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => window.history.back()}
            className="px-8"
          >
            취소
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default RecipeForm