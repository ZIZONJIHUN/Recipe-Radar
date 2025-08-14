import { NextRequest, NextResponse } from 'next/server'
import { IRecipe, IRecipeCreate } from '@/types'

// 임시 레시피 데이터 (실제로는 데이터베이스에서 가져올 예정)
let recipes: IRecipe[] = [
  {
    id: '1',
    title: '김치볶음밥',
    description: '집에 있는 재료로 쉽게 만드는 김치볶음밥',
    ingredients: ['김치', '밥', '달걀', '파', '참기름', '간장'],
    instructions: [
      '팬에 기름을 두르고 김치를 볶아주세요.',
      '밥을 넣고 김치와 함께 볶아주세요.',
      '달걀을 풀어 넣고 섞어주세요.',
      '파와 참기름을 넣고 마무리해주세요.'
    ],
    prep_time: 5,
    cook_time: 15,
    servings: 2,
    difficulty: 'easy' as const,
    image_url: '/images/kimchi-fried-rice.jpg',
    user_id: '1',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    rating: 4.8,
    reviewCount: 124,
    author: '요리왕',
    tags: ['한식', '볶음밥', '간단']
  },
  {
    id: '2',
    title: '크림파스타',
    description: '부드럽고 고소한 크림파스타',
    ingredients: ['파스타면', '생크림', '마늘', '양파', '버터', '파마산치즈', '소금', '후추'],
    instructions: [
      '물을 끓여 파스타면을 삶아주세요.',
      '팬에 버터를 녹이고 마늘과 양파를 볶아주세요.',
      '생크림을 넣고 끓인 후 치즈를 넣어주세요.',
      '삶은 파스타면을 넣고 소스와 버무려주세요.'
    ],
    prep_time: 10,
    cook_time: 25,
    servings: 3,
    difficulty: 'medium' as const,
    image_url: '/images/cream-pasta.jpg',
    user_id: '2',
    created_at: '2024-01-02T00:00:00Z',
    updated_at: '2024-01-02T00:00:00Z',
    rating: 4.6,
    reviewCount: 89,
    author: '파스타마스터',
    tags: ['양식', '파스타', '크림']
  },
  {
    id: '3',
    title: '치킨카레',
    description: '향신료가 풍부한 인도식 치킨카레',
    ingredients: ['닭고기', '양파', '토마토', '마늘', '생강', '카레가루', '코코넛밀크', '쌀'],
    instructions: [
      '닭고기를 한입 크기로 자르고 양념에 재워주세요.',
      '양파, 마늘, 생강을 볶아 향을 내주세요.',
      '토마토와 카레가루를 넣고 볶아주세요.',
      '닭고기와 코코넛밀크를 넣고 끓여주세요.'
    ],
    prep_time: 20,
    cook_time: 45,
    servings: 4,
    difficulty: 'hard' as const,
    image_url: '/images/chicken-curry.jpg',
    user_id: '3',
    created_at: '2024-01-03T00:00:00Z',
    updated_at: '2024-01-03T00:00:00Z',
    rating: 4.9,
    reviewCount: 156,
    author: '카레셰프',
    tags: ['인도요리', '치킨', '카레', '매운맛']
  },
  {
    id: '4',
    title: '초코칩쿠키',
    description: '바삭하고 달콤한 수제 초코칩쿠키',
    ingredients: ['밀가루', '버터', '설탕', '계란', '초콜릿칩', '베이킹소다', '소금'],
    instructions: [
      '버터와 설탕을 크림 상태가 될 때까지 섞어주세요.',
      '계란을 넣고 잘 섞어주세요.',
      '밀가루와 베이킹소다를 체 쳐서 넣어주세요.',
      '초콜릿칩을 넣고 반죽을 만들어 오븐에 구워주세요.'
    ],
    prep_time: 15,
    cook_time: 30,
    servings: 12,
    difficulty: 'medium' as const,
    image_url: '/images/chocolate-chip-cookies.jpg',
    user_id: '4',
    created_at: '2024-01-04T00:00:00Z',
    updated_at: '2024-01-04T00:00:00Z',
    rating: 4.7,
    reviewCount: 203,
    author: '베이킹퀸',
    tags: ['디저트', '쿠키', '초콜릿', '오븐']
  },
  {
    id: '5',
    title: '연어 스테이크',
    description: '건강하고 맛있는 연어 스테이크',
    ingredients: ['연어', '올리브오일', '레몬', '로즈마리', '소금', '후추', '마늘'],
    instructions: [
      '연어에 소금과 후추로 간을 해주세요.',
      '팬에 올리브오일을 두르고 달궈주세요.',
      '연어를 넣고 앞뒤로 구워주세요.',
      '마늘과 로즈마리를 넣고 향을 내며 마무리해주세요.'
    ],
    prep_time: 10,
    cook_time: 20,
    servings: 2,
    difficulty: 'medium' as const,
    image_url: '/images/salmon-steak.jpg',
    user_id: '5',
    created_at: '2024-01-05T00:00:00Z',
    updated_at: '2024-01-05T00:00:00Z',
    rating: 4.5,
    reviewCount: 67,
    author: '해산물러버',
    tags: ['서양요리', '연어', '건강']
  },
  {
    id: '6',
    title: '비빔냉면',
    description: '여름철 별미 비빔냉면',
    ingredients: ['냉면', '오이', '배', '삶은 계란', '고춧가루', '식초', '설탕', '참기름'],
    instructions: [
      '냉면을 찬물에 불려 삶아주세요.',
      '오이와 배를 채 썰어 준비해주세요.',
      '양념장을 만들어주세요.',
      '면과 채소, 양념장을 섞어 비벼주세요.'
    ],
    prep_time: 15,
    cook_time: 10,
    servings: 2,
    difficulty: 'easy' as const,
    image_url: '/images/bibim-naengmyeon.jpg',
    user_id: '6',
    created_at: '2024-01-06T00:00:00Z',
    updated_at: '2024-01-06T00:00:00Z',
    rating: 4.4,
    reviewCount: 91,
    author: '냉면마니아',
    tags: ['한식', '냉면', '여름']
  },
  {
    id: '7',
    title: '불고기',
    description: '달콤짭짤한 한국 전통 불고기',
    ingredients: ['소고기', '양파', '당근', '대파', '간장', '설탕', '배', '마늘', '참기름'],
    instructions: [
      '소고기를 얇게 썰어 준비해주세요.',
      '양념장을 만들어 고기에 재워주세요.',
      '야채를 썰어 준비해주세요.',
      '팬에 고기와 야채를 함께 볶아주세요.'
    ],
    prep_time: 30,
    cook_time: 15,
    servings: 4,
    difficulty: 'medium' as const,
    image_url: '/images/bulgogi.jpg',
    user_id: '7',
    created_at: '2024-01-07T00:00:00Z',
    updated_at: '2024-01-07T00:00:00Z',
    rating: 4.8,
    reviewCount: 178,
    author: '한식마스터',
    tags: ['한식', '불고기', '소고기']
  },
  {
    id: '8',
    title: '마르게리타 피자',
    description: '이탈리아 전통 마르게리타 피자',
    ingredients: ['피자도우', '토마토소스', '모짜렐라치즈', '바질', '올리브오일', '소금'],
    instructions: [
      '피자도우를 밀대로 밀어 편평하게 만들어주세요.',
      '토마토소스를 고르게 발라주세요.',
      '모짜렐라치즈를 올려주세요.',
      '오븐에 구운 후 바질을 올려 마무리해주세요.'
    ],
    prep_time: 20,
    cook_time: 15,
    servings: 2,
    difficulty: 'medium' as const,
    image_url: '/images/margherita-pizza.jpg',
    user_id: '8',
    created_at: '2024-01-08T00:00:00Z',
    updated_at: '2024-01-08T00:00:00Z',
    rating: 4.6,
    reviewCount: 134,
    author: '피자셰프',
    tags: ['이탈리아', '피자', '치즈']
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')?.toLowerCase() || ''
    const sort = searchParams.get('sort') || 'latest'
    const difficulty = searchParams.get('difficulty')
    const cookTime = searchParams.get('cookTime')
    const tags = searchParams.get('tags')?.split(',') || []

    let filteredRecipes = [...recipes]

    // 검색어로 필터링
    if (query) {
      filteredRecipes = filteredRecipes.filter(recipe => 
        recipe.title.toLowerCase().includes(query) ||
        recipe.description?.toLowerCase().includes(query) ||
        recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query)) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(query)) ||
        recipe.author.toLowerCase().includes(query)
      )
    }

    // 난이도로 필터링
    if (difficulty && difficulty !== 'all') {
      const difficultyMap: { [key: string]: string } = {
        'easy': 'easy',
        'medium': 'medium', 
        'hard': 'hard'
      }
      filteredRecipes = filteredRecipes.filter(recipe => 
        recipe.difficulty === difficultyMap[difficulty]
      )
    }

    // 조리시간으로 필터링
    if (cookTime && cookTime !== 'all') {
      const timeRanges: { [key: string]: [number, number] } = {
        'under30': [0, 30],
        '30to60': [30, 60],
        'over60': [60, Infinity]
      }
      const [min, max] = timeRanges[cookTime] || [0, Infinity]
      filteredRecipes = filteredRecipes.filter(recipe => 
        recipe.cook_time && recipe.cook_time >= min && recipe.cook_time <= max
      )
    }

    // 태그로 필터링
    if (tags.length > 0 && tags[0] !== '') {
      filteredRecipes = filteredRecipes.filter(recipe =>
        tags.some(tag => recipe.tags.includes(tag))
      )
    }

    // 정렬
    switch (sort) {
      case 'popular':
        filteredRecipes.sort((a, b) => b.rating - a.rating)
        break
      case 'rating':
        filteredRecipes.sort((a, b) => b.rating - a.rating)
        break
      case 'cook_time':
        filteredRecipes.sort((a, b) => (a.cook_time || 0) - (b.cook_time || 0))
        break
      case 'latest':
      default:
        filteredRecipes.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        break
    }

    return NextResponse.json({
      success: true,
      data: filteredRecipes,
      total: filteredRecipes.length,
      query: {
        q: query,
        sort,
        difficulty,
        cookTime,
        tags
      }
    })

  } catch (error) {
    console.error('레시피 검색 오류:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: '레시피 검색 중 오류가 발생했습니다.' 
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: IRecipeCreate = await request.json()

    // 입력 데이터 검증
    if (!body.title?.trim()) {
      return NextResponse.json(
        { 
          success: false, 
          error: '레시피 제목은 필수입니다.' 
        },
        { status: 400 }
      )
    }

    if (!body.ingredients || body.ingredients.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: '재료는 최소 1개 이상 입력해야 합니다.' 
        },
        { status: 400 }
      )
    }

    if (!body.instructions || body.instructions.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: '조리 과정은 최소 1개 이상 입력해야 합니다.' 
        },
        { status: 400 }
      )
    }

    // 새 레시피 생성
    const newRecipe: IRecipe = {
      id: (recipes.length + 1).toString(),
      title: body.title.trim(),
      description: body.description?.trim() || '',
      ingredients: body.ingredients.filter(ingredient => ingredient.trim()),
      instructions: body.instructions.filter(instruction => instruction.trim()),
      prep_time: body.prep_time,
      cook_time: body.cook_time,
      servings: body.servings,
      difficulty: body.difficulty,
      image_url: body.image_url?.trim() || '',
      user_id: 'temp-user', // 임시 사용자 ID (나중에 인증 시스템에서 가져올 예정)
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      rating: 0,
      reviewCount: 0,
      author: '사용자', // 임시 작성자명
      tags: body.tags.filter(tag => tag.trim())
    }

    // 레시피 배열에 추가
    recipes.push(newRecipe)

    return NextResponse.json({
      success: true,
      message: '레시피가 성공적으로 생성되었습니다.',
      data: newRecipe
    }, { status: 201 })

  } catch (error) {
    console.error('레시피 생성 오류:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: '레시피 생성 중 오류가 발생했습니다.' 
      },
      { status: 500 }
    )
  }
}