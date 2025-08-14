'use client';

import Link from 'next/link';
import { Card, CardContent, Badge, Icon, Button, Image } from '@/lib/components/ui';

export interface IRecipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  cookTime: number;
  difficulty: string;
  rating: number;
  reviewCount: number;
  author: string;
  tags: string[];
}

interface IRecipeCardProps {
  recipe: IRecipe;
}

export default function RecipeCard({ recipe }: IRecipeCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '쉬움':
        return 'semantic-success';
      case '보통':
        return 'semantic-warning';
      case '어려움':
        return 'semantic-error';
      default:
        return 'neutral-gray-500';
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
    <Card hover className="overflow-hidden">
      <div className="relative">
        <div className="aspect-[4/3] bg-gray-200 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-orange-100 to-orange-200 flex items-center justify-center">
            <span className="text-6xl">🍽️</span>
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <Button variant="ghost" size="sm" className="bg-white/80 backdrop-blur-sm rounded-full p-2">
            <Icon name="heart" size="sm" className="text-gray-600" />
          </Button>
        </div>
      </div>
      
      <CardContent padding="md">
        <div className="mb-2">
          <Badge variant={getDifficultyColor(recipe.difficulty)} size="sm">
            {recipe.difficulty}
          </Badge>
        </div>
        
        <Link href={`/recipes/${recipe.id}`}>
          <h3 className="text-lg font-semibold text-neutral-gray-900 dark:text-neutral-white mb-2 hover:text-primary transition-colors">
            {recipe.title}
          </h3>
        </Link>
        
        <p className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400 mb-3 line-clamp-2">
          {recipe.description}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-neutral-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Icon name="clock" size="sm" />
            <span>{recipe.cookTime}분</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="user" size="sm" />
            <span>{recipe.author}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            {renderStars(recipe.rating)}
            <span className="text-sm text-neutral-gray-600 ml-1">
              {recipe.rating} ({recipe.reviewCount})
            </span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {recipe.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="neutral" size="sm">
              {tag}
            </Badge>
          ))}
          {recipe.tags.length > 3 && (
            <Badge variant="neutral" size="sm">
              +{recipe.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}