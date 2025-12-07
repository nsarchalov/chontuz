import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { TRANSLATIONS, HERO_IMAGES } from './constants';
import { isSeasonOpen } from './services/seasonService';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { BookingCalculator } from './components/BookingCalculator';
import { RoomList } from './components/RoomList';
import { AdminPanel } from './components/AdminPanel';
import { MapPin, Phone, Mountain, Wind, Heart, Instagram, Send, Menu, X, ArrowDown, Mail, Stethoscope, Check } from 'lucide-react';

function App() {
  const [lang, setLang] = useState<Language>('ru');
  const [seasonOpen] = useState(isSeasonOpen());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  const t = TRANSLATIONS;

  // SEO: Update document title based on language
  useEffect(() => {
    const titles = {
      ru: 'Санаторий Чон-Туз | Лечение астмы и аллергии | Кыргызстан',
      kg: 'Чоң-Туз Санаторийи | Астма жана аллергияны дарылоо',
      en: 'Chon-Tuz Sanatorium | Salt Mine Therapy in Kyrgyzstan'
    };
    document.title = titles[lang];
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* HEADER */}
      <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <a href="#hero" onClick={(e) => scrollToSection(e, 'hero')} className="flex items-center gap-2.5 group">
                    <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-500/30 transform group-hover:rotate-3 transition-transform duration-300">
                        <Mountain className="w-6 h-6" strokeWidth={2.5} />
                    </div>
                    <span className="text-xl font-bold text-gray-900 tracking-tight group-hover:text-primary-600 transition-colors">CHONTUZ.KG</span>
                </a>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-8 text-sm font-semibold text-gray-600">
                <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-primary-600 transition-colors py-2 border-b-2 border-transparent hover:border-primary-600">{t.nav.about[lang]}</a>
                <a href="#rooms" onClick={(e) => scrollToSection(e, 'rooms')} className="hover:text-primary-600 transition-colors py-2 border-b-2 border-transparent hover:border-primary-600">{t.nav.rooms[lang]}</a>
                <a href="#booking" onClick={(e) => scrollToSection(e, 'booking')} className="hover:text-primary-600 transition-colors py-2 border-b-2 border-transparent hover:border-primary-600">{t.nav.booking[lang]}</a>
                <a href="#contacts" onClick={(e) => scrollToSection(e, 'contacts')} className="hover:text-primary-600 transition-colors py-2 border-b-2 border-transparent hover:border-primary-600">{t.nav.contacts[lang]}</a>
            </nav>

            <div className="flex items-center gap-4">
                <LanguageSwitcher current={lang} onChange={setLang} />
                
                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
            <div className="md:hidden absolute top-20 left-0 w-full bg-white border-t border-gray-100 shadow-xl py-4 px-4 flex flex-col gap-4 animate-in slide-in-from-top-4 duration-200">
                <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-base font-semibold text-gray-700 py-2 border-b border-gray-50">{t.nav.about[lang]}</a>
                <a href="#rooms" onClick={(e) => scrollToSection(e, 'rooms')} className="text-base font-semibold text-gray-700 py-2 border-b border-gray-50">{t.nav.rooms[lang]}</a>
                <a href="#booking" onClick={(e) => scrollToSection(e, 'booking')} className="text-base font-semibold text-primary-600 py-2 border-b border-gray-50">{t.nav.booking[lang]}</a>
                <a href="#contacts" onClick={(e) => scrollToSection(e, 'contacts')} className="text-base font-semibold text-gray-700 py-2">{t.nav.contacts[lang]}</a>
            </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image Carousel */}
        <div className="absolute inset-0 z-0">
             {HERO_IMAGES.map((img, index) => (
                <img 
                    key={index}
                    src={img} 
                    alt={`Slide ${index}`} 
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentHeroIndex ? 'opacity-100' : 'opacity-0'}`}
                />
             ))}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-slate-50/90 z-10" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center pt-20">
            <div className="animate-in slide-in-from-bottom-10 fade-in duration-700">
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg tracking-wide">
                    {t.hero.title[lang]}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-10 font-light leading-relaxed drop-shadow-md">
                    {t.hero.subtitle[lang]}
                </p>
                
                <a 
                    href="#booking"
                    onClick={(e) => scrollToSection(e, 'booking')}
                    className="inline-flex items-center gap-3 bg-primary-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-500 hover:scale-105 transition-all shadow-xl shadow-primary-900/30"
                >
                    {t.nav.booking[lang]}
                    <ArrowDown className="w-5 h-5 animate-bounce" />
                </a>
            </div>
        </div>
      </section>

      {/* FEATURES / ABOUT SECTION */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <span className="text-primary-600 font-bold tracking-wider text-sm uppercase mb-2 block">{t.features.subheading[lang]}</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">{t.features.heading[lang]}</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-16">
                
                {/* 1. Location Card */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow text-center group">
                    <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 text-blue-600 bg-blue-50">
                        <Mountain className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{t.features.items.location.title[lang]}</h3>
                    <p className="text-gray-500 leading-relaxed">{t.features.items.location.desc[lang]}</p>
                </div>

                {/* 2. Therapy Card */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow text-center group">
                    <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 text-indigo-600 bg-indigo-50">
                        <Wind className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{t.features.items.therapy.title[lang]}</h3>
                    <p className="text-gray-500 leading-relaxed">{t.features.items.therapy.desc[lang]}</p>
                </div>

                {/* 3. We Treat Card (Replaces Comfort) */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow text-center group flex flex-col items-center">
                    <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 text-rose-600 bg-rose-50">
                        <Stethoscope className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{t.features.indications.title[lang]}</h3>
                    <ul className="text-left w-full space-y-3">
                         {t.features.indications.list.map((item, idx) => (
                             <li key={idx} className="flex items-start gap-2.5">
                                 <div className="min-w-[18px] h-[18px] bg-emerald-100 rounded-full flex items-center justify-center mt-0.5">
                                     <Check className="w-3 h-3 text-emerald-600" strokeWidth={3} />
                                 </div>
                                 <span className="text-sm font-medium text-gray-600">{item[lang]}</span>
                             </li>
                         ))}
                    </ul>
                </div>
            </div>
        </div>
      </section>

      {/* ROOMS SECTION */}
      <section id="rooms" className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4">
             <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div className="max-w-xl">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">{t.roomsPage.title[lang]}</h2>
                    <p className="text-gray-500 text-lg">{t.roomsPage.desc[lang]}</p>
                </div>
             </div>
             
             <RoomList lang={lang} />
        </div>
      </section>

      {/* BOOKING SECTION */}
      <section id="booking" className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-4">
             <div className="max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">{t.bookingPage.title[lang]}</h2>
                <p className="text-gray-500 text-lg">{t.bookingPage.desc[lang]}</p>
             </div>

             <div className="max-w-5xl mx-auto h-[800px] md:h-[700px]">
                <BookingCalculator lang={lang} />
             </div>
        </div>
      </section>

      {/* CONTACTS SECTION */}
      <section id="contacts" className="py-24 bg-white">
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">{t.nav.contacts[lang]}</h2>
                    
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0 text-primary-600">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">{t.contactsPage.addressLabel[lang]}</h4>
                                <p className="text-gray-500">{t.contactsPage.addressVal[lang]}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0 text-primary-600">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">{t.contactsPage.phonesLabel[lang]}</h4>
                                <p className="text-gray-500 font-medium text-lg">+996 555 22-31-88</p>
                            </div>
                        </div>

                         <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0 text-primary-600">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">Email</h4>
                                <p className="text-gray-500 font-medium">adootaliev@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0 text-primary-600">
                                <Send className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">{t.contactsPage.socials[lang]}</h4>
                                <div className="flex gap-4 mt-2">
                                    <a href="https://instagram.com/chontuz.kg" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center hover:bg-pink-100 transition">
                                        <Instagram className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-96 bg-gray-200 rounded-3xl overflow-hidden shadow-lg">
                    {/* Map */}
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47184.28827756784!2d75.76017088916327!3d42.20325493976214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389b0b4b2c123457%3A0x1234567890abcdef!2sChon-Tuz!5e0!3m2!1sen!2skg!4v1620000000000!5m2!1sen!2skg" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy"
                        className="grayscale hover:grayscale-0 transition-all duration-700"
                    ></iframe>
                </div>
            </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
                <Mountain className="w-8 h-8 text-white" />
                <span className="text-2xl font-bold text-white">CHONTUZ.KG</span>
            </div>
            <p className="max-w-md mx-auto mb-8 text-sm leading-relaxed opacity-70">
                {t.footer.desc[lang]}
            </p>
            <div className="pt-8 border-t border-slate-800 text-xs font-medium tracking-wide">
                &copy; {new Date().getFullYear()} CHONTUZ.KG. {t.footer.rights[lang]}
            </div>
        </div>
      </footer>

      <AdminPanel />
    </div>
  );
}

export default App;