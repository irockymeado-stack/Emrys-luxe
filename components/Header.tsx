
import React from 'react';

interface HeaderProps {
  activeTab: 'pos' | 'inventory' | 'settings';
  setActiveTab: (tab: 'pos' | 'inventory' | 'settings') => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-0 w-full bg-white/40 backdrop-blur-2xl px-10 py-5 flex items-center justify-between shadow-[0_4px_30px_rgba(0,0,0,0.05)] border-b border-white/40 z-50">
      <div className="flex items-center gap-5">
        <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-2xl transform rotate-3 ring-4 ring-white/50">
          <span className="font-luxury text-3xl font-bold -rotate-3 text-amber-400">E</span>
        </div>
        <div className="hidden sm:block">
          <h1 className="font-luxury text-2xl tracking-[0.3em] uppercase leading-none text-slate-900">Emrys</h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em] mt-1.5 opacity-80">Maison De Couture</p>
        </div>
      </div>
      
      <nav className="flex items-center gap-1.5 p-1 bg-slate-900/5 rounded-2xl border border-white/60">
        <button 
          onClick={() => setActiveTab('pos')}
          className={`px-8 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${activeTab === 'pos' ? 'bg-white text-slate-900 shadow-xl scale-105' : 'text-slate-500 hover:bg-white/40'}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
          <span className="font-bold uppercase tracking-widest text-[10px]">Registry</span>
        </button>
        <button 
          onClick={() => setActiveTab('inventory')}
          className={`px-8 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${activeTab === 'inventory' ? 'bg-white text-slate-900 shadow-xl scale-105' : 'text-slate-500 hover:bg-white/40'}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/></svg>
          <span className="font-bold uppercase tracking-widest text-[10px]">Archives</span>
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`px-8 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${activeTab === 'settings' ? 'bg-white text-slate-900 shadow-xl scale-105' : 'text-slate-500 hover:bg-white/40'}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/></svg>
          <span className="font-bold uppercase tracking-widest text-[10px]">Identity</span>
        </button>
      </nav>
    </header>
  );
};

export default Header;
