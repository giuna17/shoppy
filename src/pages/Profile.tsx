import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProductById } from '@/services/productService';
import { getUserReviews, getProductsAwaitingReview } from '@/services/reviewService';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

const Profile = () => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  if (!isLoggedIn || !user) {
    navigate('/');
    return null;
  }

  // Получаем отзывы пользователя
  const userReviews = getUserReviews(user.id);
  
  // Получаем товары, ожидающие отзыва
  const productsAwaitingReview = getProductsAwaitingReview(user.id)
    .map(productId => getProductById(productId))
    .filter(product => product !== null);

  // Функция для отображения звезд рейтинга
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>История покупок</h2>
        <div style={{ marginBottom: '40px' }}>
          {user.purchasedProducts.map(productId => {
            const product = getProductById(productId);
            if (!product) return null;
            return (
              <div key={productId} style={{ 
                marginBottom: '20px', 
                padding: '15px', 
                border: '1px solid #ddd',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px'
              }}>
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }} 
                />
                <div>
                  <h3 style={{ fontSize: '18px', marginBottom: '5px' }}>{product.name}</h3>
                  <p style={{ color: '#666' }}>{product.price} GEL</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Товары, ожидающие отзыва */}
        {productsAwaitingReview.length > 0 && (
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Товары, ожидающие отзыва</h2>
            <div>
              {productsAwaitingReview.map(product => (
                <div key={product.id} style={{ 
                  marginBottom: '20px', 
                  padding: '15px', 
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px'
                }}>
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }} 
                  />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '5px' }}>{product.name}</h3>
                    <p style={{ color: '#666' }}>{product.price} GEL</p>
                  </div>
                  <Button 
                    asChild
                    style={{ 
                      backgroundColor: '#e11d48', 
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <Link to={`/product/${product.id}?review=true`}>
                      Оставить отзыв
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Оставленные отзывы */}
        <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Мои отзывы</h2>
        <div>
          {userReviews.map(review => {
            const product = getProductById(review.productId);
            if (!product) return null;
            
            return (
              <div key={review.id} style={{ 
                marginBottom: '20px', 
                padding: '15px', 
                border: '1px solid #ddd',
                borderRadius: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '15px' }}>
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} 
                  />
                  <div>
                    <h3 style={{ fontSize: '18px', marginBottom: '5px' }}>{product.name}</h3>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </div>
                <p style={{ color: '#333' }}>{review.comment}</p>
                {review.photoUrl && (
                  <img 
                    src={review.photoUrl} 
                    alt="Фото к отзыву" 
                    style={{ 
                      marginTop: '10px',
                      maxHeight: '200px',
                      borderRadius: '4px',
                      objectFit: 'cover'
                    }} 
                  />
                )}
                <div style={{ 
                  marginTop: '10px', 
                  color: '#666', 
                  fontSize: '14px' 
                }}>
                  {new Date(review.date).toLocaleDateString()}
                </div>
              </div>
            );
          })}
          {userReviews.length === 0 && (
            <p style={{ color: '#666', textAlign: 'center', padding: '20px' }}>
              Вы еще не оставили ни одного отзыва
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile; 