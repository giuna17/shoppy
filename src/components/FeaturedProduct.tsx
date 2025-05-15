import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface FeaturedProductProps {
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
  onAddToCart: (id: number) => void;
}

const FeaturedProduct = ({
  id,
  name,
  description,
  price,
  currency,
  image,
  onAddToCart
}: FeaturedProductProps) => {
  const { t, language } = useLanguage();

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-8 items-center bg-card border border-border p-6 rounded-lg relative">
        <div className="absolute -top-[4.5rem] -left-[0.1rem] z-10">
          <div className="inline-block bg-muted/30 px-12 py-4 rounded-lg text-3xl font-medium text-crimson border border-crimson/20">
            {t('product.most_viewed')}
          </div>
        </div>
        <div className="relative aspect-square max-w-md mx-auto md:mx-0">
          <Link to={`/product/${id}`} className="block">
            <div className="absolute inset-0 flex items-center justify-center opacity-5 z-0">
              <Star className="w-60 h-60" />
            </div>
            <img
              src={image}
              alt={name[language]}
              className="object-cover w-full h-full rounded-md crimson-glow border-2 border-crimson relative z-1"
            />
          </Link>
        </div>
        <div className="space-y-4">
          <Link to={`/product/${id}`} className="block">
            <h2 className="text-4xl font-bold text-crimson tracking-tight">{name[language]}</h2>
          </Link>
          <p className="text-lg text-foreground/90 leading-relaxed">{description[language]}</p>

          <div className="flex justify-between items-center pt-4">
            <p className="text-3xl font-bold">{`${price} ${currency}`}</p>
            <Button 
              className="bg-crimson hover:bg-crimson/90 text-black font-medium relative px-6 py-6 text-lg"
              onClick={() => onAddToCart(id)}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-10 z-0">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <span className="relative z-1 flex items-center">
                <ShoppingCart className="mr-2 h-4 w-4" /> {t('product.add_to_cart')}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;