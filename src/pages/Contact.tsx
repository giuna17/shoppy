import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Instagram, Facebook } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Contact = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('contact.message_sent'),
      description: t('contact.message_received'),
      duration: 3000,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="py-12 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-center">{t('contact.title')} <span className="text-crimson">{t('contact.us')}</span></h1>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">{t('contact.get_in_touch')}</h2>
              <p className="text-foreground/80 mb-6">
                {t('contact.questions')}
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-crimson/10 flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-crimson" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span>contact@anarchystore.com</span>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-crimson/10 flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-crimson" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span>+995 555 123 456</span>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-crimson/10 flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-crimson" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span>Tbilisi, Georgia</span>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-6">
                <a href="https://www.facebook.com/people/Onlain-Shopp-Nekko/100064733033418/" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-crimson/20 transition-colors">
                  <Facebook className="w-5 h-5 text-crimson" />
                </a>
                <a href="https://www.instagram.com/nekosshop/" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-crimson/20 transition-colors">
                  <Instagram className="w-5 h-5 text-crimson" />
                </a>
              </div>
            </div>
            
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium mb-2">
                      {t('contact.first_name')}
                    </label>
                    <Input 
                      id="first-name" 
                      placeholder={t('contact.first_name_placeholder')} 
                      className="bg-background border-border" 
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium mb-2">
                      {t('contact.last_name')}
                    </label>
                    <Input 
                      id="last-name" 
                      placeholder={t('contact.last_name_placeholder')} 
                      className="bg-background border-border" 
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {t('contact.email')}
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder={t('contact.email_placeholder')} 
                    className="bg-background border-border" 
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    {t('contact.message')}
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder={t('contact.message_placeholder')} 
                    rows={6} 
                    className="bg-background border-border" 
                  />
                </div>
                
                <Button type="submit" className="w-full bg-crimson hover:bg-crimson/90 text-black font-medium">
                  {t('contact.send_message')}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
