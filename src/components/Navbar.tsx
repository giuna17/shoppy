import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Facebook, LogOut } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCartContext } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import CartItem from './CartItem';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { hasUserDiscount, clearUserDiscount } from '@/services/reviewService';

const LoginForm = ({ onClose }: { onClose: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useLanguage();
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await auth.login(email, password);
      onClose();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      await auth.loginWithProvider(provider);
      onClose();
    } catch (error) {
      console.error(`${provider} login failed:`, error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">{t('auth.email')}</Label>
        <Input 
          id="email" 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="password">{t('auth.password')}</Label>
          <Button variant="link" size="sm" className="px-0 text-xs">
            {t('auth.forgot_password')}
          </Button>
        </div>
        <Input 
          id="password" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
      </div>
      
      <Button type="submit" className="w-full bg-crimson hover:bg-crimson/90 text-black">
        {t('auth.sign_in')}
      </Button>
      
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-2 text-xs text-muted-foreground">
            {t('auth.or')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => handleSocialLogin('google')}
          className="w-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-2" viewBox="0 0 16 16">
            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
          </svg>
          {t('auth.google')}
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => handleSocialLogin('facebook')}
          className="w-full"
        >
          <Facebook className="mr-2 h-4 w-4" />
          {t('auth.facebook')}
        </Button>
      </div>
      
      <p className="text-center text-sm text-muted-foreground mt-4">
        {t('auth.no_account')}{' '}
        <DialogTrigger asChild>
          <Button variant="link" className="px-0 text-crimson" onClick={onClose}>
            {t('auth.sign_up')}
          </Button>
        </DialogTrigger>
      </p>
    </form>
  );
};

