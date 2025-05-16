import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ProductFilters, { FilterValues } from '@/components/ProductFilters';
import { getProducts, getProductsByCategory } from '@/services/productService';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCartContext } from '@/contexts/CartContext';
import { applyFilters } from '@/services/reviewService';
import { Search } from 'lucide-react';

const Shop = () => {
  const { t } = useLanguage();
  const { addToCart } = useCartContext();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterValues | null>(null);
  const [search, setSearch] = useState('');
  
  const allProducts = getProducts();
  const categories = [...new Set([...allProducts.map(product => product.category), 'candles'])];
  
  // Filter products based on category and other filters
  let products = activeCategory 
    ? getProductsByCategory(activeCategory) 
    : allProducts;
    
  // Apply additional filters if they exist
  if (filters) {
    products = applyFilters(products, {
      priceRange: filters.priceRange,
      categories: filters.categories.length > 0 ? filters.categories : undefined,
      materials: filters.materials.length > 0 ? filters.materials : undefined,
      colors: filters.colors.length > 0 ? filters.colors : undefined,
      inStock: filters.inStock
    });
  }
  
  // Применяем поиск по названию и описанию
  if (search.trim()) {
    products = products.filter(product => {
      const lang = t('language');
      return (
        product.name[lang].toLowerCase().includes(search.toLowerCase()) ||
        product.description[lang].toLowerCase().includes(search.toLowerCase())
      );
    });
  }
  
  const handleAddToCart = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addToCart(product);
    }
  };

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
    
    // If category is selected in filters, update the active category
    if (newFilters.categories.length === 1) {
      setActiveCategory(newFilters.categories[0]);
    } else if (newFilters.categories.length === 0 && activeCategory) {
      setActiveCategory(null);
    }
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
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="py-12 px-4 bg-background">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-6">{t('nav.shop')}</h1>
            <div className="flex flex-wrap gap-2 mb-6 items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={activeCategory === null ? "default" : "outline"}
                  className={(activeCategory === null ? "bg-crimson text-black " : "") + "text-lg md:text-xl px-6 py-3"}
                  onClick={() => setActiveCategory(null)}
                >
                  {t('category.all')}
                </Button>
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    className={(activeCategory === category ? "bg-crimson text-black " : "") + "text-lg md:text-xl px-6 py-3"}
                    onClick={() => setActiveCategory(category)}
                  >
                    {getCategoryName(category)}
                  </Button>
                ))}
              </div>
              <div className="relative flex items-center ml-auto">
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={t('home.search_placeholder') || 'Поиск...'}
                  className="border rounded px-3 py-2 bg-background text-foreground focus:outline-crimson pr-10 min-w-[180px]"
                />
                <Search className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Product Filters - Sidebar */}
            <div className="lg:col-span-1">
              <ProductFilters 
                onFilterChange={handleFilterChange}
                categories={categories}
                initialFilters={filters || undefined}
              />
            </div>
            
            {/* Product Grid */}
            <div className="lg:col-span-3">
              {products.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-foreground/80">{t('product.no_products_found')}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(product => (
                    <ProductCard
                      key={product.id}
                      {...product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Shop;
