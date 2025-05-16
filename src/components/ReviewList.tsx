import React from 'react';
import { Star, StarHalf, StarOff } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Review } from '@/services/reviewService';

interface ReviewListProps {
  reviews: Review[];
  showTitle?: boolean;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, showTitle = true }) => {
  const { t } = useLanguage();
  
  if (reviews.length === 0) {
    return (
      <div className="text-center py-6 text-foreground/70">
        <p>{t('reviews.no_reviews')}</p>
      </div>
    );
  }

  // Function to format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };
  
  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 text-yellow-500 fill-yellow-500" />);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-4 h-4 text-yellow-500" />);
    }
    
    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarOff key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    
    return stars;
  };
  
  return (
    <div className="space-y-6">
      {showTitle && (
        <>
          <div className="mb-4 text-center text-base font-bold text-green-700">
            {t('reviews.leave_good_review_discount')}
          </div>
          <h3 className="text-xl font-semibold">{t('reviews.title')} ({reviews.length})</h3>
        </>
      )}
      
      {reviews.map((review) => (
        <div key={review.id} className="border border-border rounded-lg p-4 bg-card">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="flex items-center">
                <div className="font-medium">{review.userName}</div>
                <div className="text-sm text-foreground/60 ml-3">
                  {formatDate(review.date)}
                </div>
              </div>
              <div className="flex mt-1">{renderStars(review.rating)}</div>
            </div>
          </div>
          
          <div className="mt-3">
            <p className="text-foreground/80">{review.comment}</p>
          </div>
          
          {review.photoUrl && (
            <div className="mt-3">
              <img 
                src={review.photoUrl} 
                alt="Review" 
                className="max-h-40 rounded-md object-cover border border-border" 
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
