
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { INITIAL_PRODUCTS, DEFAULT_SETTINGS } from './constants';
import { Product, CartItem, StoreSettings, Category } from './types';
import { BluetoothService } from './services/bluetoothService';

import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import CartSidebar from './components/CartSidebar';
import InventoryManager from './components/InventoryManager';
import SettingsView from './components/SettingsView';
import InvoiceModal from './components/InvoiceModal';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pos' | 'inventory' | 'settings'>('pos');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_SETTINGS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [lastInvoice, setLastInvoice] = useState<{ items: CartItem[], date: Date, id: string } | null>(null);

  // Sound utility
  const playClick = useCallback(() => {
    if (!settings.soundEffects) return;
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(440, audioContext.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
      console.warn("Audio context failed to initialize (interaction required)");
    }
  }, [settings.soundEffects]);

  // Swipe detection logic
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 70;
    const isRightSwipe = distance < -70;

    if (isLeftSwipe && !isCartOpen) setIsCartOpen(true);
    if (isRightSwipe && isCartOpen) setIsCartOpen(false);

    setTouchStart(null);
    setTouchEnd(null);
  };

  const addToCart = useCallback((product: Product) => {
    playClick();
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, [playClick]);

  const updateCartQuantity = useCallback((id: string, delta: number) => {
    playClick();
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  }, [playClick]);

  const clearCart = useCallback(() => setCart([]), []);

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cart]);
  const cartItemCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const handleUpdatePrice = (id: string, newPrice: number) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, price: newPrice } : p));
  };

  const handleAddProduct = (newProduct: Omit<Product, 'id' | 'sku'>) => {
    const id = `new-${Date.now()}`;
    const sku = `EM-NEW-${products.length + 1}`;
    setProducts(prev => [{ ...newProduct, id, sku }, ...prev]);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const invoice = {
      items: [...cart],
      date: new Date(),
      id: `INV-${Date.now().toString().slice(-6)}`
    };
    setLastInvoice(invoice);
    setIsInvoiceOpen(true);
    setIsCartOpen(false);
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div 
      className={`h-screen flex flex-col transition-colors duration-500 overflow-hidden relative safe-top safe-bottom ${darkMode ? 'dark bg-slate-950' : 'bg-slate-100'}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Header activeTab={activeTab} setActiveTab={setActiveTab} darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <main className="flex-1 flex overflow-hidden relative">
        {activeTab === 'pos' && (
          <div className="flex-1 flex flex-col p-6 space-y-6 overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 font-luxury tracking-tight">Showroom</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Discover our latest additions.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative group">
                  <input 
                    type="text" 
                    placeholder="Search collection..." 
                    className="pl-10 pr-4 py-2 bg-white/60 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all w-full md:w-72 shadow-sm dark:text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <svg className="absolute left-3 top-2.5 h-5 w-5 text-slate-400 group-focus-within:text-amber-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </div>
                <select 
                  className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/10 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/50 shadow-sm cursor-pointer dark:text-white"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as any)}
                >
                  <option value="All">All Items</option>
                  <option value="Men">Men's</option>
                  <option value="Women">Women's</option>
                </select>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <ProductGrid products={filteredProducts} onAddToCart={addToCart} currency={settings.currency} />
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <InventoryManager 
            products={products} 
            onUpdatePrice={handleUpdatePrice} 
            onAddProduct={handleAddProduct}
            currency={settings.currency}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsView settings={settings} setSettings={setSettings} />
        )}

        {/* Swipe Trigger Zone */}
        {!isCartOpen && activeTab === 'pos' && (
          <div 
            className="fixed right-0 top-0 bottom-0 w-6 z-40 cursor-w-resize group flex items-center justify-center"
            onClick={() => setIsCartOpen(true)}
          >
            <div className="w-1.5 h-16 bg-slate-300/40 dark:bg-slate-700/40 rounded-full group-hover:bg-amber-400/60 transition-colors"></div>
          </div>
        )}
      </main>

      {/* Cart Overlay */}
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart} 
        updateQuantity={updateCartQuantity} 
        total={cartTotal} 
        taxRate={settings.taxRate} 
        currency={settings.currency}
        onCheckout={handleCheckout}
        onClear={clearCart}
      />

      {/* Floating Cart Button */}
      {activeTab === 'pos' && (
        <button 
          onClick={() => setIsCartOpen(true)}
          className={`fixed bottom-8 right-8 w-16 h-16 bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 rounded-2xl shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-90 z-40 ${isCartOpen ? 'translate-x-32 opacity-0' : 'translate-x-0 opacity-100'}`}
        >
          <div className="relative">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-3 -right-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-amber-500 text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-slate-900 dark:border-amber-500 animate-bounce">
                {cartItemCount}
              </span>
            )}
          </div>
        </button>
      )}

      {isInvoiceOpen && lastInvoice && (
        <InvoiceModal 
          invoice={lastInvoice} 
          settings={settings} 
          onClose={() => {
            setIsInvoiceOpen(false);
            clearCart();
          }} 
        />
      )}
    </div>
  );
};

export default App;
