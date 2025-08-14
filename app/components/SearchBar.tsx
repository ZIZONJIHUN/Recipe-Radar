'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button, Icon } from '@/lib/components/ui';

interface ISearchSuggestion {
  id: string;
  title: string;
  type: 'recipe' | 'ingredient' | 'tag';
}

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<ISearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // 검색 제안 데이터 (실제로는 API에서 가져올 수 있음)
  const allSuggestions: ISearchSuggestion[] = [
    { id: '1', title: '김치볶음밥', type: 'recipe' },
    { id: '2', title: '크림파스타', type: 'recipe' },
    { id: '3', title: '치킨카레', type: 'recipe' },
    { id: '4', title: '초코칩쿠키', type: 'recipe' },
    { id: '5', title: '연어 스테이크', type: 'recipe' },
    { id: '6', title: '비빔냉면', type: 'recipe' },
    { id: '7', title: '불고기', type: 'recipe' },
    { id: '8', title: '마르게리타 피자', type: 'recipe' },
    { id: '9', title: '김치', type: 'ingredient' },
    { id: '10', title: '달걀', type: 'ingredient' },
    { id: '11', title: '파스타', type: 'ingredient' },
    { id: '12', title: '닭고기', type: 'ingredient' },
    { id: '13', title: '연어', type: 'ingredient' },
    { id: '14', title: '한식', type: 'tag' },
    { id: '15', title: '양식', type: 'tag' },
    { id: '16', title: '디저트', type: 'tag' },
    { id: '17', title: '간단', type: 'tag' },
  ];

  // 검색어 변경 시 제안 업데이트
  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = allSuggestions
        .filter(suggestion => 
          suggestion.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 6); // 최대 6개까지만 표시
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsLoading(true);
      setShowSuggestions(false);
      router.push(`/recipes?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: ISearchSuggestion) => {
    setSearchQuery(suggestion.title);
    setShowSuggestions(false);
    router.push(`/recipes?q=${encodeURIComponent(suggestion.title)}`);
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'recipe':
        return '🍳';
      case 'ingredient':
        return '🥗';
      case 'tag':
        return '🏷️';
      default:
        return '🔍';
    }
  };

  const getSuggestionLabel = (type: string) => {
    switch (type) {
      case 'recipe':
        return '레시피';
      case 'ingredient':
        return '재료';
      case 'tag':
        return '태그';
      default:
        return '';
    }
  };

  return (
    <div className="max-w-2xl mx-auto relative">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <Input
            type="text"
            placeholder="레시피, 재료, 요리사로 검색해보세요..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="w-full pr-12 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-primary"
            size="lg"
          />
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={isLoading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full px-4 py-2"
          >
            {isLoading ? (
              <Icon name="spinner" size="sm" className="animate-spin" />
            ) : (
              <Icon name="search" size="sm" />
            )}
          </Button>
        </div>
      </form>

      {/* 검색 제안 드롭다운 */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-neutral-gray-800 border border-gray-200 dark:border-neutral-gray-700 rounded-lg shadow-lg mt-2 z-50 max-h-64 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-neutral-gray-700 flex items-center gap-3 border-b border-gray-100 dark:border-neutral-gray-600 last:border-b-0"
            >
              <span className="text-lg">{getSuggestionIcon(suggestion.type)}</span>
              <div className="flex-1">
                <span className="text-neutral-gray-900 dark:text-neutral-white">
                  {suggestion.title}
                </span>
                <span className="text-xs text-neutral-gray-500 dark:text-neutral-gray-400 ml-2">
                  {getSuggestionLabel(suggestion.type)}
                </span>
              </div>
              <Icon name="arrow-up-right" size="xs" className="text-neutral-gray-400" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}