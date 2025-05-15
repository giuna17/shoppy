import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProductCardProps {
  id: number;
  name: {
    ru: string;
    en: string;
    ge: string;
  };
  description: {
    ru: string;
    en: string;
    ge: string;
  };
  price: number;
  currency: string;
  image: string;
  stock: number;
  onAddToCart: (id: number) => void;
}

const ProductCard = ({
  id,
  name,
  description,
  price,
  currency,
  image,
  stock,
  onAddToCart
}: ProductCardProps) => {
  const { t, language } = useLanguage();
  const isOutOfStock = stock <= 0;

  return (
    <Card className={`product-card bg-card border-2 border-border overflow-hidden h-full flex flex-col ${isOutOfStock ? 'opacity-60 cursor-not-allowed' : ''}`}>
      <Link 
        to={isOutOfStock ? '#' : `/product/${id}`} 
        className={`block flex-grow ${isOutOfStock ? 'pointer-events-none' : ''}`}
      >
        <div className="relative aspect-square overflow-hidden bg-muted">
          {/* Background star icon - moved it behind by lowering z-index */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 z-0">
            <Star className="w-40 h-40" />
          </div>
          <img
            src={image}
            alt={name[language]}
            className={`object-cover w-full h-full transition-transform duration-300 ${!isOutOfStock ? 'hover:scale-105' : ''} relative z-1`}
          />
          {/* Stock indicator */}
          <div className="absolute top-2 right-2 z-10">
            {isOutOfStock ? (
              <span className="bg-background/80 backdrop-blur-sm text-foreground/80 text-xs px-2 py-1 rounded">
                {t('product.out_of_stock')}
              </span>
            ) : (
              <span className="bg-background/80 backdrop-blur-sm text-crimson text-xs px-2 py-1 rounded">
                {t('product.in_stock')}: {stock}
              </span>
            )}
          </div>
        </div>
      </Link>
      <CardContent className="p-4 flex-grow">
        <Link 
          to={isOutOfStock ? '#' : `/product/${id}`}
          className={`block ${isOutOfStock ? 'pointer-events-none' : ''}`}
        >
          <h3 className="text-xl font-bold text-crimson mb-1">{name[language]}</h3>
        </Link>
        <p className="text-sm text-foreground/80 mb-2 line-clamp-2">{description[language]}</p>
        <p className="text-lg font-bold">{`${price} ₾`}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className={`w-full relative ${
            isOutOfStock 
              ? 'bg-muted text-muted-foreground cursor-not-allowed'
              : 'bg-crimson hover:bg-crimson/90 text-black font-medium'
          }`}
          onClick={() => !isOutOfStock && onAddToCart(id)}
          disabled={isOutOfStock}
        >
          {/* Background cart icon - adjusted z-index to ensure it stays behind the text */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 z-0">
            <ShoppingCart className="w-8 h-8" />
          </div>
          <span className="relative z-1 flex items-center">
            <ShoppingCart className="mr-2 h-4 w-4" /> 
            {isOutOfStock ? t('product.out_of_stock') : t('product.add_to_cart')}
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
