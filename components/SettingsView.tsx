
import React, { useState, useEffect } from 'react';
import { StoreSettings } from '../types';
import { BluetoothService } from '../services/bluetoothService';

interface SettingsViewProps {
  settings: StoreSettings;
  setSettings: (s: StoreSettings) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ settings, setSettings }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const check = () => {
       setIsConnected(BluetoothService.isConnected());
    };
    check();
    const timer = setInterval(check, 2000);
    return () => clearInterval(timer);
  }, []);

  const handleBluetoothConnect = async () => {
    setIsConnecting(true);
    setStatusMessage('Pairing with terminal...');
    try {
      await BluetoothService.connect();
      setIsConnected(true);
      setStatusMessage('Pairing successful.');
    } catch (error) {
      console.error(error);
      setStatusMessage('Connection failed. Device not found.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    BluetoothService.disconnect();
    setIsConnected(false);
    setStatusMessage('Terminal detached.');
  };

  return (
    <div className="flex-1 p-10 overflow-y-auto bg-slate-50 custom-scrollbar">
      <div className="max-w-4xl mx-auto space-y-10">
        <div>
          <h2 className="text-4xl font-bold text-slate-900 font-luxury tracking-tight">System Identity</h2>
          <p className="text-slate-500 mt-2 font-medium">Fine-tune the brand experience and hardware connectivity.</p>
        </div>

        <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-slate-900 text-amber-400 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Maison Profile</h3>
              <p className="text-sm text-slate-400">Your store's public information.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="col-span-2 md:col-span-1">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Luxury Label</label>
              <input 
                type="text" 
                className="w-full px-5 py-3.5 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:bg-white outline-none font-bold transition-all"
                value={settings.storeName}
                onChange={e => setSettings({...settings, storeName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Monetary Symbol</label>
              <input 
                type="text" 
                className="w-full px-5 py-3.5 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:bg-white outline-none font-bold transition-all"
                value={settings.currency}
                onChange={e => setSettings({...settings, currency: e.target.value})}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Primary Address</label>
              <input 
                type="text" 
                className="w-full px-5 py-3.5 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:bg-white outline-none font-bold transition-all"
                value={settings.address}
                onChange={e => setSettings({...settings, address: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Concierge Phone</label>
              <input 
                type="text" 
                className="w-full px-5 py-3.5 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:bg-white outline-none font-bold transition-all"
                value={settings.phone}
                onChange={e => setSettings({...settings, phone: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">VAT Percentage (%)</label>
              <input 
                type="number" 
                className="w-full px-5 py-3.5 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:bg-white outline-none font-bold transition-all"
                value={settings.taxRate}
                onChange={e => setSettings({...settings, taxRate: parseFloat(e.target.value) || 0})}
              />
            </div>
          </div>
        </section>

        <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-slate-100 text-slate-900 rounded-2xl flex items-center justify-center shadow-md">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Peripherals</h3>
              <p className="text-sm text-slate-400">Bluetooth BLE Thermal Receipt Terminal.</p>
            </div>
          </div>
          <div className={`p-8 rounded-[1.5rem] border-2 flex flex-col md:flex-row items-center justify-between transition-all gap-6 ${isConnected ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-100'}`}>
            <div className="flex items-center gap-5">
              <div className={`w-4 h-4 rounded-full shadow-lg ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
              <div>
                <p className={`text-lg font-bold ${isConnected ? 'text-emerald-900' : 'text-slate-600'}`}>
                  {isConnected ? 'Terminal Ready' : 'Searching for Link...'}
                </p>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mt-1">
                  {statusMessage || 'Standard BLE Receipt Printer Interface'}
                </p>
              </div>
            </div>
            {isConnected ? (
              <button 
                onClick={handleDisconnect}
                className="w-full md:w-auto px-10 py-3 bg-white text-red-600 border border-red-100 hover:bg-red-50 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-sm"
              >
                Terminate Link
              </button>
            ) : (
              <button 
                onClick={handleBluetoothConnect}
                disabled={isConnecting}
                className="w-full md:w-auto px-10 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-slate-800 transition-all shadow-2xl active:scale-95 disabled:opacity-50"
              >
                {isConnecting ? 'Syncing...' : 'Initiate Pairing'}
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsView;
