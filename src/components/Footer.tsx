import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img src="/shoppy/lovable-uploads/nekos-logo.jpeg" alt="Neko mini logo" className="h-8 w-8" />
              <h3 className="text-xl font-bold tracking-tighter">
                <span className="text-crimson">NEKO</span><span className="text-black">.</span><span className="text-white">shop</span>
              </h3>
            </div>
            <p className="text-sm text-foreground/80">
              Alternative jewelry for those who defy norms and embrace anarchy.
            </p>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-lg font-bold">{t('footer.shop')}</h4>
            <ul className="space-y-2">
              <li><Link to="/shop" className="text-foreground/80 hover:text-crimson transition">{t('footer.all_products')}</Link></li>
              <li><Link to="/category/bracelets" className="text-foreground/80 hover:text-crimson transition">{t('footer.bracelets')}</Link></li>
              <li><Link to="/category/necklaces" className="text-foreground/80 hover:text-crimson transition">{t('footer.necklaces')}</Link></li>
              <li><Link to="/category/rings" className="text-foreground/80 hover:text-crimson transition">{t('footer.rings')}</Link></li>
              <li><Link to="/category/candles" className="text-foreground/80 hover:text-crimson transition">{t('footer.candles')}</Link></li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-lg font-bold">{t('footer.company')}</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-foreground/80 hover:text-crimson transition">{t('footer.about_us')}</Link></li>
              <li><Link to="/contact" className="text-foreground/80 hover:text-crimson transition">{t('footer.contact')}</Link></li>
              <li><Link to="/faq" className="text-foreground/80 hover:text-crimson transition">{t('footer.faq')}</Link></li>
              <li><Link to="/shipping" className="text-foreground/80 hover:text-crimson transition">{t('footer.shipping')}</Link></li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-lg font-bold">{t('footer.info')}</h4>
            <div className="space-y-2 text-foreground/80">
              <p>{t('footer.handmade')}</p>
              <p>{t('footer.delivery')}</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-foreground/60">
          <p>© {new Date().getFullYear()} NEKO.shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
