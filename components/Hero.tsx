import React from 'react';
import { Heart, MapPin, Calendar } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-brand-50">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-brand-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="flex justify-center items-center space-x-4 mb-8">
          <span className="bg-white px-6 py-2 rounded-full text-brand-600 text-lg font-bold tracking-wide border-4 border-brand-200 shadow-cartoon transform -rotate-2">
            Ваш незаменимый хелпер 🚀
          </span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-extrabold text-gray-900 mb-6 drop-shadow-sm">
          Ваш<span className="text-brand-500">Хэлпер</span>
        </h1>
        
        <p className="text-xl md:text-3xl text-gray-700 mb-12 font-medium leading-relaxed">
          Создаем идеальный поинт встречи.<br/>
          <span className="text-brand-600">Любовь, закаты и лучшие события.</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
          <div className="bg-white p-6 rounded-3xl border-4 border-brand-100 shadow-cartoon hover:-translate-y-2 transition-all duration-300">
            <div className="bg-brand-100 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-brand-600 border-2 border-brand-200">
              <MapPin size={24} strokeWidth={3} />
            </div>
            <h3 className="font-bold text-gray-900 text-xl mb-2">Локации</h3>
            <p className="text-gray-600 font-medium leading-snug">Секретные места с видом на стрелку и закаты.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border-4 border-brand-100 shadow-cartoon hover:-translate-y-2 transition-all duration-300">
             <div className="bg-brand-100 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-brand-600 border-2 border-brand-200">
              <Calendar size={24} strokeWidth={3} />
            </div>
            <h3 className="font-bold text-gray-900 text-xl mb-2">События</h3>
            <p className="text-gray-600 font-medium leading-snug">Что происходит именно в твои даты? Найдем всё!</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border-4 border-brand-100 shadow-cartoon hover:-translate-y-2 transition-all duration-300">
             <div className="bg-brand-100 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-brand-600 border-2 border-brand-200">
              <Heart size={24} strokeWidth={3} />
            </div>
            <h3 className="font-bold text-gray-900 text-xl mb-2">Романтика</h3>
            <p className="text-gray-600 font-medium leading-snug">Уютные кафешки и маршруты только для двоих.</p>
          </div>
        </div>

        <button 
          onClick={onStart}
          className="relative inline-flex items-center justify-center px-10 py-5 text-xl font-black text-white transition-all duration-200 bg-brand-500 rounded-full focus:outline-none hover:bg-brand-600 shadow-cartoon hover:shadow-cartoon-hover hover:translate-x-[2px] hover:translate-y-[2px] border-4 border-white"
        >
          Создать незабываемое путешествие
          <Heart className="ml-3 fill-current" size={24} />
        </button>
      </div>
    </div>
  );
};