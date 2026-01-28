
import React from 'react';
import { APP_MESSAGES, PRICE_PER_NUMBER } from '../constants';

const Header: React.FC = () => {
  return (
    <header className="relative bg-gradient-to-br from-slate-900 to-blue-900 text-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-orange-500 rounded-full mix-blend-screen filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-20"></div>
      
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-20 relative flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-block px-4 py-1.5 mb-6 bg-orange-500/20 border border-orange-400/30 rounded-full text-orange-200 text-sm font-semibold tracking-wide uppercase">
            Sorteio Exclusivo
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
            {APP_MESSAGES.TITLE}
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-8 max-w-xl font-light">
            {APP_MESSAGES.SUBTITLE}
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl flex items-center gap-3 border border-white/10">
              <i className="fas fa-ticket-alt text-orange-400 text-xl"></i>
              <div>
                <p className="text-xs text-slate-300 uppercase font-bold">Por apenas</p>
                <p className="text-xl font-bold">R$ {PRICE_PER_NUMBER.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} <span className="text-sm font-normal opacity-70">/num</span></p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl flex items-center gap-3 border border-white/10">
              <i className="fas fa-gift text-orange-400 text-xl"></i>
              <div>
                <p className="text-xs text-slate-300 uppercase font-bold">Prêmio</p>
                <p className="text-xl font-bold">Microwear Ultra</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-shrink-0 w-72 h-72 md:w-[450px] md:h-[450px] relative group">
          <div className="absolute inset-0 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse group-hover:opacity-30 transition-opacity"></div>
          <div className="absolute inset-0 bg-orange-500 rounded-full filter blur-3xl opacity-10 animate-pulse delay-75 group-hover:opacity-20 transition-opacity"></div>
          {/* Note: Using a reliable Amazon URL for the specific 'Ultra + 7 Straps' kit that matches the visual description */}
          <img 
            src="https://m.media-amazon.com/images/I/61v3t3W3CLL._AC_SL1001_.jpg" 
            alt="Smartwatch Microwear Ultra Kit" 
            className="relative z-10 w-full h-full object-contain bg-white rounded-3xl shadow-2xl border-4 border-white/10 transform hover:scale-105 transition-transform duration-500 p-2"
            onError={(e) => {
              // Fallback to a generic high-quality smartwatch image if the kit image fails to load
              e.currentTarget.src = "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=1000";
              e.currentTarget.className = "relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-white/10";
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
