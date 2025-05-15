import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Star, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { addReview, canUserReviewProduct } from '@/services/reviewService';

interface ReviewFormProps {
  productId: number;
  onReviewAdded?: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onReviewAdded }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const auth = useAuth();
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [hover, setHover] = useState<number | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [canReview, setCanReview] = useState<boolean>(false);
  const [blockReason, setBlockReason] = useState<string>('');
  
  useEffect(() => {
    if (auth.isLoggedIn && auth.user) {
      const result = canUserReviewProduct(auth.user.id, productId);
      setCanReview(result.canReview);
      setBlockReason(result.reason ? t(result.reason) : '');
    } else {
      setCanReview(false);
      setBlockReason(t('reviews.login_required'));
    }
  }, [auth.isLoggedIn, auth.user, productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!auth.isLoggedIn || !auth.user) {
      toast({
        title: t('reviews.error'),
        description: t('reviews.login_required'),
        variant: "destructive",
      });
      return;
    }
    
    if (!comment.trim()) {
      toast({
        title: t('reviews.error'),
        description: t('reviews.comment_required'),
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Add the review
      await addReview({
        productId,
        userId: auth.user.id,
        userName: auth.user.username,
        rating,
        comment,
        photoUrl: photoUrl || undefined,
        date: new Date(),
      });
      
      // Reset form
      setRating(5);
      setComment('');
      setPhotoUrl('');
      
      // Show success message
      toast({
        title: t('reviews.success'),
        description: t('reviews.thank_you'),
      });
      
      // Callback when review is added
      if (onReviewAdded) {
        onReviewAdded();
      }
    } catch (error) {
      toast({
        title: t('reviews.error'),
        description: error instanceof Error ? error.message : t('reviews.unknown_error'),
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="border border-border rounded-lg p-5 bg-card mb-6">
      <h3 className="text-lg font-medium mb-4">{t('reviews.leave_review')}</h3>
      
      {!canReview && (
        <div className="bg-amber-50 text-amber-800 p-3 rounded-md mb-4 dark:bg-amber-900/30 dark:text-amber-200 flex items-center gap-2">
          <Lock className="h-4 w-4" />
          {blockReason}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label className="mb-2 block">{t('reviews.rating')}</Label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                className={`p-0 bg-transparent border-none ${canReview ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                onClick={() => canReview && setRating(star)}
                onMouseEnter={() => canReview && setHover(star)}
                onMouseLeave={() => canReview && setHover(null)}
                disabled={!canReview}
              >
                <Star
                  className={`w-6 h-6 ${
                    (hover !== null ? star <= hover : star <= rating)
                      ? 'text-yellow-500 fill-yellow-500'
                      : 'text-gray-300'
                  } ${!canReview ? 'opacity-50' : ''}`}
                />
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <Label htmlFor="comment" className="mb-2 block">
            {t('reviews.comment')}
          </Label>
          <Textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t('reviews.comment_placeholder')}
            className="min-h-32"
            disabled={!canReview}
          />
        </div>
        
        <div>
          <Label htmlFor="photo" className="mb-2 block">
            {t('reviews.photo_url')}
          </Label>
          <input
            id="photo"
            type="url"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            placeholder={t('reviews.photo_url_placeholder')}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            disabled={!canReview}
          />
        </div>
        
        <Button
          type="submit"
          className="bg-crimson hover:bg-crimson/90 text-black font-medium"
          disabled={!canReview}
        >
          {t('reviews.submit')}
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm;
