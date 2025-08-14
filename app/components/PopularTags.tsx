'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

// 음식 카테고리별 글래스몰피즘 색상 매핑
const categoryColors = {
  '한식': 'bg-red-500/20 border border-red-500/30 text-white dark:text-white hover:bg-red-500/30 hover:border-red-500/50',
  '양식': 'bg-gray-500/20 border border-gray-500/30 text-gray-800 dark:text-white hover:bg-gray-500/30 hover:border-gray-500/50',
  '중식': 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-800 dark:text-white hover:bg-yellow-500/30 hover:border-yellow-500/50',
  '일식': 'bg-pink-500/20 border border-pink-500/30 text-white dark:text-white hover:bg-pink-500/30 hover:border-pink-500/50',
  '인도요리': 'bg-orange-500/20 border border-orange-500/30 text-white dark:text-white hover:bg-orange-500/30 hover:border-orange-500/50',
  '태국요리': 'bg-green-500/20 border border-green-500/30 text-white dark:text-white hover:bg-green-500/30 hover:border-green-500/50',
  '멕시코요리': 'bg-amber-500/20 border border-amber-500/30 text-white dark:text-white hover:bg-amber-500/30 hover:border-amber-500/50',
  '디저트': 'bg-purple-500/20 border border-purple-500/30 text-white dark:text-white hover:bg-purple-500/30 hover:border-purple-500/50',
  '간단요리': 'bg-blue-500/20 border border-blue-500/30 text-white dark:text-white hover:bg-blue-500/30 hover:border-blue-500/50',
  '건강식': 'bg-emerald-500/20 border border-emerald-500/30 text-white dark:text-white hover:bg-emerald-500/30 hover:border-emerald-500/50',
  '파스타': 'bg-indigo-500/20 border border-indigo-500/30 text-white dark:text-white hover:bg-indigo-500/30 hover:border-indigo-500/50',
  '치킨': 'bg-amber-600/20 border border-amber-600/30 text-white dark:text-white hover:bg-amber-600/30 hover:border-amber-600/50',
  '매운맛': 'bg-red-600/20 border border-red-600/30 text-white dark:text-white hover:bg-red-600/30 hover:border-red-600/50',
  '비건': 'bg-green-600/20 border border-green-600/30 text-white dark:text-white hover:bg-green-600/30 hover:border-green-600/50',
  '샐러드': 'bg-lime-500/20 border border-lime-500/30 text-white dark:text-white hover:bg-lime-500/30 hover:border-lime-500/50',
  '기본': 'bg-gray-500/20 border border-gray-500/30 text-white dark:text-white hover:bg-gray-500/30 hover:border-gray-500/50' // 기본 색상
};

const popularTags = [
  { name: '한식', count: 234 },
  { name: '양식', count: 189 },
  { name: '간단요리', count: 156 },
  { name: '디저트', count: 143 },
  { name: '건강식', count: 132 },
  { name: '파스타', count: 98 },
  { name: '치킨', count: 87 },
  { name: '매운맛', count: 76 },
  { name: '비건', count: 65 },
  { name: '샐러드', count: 54 }
];

// 태그 색상을 가져오는 함수
const getTagColor = (tagName: string): string => {
  return categoryColors[tagName as keyof typeof categoryColors] || categoryColors['기본'];
};

export default function PopularTags() {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-neutral-gray-900 dark:text-neutral-white mb-6">
        인기 태그
      </h2>
      <div className="flex flex-wrap gap-3">
        {popularTags.map((tag) => (
          <Link key={tag.name} href={`/recipes?tag=${encodeURIComponent(tag.name)}`}>
            <div
              className={cn(
                "inline-flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ease-in-out cursor-pointer",
                "backdrop-blur-md backdrop-saturate-150",
                "shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10",
                "transform hover:scale-105 hover:-translate-y-0.5",
                "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500/50",
                "relative overflow-hidden",
                "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
                getTagColor(tag.name)
              )}
            >
              <span className="relative z-10 font-semibold text-shadow-lg" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)' }}>
                #{tag.name} ({tag.count})
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}