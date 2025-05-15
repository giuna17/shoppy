
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/i18n/useLanguage';

interface User {
  id: number;
  username: string;
  email: string;
  purchasedProducts: number[];
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  loginWithProvider: (provider: string) => Promise<void>;
  hasUserPurchasedProduct: (productId: number) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  const { t } = useLanguage();
  
  // Load user data from localStorage on initial render
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Mock login function - in a real app, this would call an API
  const login = async (email: string, password: string) => {
    try {
      // Mock authentication - in a real app this would call a backend API
      if (password.length < 3) {
        throw new Error('Invalid password');
      }
      
      // Mock successful login
      const mockUser: User = {
        id: 1,
        username: email.split('@')[0],
        email: email,
        // Mock purchased products (would be fetched from a server in reality)
        purchasedProducts: [1, 2, 3]
      };
      
      setUser(mockUser);
      setIsLoggedIn(true);
      
      toast({
        title: t('auth.welcome'),
        description: t('auth.login_success'),
      });
    } catch (error) {
      toast({
        title: t('auth.error'),
        description: t('auth.login_failed'),
        variant: "destructive",
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      // Mock registration - in a real app this would call a backend API
      if (password.length < 3) {
        throw new Error('Password too short');
      }
      
      // Mock successful registration
      const mockUser: User = {
        id: Math.floor(Math.random() * 1000) + 2,
        username: name,
        email: email,
        purchasedProducts: []
      };
      
      setUser(mockUser);
      setIsLoggedIn(true);
      
      toast({
        title: t('auth.welcome'),
        description: t('auth.signup_success'),
      });
    } catch (error) {
      toast({
        title: t('auth.error'),
        description: t('auth.signup_failed'),
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    
    toast({
      title: t('auth.goodbye'),
      description: t('auth.logout_success'),
    });
  };

  const loginWithProvider = async (provider: string) => {
    try {
      // Mock social login - in a real app, this would connect to OAuth provider
      const mockUser: User = {
        id: Math.floor(Math.random() * 1000) + 100,
        username: `User_${provider}${Math.floor(Math.random() * 100)}`,
        email: `user_${provider.toLowerCase()}@example.com`,
        purchasedProducts: [1, 4, 5]
      };
      
      setUser(mockUser);
      setIsLoggedIn(true);
      
      toast({
        title: t('auth.welcome'),
        description: t('auth.login_success'),
      });
    } catch (error) {
      toast({
        title: t('auth.error'),
        description: `${provider} ${t('auth.login_failed')}`,
        variant: "destructive",
      });
      throw error;
    }
  };

  const hasUserPurchasedProduct = (productId: number): boolean => {
    if (!isLoggedIn || !user) return false;
    return user.purchasedProducts.includes(productId);
  };

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      user,
      login,
      signUp,
      logout,
      loginWithProvider,
      hasUserPurchasedProduct
    }}>
      {children}
    </AuthContext.Provider>
  );
};
