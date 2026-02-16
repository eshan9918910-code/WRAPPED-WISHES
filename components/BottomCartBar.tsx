
import React from 'react';

interface BottomCartBarProps {
  count: number;
  total: number;
  onClick: () => void;
}

const BottomCartBar: React.FC<BottomCartBarProps> = ({ count, total, onClick }) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl z-40 animate-slide-up">
      <button 
        onClick={onClick}
        className="w-full glass bg-[#8b5e3c]/90 backdrop-blur-xl border border-white/20 p-4 rounded-2xl flex items-center justify-between shadow-2xl hover:bg-[#a67c52] transition-colors"
      >
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 p-2 rounded-lg">
            <i className="fa-solid fa-cart-shopping"></i>
          </div>
          <div className="text-left">
            <p className="text-xs font-medium text-white/70">{count} {count === 1 ? 'item' : 'items'} added</p>
            <p className="text-lg font-bold">₹{total.toFixed(2)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 font-bold uppercase text-xs tracking-widest">
          <span>View Cart</span>
          <i className="fa-solid fa-arrow-right"></i>
        </div>
      </button>
    </div>
  );
};

export default BottomCartBar;
