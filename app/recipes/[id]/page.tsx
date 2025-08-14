'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button, Icon, Card, CardContent, Badge, Avatar, Divider, Textarea } from '@/lib/components/ui';
import { IRecipe } from '../../components/RecipeCard';
import ReviewSection from './components/ReviewSection';
import RecipeCard from '../../components/RecipeCard';

// API에서 받는 레시피 데이터
interface IApiRecipe {
  id: string;
  title: string;
  description?: string;
  ingredients: string[];
  instructions: string[];
  prep_time?: number;
  cook_time?: number;
  servings?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  image_url?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  rating: number;
  reviewCount: number;
  author: string;
  tags: string[];
}

// 확장된 레시피 데이터
interface IDetailedRecipe extends IRecipe {
  ingredients: string[];
  instructions: string[];
  servings: number;
  prep_time?: number;
  nutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export default function RecipeDetailPage() {
  const params = useParams();
  const recipeId = params.id as string;
  const [recipe, setRecipe] = useState<IDetailedRecipe | null>(null);
  const [relatedRecipes, setRelatedRecipes] = useState<IRecipe[]>([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // API에서 레시피 데이터 가져오기
  const fetchRecipe = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/recipes/${recipeId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setError('레시피를 찾을 수 없습니다.');
        } else {
          setError('레시피를 불러오는데 실패했습니다.');
        }
        return;
      }

      const data = await response.json();
      
      if (data.success) {
        // API 응답을 프론트엔드 형식으로 변환
        const apiRecipe: IApiRecipe = data.data;
        const convertedRecipe: IDetailedRecipe = {
          id: apiRecipe.id,
          title: apiRecipe.title,
          description: apiRecipe.description || '',
          imageUrl: apiRecipe.image_url || '/images/default-recipe.jpg',
          cookTime: apiRecipe.cook_time || 0,
          difficulty: apiRecipe.difficulty === 'easy' ? '쉬움' : 
                     apiRecipe.difficulty === 'medium' ? '보통' : '어려움',
          rating: apiRecipe.rating,
          reviewCount: apiRecipe.reviewCount,
          author: apiRecipe.author,
          tags: apiRecipe.tags,
          ingredients: apiRecipe.ingredients,
          instructions: apiRecipe.instructions,
          servings: apiRecipe.servings || 1,
          prep_time: apiRecipe.prep_time
        };
        
        setRecipe(convertedRecipe);
        
        // 관련 레시피도 가져오기 (같은 태그를 가진 다른 레시피들)
        fetchRelatedRecipes(apiRecipe.tags);
      } else {
        setError(data.error || '레시피를 불러오는데 실패했습니다.');
      }
    } catch (error) {
      console.error('레시피 상세 조회 오류:', error);
      setError('레시피를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 관련 레시피 가져오기
  const fetchRelatedRecipes = async (tags: string[]) => {
    try {
      const response = await fetch(`/api/recipes?tags=${tags.join(',')}&sort=rating`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          const convertedRecipes: IRecipe[] = data.data
            .filter((r: IApiRecipe) => r.id !== recipeId) // 현재 레시피 제외
            .slice(0, 3) // 최대 3개만
            .map((apiRecipe: IApiRecipe) => ({
              id: apiRecipe.id,
              title: apiRecipe.title,
              description: apiRecipe.description || '',
              imageUrl: apiRecipe.image_url || '/images/default-recipe.jpg',
              cookTime: apiRecipe.cook_time || 0,
              difficulty: apiRecipe.difficulty === 'easy' ? '쉬움' : 
                         apiRecipe.difficulty === 'medium' ? '보통' : '어려움',
              rating: apiRecipe.rating,
              reviewCount: apiRecipe.reviewCount,
              author: apiRecipe.author,
              tags: apiRecipe.tags
            }));
          
          setRelatedRecipes(convertedRecipes);
        }
      }
    } catch (error) {
      console.error('관련 레시피 조회 오류:', error);
    }
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    if (recipeId) {
      fetchRecipe();
    }
  }, [recipeId]);

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-gray-50 dark:bg-neutral-gray-900 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Icon name="spinner" size="lg" className="animate-spin text-primary" />
          <span className="text-lg text-neutral-gray-600 dark:text-neutral-gray-400">
            레시피를 불러오는 중...
          </span>
        </div>
      </div>
    );
  }

  // 에러 상태 또는 레시피가 없는 경우
  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-neutral-gray-50 dark:bg-neutral-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😢</div>
          <h2 className="text-2xl font-bold text-neutral-gray-900 dark:text-neutral-white mb-2">
            {error || '레시피를 찾을 수 없습니다'}
          </h2>
          <p className="text-neutral-gray-600 dark:text-neutral-gray-400 mb-4">
            요청하신 레시피가 존재하지 않거나 삭제되었습니다.
          </p>
          <div className="flex gap-2 justify-center">
            <Link href="/recipes">
              <Button variant="primary">
                레시피 목록으로 돌아가기
              </Button>
            </Link>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
            >
              다시 시도
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '쉬움': return 'semantic-success';
      case '보통': return 'semantic-warning';
      case '어려움': return 'semantic-error';
      default: return 'neutral-gray-500';
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={i} name="star" size="sm" className="text-yellow-400 fill-current" />);
    }

    if (hasHalfStar) {
      stars.push(<Icon key="half" name="star" size="sm" className="text-yellow-400 fill-current opacity-50" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Icon key={`empty-${i}`} name="star" size="sm" className="text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="min-h-screen bg-neutral-gray-50 dark:bg-neutral-gray-900">
      <div className="max-w-container mx-auto px-6 py-8">
        {/* 뒤로가기 버튼 */}
        <div className="mb-6">
          <Link href="/recipes">
            <Button variant="ghost" className="flex items-center gap-2">
              <Icon name="chevron-left" size="sm" />
              목록으로 돌아가기
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-2">
            {/* 레시피 헤더 */}
            <Card className="mb-6">
              <div className="aspect-[16/10] bg-gradient-to-r from-orange-100 to-orange-200 rounded-t-lg flex items-center justify-center">
                <span className="text-8xl">🍽️</span>
              </div>
              
              <CardContent padding="lg">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant={getDifficultyColor(recipe.difficulty)} size="sm">
                    {recipe.difficulty}
                  </Badge>
                  {recipe.tags.map((tag, index) => (
                    <Badge key={index} variant="neutral" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h1 className="text-3xl font-bold text-neutral-gray-900 dark:text-neutral-white mb-4">
                  {recipe.title}
                </h1>

                <p className="text-lg text-neutral-gray-600 dark:text-neutral-gray-400 mb-6">
                  {recipe.description}
                </p>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-6 text-sm text-neutral-gray-600">
                    {recipe.prep_time && (
                      <div className="flex items-center gap-1">
                        <Icon name="clock" size="sm" />
                        <span>준비시간 {recipe.prep_time}분</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Icon name="clock" size="sm" />
                      <span>조리시간 {recipe.cookTime}분</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="users" size="sm" />
                      <span>{recipe.servings}인분</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="user" size="sm" />
                      <span>{recipe.author}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant={isFavorited ? "primary" : "outline"}
                      onClick={() => setIsFavorited(!isFavorited)}
                      className="flex items-center gap-2"
                    >
                      <Icon name="heart" size="sm" />
                      즐겨찾기
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Icon name="share" size="sm" />
                      공유
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {renderStars(recipe.rating)}
                  </div>
                  <span className="text-lg font-semibold">{recipe.rating}</span>
                  <span className="text-neutral-gray-600">({recipe.reviewCount}개 리뷰)</span>
                </div>
              </CardContent>
            </Card>

            {/* 재료 */}
            <Card className="mb-6">
              <CardContent padding="lg">
                <h2 className="text-2xl font-bold text-neutral-gray-900 dark:text-neutral-white mb-4">
                  재료 ({recipe.servings}인분)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center gap-2 py-2 border-b border-gray-100 last:border-0">
                      <Icon name="check" size="sm" className="text-semantic-success" />
                      <span className="text-neutral-gray-700 dark:text-neutral-gray-300">
                        {ingredient}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 조리 과정 */}
            <Card className="mb-6">
              <CardContent padding="lg">
                <h2 className="text-2xl font-bold text-neutral-gray-900 dark:text-neutral-white mb-4">
                  조리 과정
                </h2>
                <div className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <p className="text-neutral-gray-700 dark:text-neutral-gray-300 pt-1">
                        {instruction}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 영양 정보 */}
            {recipe.nutrition && (
              <Card className="mb-6">
                <CardContent padding="lg">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-neutral-gray-900 dark:text-neutral-white">
                      영양 정보
                    </h2>
                    <Button
                      variant="ghost"
                      onClick={() => setShowNutrition(!showNutrition)}
                    >
                      {showNutrition ? '숨기기' : '보기'}
                    </Button>
                  </div>
                  
                  {showNutrition && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-neutral-gray-50 dark:bg-neutral-gray-800 rounded-lg">
                        <div className="text-2xl font-bold text-primary">
                          {recipe.nutrition.calories}
                        </div>
                        <div className="text-sm text-neutral-gray-600">칼로리</div>
                      </div>
                      <div className="text-center p-4 bg-neutral-gray-50 dark:bg-neutral-gray-800 rounded-lg">
                        <div className="text-2xl font-bold text-semantic-success">
                          {recipe.nutrition.protein}g
                        </div>
                        <div className="text-sm text-neutral-gray-600">단백질</div>
                      </div>
                      <div className="text-center p-4 bg-neutral-gray-50 dark:bg-neutral-gray-800 rounded-lg">
                        <div className="text-2xl font-bold text-semantic-warning">
                          {recipe.nutrition.carbs}g
                        </div>
                        <div className="text-sm text-neutral-gray-600">탄수화물</div>
                      </div>
                      <div className="text-center p-4 bg-neutral-gray-50 dark:bg-neutral-gray-800 rounded-lg">
                        <div className="text-2xl font-bold text-semantic-error">
                          {recipe.nutrition.fat}g
                        </div>
                        <div className="text-sm text-neutral-gray-600">지방</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* 리뷰 섹션 */}
            <ReviewSection recipeId={recipe.id} />
          </div>

          {/* 사이드바 */}
          <div>
            {/* 작성자 정보 */}
            <Card className="mb-6">
              <CardContent padding="lg">
                <h3 className="text-lg font-semibold text-neutral-gray-900 dark:text-neutral-white mb-4">
                  작성자
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar
                    src=""
                    alt={recipe.author}
                    fallback={recipe.author[0]}
                    size="md"
                  />
                  <div>
                    <div className="font-semibold text-neutral-gray-900 dark:text-neutral-white">
                      {recipe.author}
                    </div>
                    <div className="text-sm text-neutral-gray-600">
                      레시피 전문가
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="primary" size="sm" className="flex-1">
                    팔로우
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    프로필 보기
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 관련 레시피 */}
            <Card>
              <CardContent padding="lg">
                <h3 className="text-lg font-semibold text-neutral-gray-900 dark:text-neutral-white mb-4">
                  관련 레시피
                </h3>
                <div className="space-y-4">
                  {relatedRecipes.length > 0 ? (
                    relatedRecipes.map((relatedRecipe) => (
                      <RecipeCard key={relatedRecipe.id} recipe={relatedRecipe} />
                    ))
                  ) : (
                    <div className="text-center py-6 text-neutral-gray-500">
                      관련 레시피를 불러오는 중...
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <Link href="/recipes">
                    <Button variant="outline" className="w-full">
                      더 많은 레시피 보기
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}