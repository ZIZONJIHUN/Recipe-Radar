'use client';

import { useState } from 'react';
import { Card, CardContent, Button, Icon, Avatar, Badge, Divider } from '@/lib/components/ui';
import RecipeCard, { IRecipe } from '../components/RecipeCard';

// 임시 사용자 데이터
const userData = {
  id: 'user1',
  name: '요리마스터',
  email: 'cooking@example.com',
  bio: '맛있는 요리를 만들고 공유하는 것을 좋아합니다. 특히 한식과 이탈리아 요리를 좋아해요!',
  avatar: '',
  joinDate: '2023년 3월',
  recipesCount: 12,
  followersCount: 156,
  followingCount: 89,
  favoriteRecipesCount: 34
};

// 내가 작성한 레시피
const myRecipes: IRecipe[] = [
  {
    id: '1',
    title: '김치볶음밥',
    description: '집에 있는 재료로 쉽게 만드는 김치볶음밥',
    imageUrl: '/images/kimchi-fried-rice.jpg',
    cookTime: 15,
    difficulty: '쉬움',
    rating: 4.8,
    reviewCount: 124,
    author: '요리마스터',
    tags: ['한식', '볶음밥', '간단']
  },
  {
    id: '2',
    title: '크림파스타',
    description: '부드럽고 고소한 크림파스타',
    imageUrl: '/images/cream-pasta.jpg',
    cookTime: 25,
    difficulty: '보통',
    rating: 4.6,
    reviewCount: 89,
    author: '요리마스터',
    tags: ['양식', '파스타', '크림']
  }
];

