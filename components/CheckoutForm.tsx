
import React, { useState } from 'react';
import { UserDetails } from '../types';

interface CheckoutFormProps {
  onSubmit: (details: UserDetails) => void;
  onBack: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState<UserDetails>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    state: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("Please fill in all required fields.");
      return;
    }
    onSubmit(formData);
  };

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#8b5e3c] transition-colors placeholder:text-white/20";
  const labelClass = "block text-sm font-medium text-white/60 mb-1 ml-1";

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="text-white/60 hover:text-white flex items-center space-x-2 transition">
          <i className="fa-solid fa-chevron-left"></i>
          <span>Back to Cart</span>
        </button>
        <h2 className="text-3xl font-serif">Shipping Details</h2>
      </div>

      <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl space-y-6 border border-white/10 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className={labelClass}>Full Name *</label>
            <input 
              required
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              type="text" 
              placeholder="John Doe" 
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Email Address *</label>
            <input 
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email" 
              placeholder="john@example.com" 
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Phone Number *</label>
            <input 
              required
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="tel" 
              placeholder="+91 98765 43210" 
              className={inputClass}
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Shipping Address *</label>
            <textarea 
              required
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              placeholder="Flat no., Building, Street name" 
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>City *</label>
            <input 
              required
              name="city"
              value={formData.city}
              onChange={handleChange}
              type="text" 
              placeholder="Mumbai" 
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Zip Code *</label>
            <input 
              required
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              type="text" 
              placeholder="400001" 
              className={inputClass}
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-[#8b5e3c] py-4 rounded-2xl font-bold text-lg hover:bg-[#a67c52] transition shadow-xl mt-4"
        >
          Confirm Details & Pay
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
