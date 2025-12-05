
import React, { useState } from 'react';
import { Language } from './types';
import { TRANSLATIONS } from './constants';
import { isSeasonOpen } from './services/seasonService';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { BookingCalculator } from './components/BookingCalculator';
import { RoomList } from './components/RoomList';
import { MapPin, Phone, Mail, Mountain, Wind, Heart, Facebook, Instagram, Send, Menu, X, ArrowDown } from 'lucide-react';

function App() {
  const [lang, setLang] = useState<Language>('ru');
  const [seasonOpen] = useState(isSeasonOpen());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const nav = TRANSLATIONS.nav;

  // Localized text for the Booking Section specifically
  const bookingContent = {
    title: {
        ru: 'Планируйте ваше оздоровительное путешествие',
        en: 'Plan Your Health Journey',
        kg: 'Ден соолук сапарыңызды пландаштырыңыз'
    },
    desc: {
        ru: 'Проверьте наличие свободных мест и забронируйте ваше пребывание онлайн. Наша команда вскоре подтвердит вашу бронь.',
        en: 'Check availability and book your stay online. Our team will confirm your reservation shortly.',
        kg: 'Бош орундарды текшерип, онлайн брондоңуз. Биздин команда сиздин брондоонуңузду тез арада тастыктайт.'
    }
  };

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
                <a href="#" onClick={(e) => scrollToSection(e, 'hero')} className="flex items-center gap-2.5 group">
                    <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-500/30 transform group-hover:rotate-3 transition-transform duration-300">
                        <Mountain className="w-6 h-6" strokeWidth={2.5} />
                    </div>
                    <span className="text-xl font-bold text-gray-900 tracking-tight group-hover:text-primary-600 transition-colors">CHONTUZ.KG</span>
                </a>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-8 text-sm font-semibold text-gray-600">
                <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-primary-600 transition-colors py-2 border-b-2 border-transparent hover:border-primary-600">{nav.about[lang]}</a>
                <a href="#rooms" onClick={(e) => scrollToSection(e, 'rooms')} className="hover:text-primary-600 transition-colors py-2 border-b-2 border-transparent hover:border-primary-600">{nav.rooms[lang]}</a>
                <a href="#booking" onClick={(e) => scrollToSection(e, 'booking')} className="hover:text-primary-600 transition-colors py-2 border-b-2 border-transparent hover:border-primary-600">{nav.booking[lang]}</a>
                <a href="#contacts" onClick={(e) => scrollToSection(e, 'contacts')} className="hover:text-primary-600 transition-colors py-2 border-b-2 border-transparent hover:border-primary-600">{nav.contacts[lang]}</a>
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
                <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-base font-semibold text-gray-700 py-2 border-b border-gray-50">{nav.about[lang]}</a>
                <a href="#rooms" onClick={(e) => scrollToSection(e, 'rooms')} className="text-base font-semibold text-gray-700 py-2 border-b border-gray-50">{nav.rooms[lang]}</a>
                <a href="#booking" onClick={(e) => scrollToSection(e, 'booking')} className="text-base font-semibold text-primary-600 py-2 border-b border-gray-50">{nav.booking[lang]}</a>
                <a href="#contacts" onClick={(e) => scrollToSection(e, 'contacts')} className="text-base font-semibold text-gray-700 py-2">{nav.contacts[lang]}</a>
            </div>
        )}
      </header>

      {/* HERO SECTION - ANIMATED VIDEO BACKGROUND */}
      <section id="hero" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Video Layer */}
        <div className="absolute inset-0 z-0">
             <video 
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full h-full object-cover object-center" 
                poster="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2560&auto=format&fit=crop"
            >
                {/* New video: Aerial mountains, clear sky, nature - avoids the 'lab' look */}
                <source src="https://videos.pexels.com/video-files/856973/856973-hd_1920_1080_25fps.mp4" type="video/mp4" />
                {/* Fallback image */}
                <img 
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2560&auto=format&fit=crop" 
                    alt="Mountains in Kyrgyzstan" 
                    className="w-full h-full object-cover object-center"
                />
            </video>
             {/* Gradient Overlay for Readability */}
             <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/30 to-slate-900/80"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 pt-20">
            <div className="max-w-5xl mx-auto text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
                
                {/* Main Title */}
                <h1 className="text-5xl sm:text-7xl md:text-[10rem] font-black text-white mb-6 tracking-tighter drop-shadow-2xl font-sans uppercase leading-none whitespace-nowrap">
                    {lang === 'ru' 
                        ? 'ЧОН-ТУЗ' 
                        : lang === 'en' 
                        ? 'CHON-TUZ' 
                        : 'ЧОҢ-ТУЗ'}
                </h1>
                
                {/* Description */}
                <div className="max-w-3xl mx-auto mb-12">
                    <p className="text-xl md:text-3xl text-white/95 font-medium leading-relaxed drop-shadow-xl text-balance">
                        {lang === 'ru' 
                            ? 'Уникальная спелеотерапия и комфортабельный отдых в санатории Чон-Туз. Восстановите силы природы.' 
                            : lang === 'en' 
                            ? 'Unique speleotherapy and comfortable rest in Chon-Tuz sanatorium. Restore your strength with nature.'
                            : 'Чоң-Туз санаторийинде уникалдуу спелеотерапия жана ыңгайлуу эс алуу. Жаратылыш менен күчтөнүңүз.'}
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                    <button 
                        onClick={(e) => scrollToSection(e as any, 'booking')} 
                        className="bg-primary-600 hover:bg-primary-500 text-white font-bold py-4 px-12 rounded-full transition-all shadow-[0_0_40px_-10px_rgba(37,99,235,0.6)] hover:shadow-[0_0_60px_-15px_rgba(37,99,235,0.8)] transform hover:-translate-y-1 text-lg border-2 border-primary-500/50"
                    >
                        {nav.booking[lang]}
                    </button>
                     <button 
                        onClick={(e) => scrollToSection(e as any, 'rooms')} 
                        className="group flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/50 text-white font-bold py-4 px-10 rounded-full transition-all shadow-lg transform hover:-translate-y-1 text-lg"
                    >
                        {nav.rooms[lang]}
                        <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
      </section>

      {/* FEATURES / ABOUT */}
      <section id="about" className="scroll-mt-28 py-24 bg-white relative">
        <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
                 <h2 className="text-sm font-bold text-primary-600 tracking-widest uppercase mb-3">Почему выбирают нас</h2>
                 <h3 className="text-3xl font-serif font-bold text-gray-900">Природа, которая лечит</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { icon: Mountain, title: 'Уникальное расположение', desc: 'Расположено в потрясающих горах Кыргызстана.', color: 'blue' },
                    { icon: Wind, title: 'Спелеотерапия', desc: 'Терапия в природных соляных шахтах для здоровья дыхательных путей.', color: 'indigo' },
                    { icon: Heart, title: 'Здоровье и Комфорт', desc: 'Профессиональный персонал, заботящийся о вашем благополучии.', color: 'rose' }
                ].map((item, i) => (
                    <div key={i} className="group p-8 rounded-3xl bg-slate-50 hover:bg-white border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                        <div className={`w-14 h-14 bg-${item.color}-50 text-${item.color}-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                            <item.icon className="w-7 h-7"/>
                        </div>
                        <h3 className="font-bold text-xl mb-3 text-gray-900">{item.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* ROOMS */}
      <section id="rooms" className="scroll-mt-28 py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div className="max-w-xl">
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">{nav.rooms[lang]}</h2>
                    <p className="text-gray-600 text-lg">Choose from our range of comfortable accommodations suited for individuals, couples, and large families.</p>
                </div>
            </div>
            <RoomList lang={lang} />
        </div>
      </section>

      {/* BOOKING SECTION - MOVED HERE */}
      <section id="booking" className="scroll-mt-28 py-24 bg-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute top-40 -left-20 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
                 <h2 className="text-sm font-bold text-primary-600 tracking-widest uppercase mb-3">{TRANSLATIONS.nav.booking[lang]}</h2>
                 <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
                    {bookingContent.title[lang]}
                 </h3>
                 <p className="text-gray-600 text-lg">
                    {bookingContent.desc[lang]}
                 </p>
            </div>

            <div className="max-w-4xl mx-auto">
                <BookingCalculator lang={lang} />
            </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="scroll-mt-28 py-24 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16">
                <div>
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">{nav.contacts[lang]}</h2>
                    <div className="space-y-8">
                        <div className="flex gap-5">
                            <div className="w-12 h-12 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center flex-shrink-0 text-primary-600">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg mb-1">Наш адрес</h4>
                                <p className="text-gray-600">Нарынская область, Кочкорский район, с. Чон-Туз</p>
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <div className="w-12 h-12 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center flex-shrink-0 text-primary-600">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg mb-1">Телефоны</h4>
                                <p className="text-gray-600 font-medium">+996 555 123 456</p>
                                <p className="text-gray-600 font-medium">+996 777 987 654</p>
                            </div>
                        </div>
                         <div className="flex gap-5">
                            <div className="w-12 h-12 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center flex-shrink-0 text-primary-600">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg mb-1">Email</h4>
                                <p className="text-gray-600">info@chontuz.kg</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 pt-10 border-t border-gray-200">
                        <h4 className="font-bold text-gray-900 mb-4">Мы в соцсетях</h4>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition"><Facebook className="w-5 h-5"/></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center hover:bg-pink-600 transition"><Instagram className="w-5 h-5"/></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition"><Send className="w-5 h-5"/></a>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-3xl overflow-hidden h-[500px] shadow-lg border border-gray-100 relative group">
                    <iframe 
                        src="https://maps.google.com/maps?q=42.13335393451694,75.5069747411453&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-6 text-white">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center shadow-lg shadow-primary-900/50">
                    <Mountain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight">CHONTUZ.KG</span>
            </div>
            <p className="max-w-md mx-auto mb-8 text-sm opacity-60">
                Official website of Chon-Tuz Sanatorium. Treatment and relaxation in the unique salt mines of Kyrgyzstan.
            </p>
            <div className="border-t border-slate-800 pt-8 text-xs">
                © {new Date().getFullYear()} CHONTUZ.KG. All rights reserved.
            </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
