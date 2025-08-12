import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Recipe Rader에 오신 것을 환영합니다
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          맛있는 레시피를 공유하고, 새로운 요리를 발견하세요
        </p>
        <div className="flex gap-4 justify-center">
          <Link 
            href="/recipes" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            레시피 둘러보기
          </Link>
          <Link 
            href="/login" 
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            시작하기
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8 py-16">
        <div className="text-center">
          <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🍳</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">레시피 공유</h3>
          <p className="text-gray-600">
            나만의 특별한 레시피를 다른 사람들과 공유해보세요
          </p>
        </div>
        <div className="text-center">
          <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔍</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">레시피 검색</h3>
          <p className="text-gray-600">
            원하는 요리를 쉽고 빠르게 찾아보세요
          </p>
        </div>
        <div className="text-center">
          <div className="bg-yellow-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⭐</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">평점 & 리뷰</h3>
          <p className="text-gray-600">
            다른 요리사들의 후기를 보고 평점을 남겨보세요
          </p>
        </div>
      </section>
    </div>
  );
}
