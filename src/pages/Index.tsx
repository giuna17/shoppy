import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import FeaturedProduct from '@/components/FeaturedProduct';
import FeaturedReviews from '@/components/FeaturedReviews';
import { Button } from '@/components/ui/button';
import { getProducts, getFeaturedProducts } from '@/services/productService';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCartContext } from '@/contexts/CartContext';

const Index = () => {
  const { t } = useLanguage();
  const { addToCart } = useCartContext();
  
  const featuredProducts = getFeaturedProducts();
  const products = getProducts().slice(0, 4); // Show first 4 products on homepage
  
  const handleAddToCart = (productId: number) => {
    const product = products.find(p => p.id === productId) || 
                   featuredProducts.find(p => p.id === productId);
    if (product) {
      addToCart(product);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero section */}
      <section className="py-16 px-4 bg-background relative flex items-center justify-center min-h-[60vh]">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-[url('/lovable-uploads/7aa51a58-deaa-4064-a1d1-4b19f2ac5ca5.png')] bg-no-repeat bg-center bg-contain opacity-50 scale-[1.95] translate-y-[15%]"
          />
          {/* Gradient overlay to hide bottom part */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-background" style={{ top: '65%' }} />
        </div>
        
        {/* Content */}
        <div className="container mx-auto text-center relative z-10">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-4 mt-6 relative z-10 font-medieval">
              <span className="text-crimson">Handmade</span> <span className="text-white">Oddities</span>
            </h1>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto mb-8">
            {t('home.subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              asChild 
              className="bg-crimson hover:bg-crimson/90 text-black font-medium px-8 py-6"
            >
              <Link to="/shop">{t('home.shop_now')}</Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              className="text-foreground border-crimson hover:bg-crimson/10 px-8 py-6"
            >
              <Link to="/about">{t('home.our_story')}</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Featured product */}
      {featuredProducts.length > 0 && (
        <section className="py-12 px-4 bg-background relative z-20">
          <div className="container mx-auto">
            <FeaturedProduct
              {...featuredProducts[0]}
              onAddToCart={handleAddToCart}
            />
          </div>
        </section>
      )}
      
      {/* Product grid section */}
      <section className="py-12 px-4 bg-background relative z-20">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">{t('home.popular_products')}</h2>
            <Button 
              asChild 
              variant="link" 
              className="text-crimson hover:text-crimson/80"
            >
              <Link to="/shop">{t('home.view_all')}</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Reviews section */}
      <section className="py-12 px-4 bg-background">
        <div className="container mx-auto">
          <FeaturedReviews />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
