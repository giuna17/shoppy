import { useContext } from 'react';
import { CartContextType, CartContext } from './CartContext.utils';

export const useCartContext = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
}; 