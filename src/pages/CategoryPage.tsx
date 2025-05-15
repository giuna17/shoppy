
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/services/productService';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCartContext } from '@/contexts/CartContext';

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const { t } = useLanguage();
  const { addToCart } = useCartContext();
  
  // Filter products by category
  const allProducts = getProducts();
  const products = allProducts.filter(product => {
    if (!categoryName) return true;
    return product.category.toLowerCase() === categoryName.toLowerCase();
  });
  
  const getCategoryTitle = () => {
    if (!categoryName) return t('category.all');
    
    const key = `category.${categoryName.toLowerCase()}`;
    return t(key);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="py-12 px-4 bg-background flex-grow">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8">{getCategoryTitle()}</h1>
          
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onAddToCart={() => addToCart(product)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No products found in this category</p>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
