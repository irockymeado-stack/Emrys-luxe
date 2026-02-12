
import React from 'react';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
  currency: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart, currency }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 pb-32">
      {products.map((product, idx) => (
        <button
          key={product.id}
          onClick={() => onAddToCart(product)}
          className="group flex flex-col bg-white/60 backdrop-blur-md rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 text-left border border-white/60 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4"
          style={{ animationDelay: `${idx * 50}ms` }}
        >
          <div className="aspect-[4/5] w-full overflow-hidden bg-slate-200 relative">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute top-5 left-5 px-4 py-1.5 bg-white/80 backdrop-blur-md rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] text-slate-900 shadow-sm border border-white/60">
              {product.category}
            </div>
            
            <div className="absolute bottom-5 right-5 p-4 bg-amber-400 rounded-2xl shadow-2xl translate-y-20 group-hover:translate-y-0 transition-transform duration-500 scale-90 opacity-0 group-hover:opacity-100">
               <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"/></svg>
            </div>
          </div>
          <div className="p-7 flex flex-col justify-between flex-1 relative">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-relaxed min-h-[2.8rem] uppercase tracking-tight">
                {product.name}
              </h3>
              <p className="text-[10px] text-slate-400 font-mono mt-2 tracking-widest">{product.sku}</p>
            </div>
            <div className="flex items-center justify-between border-t border-slate-900/5 pt-5">
              <span className="text-2xl font-black text-slate-900 tabular-nums">
                {currency}{product.price.toLocaleString()}
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover:text-slate-900 transition-colors">Select Asset</span>
            </div>
          </div>
        </button>
      ))}
      {products.length === 0 && (
        <div className="col-span-full py-32 flex flex-col items-center justify-center text-slate-300">
          <div className="w-32 h-32 mb-8 bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center shadow-inner border border-white/60">
             <svg className="w-16 h-16 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>
          <p className="text-2xl font-luxury italic text-slate-400">Archive matches not found</p>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] mt-2 text-slate-300">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
