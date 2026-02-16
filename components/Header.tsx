
import React from 'react';
import { AppView } from '../types';

interface HeaderProps {
  setView: (view: AppView) => void;
  cartCount: number;
  onAuth: (mode: 'login' | 'signup') => void;
  isNewUser: boolean;
}

const Header: React.FC<HeaderProps> = ({ setView, cartCount, onAuth, isNewUser }) => {
  return (
    <header className="sticky top-0 z-50 glass border-b border-white/10 py-3 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div 
          className="flex items-center space-x-3 cursor-pointer transition hover:opacity-90 group"
          onClick={() => setView('home')}
        >
          <div className="relative">
            <img 
              src="image.png" 
              alt="Wrapped Wishes Logo" 
              className="w-14 h-14 rounded-full object-cover border-2 border-[#d4a373]/30 shadow-2xl transition-transform group-hover:scale-110"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=150&h=150';
              }}
            />
            <div className="absolute inset-0 rounded-full shadow-inner pointer-events-none border border-white/5"></div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-[#d4a373] tracking-tighter leading-none">
              𝚆𝚛𝚊𝚙𝚙𝚎𝚍 𝚆𝚒𝚜𝚑𝚎𝚜
            </h1>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4a373]/80 font-semibold ml-1 mt-1">Custom Gift Boxes & More</span>
          </div>
        </div>

        <nav className="flex items-center space-x-6">
          <button 
            onClick={() => setView('cart')}
            className="relative p-2 text-white/80 hover:text-[#d4a373] transition transform hover:scale-110 active:scale-95"
            aria-label="View Cart"
          >
            <i className="fa-solid fa-bag-shopping text-xl"></i>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#8b5e3c] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#1a1a1a] animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
          
          <div className="hidden md:flex items-center space-x-4 border-l border-white/10 pl-6 ml-2">
             <button 
               onClick={() => onAuth('login')}
               className="text-xs font-semibold uppercase tracking-widest text-white/60 hover:text-white transition"
             >
               Login
             </button>
             <button 
               onClick={() => onAuth('signup')}
               className={`${isNewUser ? 'bg-[#8b5e3c] hover:bg-[#a67c52]' : 'bg-green-600/20 text-green-400 cursor-default'} px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition shadow-lg shadow-black/40`}
             >
               {isNewUser ? 'Sign Up' : 'Account Ready ✨'}
             </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
