
import React from 'react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  total: number;
  taxRate: number;
  currency: string;
  onCheckout: () => void;
  onClear: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ 
  isOpen, 
  onClose, 
  cart, 
  updateQuantity, 
  total, 
  taxRate, 
  currency, 
  onCheckout, 
  onClear 
}) => {
  const tax = (total * taxRate) / 100;
  const grandTotal = total + tax;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-900/30 backdrop-blur-md z-[60] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white/70 backdrop-blur-3xl border-l border-white/50 z-[70] shadow-[-20px_0_50px_rgba(0,0,0,0.1)] flex flex-col transition-transform duration-500 ease-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-8 border-b border-white/50 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 font-luxury">Current Order</h3>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">Review Items</p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 bg-slate-900/5 hover:bg-slate-900/10 rounded-2xl transition-all"
          >
            <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 opacity-40">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              </div>
              <p className="font-luxury italic text-xl">The basket is empty</p>
              <button onClick={onClose} className="mt-4 text-xs font-black uppercase tracking-widest text-slate-900 hover:underline">Begin Shopping</button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{cart.length} Items Selected</span>
                <button onClick={onClear} className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500 hover:text-red-600 transition-colors">Clear All</button>
              </div>
              {cart.map(item => (
                <div key={item.id} className="flex gap-5 group items-center animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white shadow-md flex-shrink-0 border-2 border-white ring-4 ring-slate-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 truncate uppercase tracking-tight">{item.name}</h4>
                    <p className="text-[10px] text-slate-400 font-mono mb-3">{item.sku}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center bg-white/80 rounded-xl overflow-hidden shadow-sm border border-white/40">
                        <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1.5 hover:bg-slate-900 hover:text-white transition-colors text-slate-500">-</button>
                        <span className="px-4 py-1.5 text-xs font-black text-slate-900 tabular-nums">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1.5 hover:bg-slate-900 hover:text-white transition-colors text-slate-500">+</button>
                      </div>
                      <span className="text-sm font-black text-slate-900">
                        {currency}{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-8 bg-white/40 backdrop-blur-3xl border-t border-white/60 space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
              <span>Subtotal</span>
              <span className="text-slate-900">{currency}{total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
              <span>Tax Rate ({taxRate}%)</span>
              <span className="text-slate-900">{currency}{tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-end pt-4 border-t border-white/60">
              <span className="text-slate-900 font-luxury text-3xl">Total</span>
              <span className="text-3xl font-black text-slate-900 tabular-nums">
                {currency}{grandTotal.toLocaleString()}
              </span>
            </div>
          </div>
          
          <button 
            onClick={onCheckout}
            disabled={cart.length === 0}
            className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black tracking-[0.3em] uppercase hover:bg-slate-800 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.15)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-xs relative overflow-hidden group"
          >
            <span className="relative z-10">Proceed To Checkout</span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
          
          <p className="text-center text-[9px] text-slate-400 uppercase tracking-[0.2em] font-medium">Swipe Right to Hide Cart</p>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
