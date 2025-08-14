'use client';

import { useState } from 'react';
import { Card, CardContent, Button, Icon, Avatar, Textarea, Divider } from '@/lib/components/ui';

interface IReview {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
  helpful: number;
  isHelpful: boolean;
}

// 임시 리뷰 데이터
const mockReviews: IReview[] = [
  {
    id: '1',
    userId: 'user1',
    userName: '요리초보',
    rating: 5,
    comment: '정말 맛있게 만들었어요! 설명이 너무 자세해서 초보도 쉽게 따라할 수 있었습니다. 가족들이 맛있다고 칭찬해줬어요 ㅎㅎ',
    createdAt: '2일 전',
    helpful: 12,
    isHelpful: false
  },
  {
    id: '2',
    userId: 'user2',
    userName: '홈쿡마스터',
    rating: 4,
    comment: '김치가 너무 시어서 설탕을 조금 더 넣었어요. 그래도 맛있게 나왔습니다!',
    createdAt: '5일 전',
    helpful: 8,
    isHelpful: true
  },
  {
    id: '3',
    userId: 'user3',
    userName: '맛집탐방러',
    rating: 5,
    comment: '와... 이렇게 간단한 재료로 이런 맛이 나다니! 김치볶음밥 맛집 부럽지 않아요.',
    createdAt: '1주일 전',
    helpful: 15,
    isHelpful: false
  }
];

interface IReviewSectionProps {
  recipeId: string;
}

export default function ReviewSection({ recipeId }: IReviewSectionProps) {
  const [reviews, setReviews] = useState<IReview[]>(mockReviews);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const renderStars = (rating: number, interactive = false) => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name="star"
          size="sm"
          className={`${
            i <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
          onClick={interactive ? () => setNewRating(i) : undefined}
        />
      );
    }

    return stars;
  };

  const handleSubmitReview = async () => {
    if (!newReview.trim() || newRating === 0) return;

    setIsSubmitting(true);
    
    // 임시 새 리뷰 추가
    const review: IReview = {
      id: Date.now().toString(),
      userId: 'current-user',
      userName: '현재사용자',
      rating: newRating,
      comment: newReview,
      createdAt: '방금 전',
      helpful: 0,
      isHelpful: false
    };

    setReviews([review, ...reviews]);
    setNewReview('');
    setNewRating(0);
    setIsSubmitting(false);
  };

  const handleHelpful = (reviewId: string) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { 
            ...review, 
            helpful: review.isHelpful ? review.helpful - 1 : review.helpful + 1,
            isHelpful: !review.isHelpful 
          }
        : review
    ));
  };

  const avgRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <Card>
      <CardContent padding="lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-neutral-gray-900 dark:text-neutral-white">
            리뷰 ({reviews.length})
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex">
              {renderStars(Math.round(avgRating))}
            </div>
            <span className="text-lg font-semibold">{avgRating.toFixed(1)}</span>
          </div>
        </div>

        {/* 리뷰 작성 */}
        <div className="mb-8 p-4 bg-neutral-gray-50 dark:bg-neutral-gray-800 rounded-lg">
          <h3 className="font-semibold text-neutral-gray-900 dark:text-neutral-white mb-3">
            리뷰 작성하기
          </h3>
          
          <div className="mb-3">
            <label className="block text-sm text-neutral-gray-600 mb-2">평점</label>
            <div className="flex gap-1">
              {renderStars(newRating, true)}
            </div>
          </div>

          <Textarea
            placeholder="이 레시피를 만들어보신 후기를 남겨주세요..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            rows={4}
            className="mb-3"
          />

          <div className="flex justify-end">
            <Button
              variant="primary"
              onClick={handleSubmitReview}
              disabled={!newReview.trim() || newRating === 0 || isSubmitting}
            >
              {isSubmitting ? '등록 중...' : '리뷰 등록'}
            </Button>
          </div>
        </div>

        <Divider />

        {/* 리뷰 목록 */}
        <div className="space-y-6 mt-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
              <div className="flex items-start gap-4">
                <Avatar
                  src={review.userAvatar}
                  alt={review.userName}
                  fallback={review.userName[0]}
                  size="md"
                />
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-neutral-gray-900 dark:text-neutral-white">
                      {review.userName}
                    </span>
                    <div className="flex">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm text-neutral-gray-500">
                      {review.createdAt}
                    </span>
                  </div>
                  
                  <p className="text-neutral-gray-700 dark:text-neutral-gray-300 mb-3">
                    {review.comment}
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleHelpful(review.id)}
                      className={`flex items-center gap-1 ${
                        review.isHelpful ? 'text-primary' : 'text-neutral-gray-500'
                      }`}
                    >
                      <Icon name="thumbs-up" size="sm" />
                      도움됨 ({review.helpful})
                    </Button>
                    <Button variant="ghost" size="sm" className="text-neutral-gray-500">
                      답글
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 더 보기 버튼 */}
        {reviews.length > 3 && (
          <div className="text-center mt-6">
            <Button variant="outline">
              리뷰 더 보기
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}