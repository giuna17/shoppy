
import React from 'react';
import { Button } from '@/components/ui/button';
import ReviewList from './ReviewList';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { getTopReviews } from '@/services/reviewService';

const FeaturedReviews = () => {
  const { t } = useLanguage();
  const reviews = getTopReviews(3); // Get top 3 reviews
  
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-crimson">{t('reviews.testimonials')}</h2>
        <Button 
          asChild 
          variant="link" 
          className="text-crimson hover:text-crimson/80"
        >
          <Link to="/reviews">{t('reviews.view_all')}</Link>
        </Button>
      </div>
      
      <ReviewList reviews={reviews} showTitle={false} />
    </div>
  );
};

export default FeaturedReviews;
