
import React from 'react';
import { ItineraryResponse, Event } from '../types';
import { ArrowLeft, ExternalLink, MapPin, Clock, Calendar, Heart, Utensils, Music, Footprints, Ticket } from 'lucide-react';

interface ItineraryViewProps {
  data: ItineraryResponse;
  city: string;
  onReset: () => void;
}

const getEventIcon = (type: string) => {
  switch (type) {
    case 'food': return <Utensils size={20} />;
    case 'romantic': return <Heart size={20} />;
    case 'party': return <Music size={20} />;
    case 'culture': return <Ticket size={20} />;
    case 'activity': return <Footprints size={20} />;
    default: return <MapPin size={20} />;
  }
};

const getEventColor = (type: string) => {
  switch (type) {
    case 'food': return 'bg-orange-100 border-orange-300 text-orange-700';
    case 'romantic': return 'bg-pink-100 border-pink-300 text-pink-700';
    case 'party': return 'bg-purple-100 border-purple-300 text-purple-700';
    case 'culture': return 'bg-blue-100 border-blue-300 text-blue-700';
    default: return 'bg-green-100 border-green-300 text-green-700';
  }
};

export const ItineraryView: React.FC<ItineraryViewProps> = ({ data, city, onReset }) => {
  const { structuredData, sources } = data;

  if (!structuredData) {
    return (
      <div className="min-h-screen bg-brand-50 p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Что-то пошло не так с форматом...</h2>
        <p className="text-gray-600 mb-4">Но текст мы получили:</p>
        <div className="bg-white p-4 rounded-2xl whitespace-pre-wrap text-left text-gray-900 border-4 border-brand-200">
          {data.rawText}
        </div>
        <button onClick={onReset} className="mt-6 bg-brand-500 text-white px-6 py-3 rounded-full font-bold">
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 pb-20 font-sans">
      {/* Fixed Header */}
      <header className="bg-white border-b-4 border-brand-100 sticky top-0 z-50 shadow-sm px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button 
            onClick={onReset}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700 transition-colors border-2 border-gray-200"
          >
            <ArrowLeft size={24} strokeWidth={3} />
          </button>
          <h1 className="text-xl sm:text-2xl font-black text-brand-700 truncate ml-4 flex-1 text-center">
             {structuredData.tripTitle || "Наш Поинт"}
          </h1>
          <div className="w-10"></div> {/* Spacer for center alignment */}
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-10">
        
        {/* Days List */}
        {structuredData.days.map((day, index) => (
          <div key={index} className="space-y-4">
            {/* Day Header */}
            <div className="flex items-center space-x-4 px-2">
              <div className="bg-brand-500 text-white font-black text-xl px-4 py-2 rounded-2xl border-4 border-brand-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] transform -rotate-1">
                {day.date}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-black text-gray-900 leading-none">{day.dayTitle}</h2>
                <p className="text-brand-600 font-bold text-sm mt-1 uppercase tracking-wider">{day.theme}</p>
              </div>
            </div>

            {/* Events Cards */}
            <div className="grid gap-5">
              {day.events.map((event, eIdx) => (
                <div 
                  key={eIdx}
                  className="group relative bg-white rounded-[2rem] p-1 border-4 border-gray-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 overflow-hidden"
                >
                  <div className="bg-white rounded-[1.7rem] p-5 border border-gray-100 h-full flex flex-col">
                    {/* Card Top */}
                    <div className="flex justify-between items-start mb-3">
                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide border-2 ${getEventColor(event.type)}`}>
                          {getEventIcon(event.type)}
                          <span className="ml-2">{event.type === 'romantic' ? 'Love' : event.type}</span>
                       </span>
                       <div className="flex items-center text-gray-900 font-bold bg-gray-100 px-3 py-1 rounded-lg">
                         <Clock size={16} className="mr-1.5" />
                         {event.time}
                       </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-black text-gray-900 mb-2 leading-tight group-hover:text-brand-600 transition-colors">
                      {event.title}
                    </h3>

                    {/* Location */}
                    <div className="flex items-start text-gray-600 font-bold text-sm mb-4">
                      <MapPin size={16} className="mr-1.5 mt-0.5 flex-shrink-0 text-brand-500" />
                      <span>{event.location}</span>
                    </div>

                    {/* Description */}
                    <div className="bg-brand-50 p-4 rounded-xl border-2 border-brand-100 mt-auto">
                       <p className="text-gray-800 font-medium text-sm leading-relaxed">
                         {event.description}
                       </p>
                    </div>
                    
                    {/* "Button" action hint */}
                    <div className="mt-4 flex justify-end">
                        <a 
                           href={`https://yandex.ru/maps/?text=${encodeURIComponent(event.location + ' ' + event.title + ' ' + city)}`}
                           target="_blank"
                           rel="noreferrer"
                           className="bg-black text-white px-5 py-2 rounded-full font-bold text-sm flex items-center hover:bg-brand-500 transition-colors"
                        >
                          Показать на карте
                          <ExternalLink size={14} className="ml-2" />
                        </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Sources Section */}
        {sources && sources.length > 0 && (
          <div className="bg-white rounded-[2rem] p-6 border-4 border-gray-200 shadow-sm mt-8">
             <h3 className="font-black text-gray-400 uppercase tracking-widest text-sm mb-4 flex items-center">
               <ExternalLink size={16} className="mr-2" />
               Источники
             </h3>
             <div className="flex flex-wrap gap-2">
               {sources.map((s, i) => (
                 <a 
                   key={i} 
                   href={s.uri} 
                   target="_blank" 
                   rel="noreferrer"
                   className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors truncate max-w-[200px]"
                 >
                   {s.title || "Ссылка"}
                 </a>
               ))}
             </div>
          </div>
        )}
      </main>
    </div>
  );
};
