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
  rating?: number
  reviewCount?: number
  author?: string
  tags: string[]
}

// 레시피 생성용 타입 (ID, 타임스탬프, 평점 등 자동 생성 필드 제외)
export interface IRecipeCreate {
  title: string
  description?: string
  ingredients: string[]
  instructions: string[]
  prep_time?: number
  cook_time?: number
  servings?: number
  difficulty?: 'easy' | 'medium' | 'hard'
  image_url?: string
  tags: string[]
}

// 레시피 업데이트용 타입
export interface IRecipeUpdate extends Partial<IRecipeCreate> {}

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