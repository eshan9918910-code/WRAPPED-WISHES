
import React, { useState } from 'react';
import { CartItem } from '../types';

interface CartDetailsProps {
  cart: CartItem[];
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  subtotal: number;
  promoDiscount: number;
  couponDiscount: number;
  appliedCoupon: { code: string; discountRate: number } | null;
  onApplyCoupon: (code: string) => boolean;
  gst: number;
  total: number;
  onBack: () => void;
  onCheckout: () => void;
}

const CartDetails: React.FC<CartDetailsProps> = ({ 
  cart, removeFromCart, updateQuantity, subtotal, promoDiscount, couponDiscount, 
  appliedCoupon, onApplyCoupon, gst, total, onBack, onCheckout 
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponError, setCouponError] = useState('');

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const success = onApplyCoupon(couponCode);
    if (success) {
      setCouponCode('');
      setShowCouponInput(false);
    } else {
      setCouponError('Invalid coupon code');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 glass rounded-3xl p-8">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="fa-solid fa-basket-shopping text-4xl text-white/20"></i>
        </div>
        <h2 className="text-3xl font-serif mb-4">Your cart is empty</h2>
        <p className="text-white/60 mb-8">Seems like you haven't wrapped any wishes yet.</p>
        <button onClick={onBack} className="bg-[#8b5e3c] px-8 py-3 rounded-full font-bold hover:bg-[#a67c52] transition">
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-fade-in">
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between mb-8">
          <button onClick={onBack} className="text-white/60 hover:text-white flex items-center space-x-2 transition">
            <i className="fa-solid fa-chevron-left"></i>
            <span>Continue Shopping</span>
          </button>
          <h2 className="text-3xl font-serif">Shopping Bag</h2>
        </div>

        <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
          {cart.map(item => (
            <div key={item.id} className="glass p-4 rounded-2xl flex items-center space-x-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
              <div className="flex-1">
                <h4 className="font-semibold text-white/90">{item.name}</h4>
                <p className="text-sm text-white/50">{item.category}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center border border-white/10 rounded-lg">
                    <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 hover:bg-white/5">-</button>
                    <span className="px-3 text-sm font-bold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 hover:bg-white/5">+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-400 text-sm hover:text-red-300 transition-colors">Remove</button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-serif">₹{item.price * item.quantity}</p>
                <p className="text-xs text-white/40">₹{item.price} each</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="glass p-8 rounded-3xl sticky top-28 space-y-6 border border-white/20 shadow-2xl">
          <h3 className="text-2xl font-serif border-b border-white/10 pb-4">Order Summary</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between text-white/60">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            
            {promoDiscount > 0 && (
              <div className="flex justify-between text-green-400 font-medium text-sm">
                <span>Platform Promo (5%)</span>
                <span>- ₹{promoDiscount.toFixed(2)}</span>
              </div>
            )}

            {appliedCoupon && (
              <div className="flex justify-between text-blue-400 font-medium text-sm animate-pulse">
                <span>Coupon ({appliedCoupon.code})</span>
                <span>- ₹{couponDiscount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-white/60">
              <span>GST (5%)</span>
              <span>₹{gst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-white/60">
              <span>Delivery</span>
              <span className="text-green-400 uppercase text-xs font-bold">Free</span>
            </div>
          </div>

          {/* Coupon Section */}
          <div className="py-4 border-y border-white/10">
            {!showCouponInput ? (
              <button 
                onClick={() => setShowCouponInput(true)}
                className="text-[#d4a373] text-sm font-bold flex items-center space-x-2 hover:text-white transition"
              >
                <i className="fa-solid fa-tag"></i>
                <span>Have a coupon code?</span>
              </button>
            ) : (
              <form onSubmit={handleApply} className="space-y-2 animate-slide-up">
                <div className="flex items-center space-x-2">
                  <input 
                    type="text" 
                    placeholder="Enter Code (e.g. SAJS)" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs focus:border-[#d4a373] focus:outline-none uppercase tracking-widest"
                  />
                  <button type="submit" className="bg-[#8b5e3c] px-4 py-2 rounded-lg text-xs font-bold">Apply</button>
                </div>
                {couponError && <p className="text-[10px] text-red-400 ml-1">{couponError}</p>}
                <button 
                  type="button" 
                  onClick={() => setShowCouponInput(false)}
                  className="text-[10px] text-white/40 underline ml-1"
                >
                  Cancel
                </button>
              </form>
            )}
          </div>

          <div className="pt-4 flex justify-between items-end">
            <div>
              <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Total Amount</p>
              <p className="text-3xl font-serif text-[#d4a373]">₹{total.toFixed(2)}</p>
            </div>
          </div>

          <button 
            onClick={onCheckout}
            className="w-full bg-[#8b5e3c] py-4 rounded-2xl font-bold text-lg hover:bg-[#a67c52] transition shadow-xl shadow-[#8b5e3c]/20 flex items-center justify-center space-x-3"
          >
            <span>Proceed to Checkout</span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>

          <p className="text-[10px] text-center text-white/40 mt-4 leading-relaxed uppercase tracking-tighter">
            SECURE CHECKOUT POWERED BY WRAPPED WISHES • 5% GST INCLUDED
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
