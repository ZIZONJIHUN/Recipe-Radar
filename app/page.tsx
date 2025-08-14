import Link from "next/link";
import { Button, Icon, Card, CardContent, Badge, Input } from '@/lib/components/ui';
import SearchBar from './components/SearchBar';
import RecipeCard from './components/RecipeCard';
import PopularTags from './components/PopularTags';

// 임시 데이터
const popularRecipes = [
  {
    id: '1',
    title: '김치볶음밥',
    description: '집에 있는 재료로 쉽게 만드는 김치볶음밥',
    imageUrl: '/images/kimchi-fried-rice.jpg',
    cookTime: 15,
    difficulty: '쉬움',
    rating: 4.8,
    reviewCount: 124,
    author: '요리왕',
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
    author: '파스타마스터',
    tags: ['양식', '파스타', '크림']
  },
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
  }
];

const latestRecipes = [
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
  },
  {
    id: '6',
    title: '비빔냉면',
    description: '여름철 별미 비빔냉면',
    imageUrl: '/images/bibim-naengmyeon.jpg',
    cookTime: 10,
    difficulty: '쉬움',
    rating: 4.4,
    reviewCount: 91,
    author: '냉면마니아',
    tags: ['한식', '냉면', '여름']
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-gray-50 dark:bg-neutral-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-orange-50 to-white dark:from-neutral-gray-800 dark:to-neutral-gray-900 py-16">
        <div className="max-w-container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-neutral-gray-900 dark:text-neutral-white mb-4">
            Recipe Rader
          </h1>
          <p className="text-xl text-neutral-gray-700 dark:text-neutral-gray-300 mb-8 max-w-2xl mx-auto">
            다양한 요리 레시피를 검색하고, 공유하며, 평가할 수 있는 커뮤니티 플랫폼
          </p>
          
          {/* 검색바 */}
          <SearchBar />
          
          <div className="flex gap-4 justify-center mt-8">
            <Link href="/recipes" className="inline-flex items-center justify-center font-semibold transition-all duration-150 ease-in-out focus:outline-none px-8 py-4 text-lg font-semibold rounded-lg bg-[#FF385C] text-white border-none hover:bg-[#E31E3F] focus:outline focus:outline-2 focus:outline-[#FF385C]">
              레시피 둘러보기
            </Link>
            <Link href="/create" className="inline-flex items-center justify-center font-semibold transition-all duration-150 ease-in-out focus:outline-none px-8 py-4 text-lg font-semibold rounded-lg bg-transparent text-[#222222] border border-[#DDDDDD] hover:bg-[#F7F7F7] focus:outline focus:outline-2 focus:outline-[#FF385C]">
              레시피 등록하기
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-container mx-auto px-6 py-8">
        {/* 인기 태그 */}
        <PopularTags />

        {/* 인기 레시피 섹션 */}
        <section className="py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-neutral-gray-900 dark:text-neutral-white">
              인기 레시피
            </h2>
            <Link href="/recipes?sort=popular" className="inline-flex items-center gap-1 px-4 py-2 text-sm rounded-lg bg-transparent text-[#222222] border-none hover:bg-[#F7F7F7] focus:outline focus:outline-2 focus:outline-[#FF385C] transition-all duration-150">
              더 보기
              <Icon name="chevron-right" size="sm" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </section>

        {/* 최신 레시피 섹션 */}
        <section className="py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-neutral-gray-900 dark:text-neutral-white">
              최신 레시피
            </h2>
            <Link href="/recipes?sort=latest" className="inline-flex items-center gap-1 px-4 py-2 text-sm rounded-lg bg-transparent text-[#222222] border-none hover:bg-[#F7F7F7] focus:outline focus:outline-2 focus:outline-[#FF385C] transition-all duration-150">
              더 보기
              <Icon name="chevron-right" size="sm" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </section>

        {/* 기능 소개 섹션 */}
        <section className="grid md:grid-cols-3 gap-8 py-16">
          <Card hover padding="lg" className="text-center">
            <CardContent>
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍳</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-neutral-gray-900 dark:text-neutral-white">레시피 공유</h3>
              <p className="text-neutral-gray-700 dark:text-neutral-gray-300">
                나만의 특별한 레시피를 다른 사람들과 공유해보세요
              </p>
            </CardContent>
          </Card>
          
          <Card hover padding="lg" className="text-center">
            <CardContent>
              <div className="bg-semantic-success/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-neutral-gray-900 dark:text-neutral-white">스마트 검색</h3>
              <p className="text-neutral-gray-700 dark:text-neutral-gray-300">
                재료, 조리시간, 난이도로 원하는 레시피를 쉽게 찾아보세요
              </p>
            </CardContent>
          </Card>
          
          <Card hover padding="lg" className="text-center">
            <CardContent>
              <div className="bg-semantic-warning/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-neutral-gray-900 dark:text-neutral-white">평점 & 리뷰</h3>
              <p className="text-neutral-gray-700 dark:text-neutral-gray-300">
                다른 요리사들의 후기를 보고 평점을 남겨보세요
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