const SignUpForm = ({ onClose }: { onClose: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { t } = useLanguage();
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await auth.signUp(email, password, name);
      onClose();
    } catch (error) {
      console.error('Sign up failed:', error);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      await auth.loginWithProvider(provider);
      onClose();
    } catch (error) {
      console.error(`${provider} login failed:`, error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">{t('auth.name')}</Label>
        <Input 
          id="name" 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">{t('auth.email')}</Label>
        <Input 
          id="email" 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">{t('auth.password')}</Label>
        <Input 
          id="password" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
      </div>
      
      <Button type="submit" className="w-full bg-crimson hover:bg-crimson/90 text-black">
        {t('auth.sign_up')}
      </Button>
      
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-2 text-xs text-muted-foreground">
            {t('auth.or')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => handleSocialLogin('google')}
          className="w-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-2" viewBox="0 0 16 16">
            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
          </svg>
          {t('auth.google')}
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => handleSocialLogin('facebook')}
          className="w-full"
        >
          <Facebook className="mr-2 h-4 w-4" />
          {t('auth.facebook')}
        </Button>
      </div>
      
      <p className="text-center text-sm text-muted-foreground mt-4">
        {t('auth.already_account')}{' '}
        <DialogTrigger asChild>
          <Button variant="link" className="px-0 text-crimson" onClick={onClose}>
            {t('auth.sign_in')}
          </Button>
        </DialogTrigger>
      </p>
    </form>
  );
};

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const { cart } = useCartContext();
  const [showLoginForm, setShowLoginForm] = useState(true);
  const auth = useAuth();
  const navigate = useNavigate();
  const [showAddressDialog, setShowAddressDialog] = useState(false);
  
  const navItems = [
    { name: t('nav.home'), path: "/" },
    { name: t('nav.shop'), path: "/shop" },
    { name: t('nav.about'), path: "/about" },
    { name: t('nav.contact'), path: "/contact" }
  ];

  const categoryItems = [
    { name: t('category.all'), path: "/shop" },
    { name: t('category.bracelets'), path: "/category/bracelets" },
    { name: t('category.rings'), path: "/category/rings" },
    { name: t('category.earrings'), path: "/category/earrings" },
    { name: t('category.hairpins'), path: "/category/hairpins" },
    { name: t('category.candles'), path: "/category/candles" }
  ];

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const userId = auth.user?.id;
  const userHasDiscount = userId ? hasUserDiscount(userId) : false;

  const handleDialogClose = () => {
    setShowLoginForm(true);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between py-3">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/shoppy/lovable-uploads/nekos-logo.jpeg"
              alt="Neko mini logo"
              className="h-12 w-12 md:h-[62px] md:w-[62px]"
            />
            <span className="text-2xl md:text-3xl font-bold text-crimson group-hover:underline" style={{ fontSize: '2.6rem' }}>
              NEKO<span className="text-white">shop</span>
            </span>
          </Link>
        </div>
        
        <div className="hidden md:flex space-x-6">
          {navItems.map(item => (
            <Link 
              key={item.path} 
              to={item.path} 
              className="text-foreground/80 hover:text-crimson transition text-xl md:text-2xl py-2"
            >
              {item.name}
            </Link>
          ))}
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-transparent text-foreground/80 hover:text-crimson text-lg md:text-xl py-2">
                  {t('nav.categories')}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-1 p-2">
                    {categoryItems.map((item) => (
                      <li key={item.path}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={item.path}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground text-xl md:text-2xl"
                          >
                            {item.name}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div className="scale-110 flex items-center gap-4">
          <LanguageSwitcher 
            currentLanguage={language} 
            onLanguageChange={setLanguage} 
          />
          {auth.isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <User className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-2 py-1.5 text-base font-medium">
                  {t('auth.welcome')}, {auth.user?.username}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    {t('auth.profile')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={auth.logout}>
                  <LogOut className="h-5 w-5 mr-2" />
                  {t('auth.sign_out')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Dialog onOpenChange={handleDialogClose}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  {t('auth.sign_in')}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>{showLoginForm ? t('auth.sign_in') : t('auth.sign_up')}</DialogTitle>
                </DialogHeader>
                {showLoginForm ? (
                  <LoginForm onClose={() => setShowLoginForm(false)} />
                ) : (
                  <SignUpForm onClose={() => setShowLoginForm(true)} />
                )}
              </DialogContent>
            </Dialog>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-6 w-6" />
                <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 bg-crimson text-white">{totalItems}</Badge>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{t('cart.your_cart')}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col h-[80vh]">
                {cart.length === 0 ? (
                  <div className="text-center py-10 flex-1">
                    <p className="text-muted-foreground">{t('cart.empty')}</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 overflow-y-auto flex-1 pr-2" style={{ maxHeight: '50vh' }}>
                      {cart.map(item => (
                        <CartItem key={item.product.id} item={item} />
                      ))}
                    </div>
                    <div className="pt-4 border-t mt-4 sticky bottom-0 bg-background z-10">
                      {(() => {
                        const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
                        const delivery = total >= 100 ? 0 : 5;
                        let finalTotal = total + delivery;
                        let discountBlock = null;
                        const deliveryText = total >= 100 ? t('cart.free_delivery') : t('cart.delivery_fee');
                        let discountInfo = null;
                        if (finalTotal >= 500) {
                          finalTotal = Math.round(finalTotal * 0.9);
                          discountBlock = (
                            <div className="mb-2 p-2 rounded bg-green-100 text-base text-center text-green-700 border border-green-300 font-bold">
                              {t('cart.discount_10')}
                            </div>
                          );
                        } else if (userHasDiscount) {
                          finalTotal = Math.round(finalTotal * 0.95);
                          discountInfo = (
                            <div className="mb-2 p-2 rounded bg-green-100 text-base text-center text-green-700 border border-green-300 font-bold">
                              {t('cart.discount_5')}
                            </div>
                          );
                        }
                        return (
                          <>
                            {discountBlock}
                            {discountInfo}
                            <div className={`text-center text-lg font-semibold my-2 ${total >= 100 ? 'text-green-600' : 'text-red-600'}`}>{deliveryText}</div>
                            <div className="flex justify-between font-medium py-2">
                              <span>{t('cart.total')}:</span>
                              <span>{finalTotal} ₾</span>
                            </div>
                            {total >= 100 ? (
                              <div className="mt-2 p-2 rounded bg-blue-100 text-base text-center text-blue-700 border border-blue-200 font-semibold">
                                {t('cart.free_delivery_info')}
                              </div>
                            ) : null}
                            <Button className="w-full mt-4 bg-crimson hover:bg-crimson/90 text-black py-4 text-lg font-bold" onClick={() => {
                              const userId = auth.user?.id;
                              const address = localStorage.getItem(`profile_address_${userId}`) || '';
                              const phone = localStorage.getItem(`profile_phone_${userId}`) || '';
                              if (!address.trim() || !phone.trim()) {
                                setShowAddressDialog(true);
                                return;
                              }
                              if (userHasDiscount && userId) clearUserDiscount(userId);
                              // ... здесь логика оформления заказа ...
                            }}>{t('cart.checkout')}</Button>
                          </>
                        );
                      })()}
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {/* Диалог для заполнения адреса */}
      <Dialog open={showAddressDialog} onOpenChange={setShowAddressDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <span className="block text-center text-2xl font-bold text-crimson">ВАЖНО!</span>
            </DialogTitle>
          </DialogHeader>
          <div className="text-center text-lg mb-4">{t('profile.fill_address_warning') || 'Пожалуйста, заполните адрес проживания и номер телефона в профиле.'}</div>
          <DialogFooter>
            <Button onClick={() => { setShowAddressDialog(false); navigate('/profile?tab=address'); }} className="w-full bg-crimson hover:bg-crimson/90 text-black font-bold">
              {t('profile.go_to_address') || 'Заполнить'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default Navbar;
