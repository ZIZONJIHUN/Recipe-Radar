'use client';

import { useEffect } from 'react';
import { Card, CardContent, Select, Checkbox, Button, Chip } from '@/lib/components/ui';

interface ISearchFilters {
  difficulty: string;
  cookTime: string;
  tags: string[];
}

interface ISearchFiltersProps {
  filters: ISearchFilters;
  onFilterChange: (filters: ISearchFilters) => void;
}

export default function SearchFilters({ filters, onFilterChange }: ISearchFiltersProps) {

  const difficulties = [
    { value: 'easy', label: '쉬움' },
    { value: 'medium', label: '보통' },
    { value: 'hard', label: '어려움' }
  ];
  
  const popularTags = ['한식', '양식', '중식', '일식', '인도요리', '디저트', '간단', '건강식', '매운맛', '비건'];

  const handleDifficultyChange = (difficulty: string) => {
    onFilterChange({
      ...filters,
      difficulty: filters.difficulty === difficulty ? 'all' : difficulty
    });
  };

  const handleCookTimeChange = (cookTime: string) => {
    onFilterChange({
      ...filters,
      cookTime: cookTime
    });
  };

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    
    onFilterChange({
      ...filters,
      tags: newTags
    });
  };

  const clearFilters = () => {
    onFilterChange({
      difficulty: 'all',
      cookTime: 'all',
      tags: []
    });
  };

  return (
    <Card className="mb-6">
      <CardContent padding="lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 난이도 */}
          <div>
            <h3 className="font-semibold text-neutral-gray-900 dark:text-neutral-white mb-3">
              난이도
            </h3>
            <Select
              value={filters.difficulty}
              onChange={handleDifficultyChange}
              options={[
                { value: 'all', label: '전체' },
                ...difficulties
              ]}
            />
          </div>

          {/* 조리시간 */}
          <div>
            <h3 className="font-semibold text-neutral-gray-900 dark:text-neutral-white mb-3">
              조리시간
            </h3>
            <Select
              value={filters.cookTime}
              onChange={handleCookTimeChange}
              options={[
                { value: 'all', label: '전체' },
                { value: 'under30', label: '30분 이하' },
                { value: '30to60', label: '30분 ~ 1시간' },
                { value: 'over60', label: '1시간 이상' }
              ]}
            />
          </div>

          {/* 초기화 버튼 */}
          <div className="flex items-end">
            <Button
              variant="outline"
              onClick={clearFilters}
              className="w-full"
            >
              필터 초기화
            </Button>
          </div>
        </div>

        {/* 태그 */}
        <div className="mt-6 border-t pt-6">
          <h3 className="font-semibold text-neutral-gray-900 dark:text-neutral-white mb-3">
            태그
          </h3>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <Chip
                key={tag}
                variant={filters.tags.includes(tag) ? "filled" : "outlined"}
                onClick={() => handleTagToggle(tag)}
                className="cursor-pointer"
              >
                {tag}
              </Chip>
            ))}
          </div>
        </div>

        {/* 선택된 필터 표시 */}
        {(filters.difficulty !== 'all' || filters.cookTime !== 'all' || filters.tags.length > 0) && (
          <div className="mt-6 border-t pt-6">
            <h3 className="font-semibold text-neutral-gray-900 dark:text-neutral-white mb-3">
              적용된 필터
            </h3>
            <div className="flex flex-wrap gap-2">
              {filters.difficulty !== 'all' && (
                <Chip
                  variant="filled"
                  onRemove={() => handleDifficultyChange('all')}
                >
                  난이도: {difficulties.find(d => d.value === filters.difficulty)?.label}
                </Chip>
              )}
              {filters.cookTime !== 'all' && (
                <Chip
                  variant="filled"
                  onRemove={() => handleCookTimeChange('all')}
                >
                  조리시간: {
                    filters.cookTime === 'under30' ? '30분 이하' :
                    filters.cookTime === '30to60' ? '30분 ~ 1시간' :
                    filters.cookTime === 'over60' ? '1시간 이상' : ''
                  }
                </Chip>
              )}
              {filters.tags.map((tag) => (
                <Chip
                  key={tag}
                  variant="filled"
                  onRemove={() => handleTagToggle(tag)}
                >
                  {tag}
                </Chip>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}