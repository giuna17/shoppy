import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProductById } from '@/services/productService';
import { getUserReviews } from '@/services/reviewService';
import { Button } from '@/components/ui/button';
import { Star, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Profile = () => {
  const { isLoggedIn, user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!isLoggedIn || !user) {
      navigate('/');
    }
  }, [isLoggedIn, user, navigate]);

  if (!isLoggedIn || !user) {
    return (
      <div style={{ color: 'white', background: 'black', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>Not logged in. Redirecting...</div>
      </div>
    );
  }

  let userReviews = [];
  try {
    userReviews = getUserReviews(user.id) || [];
  } catch (e: any) {
    setError('Ошибка загрузки отзывов: ' + (e?.message || e));
  }

  // Function to render rating stars
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

  // Function to format date
  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        {/* User Profile Header */}
        <div className="mb-8 flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatarUrl} />
            <AvatarFallback>
              <User className="h-10 w-10" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{user.username}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>

        {error && (
          <div style={{ color: 'red', background: 'white', padding: 16, marginBottom: 16 }}>
            {error}
          </div>
        )}

        {/* Tabs for Purchase History and Reviews */}
        <Tabs defaultValue="purchases" className="space-y-4">
          <TabsList>
            <TabsTrigger value="purchases">{t('profile.purchases')}</TabsTrigger>
            <TabsTrigger value="reviews">{t('profile.reviews')}</TabsTrigger>
          </TabsList>

          {/* Purchase History Tab */}
          <TabsContent value="purchases">
            <Card>
              <CardHeader>
                <CardTitle>{t('profile.purchase_history')}</CardTitle>
                <CardDescription>{t('profile.recent_purchases')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user.purchasedProducts.length > 0 ? (
                    user.purchasedProducts.map(productId => {
                      const product = getProductById(productId);
                      if (!product) return null;
                      return (
                        <div
                          key={productId}
                          className="flex items-center gap-4 p-4 rounded-lg border bg-card"
                        >
                          <img
                            src={product.image}
                            alt={product.name[t('language')]}
                            className="w-20 h-20 object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium">
                              {product.name[t('language')]}
                            </h3>
                            <p className="text-muted-foreground">
                              {product.price} {product.currency}
                            </p>
                          </div>
                          <Button asChild variant="outline">
                            <Link to={`/product/${product.id}`}>
                              {t('profile.view_product')}
                            </Link>
                          </Button>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      {t('profile.no_purchases')}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>{t('profile.my_reviews')}</CardTitle>
                <CardDescription>{t('profile.reviews_description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userReviews.length > 0 ? (
                    userReviews.map(review => {
                      const product = getProductById(review.productId);
                      if (!product) return null;
                      return (
                        <div
                          key={review.id}
                          className="p-4 rounded-lg border bg-card"
                        >
                          <div className="flex items-center gap-4 mb-4">
                            <img
                              src={product.image}
                              alt={product.name[t('language')]}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                            <div>
                              <h3 className="font-medium">
                                {product.name[t('language')]}
                              </h3>
                              <div className="flex gap-1 mt-1">
                                {renderStars(review.rating)}
                              </div>
                            </div>
                            <div className="ml-auto text-sm text-muted-foreground">
                              {formatDate(review.date)}
                            </div>
                          </div>
                          <p className="text-sm text-foreground/90">
                            {review.comment}
                          </p>
                          {review.photoUrl && (
                            <img
                              src={review.photoUrl}
                              alt="Review"
                              className="mt-4 max-h-40 rounded-md object-cover"
                            />
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      {t('profile.no_reviews')}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Profile; 