
import React, { useState, useRef } from 'react';
import { PaymentMethod } from '../types';

interface PaymentSectionProps {
  onConfirm: (method: PaymentMethod, screenshot?: string) => void;
  onBack: () => void;
  total: number;
}

const PaymentSection: React.FC<PaymentSectionProps> = ({ onConfirm, onBack, total }) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [showUpiInterface, setShowUpiInterface] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const upiId = "techsinghworld@fam";

  const methods = [
    { id: PaymentMethod.COD, icon: 'fa-hand-holding-dollar', label: 'Cash on Delivery', desc: 'Pay when your gift arrives' },
    { id: PaymentMethod.UPI, icon: 'fa-mobile-screen-button', label: 'UPI Payment', desc: 'Google Pay, PhonePe, Paytm' },
    { id: PaymentMethod.CARD, icon: 'fa-credit-card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, Amex' },
    { id: PaymentMethod.NET_BANKING, icon: 'fa-building-columns', label: 'Net Banking', desc: 'All major Indian banks' },
  ];

  const handleMethodSelect = (methodId: PaymentMethod) => {
    setSelectedMethod(methodId);
    if (methodId !== PaymentMethod.UPI) {
      setShowUpiInterface(false);
      setScreenshot(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshot(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFinalConfirm = () => {
    if (!selectedMethod) return;

    if (selectedMethod === PaymentMethod.UPI && !showUpiInterface) {
      setShowUpiInterface(true);
      return;
    }

    if (selectedMethod === PaymentMethod.UPI && !screenshot) {
      alert("Please upload a screenshot of your payment details to proceed.");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      onConfirm(selectedMethod, screenshot || undefined);
      setIsProcessing(false);
    }, 1500);
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText(upiId);
    alert("UPI ID copied to clipboard!");
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={showUpiInterface ? () => setShowUpiInterface(false) : onBack} 
          className="text-white/60 hover:text-white flex items-center space-x-2 transition"
        >
          <i className="fa-solid fa-chevron-left"></i>
          <span>{showUpiInterface ? 'Change Method' : 'Back to Shipping'}</span>
        </button>
        <h2 className="text-3xl font-serif">{showUpiInterface ? 'Complete UPI Payment' : 'Payment Method'}</h2>
      </div>

      {!showUpiInterface ? (
        <div className="space-y-4">
          <div className="glass p-6 rounded-2xl border border-[#d4a373]/30 bg-[#d4a373]/5 flex justify-between items-center mb-8">
            <span className="text-white/60">Payable Amount</span>
            <span className="text-2xl font-serif text-[#d4a373]">₹{total.toFixed(2)}</span>
          </div>

          {methods.map((method) => (
            <button
              key={method.id}
              onClick={() => handleMethodSelect(method.id)}
              className={`w-full glass p-6 rounded-2xl border transition-all text-left flex items-center space-x-6 ${
                selectedMethod === method.id 
                ? 'border-[#8b5e3c] bg-[#8b5e3c]/10 ring-1 ring-[#8b5e3c]' 
                : 'border-white/10 hover:border-white/30'
              }`}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-colors ${
                selectedMethod === method.id ? 'bg-[#8b5e3c] text-white' : 'bg-white/5 text-white/40'
              }`}>
                <i className={`fa-solid ${method.icon}`}></i>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg">{method.label}</h4>
                <p className="text-sm text-white/50">{method.desc}</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedMethod === method.id ? 'border-[#8b5e3c]' : 'border-white/20'
              }`}>
                {selectedMethod === method.id && <div className="w-3 h-3 bg-[#8b5e3c] rounded-full"></div>}
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="glass p-8 rounded-3xl border border-[#d4a373]/30 bg-[#d4a373]/5 space-y-8 animate-slide-up">
          <div className="text-center space-y-2">
            <p className="text-white/60 text-sm uppercase tracking-widest font-bold">Transfer Exactly</p>
            <p className="text-4xl font-serif text-[#d4a373]">₹{total.toFixed(2)}</p>
          </div>

          <div className="bg-black/30 p-6 rounded-2xl border border-white/5 space-y-4">
            <div className="flex flex-col items-center space-y-2">
              <span className="text-xs text-white/40 uppercase tracking-tighter">Beneficiary UPI ID</span>
              <div className="flex items-center space-x-3 bg-white/5 px-4 py-2 rounded-lg border border-white/10 w-full justify-between">
                <code className="text-[#d4a373] font-mono text-lg">{upiId}</code>
                <button 
                  onClick={copyUpiId}
                  className="text-white/60 hover:text-white p-2 transition"
                >
                  <i className="fa-solid fa-copy"></i>
                </button>
              </div>
            </div>
            <p className="text-[10px] text-center text-white/30 leading-relaxed italic">
              Please use any UPI app to transfer the amount, then upload the screenshot below.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold text-center text-white/80">Step 2: Upload Payment Screenshot</p>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center space-y-3 transition-all ${
                screenshot ? 'border-green-500/50 bg-green-500/5' : 'border-white/10 hover:border-[#d4a373]/50 hover:bg-white/5'
              }`}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*"
              />
              {screenshot ? (
                <div className="relative w-full h-32 flex justify-center">
                  <img src={screenshot} alt="Payment Proof" className="h-full rounded-lg object-contain" />
                </div>
              ) : (
                <>
                  <i className="fa-solid fa-cloud-arrow-up text-3xl text-white/20"></i>
                  <p className="text-xs text-white/40">Click to upload screenshot</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <button
        disabled={!selectedMethod || isProcessing}
        onClick={handleFinalConfirm}
        className={`w-full py-5 rounded-2xl font-bold text-xl transition-all shadow-xl mt-8 flex items-center justify-center space-x-3 ${
          selectedMethod && !isProcessing ? 'bg-[#8b5e3c] hover:bg-[#a67c52] text-white' : 'bg-white/5 text-white/20 cursor-not-allowed'
        }`}
      >
        {isProcessing ? 'Processing...' : (showUpiInterface ? 'Confirm Payment Proof' : 'Proceed to Checkout')}
      </button>
    </div>
  );
};

export default PaymentSection;
