
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowLeft, Star } from 'lucide-react';
import { getProductById } from '@/services/productService';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useCartContext } from '@/contexts/CartContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ReviewList from '@/components/ReviewList';
import ReviewForm from '@/components/ReviewForm';
import { 
  getProductAverageRating, 
  getProductReviews
} from '@/services/reviewService';

const ProductDetail = () => {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const { addToCart, cart } = useCartContext();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);
  const auth = useAuth();
  
  const productId = parseInt(id || '0');
  const product = getProductById(productId);
  
  // Get product reviews
  const reviews = getProductReviews(productId);
  const averageRating = getProductAverageRating(productId);
  
  // Check if user has purchased this product
  const userHasPurchased = auth.hasUserPurchasedProduct(productId);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow container mx-auto py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">{t('product.not_found')}</h1>
            <p className="mb-8">{t('product.not_found_message')}</p>
            <Button asChild>
              <Link to="/shop">{t('product.return_to_shop')}</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Calculate current quantity in cart
  const itemInCart = cart.find(item => item.product.id === product.id);
  const currentQuantity = itemInCart?.quantity || 0;
  const remainingStock = product.stock - currentQuantity;

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };
  
  // Function to get localized category name
  const getCategoryName = (category: string) => {
    if (category === 'bracelets') return t('category.bracelets');
    if (category === 'rings') return t('category.rings');
    if (category === 'earrings') return t('category.earrings');
    if (category === 'hairpins') return t('category.hairpins');
    if (category === 'candles') return t('category.candles');
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const handleReviewAdded = () => {
    setReviewsLoaded(!reviewsLoaded);
  };
  
  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i} 
          className={`h-5 w-5 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
        />
      );
    }
    
    return stars;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow container mx-auto py-12 px-4">
        <div className="mb-6">
          <Button variant="ghost" asChild className="flex items-center gap-2 text-crimson hover:text-crimson/90">
            <Link to="/shop">
              <ArrowLeft className="h-4 w-4" /> {t('product.back_to_shop')}
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square border-2 border-crimson rounded-md overflow-hidden bg-card crimson-glow relative">
              {/* Background star icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 z-0">
                <Star className="w-40 h-40" />
              </div>
              <img 
                src={selectedImage || product.image} 
                alt={product.name[language]} 
                className="w-full h-full object-contain p-2 relative z-10"
              />
            </div>
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-crimson mb-2">{product.name[language]}</h1>
              <div className="flex items-center gap-4 mb-3">
                <span className="inline-block bg-muted px-3 py-1 rounded-full text-sm font-medium text-foreground/80">
                  {getCategoryName(product.category)}
                </span>
                
                {reviews.length > 0 && (
                  <div className="flex items-center">
                    <div className="flex mr-2">
                      {renderStars(Math.round(averageRating))}
                    </div>
                    <span className="text-foreground/70 text-sm">
                      ({reviews.length} {reviews.length === 1 ? t('reviews.review') : t('reviews.reviews')})
                    </span>
                  </div>
                )}
              </div>
              <p className="text-lg text-foreground/80">{product.description[language]}</p>
            </div>
            
            <div className="border-t border-border pt-6">
              <div className="flex items-center justify-between mb-6">
                <p className="text-3xl font-bold">{`${product.price} ₾`}</p>
                <div className="flex items-center gap-2">
                  <div className={`inline-block ${remainingStock > 2 ? 'bg-muted text-crimson' : 'bg-amber-100 text-amber-800'} px-3 py-1 rounded-full text-sm font-medium`}>
                    {remainingStock > 0 ? t('product.in_stock') : t('product.out_of_stock')}
                  </div>
                  <div className="text-sm font-medium">
                    {remainingStock > 0 
                      ? t('product.remaining_stock', {count: remainingStock}) 
                      : t('product.no_stock')}
                  </div>
                </div>
              </div>
              
              {remainingStock > 0 ? (
                <>
                  <Alert className="mb-4 bg-muted/50 border border-border">
                    <AlertDescription>
                      {t('product.stock_warning')}
                    </AlertDescription>
                  </Alert>
                  
                  <Button 
                    className="w-full bg-crimson hover:bg-crimson/90 text-black font-medium py-6 text-lg relative"
                    onClick={handleAddToCart}
                    disabled={remainingStock <= 0}
                  >
                    {/* Background cart icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                      <ShoppingCart className="w-10 h-10" />
                    </div>
                    <span className="relative z-10 flex items-center">
                      <ShoppingCart className="mr-2 h-5 w-5" /> {t('product.add_to_cart')}
                    </span>
                  </Button>
                </>
              ) : (
                <Button 
                  className="w-full bg-muted text-muted-foreground font-medium py-6 text-lg"
                  disabled
                >
                  {t('product.out_of_stock')}
                </Button>
              )}
            </div>
            
            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-bold mb-3">{t('product.details')}</h3>
              <ul className="space-y-2 text-foreground/80">
                <li>{t('product.detail_1')}</li>
                <li>{t('product.detail_2')}</li>
                <li>{t('product.detail_3')}</li>
                <li>{t('product.detail_4')}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="max-w-6xl mx-auto mt-16">
          <div className="border-t border-border pt-8 pb-4">
            <h2 className="text-2xl font-bold mb-6">{t('reviews.title')}</h2>
            
            {/* Review Form */}
            <ReviewForm 
              productId={productId} 
              onReviewAdded={handleReviewAdded}
            />
            
            {/* Reviews List */}
            <ReviewList reviews={reviews} />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
