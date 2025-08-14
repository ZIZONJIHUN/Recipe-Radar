import { createServerSupabaseClient } from '../server'
import { IRecipe, IRecipeCreate, IRecipeUpdate } from '@/types'

/**
 * 모든 레시피 조회
 */
export async function getAllRecipes(): Promise<IRecipe[]> {
  const supabase = createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`레시피 조회 실패: ${error.message}`)
  }

  return data || []
}

/**
 * ID로 특정 레시피 조회
 */
export async function getRecipeById(id: string): Promise<IRecipe | null> {
  const supabase = createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return null // 레시피가 존재하지 않음
    }
    throw new Error(`레시피 조회 실패: ${error.message}`)
  }

  return data
}

/**
 * 새 레시피 생성
 */
export async function createRecipe(
  recipe: IRecipeCreate,
  userId: string
): Promise<IRecipe> {
  const supabase = createServerSupabaseClient()
  
  const newRecipe = {
    ...recipe,
    user_id: userId,
    rating: 0,
    reviewCount: 0
  }

  const { data, error } = await supabase
    .from('recipes')
    .insert(newRecipe)
    .select()
    .single()

  if (error) {
    throw new Error(`레시피 생성 실패: ${error.message}`)
  }

  return data
}

/**
 * 레시피 업데이트
 */
export async function updateRecipe(
  id: string,
  updates: IRecipeUpdate,
  userId: string
): Promise<IRecipe> {
  const supabase = createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('recipes')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .eq('user_id', userId) // 작성자만 수정 가능
    .select()
    .single()

  if (error) {
    throw new Error(`레시피 업데이트 실패: ${error.message}`)
  }

  return data
}

/**
 * 레시피 삭제
 */
export async function deleteRecipe(id: string, userId: string): Promise<void> {
  const supabase = createServerSupabaseClient()
  
  const { error } = await supabase
    .from('recipes')
    .delete()
    .eq('id', id)
    .eq('user_id', userId) // 작성자만 삭제 가능

  if (error) {
    throw new Error(`레시피 삭제 실패: ${error.message}`)
  }
}

/**
 * 사용자별 레시피 조회
 */
export async function getRecipesByUserId(userId: string): Promise<IRecipe[]> {
  const supabase = createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`사용자 레시피 조회 실패: ${error.message}`)
  }

  return data || []
}

/**
 * 레시피 검색 (제목, 설명, 재료, 태그로 검색)
 */
export async function searchRecipes(
  query: string,
  filters?: {
    difficulty?: 'easy' | 'medium' | 'hard'
    cookTimeMax?: number
    tags?: string[]
  }
): Promise<IRecipe[]> {
  const supabase = createServerSupabaseClient()
  
  let queryBuilder = supabase
    .from('recipes')
    .select('*')

  // 텍스트 검색
  if (query) {
    queryBuilder = queryBuilder.or(`
      title.ilike.%${query}%,
      description.ilike.%${query}%,
      ingredients.cs.{${query}},
      tags.cs.{${query}}
    `)
  }

  // 필터 적용
  if (filters?.difficulty) {
    queryBuilder = queryBuilder.eq('difficulty', filters.difficulty)
  }

  if (filters?.cookTimeMax) {
    queryBuilder = queryBuilder.lte('cook_time', filters.cookTimeMax)
  }

  if (filters?.tags && filters.tags.length > 0) {
    queryBuilder = queryBuilder.overlaps('tags', filters.tags)
  }

  queryBuilder = queryBuilder.order('created_at', { ascending: false })

  const { data, error } = await queryBuilder

  if (error) {
    throw new Error(`레시피 검색 실패: ${error.message}`)
  }

  return data || []
}

/**
 * 인기 레시피 조회 (평점 순)
 */
export async function getPopularRecipes(limit: number = 10): Promise<IRecipe[]> {
  const supabase = createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .order('rating', { ascending: false })
    .order('reviewCount', { ascending: false })
    .limit(limit)

  if (error) {
    throw new Error(`인기 레시피 조회 실패: ${error.message}`)
  }

  return data || []
}

/**
 * 최신 레시피 조회
 */
export async function getLatestRecipes(limit: number = 10): Promise<IRecipe[]> {
  const supabase = createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    throw new Error(`최신 레시피 조회 실패: ${error.message}`)
  }

  return data || []
}