// 즐겨찾기 레시피
const favoriteRecipes: IRecipe[] = [
  {
    id: '3',
    title: '치킨카레',
    description: '향신료가 풍부한 인도식 치킨카레',
    imageUrl: '/images/chicken-curry.jpg',
    cookTime: 45,
    difficulty: '어려움',
    rating: 4.9,
    reviewCount: 156,
    author: '카레셰프',
    tags: ['인도요리', '치킨', '카레', '매운맛']
  },
  {
    id: '4',
    title: '초코칩쿠키',
    description: '바삭하고 달콤한 수제 초코칩쿠키',
    imageUrl: '/images/chocolate-chip-cookies.jpg',
    cookTime: 30,
    difficulty: '보통',
    rating: 4.7,
    reviewCount: 203,
    author: '베이킹퀸',
    tags: ['디저트', '쿠키', '초콜릿', '오븐']
  },
  {
    id: '5',
    title: '연어 스테이크',
    description: '건강하고 맛있는 연어 스테이크',
    imageUrl: '/images/salmon-steak.jpg',
    cookTime: 20,
    difficulty: '보통',
    rating: 4.5,
    reviewCount: 67,
    author: '해산물러버',
    tags: ['서양요리', '연어', '건강']
  }
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'recipes' | 'favorites' | 'activity'>('recipes');
  const [isEditing, setIsEditing] = useState(false);

  const tabs = [
    { id: 'recipes', label: '내 레시피', count: userData.recipesCount },
    { id: 'favorites', label: '즐겨찾기', count: userData.favoriteRecipesCount },
    { id: 'activity', label: '활동', count: 0 }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'recipes':
        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-neutral-gray-900 dark:text-neutral-white">
                내가 작성한 레시피 ({myRecipes.length})
              </h2>
              <Button variant="primary" className="flex items-center gap-2">
                <Icon name="plus" size="sm" />
                새 레시피 작성
              </Button>
            </div>
            
            {myRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-neutral-gray-900 dark:text-neutral-white mb-2">
                  작성한 레시피가 없습니다
                </h3>
                <p className="text-neutral-gray-600 dark:text-neutral-gray-400 mb-4">
                  첫 번째 레시피를 작성해보세요!
                </p>
                <Button variant="primary">
                  레시피 작성하기
                </Button>
              </div>
            )}
          </div>
        );

      case 'favorites':
        return (
          <div>
            <h2 className="text-2xl font-bold text-neutral-gray-900 dark:text-neutral-white mb-6">
              즐겨찾기 레시피 ({favoriteRecipes.length})
            </h2>
            
            {favoriteRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">❤️</div>
                <h3 className="text-xl font-semibold text-neutral-gray-900 dark:text-neutral-white mb-2">
                  즐겨찾기한 레시피가 없습니다
                </h3>
                <p className="text-neutral-gray-600 dark:text-neutral-gray-400 mb-4">
                  마음에 드는 레시피를 즐겨찾기에 추가해보세요!
                </p>
                <Button variant="primary">
                  레시피 둘러보기
                </Button>
              </div>
            )}
          </div>
        );

      case 'activity':
        return (
          <div>
            <h2 className="text-2xl font-bold text-neutral-gray-900 dark:text-neutral-white mb-6">
              최근 활동
            </h2>
            
            <div className="space-y-4">
              <Card>
                <CardContent padding="md">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="heart" size="sm" className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-neutral-gray-900 dark:text-neutral-white">
                        <strong>치킨카레</strong> 레시피를 즐겨찾기에 추가했습니다
                      </p>
                      <p className="text-sm text-neutral-gray-500">2시간 전</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent padding="md">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-semantic-success/10 rounded-full flex items-center justify-center">
                      <Icon name="star" size="sm" className="text-semantic-success" />
                    </div>
                    <div className="flex-1">
                      <p className="text-neutral-gray-900 dark:text-neutral-white">
                        <strong>초코칩쿠키</strong> 레시피에 5점을 남겼습니다
                      </p>
                      <p className="text-sm text-neutral-gray-500">1일 전</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent padding="md">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-semantic-warning/10 rounded-full flex items-center justify-center">
                      <Icon name="edit" size="sm" className="text-semantic-warning" />
                    </div>
                    <div className="flex-1">
                      <p className="text-neutral-gray-900 dark:text-neutral-white">
                        <strong>크림파스타</strong> 레시피를 수정했습니다
                      </p>
                      <p className="text-sm text-neutral-gray-500">3일 전</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-gray-50 dark:bg-neutral-gray-900">
      <div className="max-w-container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 사이드바 - 프로필 정보 */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent padding="lg">
                <div className="text-center mb-6">
                  <Avatar
                    src={userData.avatar}
                    alt={userData.name}
                    fallback={userData.name[0]}
                    size="xl"
                    className="mx-auto mb-4"
                  />
                  <h1 className="text-2xl font-bold text-neutral-gray-900 dark:text-neutral-white mb-2">
                    {userData.name}
                  </h1>
                  <p className="text-neutral-gray-600 dark:text-neutral-gray-400 mb-2">
                    {userData.email}
                  </p>
                  <Badge variant="neutral" size="sm">
                    {userData.joinDate} 가입
                  </Badge>
                </div>

                {userData.bio && (
                  <div className="mb-6">
                    <p className="text-sm text-neutral-gray-700 dark:text-neutral-gray-300 text-center">
                      {userData.bio}
                    </p>
                  </div>
                )}

                <Divider className="my-6" />

                {/* 통계 */}
                <div className="grid grid-cols-1 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {userData.recipesCount}
                    </div>
                    <div className="text-sm text-neutral-gray-600">레시피</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-semantic-success">
                      {userData.followersCount}
                    </div>
                    <div className="text-sm text-neutral-gray-600">팔로워</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-semantic-warning">
                      {userData.followingCount}
                    </div>
                    <div className="text-sm text-neutral-gray-600">팔로잉</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button variant="primary" className="w-full">
                    프로필 편집
                  </Button>
                  <Button variant="outline" className="w-full">
                    설정
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-3">
            {/* 탭 네비게이션 */}
            <Card className="mb-6">
              <CardContent padding="none">
                <div className="flex border-b">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'text-primary border-b-2 border-primary bg-primary/5'
                          : 'text-neutral-gray-600 hover:text-neutral-gray-900 hover:bg-neutral-gray-50'
                      }`}
                    >
                      {tab.label}
                      {tab.count > 0 && (
                        <span className="ml-2 px-2 py-1 text-xs rounded-full bg-neutral-gray-200 text-neutral-gray-700">
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 탭 콘텐츠 */}
            <Card>
              <CardContent padding="lg">
                {renderTabContent()}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}