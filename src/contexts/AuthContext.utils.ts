import { createContext, useContext } from 'react';

export interface User {
  id: number;
  username: string;
  email: string;
  purchasedProducts: number[];
}

export interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  loginWithProvider: (provider: string) => Promise<void>;
  hasUserPurchasedProduct: (productId: number) => boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 