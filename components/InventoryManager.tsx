
import React, { useState } from 'react';
import { Product, Category } from '../types';

interface InventoryManagerProps {
  products: Product[];
  onUpdatePrice: (id: string, newPrice: number) => void;
  onAddProduct: (p: Omit<Product, 'id' | 'sku'>) => void;
  currency: string;
}

const InventoryManager: React.FC<InventoryManagerProps> = ({ products, onUpdatePrice, onAddProduct, currency }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id' | 'sku'>>({
    name: '',
    price: 0,
    category: 'Men',
    image: 'https://picsum.photos/400/400'
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProduct(newProduct);
    setIsAdding(false);
    setNewProduct({ name: '', price: 0, category: 'Men', image: 'https://picsum.photos/400/400' });
  };

  return (
    <div className="flex-1 p-10 overflow-y-auto bg-slate-100 custom-scrollbar">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-5xl font-bold text-slate-900 font-luxury tracking-tighter">Inventory Archive</h2>
            <p className="text-slate-500 mt-2 font-medium uppercase tracking-[0.2em] text-[10px]">Registry and Pricing Control</p>
          </div>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className={`px-10 py-4 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center gap-4 shadow-2xl ${isAdding ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
          >
            {isAdding ? 'Close Form' : 'New Collection Entry'}
            <svg className={`w-5 h-5 transition-transform duration-500 ${isAdding ? 'rotate-45' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"/></svg>
          </button>
        </div>

        {isAdding && (
          <div className="mb-12 p-10 bg-white/60 backdrop-blur-3xl rounded-[3rem] border border-white/60 shadow-2xl animate-in zoom-in-95 duration-500">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-4 text-slate-900">
              <span className="w-1.5 h-10 bg-amber-400 rounded-full"></span>
              Register Asset
            </h3>
            <form onSubmit={handleAddSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-2">
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3">Nomenclature</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-6 py-4 rounded-2xl bg-white/80 border border-white focus:ring-4 focus:ring-slate-900/5 focus:bg-white outline-none transition-all font-bold text-slate-900"
                  value={newProduct.name}
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                  placeholder="Asset Name"
                />
              </div>
              <div>
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3">Valuation ({currency})</label>
                <input 
                  required
                  type="number" 
                  className="w-full px-6 py-4 rounded-2xl bg-white/80 border border-white focus:ring-4 focus:ring-slate-900/5 focus:bg-white outline-none transition-all font-bold text-slate-900"
                  value={newProduct.price || ''}
                  onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3">Department</label>
                <select 
                  className="w-full px-6 py-4 rounded-2xl bg-white/80 border border-white focus:ring-4 focus:ring-slate-900/5 focus:bg-white outline-none transition-all font-bold text-slate-900 cursor-pointer"
                  value={newProduct.category}
                  onChange={e => setNewProduct({...newProduct, category: e.target.value as Category})}
                >
                  <option value="Men">Men's Luxury</option>
                  <option value="Women">Women's Luxury</option>
                  <option value="Accessories">Fine Jewelry & Acc.</option>
                </select>
              </div>
              <div className="col-span-3">
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3">Asset Visual (URI)</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-6 py-4 rounded-2xl bg-white/80 border border-white focus:ring-4 focus:ring-slate-900/5 focus:bg-white outline-none transition-all font-bold text-slate-900"
                  value={newProduct.image}
                  onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                />
              </div>
              <div className="flex items-end">
                <button type="submit" className="w-full py-4.5 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl hover:bg-slate-800 transition-all shadow-xl active:scale-95">
                  Confirm Registry
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[3rem] overflow-hidden shadow-2xl">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900/5 border-b border-white/60">
                <th className="px-10 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">Asset Details</th>
                <th className="px-10 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">Reference</th>
                <th className="px-10 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">Section</th>
                <th className="px-10 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">Price Index</th>
                <th className="px-10 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/40">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-white/60 transition-all group">
                  <td className="px-10 py-7">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white shadow-xl ring-4 ring-white/50 group-hover:scale-110 transition-transform duration-500">
                        <img src={product.image} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block text-base uppercase tracking-tight">{product.name}</span>
                        <span className="text-[9px] text-slate-400 uppercase tracking-[0.3em] mt-1.5 block font-bold italic">Authenticated Asset</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-7">
                    <code className="text-[10px] bg-slate-900 text-white px-4 py-1.5 rounded-full font-mono tracking-widest shadow-lg">
                      {product.sku}
                    </code>
                  </td>
                  <td className="px-10 py-7">
                    <span className="px-4 py-1.5 bg-amber-400/20 text-slate-900 rounded-2xl text-[9px] font-black uppercase tracking-widest border border-amber-400/30">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-10 py-7">
                    <div className="flex items-center gap-4 bg-white/40 px-4 py-2.5 rounded-2xl border border-white/60 group-hover:bg-white transition-colors">
                      <span className="text-slate-400 font-black">{currency}</span>
                      <input 
                        type="number" 
                        className="w-full bg-transparent outline-none font-black text-slate-900 tabular-nums text-lg"
                        value={product.price}
                        onChange={e => onUpdatePrice(product.id, parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </td>
                  <td className="px-10 py-7 text-right">
                    <button className="text-slate-300 hover:text-red-500 transition-all p-3 hover:bg-red-50 rounded-[1.2rem] group-hover:text-slate-400">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryManager;
