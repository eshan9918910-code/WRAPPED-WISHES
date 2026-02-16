
import React, { useState, useMemo } from 'react';
import { Product, CartItem, AppView, UserDetails, PaymentMethod } from './types';
import { PRODUCTS, GST_RATE, PROMO_DISCOUNT, PROMO_MIN_ORDER } from './constants';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import BottomCartBar from './components/BottomCartBar';
import CartDetails from './components/CartDetails';
import CheckoutForm from './components/CheckoutForm';
import PaymentSection from './components/PaymentSection';
import OrderSuccess from './components/OrderSuccess';
import AuthSection from './components/AuthSection';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('home');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [paymentScreenshot, setPaymentScreenshot] = useState<string | undefined>(undefined);
  
  // Coupon States
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountRate: number } | null>(null);
  const [userCoupons, setUserCoupons] = useState<string[]>([]);
  const [isNewUser, setIsNewUser] = useState(true);

  // Platform promo (5% off above 300)
  const isPromoEligible = true;

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleAuthAction = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setView('auth');
  };

  const handleAuthComplete = (method: string) => {
    if (authMode === 'signup' && isNewUser) {
      const code = `FIRST15-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      setUserCoupons([code]);
      setIsNewUser(false);
      alert(`Welcome to Wrapped Wishes! Authenticated via ${method}. Use code ${code} for 15% OFF on your first order.`);
    } else {
      alert(`Successfully logged in via ${method}!`);
    }
    setView('home');
  };

  const applyCouponCode = (code: string) => {
    const upperCode = code.toUpperCase();
    if (upperCode === 'NEW10') {
      setAppliedCoupon({ code: 'NEW10', discountRate: 0.10 });
      return true;
    } else if (upperCode === 'SAJS') {
      setAppliedCoupon({ code: 'SAJS', discountRate: 0.20 });
      return true;
    } else if (userCoupons.includes(upperCode)) {
      setAppliedCoupon({ code: upperCode, discountRate: 0.15 });
      return true;
    }
    return false;
  };

  const subtotal = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cart]);
  
  const promoDiscount = useMemo(() => {
    if (isPromoEligible && subtotal >= PROMO_MIN_ORDER) {
      return subtotal * PROMO_DISCOUNT;
    }
    return 0;
  }, [subtotal]);

  const couponDiscount = useMemo(() => {
    if (appliedCoupon) {
      return (subtotal - promoDiscount) * appliedCoupon.discountRate;
    }
    return 0;
  }, [subtotal, promoDiscount, appliedCoupon]);
  
  const gst = useMemo(() => (subtotal - promoDiscount - couponDiscount) * GST_RATE, [subtotal, promoDiscount, couponDiscount]);
  const total = useMemo(() => (subtotal - promoDiscount - couponDiscount) + gst, [subtotal, promoDiscount, couponDiscount, gst]);

  const handleCheckoutSubmit = (details: UserDetails) => {
    setUserDetails(details);
    setView('payment');
  };

  const handlePaymentConfirm = (method: PaymentMethod, screenshot?: string) => {
    setPaymentMethod(method);
    setPaymentScreenshot(screenshot);
    setView('success');
  };

  const resetApp = () => {
    setCart([]);
    setUserDetails(null);
    setPaymentMethod(null);
    setAppliedCoupon(null);
    setPaymentScreenshot(undefined);
    setView('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d0d0d] via-[#3d2b1f] to-[#050505] text-white selection:bg-[#8b5e3c] selection:text-white transition-colors duration-700">
      <Header setView={setView} cartCount={cart.length} onAuth={handleAuthAction} isNewUser={isNewUser} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-32">
        {view === 'home' && (
          <>
            <section className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-6xl font-serif text-white/90">Curated Moments, Wrapped with Love</h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">Discover a collection of refined gifts and essential luxuries designed for those who appreciate the finer things.</p>
              
              <div className="inline-block mt-8 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full animate-pulse shadow-xl shadow-black/40">
                <span className="text-sm font-medium">✨ Limited Offer: 5% OFF on orders above ₹300!</span>
              </div>
            </section>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {PRODUCTS.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAdd={() => addToCart(product)} 
                  quantityInCart={cart.find(item => item.id === product.id)?.quantity || 0}
                />
              ))}
            </div>
          </>
        )}

        {view === 'auth' && (
          <AuthSection 
            mode={authMode} 
            onBack={() => setView('home')} 
            onComplete={handleAuthComplete}
            toggleMode={() => setAuthMode(prev => prev === 'login' ? 'signup' : 'login')}
          />
        )}

        {view === 'cart' && (
          <CartDetails 
            cart={cart} 
            removeFromCart={removeFromCart} 
            updateQuantity={updateQuantity}
            subtotal={subtotal}
            promoDiscount={promoDiscount}
            couponDiscount={couponDiscount}
            appliedCoupon={appliedCoupon}
            onApplyCoupon={applyCouponCode}
            gst={gst}
            total={total}
            onBack={() => setView('home')}
            onCheckout={() => setView('checkout')}
          />
        )}

        {view === 'checkout' && (
          <CheckoutForm 
            onSubmit={handleCheckoutSubmit} 
            onBack={() => setView('cart')}
          />
        )}

        {view === 'payment' && (
          <PaymentSection 
            onConfirm={handlePaymentConfirm} 
            onBack={() => setView('checkout')}
            total={total}
          />
        )}

        {view === 'success' && (
          <OrderSuccess 
            cart={cart} 
            userDetails={userDetails!} 
            total={total}
            paymentMethod={paymentMethod!}
            screenshot={paymentScreenshot}
            onReset={resetApp}
          />
        )}
      </main>

      {cart.length > 0 && view === 'home' && (
        <BottomCartBar 
          count={cart.reduce((acc, item) => acc + item.quantity, 0)} 
          total={subtotal} 
          onClick={() => setView('cart')} 
        />
      )}
    </div>
  );
};

export default App;
