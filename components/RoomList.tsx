
import React from 'react';
import { ROOMS } from '../constants';
import { Language } from '../types';
import { User, ArrowRight } from 'lucide-react';

interface Props {
  lang: Language;
}

export const RoomList: React.FC<Props> = ({ lang }) => {
  const handleScrollToBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('booking');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
      {Object.values(ROOMS).map((room) => (
        <div key={room.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary-900/10 transition-all duration-300 border border-gray-100 flex flex-col">
          <div className="relative h-56 overflow-hidden">
            <div className="absolute inset-0 bg-gray-200 animate-pulse" /> {/* Placeholder loading state */}
            <img 
              src={room.imageUrl} 
              alt={room.title[lang]} 
              className="relative w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
            />
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur shadow-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800">
                {room.totalRooms} {lang === 'ru' ? 'спальных мест' : lang === 'kg' ? 'орун' : 'sleeping places'}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-xs font-medium truncate">{room.amenities.join(' • ')}</p>
            </div>
          </div>
          
          <div className="p-6 flex flex-col flex-grow">
            <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{room.title[lang]}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{room.description[lang]}</p>
            </div>
            
            <div className="flex items-center gap-4 mb-6 text-sm text-gray-500 border-b border-gray-50 pb-4">
                <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded text-xs font-semibold">
                    <User className="w-3.5 h-3.5" />
                    Max {room.capacity}
                </div>
            </div>

            <div className="mt-auto flex items-end justify-between">
              <div>
                <span className="block text-xs text-gray-400 font-medium uppercase mb-0.5">Price starts at</span>
                <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-primary-600">
                        {room.price.toLocaleString()}
                    </span>
                    <span className="text-xs font-bold text-gray-400">KGS</span>
                </div>
              </div>
              <a 
                href="#booking" 
                onClick={handleScrollToBooking}
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors cursor-pointer"
              >
                  <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
