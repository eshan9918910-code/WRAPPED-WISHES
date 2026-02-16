
import React, { useState } from 'react';

interface AuthSectionProps {
  mode: 'login' | 'signup';
  onBack: () => void;
  onComplete: (method: string) => void;
  toggleMode: () => void;
}

const AuthSection: React.FC<AuthSectionProps> = ({ mode, onBack, onComplete, toggleMode }) => {
  const [phoneMode, setPhoneMode] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) {
      if (phoneNumber.length < 10) {
        alert("Please enter a valid phone number");
        return;
      }
      setOtpSent(true);
    } else {
      if (otp.length < 4) {
        alert("Please enter valid OTP");
        return;
      }
      onComplete('Phone Number');
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 animate-fade-in">
      <div className="text-center mb-10">
        <button 
          onClick={phoneMode ? () => { setPhoneMode(false); setOtpSent(false); } : onBack} 
          className="mb-6 text-white/40 hover:text-white transition flex items-center space-x-2 mx-auto text-sm"
        >
          <i className="fa-solid fa-chevron-left"></i>
          <span>{phoneMode ? 'Back to Options' : 'Back to Store'}</span>
        </button>
        <h2 className="text-4xl font-serif mb-2 capitalize">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
        <p className="text-white/60 text-sm">{mode === 'login' ? 'Log in to access your orders' : 'Sign up for a premium gifting experience'}</p>
      </div>

      <div className="glass p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
        {!phoneMode ? (
          <div className="space-y-4">
            <button 
              onClick={() => onComplete('Google')}
              className="w-full bg-white text-black py-4 rounded-xl font-bold flex items-center justify-center space-x-3 hover:bg-white/90 transition-all shadow-lg"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              <span>Continue with Google</span>
            </button>

            <button 
              onClick={() => setPhoneMode(true)}
              className="w-full glass border border-white/20 py-4 rounded-xl font-bold flex items-center justify-center space-x-3 hover:bg-white/5 transition-all"
            >
              <i className="fa-solid fa-phone text-[#d4a373]"></i>
              <span>Use Phone Number</span>
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest"><span className="bg-[#1a1a1a] px-2 text-white/30">Or</span></div>
            </div>

            <button 
              onClick={() => onComplete('Guest')}
              className="w-full py-2 text-xs text-white/40 hover:text-white transition uppercase tracking-widest font-bold"
            >
              Continue as Guest
            </button>
          </div>
        ) : (
          <form onSubmit={handlePhoneSubmit} className="space-y-6 animate-slide-up">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#d4a373] mb-2 ml-1">
                {otpSent ? 'Enter 4-Digit OTP' : 'Phone Number'}
              </label>
              {!otpSent ? (
                <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus-within:border-[#8b5e3c] transition-colors">
                  <span className="text-white/40 mr-2 font-mono">+91</span>
                  <input 
                    autoFocus
                    type="tel" 
                    placeholder="9876543210" 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="bg-transparent flex-1 focus:outline-none placeholder:text-white/10 text-lg tracking-wider"
                  />
                </div>
              ) : (
                <input 
                  autoFocus
                  type="text" 
                  placeholder="0 0 0 0" 
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-[#8b5e3c] transition-colors text-center text-2xl tracking-[1em] font-serif"
                />
              )}
            </div>

            <button 
              type="submit"
              className="w-full bg-[#8b5e3c] py-4 rounded-xl font-bold text-lg hover:bg-[#a67c52] transition shadow-xl"
            >
              {otpSent ? 'Verify & Continue' : 'Send OTP'}
            </button>

            {otpSent && (
              <button 
                type="button"
                onClick={() => setOtpSent(false)}
                className="w-full text-xs text-white/40 hover:text-white transition text-center"
              >
                Resend OTP in 30s
              </button>
            )}
          </form>
        )}
      </div>

      <div className="mt-8 text-center space-y-4">
        <p className="text-sm text-white/60">
          {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
          <button 
            onClick={toggleMode}
            className="ml-2 text-[#d4a373] font-bold hover:underline"
          >
            {mode === 'login' ? 'Sign Up' : 'Log In'}
          </button>
        </p>
        <p className="text-[10px] text-white/20 uppercase tracking-tighter px-8">
          By continuing, you agree to Wrapped Wishes' Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default AuthSection;
