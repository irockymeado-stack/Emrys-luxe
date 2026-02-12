
import React, { useRef, useState } from 'react';
import { CartItem, StoreSettings } from '../types';
import { BluetoothService } from '../services/bluetoothService';

declare var html2canvas: any;

interface InvoiceModalProps {
  invoice: { items: CartItem[], date: Date, id: string };
  settings: StoreSettings;
  onClose: () => void;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ invoice, settings, onClose }) => {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const subtotal = invoice.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = (subtotal * settings.taxRate) / 100;
  const total = subtotal + tax;

  const handlePrintBLE = async () => {
    try {
      if (!BluetoothService.isConnected()) {
        alert("Please connect to a Bluetooth printer in System Settings.");
        return;
      }
      
      const receiptText = `
${settings.storeName.toUpperCase()}
${settings.address}
Tel: ${settings.phone}
--------------------------------
Inv No: ${invoice.id}
Date: ${invoice.date.toLocaleString()}
--------------------------------
${invoice.items.map(item => `${item.name.slice(0, 20)} x${item.quantity}\n${settings.currency}${(item.price * item.quantity).toLocaleString()}`).join('\n')}
--------------------------------
Subtotal: ${settings.currency}${subtotal.toLocaleString()}
Tax (${settings.taxRate}%): ${settings.currency}${tax.toLocaleString()}
TOTAL: ${settings.currency}${total.toLocaleString()}
--------------------------------
Thank you for visiting
${settings.storeName}
      `;
      
      await BluetoothService.printReceipt(receiptText);
    } catch (err) {
      alert("Print failed: " + (err as Error).message);
    }
  };

  const handleSaveImage = async () => {
    if (!invoiceRef.current) return;
    setIsCapturing(true);
    try {
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
      });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.href = image;
      link.download = `Invoice-${invoice.id}.png`;
      link.click();
    } catch (err) {
      console.error("Save image error", err);
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md no-print overflow-hidden">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Checkout Successful</h3>
            <p className="text-slate-500">Transaction ID: {invoice.id}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 bg-slate-100/50 custom-scrollbar">
          <div ref={invoiceRef} className="bg-white p-10 shadow-lg rounded-2xl border border-slate-200 max-w-sm mx-auto flex flex-col">
            <div className="text-center mb-10 border-b border-slate-100 pb-6">
              <h1 className="font-luxury text-3xl mb-2 tracking-widest uppercase text-slate-900">{settings.storeName}</h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] leading-relaxed">{settings.address}</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em]">{settings.phone}</p>
            </div>

            <div className="flex justify-between text-[11px] mb-8 uppercase tracking-widest text-slate-400 font-bold">
              <span>Customer: Valued Guest</span>
              <span>{invoice.date.toLocaleDateString()}</span>
            </div>

            <table className="w-full text-sm mb-8">
              <thead>
                <tr className="text-left border-b-2 border-slate-900 text-[10px] text-slate-900 uppercase tracking-widest">
                  <th className="pb-3">Item Description</th>
                  <th className="pb-3 text-center">Qty</th>
                  <th className="pb-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoice.items.map(item => (
                  <tr key={item.id}>
                    <td className="py-4">
                      <p className="font-semibold text-slate-800">{item.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{item.sku}</p>
                    </td>
                    <td className="py-4 text-center text-slate-600 font-medium">x{item.quantity}</td>
                    <td className="py-4 text-right font-bold text-slate-900">{settings.currency}{(item.price * item.quantity).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-auto border-t-2 border-slate-900 pt-6 space-y-3">
              <div className="flex justify-between text-xs text-slate-500 font-medium uppercase tracking-widest">
                <span>Subtotal</span>
                <span>{settings.currency}{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-500 font-medium uppercase tracking-widest">
                <span>Tax ({settings.taxRate}%)</span>
                <span>{settings.currency}{tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-2xl font-bold text-slate-900 pt-3 border-t border-slate-100">
                <span className="font-luxury italic text-xl">Total</span>
                <span>{settings.currency}{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-12 text-center pt-8 border-t border-dashed border-slate-200">
              <p className="font-luxury text-sm italic text-slate-400">Luxury is an experience</p>
              <p className="text-[9px] text-slate-300 uppercase tracking-[0.3em] mt-2">Powered by Emrys POS</p>
            </div>
          </div>
        </div>

        <div className="p-8 bg-white border-t border-slate-100 flex gap-4">
          <button 
            onClick={handleSaveImage}
            disabled={isCapturing}
            className="flex-1 py-4 bg-slate-100 text-slate-900 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-200 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            Save Image
          </button>
          <button 
            onClick={handlePrintBLE}
            className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-[0.98] shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/></svg>
            BLE Printer
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
