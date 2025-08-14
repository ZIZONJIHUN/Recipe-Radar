'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button, Icon, Select, Input, Pagination } from '@/lib/components/ui';
import RecipeCard, { IRecipe } from '../components/RecipeCard';
import SearchFilters from './components/SearchFilters';

interface ISearchFilters {
  difficulty: string;
  cookTime: string;
  tags: string[];
}

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

export default function RecipesPage() {
  const searchParams = useSearchParams();
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [filters, setFilters] = useState<ISearchFilters>({
    difficulty: searchParams.get('difficulty') || 'all',
    cookTime: searchParams.get('cookTime') || 'all',
    tags: searchParams.get('tags')?.split(',') || []
  });
  
  const recipesPerPage = 8;

  // API에서 레시피 데이터 가져오기
  const fetchRecipes = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('q', searchQuery);
      if (sortBy) params.append('sort', sortBy);
      if (filters.difficulty !== 'all') params.append('difficulty', filters.difficulty);
      if (filters.cookTime !== 'all') params.append('cookTime', filters.cookTime);
      if (filters.tags.length > 0) params.append('tags', filters.tags.join(','));

      const response = await fetch(`/api/recipes?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('레시피를 불러오는데 실패했습니다.');
      }

      const data = await response.json();
      
      if (data.success) {
        // API 응답을 프론트엔드 형식으로 변환
        const convertedRecipes: IRecipe[] = data.data.map((recipe: IApiRecipe) => ({
          id: recipe.id,
          title: recipe.title,
          description: recipe.description || '',
          imageUrl: recipe.image_url || '/images/default-recipe.jpg',
          cookTime: recipe.cook_time || 0,
          difficulty: recipe.difficulty === 'easy' ? '쉬움' : 
                     recipe.difficulty === 'medium' ? '보통' : '어려움',
          rating: recipe.rating,
          reviewCount: recipe.reviewCount,
          author: recipe.author,
          tags: recipe.tags
        }));
        
        setRecipes(convertedRecipes);
        setTotalRecipes(data.total);
      } else {
        console.error('API 오류:', data.error);
        setRecipes([]);
        setTotalRecipes(0);
      }
    } catch (error) {
      console.error('레시피 검색 오류:', error);
      setRecipes([]);
      setTotalRecipes(0);
    } finally {
      setIsLoading(false);
    }
  };

  // 초기 로드 및 검색 조건 변경 시 데이터 새로 고침
  useEffect(() => {
    fetchRecipes();
  }, [searchQuery, sortBy, filters]);

  // URL 파라미터 변경 시 상태 업데이트
  useEffect(() => {
    const urlQuery = searchParams.get('q') || '';
    const urlSort = searchParams.get('sort') || 'latest';
    const urlDifficulty = searchParams.get('difficulty') || 'all';
    const urlCookTime = searchParams.get('cookTime') || 'all';
    const urlTags = searchParams.get('tags')?.split(',') || [];

    setSearchQuery(urlQuery);
    setSortBy(urlSort);
    setFilters({
      difficulty: urlDifficulty,
      cookTime: urlCookTime,
      tags: urlTags
    });
  }, [searchParams]);

  // 필터 변경 핸들러
  const handleFilterChange = (newFilters: ISearchFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  // 페이지네이션
  const totalPages = Math.ceil(totalRecipes / recipesPerPage);
  const startIndex = (currentPage - 1) * recipesPerPage;
  const endIndex = startIndex + recipesPerPage;
  const currentRecipes = recipes.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-neutral-gray-50 dark:bg-neutral-gray-900">
      <div className="max-w-container mx-auto px-6 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-gray-900 dark:text-neutral-white mb-4">
            레시피 둘러보기
          </h1>
          <p className="text-neutral-gray-600 dark:text-neutral-gray-400">
            {searchQuery && `"${searchQuery}" 검색 결과: `}
            {totalRecipes}개의 레시피를 찾았습니다
          </p>
        </div>

        {/* 검색 및 필터 */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* 검색바 */}
            <div className="flex-1">
              <Input
                type="text"
                placeholder="레시피, 재료, 작성자로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            {/* 정렬 */}
            <div className="flex gap-2">
              <Select
                value={sortBy}
                onChange={setSortBy}
                className="min-w-[120px]"
                options={[
                  { value: 'latest', label: '최신순' },
                  { value: 'popular', label: '인기순' },
                  { value: 'cookTime', label: '조리시간순' },
                  { value: 'difficulty', label: '난이도순' }
                ]}
              />
              
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Icon name="filter" size="sm" />
                필터
              </Button>
            </div>
          </div>

          {/* 상세 필터 (토글) */}
          {showFilters && (
            <SearchFilters 
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          )}
        </div>

        {/* 로딩 상태 */}
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <Icon name="spinner" size="lg" className="animate-spin text-primary" />
            <span className="ml-2 text-neutral-gray-600 dark:text-neutral-gray-400">
              검색 중...
            </span>
          </div>
        ) : (
          <>
            {/* 레시피 그리드 */}
            {currentRecipes.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                  {currentRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>

                {/* 페이지네이션 */}
                {totalPages > 1 && (
                  <div className="flex justify-center">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-neutral-gray-900 dark:text-neutral-white mb-2">
                  검색 결과가 없습니다
                </h3>
                <p className="text-neutral-gray-600 dark:text-neutral-gray-400 mb-4">
                  {searchQuery 
                    ? `"${searchQuery}"에 대한 검색 결과가 없습니다. 다른 키워드로 검색해보세요.`
                    : '다른 키워드로 검색해보거나 필터를 조정해보세요.'
                  }
                </p>
                <Button
                  variant="primary"
                  onClick={() => {
                    setSearchQuery('');
                    setSortBy('latest');
                    setFilters({ difficulty: 'all', cookTime: 'all', tags: [] });
                  }}
                >
                  전체 레시피 보기
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}