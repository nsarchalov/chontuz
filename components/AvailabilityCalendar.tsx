


import React, { useEffect, useState } from 'react';
import { Language, RoomCategory } from '../types';
import { ROOMS, TRANSLATIONS } from '../constants';
import { fetchOccupancy, OccupancyData } from '../services/crmService';
import { Loader2, Calendar as CalendarIcon, Info, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  lang: Language;
}

export const AvailabilityCalendar: React.FC<Props> = ({ lang }) => {
  const [occupancy, setOccupancy] = useState<OccupancyData>({});
  const [loading, setLoading] = useState(true);
  const [viewDate, setViewDate] = useState(new Date());

  const t = TRANSLATIONS.calendar;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchOccupancy();
    setOccupancy(data);
    setLoading(false);
  };

  // Helper to format date as YYYY-MM-DD to match keys from Google Script
  const formatDateKey = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
  };

  const getStatus = (date: Date, roomId: string, totalRooms: number) => {
      const key = formatDateKey(date);
      const bookedCount = occupancy[key]?.[roomId] || 0;
      const available = totalRooms - bookedCount;

      // Check if date is in the past
      const today = new Date();
      today.setHours(0,0,0,0);
      const target = new Date(date);
      target.setHours(0,0,0,0);

      if (target < today) {
          return { type: 'past', label: '-', color: 'bg-gray-100 text-gray-300' };
      }

      if (available <= 0) return { type: 'full', label: '✕', color: 'bg-rose-100 text-rose-600' };
      if (available <= 2 && totalRooms > 5) return { type: 'few', label: available.toString(), color: 'bg-amber-100 text-amber-700 font-bold' };
      if (available === 1 && totalRooms <= 5) return { type: 'few', label: '1', color: 'bg-amber-100 text-amber-700 font-bold' };
      
      return { type: 'free', label: '', color: 'bg-emerald-50 text-emerald-600' };
  };

  // Month Navigation Logic
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
  };

  const days = getDaysInMonth(viewDate);
  const today = new Date();
  const isPrevDisabled = viewDate.getMonth() === today.getMonth() && viewDate.getFullYear() === today.getFullYear();

  const handlePrevMonth = () => {
      if (isPrevDisabled) return;
      const newDate = new Date(viewDate);
      newDate.setMonth(newDate.getMonth() - 1);
      setViewDate(newDate);
  };

  const handleNextMonth = () => {
      const newDate = new Date(viewDate);
      newDate.setMonth(newDate.getMonth() + 1);
      setViewDate(newDate);
  };

  const currentMonthName = viewDate.toLocaleDateString(lang, { month: 'long', year: 'numeric' });

  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col h-full">
      
      {/* Header / Toolbar */}
      <div className="p-4 border-b border-gray-100 flex flex-col gap-4 bg-gray-50/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <CalendarIcon className="w-5 h-5 text-primary-600" />
                <span>{TRANSLATIONS.calculator.tabs.calendar[lang]}</span>
            </div>
            
            {/* Month Navigation Controls */}
            <div className="flex items-center justify-center gap-4 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
                <button 
                    onClick={handlePrevMonth} 
                    disabled={isPrevDisabled}
                    className={`p-1 rounded-full hover:bg-gray-100 transition ${isPrevDisabled ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600'}`}
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="font-bold uppercase min-w-[140px] text-center text-sm text-gray-800 select-none">
                    {currentMonthName}
                </span>
                <button 
                    onClick={handleNextMonth}
                    className="p-1 rounded-full hover:bg-gray-100 transition text-gray-600"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-xs justify-end">
              <div className="flex items-center gap-1.5 px-2 py-1 bg-white border border-gray-200 rounded-md shadow-sm">
                  <div className="w-3 h-3 bg-emerald-100 border border-emerald-200 rounded-sm"></div> 
                  <span className="text-gray-600">{t.available[lang]}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-white border border-gray-200 rounded-md shadow-sm">
                  <div className="w-3 h-3 bg-amber-100 border border-amber-200 rounded-sm flex items-center justify-center text-[8px] font-bold text-amber-700">!</div> 
                  <span className="text-gray-600">{t.few[lang]}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-white border border-gray-200 rounded-md shadow-sm">
                  <div className="w-3 h-3 bg-rose-100 border border-rose-200 rounded-sm flex items-center justify-center text-[8px] font-bold text-rose-700">✕</div> 
                  <span className="text-gray-600">{t.full[lang]}</span>
              </div>
          </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/80 z-20 flex flex-col items-center justify-center min-h-[200px]">
            <Loader2 className="w-8 h-8 text-primary-600 animate-spin mb-2" />
            <span className="text-sm font-medium text-gray-500">{t.sync[lang]}</span>
        </div>
      )}

      {/* Calendar Table Container */}
      <div className="relative overflow-x-auto custom-scrollbar flex-grow">
        <table className="w-full text-sm text-left border-collapse min-w-[1000px]">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
                <tr>
                    <th scope="col" className="sticky left-0 z-10 bg-gray-50 p-4 border-r border-gray-200 w-48 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                        {t.cat[lang]}
                    </th>
                    {days.map((d, i) => (
                        <th key={i} scope="col" className={`px-1 py-3 text-center border-r border-gray-100 min-w-[40px] ${[0, 6].includes(d.getDay()) ? 'bg-blue-50/30 text-blue-600' : ''}`}>
                            <div className="font-bold text-gray-800 text-sm leading-none mb-1">{d.getDate()}</div>
                            <div className="text-[9px] font-medium opacity-70">{d.toLocaleDateString(lang, { weekday: 'short' })}</div>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {Object.values(ROOMS).map((room, roomIdx) => (
                    <tr key={room.id} className="bg-white border-b border-gray-100 last:border-0 hover:bg-gray-50/30 transition-colors">
                        <th scope="row" className="sticky left-0 z-10 bg-white p-4 font-medium text-gray-900 border-r border-gray-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] whitespace-nowrap">
                            <div className="flex flex-col">
                                <span className="text-sm font-bold">{room.title[lang]}</span>
                                <span className="text-[10px] text-gray-400 font-normal mt-0.5">
                                    {room.totalRooms} {room.id === RoomCategory.MINE ? TRANSLATIONS.roomsPage.places[lang] : TRANSLATIONS.roomsPage.rooms[lang]}
                                </span>
                            </div>
                        </th>
                        {days.map((d, i) => {
                            const status = getStatus(d, room.id, room.totalRooms);
                            return (
                                <td key={i} className={`p-0.5 border-r border-gray-100 text-center h-14 align-middle ${status.type === 'past' ? 'bg-gray-50' : ''}`}>
                                    <div className={`w-full h-full min-h-[36px] rounded flex items-center justify-center transition-all duration-200 border border-transparent ${status.color}`}>
                                        {status.type === 'free' && (
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                        )}
                                        {status.type !== 'free' && (
                                            <span className="text-xs font-medium">{status.label}</span>
                                        )}
                                    </div>
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

      <div className="p-3 bg-gray-50 text-[10px] text-gray-400 text-center flex items-center justify-center gap-1 border-t border-gray-100">
          <Info className="w-3 h-3" />
          <span>{t.source[lang]}</span>
      </div>
    </div>
  );
};