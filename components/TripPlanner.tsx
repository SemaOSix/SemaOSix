
import React, { useState } from 'react';
import { TripDetails, InterestOption } from '../types';
import { Sparkles, Loader2, ArrowLeft, Plane, Calendar, MapPin, User, Heart } from 'lucide-react';

interface TripPlannerProps {
  onSubmit: (details: TripDetails) => void;
  onBack: () => void;
  isLoading: boolean;
}

const INTERESTS: InterestOption[] = [
  { id: 'romantic', label: 'Романтика & Закаты', icon: '🌅' },
  { id: 'food', label: 'Еда & Рестораны', icon: '🍔' },
  { id: 'culture', label: 'Музеи & Искусство', icon: '🎨' },
  { id: 'walking', label: 'Прогулки', icon: '🚶' },
  { id: 'nightlife', label: 'Тусовки', icon: '🍸' },
  { id: 'active', label: 'Движ & Спорт', icon: '🚴' },
];

export const TripPlanner: React.FC<TripPlannerProps> = ({ onSubmit, onBack, isLoading }) => {
  const [visitorName, setVisitorName] = useState('Максим');
  const [hostName, setHostName] = useState('Мария');
  const [city, setCity] = useState('Нижний Новгород');
  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (arrivalDate && departureDate && city && visitorName && hostName) {
      onSubmit({ 
        visitorName, 
        hostName, 
        city, 
        arrivalDate, 
        departureDate, 
        interests: selectedInterests 
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-brand-50 p-4">
        <div className="bg-white p-10 rounded-[2rem] shadow-cartoon border-4 border-brand-200 max-w-md w-full text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-200 rounded-full opacity-50"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-200 rounded-full opacity-50"></div>
          
          <div className="flex justify-center mb-8 relative z-10">
            <div className="relative">
              <div className="w-20 h-20 border-8 border-brand-100 rounded-full animate-spin border-t-brand-500"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Sparkles size={32} className="text-brand-500 fill-brand-500" />
              </div>
            </div>
          </div>
          <h2 className="text-3xl font-black text-gray-800 mb-4 relative z-10">Магия Gemini... ✨</h2>
          <p className="text-xl text-gray-600 font-medium relative z-10">
            Ищем лучшие места в городе {city} для {visitorName} и {hostName}!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-cartoon border-4 border-white relative">
        
        {/* Header */}
        <div className="flex items-center mb-8">
          <button 
            onClick={onBack} 
            className="p-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all hover:-translate-x-1 border-2 border-transparent hover:border-gray-300"
          >
            <ArrowLeft size={28} strokeWidth={3} />
          </button>
          <h2 className="ml-6 text-3xl sm:text-4xl font-black text-gray-900">Детали поездки</h2>
        </div>
        
        <form className="space-y-8" onSubmit={handleSubmit}>
          
          {/* Names & City Section */}
          <div className="bg-brand-50 p-6 rounded-3xl border-4 border-brand-100 space-y-6">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-600 uppercase tracking-wider ml-1">Кто едет?</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-400" size={20} />
                    <input
                      type="text"
                      required
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      className="block w-full pl-12 pr-4 py-3 bg-white border-4 border-brand-200 rounded-xl text-gray-900 font-bold focus:outline-none focus:border-brand-400 transition-all"
                      placeholder="Имя гостя"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-600 uppercase tracking-wider ml-1">К кому?</label>
                  <div className="relative">
                    <Heart className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-400" size={20} />
                    <input
                      type="text"
                      required
                      value={hostName}
                      onChange={(e) => setHostName(e.target.value)}
                      className="block w-full pl-12 pr-4 py-3 bg-white border-4 border-brand-200 rounded-xl text-gray-900 font-bold focus:outline-none focus:border-brand-400 transition-all"
                      placeholder="Имя принимающего"
                    />
                  </div>
                </div>
             </div>
             
             <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-600 uppercase tracking-wider ml-1">Куда едем?</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-400" size={20} />
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3 bg-white border-4 border-brand-200 rounded-xl text-gray-900 font-bold focus:outline-none focus:border-brand-400 transition-all"
                    placeholder="Город"
                  />
                </div>
             </div>
          </div>

          {/* Dates Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3 group">
              <label htmlFor="arrival" className="block text-lg font-bold text-gray-800 flex items-center">
                <Plane className="mr-2 text-brand-500 rotate-45" size={20} />
                Дата приезда
              </label>
              <input
                id="arrival"
                type="date"
                required
                className="block w-full px-5 py-4 bg-gray-50 border-4 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-400 focus:bg-white transition-all font-bold text-lg shadow-sm"
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
              />
            </div>
            
            <div className="space-y-3">
              <label htmlFor="departure" className="block text-lg font-bold text-gray-800 flex items-center">
                <Calendar className="mr-2 text-brand-500" size={20} />
                Дата отъезда
              </label>
              <input
                id="departure"
                type="date"
                required
                className="block w-full px-5 py-4 bg-gray-50 border-4 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-400 focus:bg-white transition-all font-bold text-lg shadow-sm"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
              />
            </div>
          </div>

          {/* Interests Section */}
          <div className="space-y-5">
            <label className="block text-xl font-bold text-gray-800">
              Интересы & Вайб 🎢
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {INTERESTS.map((interest) => (
                <button
                  key={interest.id}
                  type="button"
                  onClick={() => toggleInterest(interest.id)}
                  className={`
                    relative flex flex-col items-center justify-center px-4 py-4 rounded-2xl text-base font-bold transition-all duration-200 border-4
                    ${selectedInterests.includes(interest.id)
                      ? 'bg-brand-100 border-brand-500 text-brand-700 shadow-cartoon transform -translate-y-1'
                      : 'bg-white border-gray-200 text-gray-500 hover:border-brand-200 hover:bg-brand-50'}
                  `}
                >
                  <span className="text-2xl mb-2">{interest.icon}</span>
                  {interest.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={!arrivalDate || !departureDate || !city || !visitorName || !hostName}
              className="w-full flex justify-center items-center py-5 px-6 border-4 border-brand-600 rounded-full text-xl font-black text-white bg-brand-500 hover:bg-brand-600 focus:outline-none shadow-cartoon hover:shadow-cartoon-hover hover:translate-y-[2px] hover:translate-x-[2px] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0 transition-all"
            >
              Составить План! 🚀
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
