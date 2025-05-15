
import React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType, useCartContext } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { removeFromCart, updateQuantity } = useCartContext();
  const { t, language } = useLanguage();
  
  const handleIncrement = () => {
    if (item.quantity < item.product.stock) {
      updateQuantity(item.product.id, item.quantity + 1);
    }
  };
  
  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.product.id, item.quantity - 1);
    } else {
      removeFromCart(item.product.id);
    }
  };
  
  const handleRemove = () => {
    removeFromCart(item.product.id);
  };
  
  // Check if at max stock
  const atMaxStock = item.quantity >= item.product.stock;
  
  return (
    <div className="flex gap-4 py-4 border-b">
      <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
        <img 
          src={item.product.image} 
          alt={item.product.name[language]} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex flex-col flex-grow">
        <span className="font-medium text-sm">{item.product.name[language]}</span>
        <span className="text-muted-foreground text-xs mb-1">{item.product.price} ₾</span>
        
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-7 w-7 rounded-full p-0"
              onClick={handleDecrement}
            >
              <Minus className="h-3 w-3" />
            </Button>
            
            <span className="w-8 text-center">{item.quantity}</span>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="h-7 w-7 rounded-full p-0"
              onClick={handleIncrement}
              disabled={atMaxStock}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            {atMaxStock && (
              <span className="text-xs text-amber-500">
                {t('product.remaining_stock', {count: item.product.stock})}
              </span>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 text-muted-foreground hover:text-destructive"
              onClick={handleRemove}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
