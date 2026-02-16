
import React, { useState, useEffect } from 'react';
import { CartItem, UserDetails, PaymentMethod } from '../types';
import { generateOrderSummaryForEmail } from '../services/geminiService';

interface OrderSuccessProps {
  cart: CartItem[];
  userDetails: UserDetails;
  total: number;
  paymentMethod: PaymentMethod;
  onReset: () => void;
  screenshot?: string;
}

const OrderSuccess: React.FC<OrderSuccessProps> = ({ cart, userDetails, total, paymentMethod, onReset, screenshot }) => {
  const [aiSummary, setAiSummary] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      const summary = await generateOrderSummaryForEmail(cart, userDetails, total, paymentMethod);
      setAiSummary(summary);
      setLoading(false);
    };
    fetchSummary();
  }, [cart, userDetails, total, paymentMethod]);

  return (
    <div className="max-w-4xl mx-auto text-center py-12 animate-fade-in">
      <div className="mb-12">
        <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 text-5xl animate-bounce">
          <i className="fa-solid fa-check"></i>
        </div>
        <h2 className="text-5xl font-serif mb-4">Order Successful!</h2>
        
        {paymentMethod === PaymentMethod.COD && (
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 mb-4 max-w-lg mx-auto">
            <p className="text-blue-400 text-sm flex items-center justify-center space-x-2">
              <i className="fa-solid fa-envelope"></i>
              <span>Order details sent to: <strong>eshan9918910@gmail.com</strong></span>
            </p>
          </div>
        )}

        <p className="text-white/60 text-lg">Thank you for choosing Wrapped Wishes. Your order is confirmed.</p>
        <p className="text-sm text-white/40 mt-2">Order ID: #WW-{Math.floor(100000 + Math.random() * 900000)}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
        <div className="glass p-8 rounded-3xl border border-white/10 space-y-6">
          <h3 className="text-xl font-serif border-b border-white/10 pb-4">Order Summary</h3>
          <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                <span className="text-white/80">{item.name} x {item.quantity}</span>
                <span className="font-serif">₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="pt-4 space-y-2">
              <div className="flex justify-between font-bold text-lg text-[#d4a373] pt-2 border-t border-white/10">
                <span>Total Amount:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="text-xs text-white/40 uppercase">Method: {paymentMethod}</div>
            </div>
            {screenshot && (
              <div className="mt-4 pt-4 border-t border-white/5 text-center">
                <p className="text-[10px] uppercase text-white/30 mb-2">Payment Proof Uploaded</p>
                <img src={screenshot} alt="Payment Proof" className="max-h-32 mx-auto rounded-lg border border-white/10" />
              </div>
            )}
          </div>
        </div>

        <div className="glass p-8 rounded-3xl border border-[#d4a373]/20 bg-[#d4a373]/5 flex flex-col h-full">
          <h3 className="text-xl font-serif border-b border-white/10 pb-4 flex items-center space-x-2">
            <i className="fa-solid fa-sparkles text-[#d4a373]"></i>
            <span>Order Note</span>
          </h3>
          <div className="flex-1 mt-6 text-sm text-white/80 leading-relaxed font-mono whitespace-pre-wrap overflow-y-auto custom-scrollbar pr-2 h-[200px]">
            {loading ? "Crafting your order summary..." : aiSummary}
          </div>
        </div>
      </div>

      <button onClick={onReset} className="mt-12 bg-white/5 hover:bg-white/10 border border-white/20 px-12 py-4 rounded-full font-bold transition-all">
        Back to Store
      </button>
    </div>
  );
};

export default OrderSuccess;
