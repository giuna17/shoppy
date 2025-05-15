
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReviewList from '@/components/ReviewList';
import { useLanguage } from '@/contexts/LanguageContext';
import { getAllReviews } from '@/services/reviewService';

const ReviewsPage = () => {
  const { t } = useLanguage();
  const reviews = getAllReviews();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="py-12 px-4 bg-background flex-grow">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8">{t('reviews.customer_reviews')}</h1>
          
          <div className="max-w-4xl mx-auto">
            <ReviewList reviews={reviews} />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ReviewsPage;
