// 공통 타입 정의
export interface IUser {
  id: string
  email: string
  name?: string
  avatar_url?: string
  created_at?: string
  updated_at?: string
}

export interface IRecipe {
  id: string
  title: string
  description?: string
  ingredients: string[]
  instructions: string[]
  prep_time?: number
  cook_time?: number
  servings?: number
  difficulty?: 'easy' | 'medium' | 'hard'
  image_url?: string
  user_id: string
  created_at: string
  updated_at: string
}

export interface IComment {
  id: string
  text: string
  author: string
  recipe_id: string
  user_id: string
  created_at: string
  updated_at: string
}

export interface IRating {
  id: string
  rating: number
  recipe_id: string
  user_id: string
  created_at: string
}