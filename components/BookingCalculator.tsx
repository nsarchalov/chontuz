




import React, { useState, useEffect } from 'react';
import { RoomCategory, BookingState, Language } from '../types';
import { ROOMS, TRANSLATIONS } from '../constants';
import { getDaysDifference, isSeasonOpen } from '../services/seasonService';
import { formatBookingMessage, sendTelegramDirectly } from '../services/telegramService';
import { submitBookingToCRM, fetchOccupancy, OccupancyData } from '../services/crmService';
import { AvailabilityCalendar } from './AvailabilityCalendar';
import { Calculator, Calendar as CalendarIcon, Users, BedDouble, Tag, CheckCircle2, AlertCircle } from 'lucide-react';

interface Props {
  lang: Language;
}

export const BookingCalculator: React.FC<Props> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'calc' | 'calendar'>('calc');
  const [isOpen] = useState(isSeasonOpen());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [state, setState] = useState<BookingState>({
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    roomType: RoomCategory.ECONOM,
    extraBeds: 0,
    name: '',
    phone: '',
    email: '',
    comment: ''
  });

  const [occupancy, setOccupancy] = useState<OccupancyData>({});
  const [dateError, setDateError] = useState<string | null>(null);

  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); 
  const [basePrice, setBasePrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  // Fetch occupancy data on mount for validation
  useEffect(() => {
    fetchOccupancy().then(data => setOccupancy(data));
  }, []);

  useEffect(() => {
    validateAndCalculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.checkIn, state.checkOut, state.roomType, state.adults, state.extraBeds, appliedDiscount, occupancy]);

  const validateAndCalculate = () => {
    setDateError(null);

    // 1. Basic Validation
    if (!state.checkIn || !state.checkOut) {
      setBasePrice(0);
      setFinalPrice(0);
      return;
    }

    const start = new Date(state.checkIn);
    const end = new Date(state.checkOut);

    if (start >= end) {
        setDateError(lang === 'ru' ? 'Дата выезда должна быть позже заезда' : 'Check-out must be after check-in');
        setBasePrice(0);
        setFinalPrice(0);
        return;
    }

    // 2. Availability Validation
    const room = ROOMS[state.roomType];
    let isBlocked = false;
    
    // Check every day in the range
    for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const dateKey = `${year}-${month}-${day}`;

        const bookedCount = occupancy[dateKey]?.[state.roomType] || 0;
        if (room.totalRooms - bookedCount <= 0) {
            isBlocked = true;
            break;
        }
    }

    if (isBlocked) {
        setDateError(lang === 'ru' 
            ? 'На выбранные даты нет свободных мест в этой категории' 
            : lang === 'kg' 
            ? 'Тандалган күндөргө бош орун жок' 
            : 'Selected dates are fully booked for this room type');
        setBasePrice(0);
        setFinalPrice(0);
        return;
    }

    // 3. Price Calculation
    const days = getDaysDifference(state.checkIn, state.checkOut);
    let price = 0;

    if (room.priceType === 'per_room') {
      price = room.price * days;
    } else {
      price = (room.price * state.adults * days);
    }

    if (state.extraBeds > 0 && room.extraBedPrice) {
      price += (room.extraBedPrice * state.extraBeds * days);
    }

    setBasePrice(price);
    const discountAmount = price * (appliedDiscount / 100);
    setFinalPrice(price - discountAmount);
  };

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'SUMMER10') {
        setAppliedDiscount(10);
    } else if (code === 'SUMMER15') {
        setAppliedDiscount(15);
    } else {
        setAppliedDiscount(0);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    
    // Allow user to clear input
    if (!val) {
        setState({ ...state, phone: '' });
        return;
    }

    // 1. Clean input: keep digits and optional leading plus
    const hasPlus = val.startsWith('+');
    const digits = val.replace(/\D/g, '');
    let formatted = '';

    // RULE 1: RU/KZ (+7)
    // Matches if user types "7" or "+7"
    if ((hasPlus && digits.startsWith('7')) || (!hasPlus && digits.startsWith('7') && digits.length > 1)) {
        formatted = '+7';
        if (digits.length > 1) formatted += ' (' + digits.substring(1, 4);
        if (digits.length > 4) formatted += ') ' + digits.substring(4, 7);
        if (digits.length > 7) formatted += '-' + digits.substring(7, 9);
        if (digits.length > 9) formatted += '-' + digits.substring(9, 11);
    } 
    // RULE 2: KG (+996)
    // Matches if user types "996" or "+996"
    else if ((hasPlus && digits.startsWith('996')) || (!hasPlus && digits.startsWith('996'))) {
        formatted = '+996';
        if (digits.length > 3) formatted += ' ' + digits.substring(3, 6);
        if (digits.length > 6) formatted += ' ' + digits.substring(6, 9);
        if (digits.length > 9) formatted += ' ' + digits.substring(9, 12);
    }
    // RULE 3: UZ (+998)
    else if ((hasPlus && digits.startsWith('998')) || (!hasPlus && digits.startsWith('998'))) {
        formatted = '+998';
        if (digits.length > 3) formatted += ' ' + digits.substring(3, 5);
        if (digits.length > 5) formatted += ' ' + digits.substring(5, 8);
        if (digits.length > 8) formatted += '-' + digits.substring(8, 10);
        if (digits.length > 10) formatted += '-' + digits.substring(10, 12);
    }
    // RULE 4: Local KG (0xxx) - legacy support
    else if (digits.startsWith('0')) {
        formatted = digits.substring(0, 4);
        if (digits.length > 4) formatted += ' ' + digits.substring(4, 7);
        if (digits.length > 7) formatted += ' ' + digits.substring(7, 10);
        if (formatted.length > 12) formatted = formatted.substring(0, 12);
    }
    // RULE 5: Generic International
    else {
        formatted = (hasPlus ? '+' : '') + digits;
    }
    
    // Limit max length to avoid overflow
    if (formatted.length > 20) return;

    setState({ ...state, phone: formatted });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (dateError) return;

    setIsSubmitting(true);
    
    // 1. Prepare formatted Telegram message string
    const message = formatBookingMessage(state, finalPrice, lang);
    
    // 2. Dual Send Strategy:
    sendTelegramDirectly(message);
    await submitBookingToCRM(state, finalPrice, lang, message);
    
    setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('success');
        
        // Clear sensitive fields
        setState(prev => ({ ...prev, name: '', phone: '', email: '', comment: '' }));
        setPromoCode('');
        setAppliedDiscount(0);
        
        // Reset success message
        setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 1500);
  };

  const t = TRANSLATIONS.calculator;

  if (!isOpen) {
    return (
      <div className="bg-orange-50 border border-orange-200 p-8 rounded-2xl text-center shadow-lg backdrop-blur-sm bg-opacity-90">
        <h3 className="text-xl font-bold text-orange-800 mb-4">{TRANSLATIONS.season.closed[lang]}</h3>
        <button className="bg-primary-600 text-white px-6 py-3 rounded-xl hover:bg-primary-700 transition shadow-lg shadow-primary-500/30">
          {TRANSLATIONS.season.closedMsg[lang]}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200 overflow-hidden border border-slate-100 h-full flex flex-col">
      
      {/* TABS HEADER */}
      <div className="flex border-b border-gray-100 flex-shrink-0">
          <button 
            onClick={() => setActiveTab('calc')}
            className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'calc' ? 'bg-white text-primary-600 border-b-2 border-primary-600' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
          >
            <Calculator className="w-4 h-4" />
            {t.tabs.calc[lang]}
          </button>
          <button 
             onClick={() => setActiveTab('calendar')}
             className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'calendar' ? 'bg-white text-primary-600 border-b-2 border-primary-600' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
          >
            <CalendarIcon className="w-4 h-4" />
            {t.tabs.calendar[lang]}
          </button>
      </div>

      {/* SUCCESS MESSAGE OVERLAY */}
      {submitStatus === 'success' && (
          <div className="p-12 text-center bg-green-50 animate-in fade-in zoom-in duration-300 flex-grow flex flex-col justify-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">{TRANSLATIONS.form.success[lang]}</h3>
              <p className="text-sm text-green-600 mb-6">{TRANSLATIONS.form.successSub[lang]}</p>
              <button onClick={() => setSubmitStatus('idle')} className="text-green-600 font-medium hover:underline text-sm">{t.makeAnother[lang]}</button>
          </div>
      )}

      {/* MAIN CONTENT */}
      {submitStatus !== 'success' && (
          <div className="p-6 lg:p-8 flex-grow overflow-y-auto custom-scrollbar">
            
            {/* CALCULATOR TAB */}
            {activeTab === 'calc' && (
                <div className="animate-in slide-in-from-left-4 fade-in duration-300">
                     <div className="space-y-6">
                        
                        {/* Error Banner */}
                        {dateError && (
                            <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-xl flex items-center gap-2 text-sm font-medium animate-in slide-in-from-top-2">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                {dateError}
                            </div>
                        )}

                        {/* Dates */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">{t.checkIn[lang]}</label>
                                <input
                                    type="date"
                                    required
                                    min={new Date().toISOString().split('T')[0]}
                                    className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 outline-none transition-all font-medium text-gray-800 ${dateError ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-primary-500 focus:bg-white'}`}
                                    value={state.checkIn}
                                    onChange={(e) => setState({ ...state, checkIn: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">{t.checkOut[lang]}</label>
                                <input
                                    type="date"
                                    required
                                    min={state.checkIn || new Date().toISOString().split('T')[0]}
                                    className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 outline-none transition-all font-medium text-gray-800 ${dateError ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-primary-500 focus:bg-white'}`}
                                    value={state.checkOut}
                                    onChange={(e) => setState({ ...state, checkOut: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Room Type */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{TRANSLATIONS.nav.rooms[lang]}</label>
                            <div className="grid grid-cols-2 gap-2">
                                {Object.values(ROOMS).map((room) => (
                                <button
                                    key={room.id}
                                    type="button"
                                    onClick={() => setState({ ...state, roomType: room.id })}
                                    className={`p-3 rounded-xl border text-left transition-all ${
                                    state.roomType === room.id
                                        ? 'border-primary-500 bg-primary-50 text-primary-900 ring-1 ring-primary-500'
                                        : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    <div className="font-bold text-sm truncate">{room.title[lang]}</div>
                                    <div className="text-[10px] opacity-70">
                                        {room.price} {t.som[lang]}
                                    </div>
                                </button>
                                ))}
                            </div>
                        </div>

                         {/* Guest Details */}
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">{t.adults[lang]}</label>
                                <div className="relative">
                                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400"/>
                                    <input
                                    type="number"
                                    min={1}
                                    className="w-full pl-9 pr-2 py-2 text-sm border border-gray-200 bg-gray-50 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                    value={state.adults}
                                    onChange={(e) => setState({ ...state, adults: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                            </div>
                             <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">{t.children[lang]}</label>
                                <input
                                type="number"
                                min={0}
                                className="w-full px-3 py-2 text-sm border border-gray-200 bg-gray-50 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                value={state.children}
                                onChange={(e) => setState({ ...state, children: parseInt(e.target.value) || 0 })}
                                />
                            </div>
                             <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">{t.extraBed[lang]}</label>
                                <div className="relative">
                                    <BedDouble className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400"/>
                                    <input
                                    type="number"
                                    min={0}
                                    className="w-full pl-9 pr-2 py-2 text-sm border border-gray-200 bg-gray-50 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                    value={state.extraBeds}
                                    onChange={(e) => setState({ ...state, extraBeds: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Price & Contact */}
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                             {/* Promo */}
                            <div className="flex gap-2 mb-4">
                                <div className="relative flex-grow">
                                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400"/>
                                    <input 
                                        type="text" 
                                        placeholder={t.promoCode[lang]} 
                                        className="w-full pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-lg uppercase"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                    />
                                </div>
                                <button onClick={handleApplyPromo} type="button" className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-lg transition">{t.apply[lang]}</button>
                            </div>

                             {/* Totals */}
                             <div className="flex justify-between items-end mb-6">
                                <div>
                                    <span className="text-gray-500 text-xs font-bold uppercase">{t.total[lang]}</span>
                                    <div className="text-3xl font-extrabold text-slate-800 leading-none mt-1 tracking-tight">
                                    {finalPrice.toLocaleString()} <span className="text-base font-normal text-slate-500">{t.som[lang]}</span>
                                    </div>
                                    {appliedDiscount > 0 && <span className="text-xs text-green-600 font-bold">-{appliedDiscount}% {t.discountApplied[lang]}</span>}
                                </div>
                             </div>

                             {/* Contact Form */}
                             <div className="space-y-3 pt-4 border-t border-slate-200">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.fillContact[lang]}</h4>
                                <input
                                    type="text"
                                    required
                                    placeholder={TRANSLATIONS.form.name[lang]}
                                    className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary-500 outline-none text-sm"
                                    value={state.name}
                                    onChange={(e) => setState({...state, name: e.target.value})}
                                />
                                <input
                                    type="tel"
                                    required
                                    placeholder="+996 555 22-31-88"
                                    className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary-500 outline-none text-sm font-medium"
                                    value={state.phone}
                                    onChange={handlePhoneChange}
                                />
                                <input
                                    type="email"
                                    placeholder={TRANSLATIONS.form.email[lang]}
                                    className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary-500 outline-none text-sm"
                                    value={state.email}
                                    onChange={(e) => setState({...state, email: e.target.value})}
                                />
                                 <textarea
                                    rows={2}
                                    placeholder={TRANSLATIONS.form.comment[lang]}
                                    className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary-500 outline-none text-sm resize-none"
                                    value={state.comment}
                                    onChange={(e) => setState({...state, comment: e.target.value})}
                                />
                             </div>
                        </div>

                        {/* Submit */}
                        <button
                            onClick={handleSubmit}
                            disabled={finalPrice === 0 || isSubmitting || !!dateError}
                            className={`w-full py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary-500/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
                                finalPrice === 0 || !!dateError
                                ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                                : 'bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:to-primary-400'
                            }`}
                        >
                            {isSubmitting ? t.sending[lang] : t.bookBtn[lang]}
                        </button>
                        {submitStatus === 'error' && (
                            <p className="text-red-500 text-xs text-center mt-2 flex items-center justify-center gap-1">
                                <AlertCircle className="w-3 h-3"/> {TRANSLATIONS.form.error[lang]}
                            </p>
                        )}
                     </div>
                </div>
            )}

            {/* CALENDAR TAB */}
            {activeTab === 'calendar' && (
                <div className="animate-in slide-in-from-right-4 fade-in duration-300">
                    <AvailabilityCalendar lang={lang} />
                    <div className="mt-6 text-center">
                        <button 
                            onClick={() => setActiveTab('calc')}
                            className="text-primary-600 font-bold hover:underline text-sm"
                        >
                            {t.backToCalc[lang]}
                        </button>
                    </div>
                </div>
            )}
          </div>
      )}
    </div>
  );
};