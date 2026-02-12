
import { BLEPrinter } from '../types';

export class BluetoothService {
  private static printer: BLEPrinter | null = null;

  static async connect(): Promise<BLEPrinter> {
    try {
      // Standard BLE primary service for generic serial/printing
      // Fix: Cast navigator to any to access the Web Bluetooth API
      const device = await (navigator as any).bluetooth.requestDevice({
        filters: [
          { services: ['000018f0-0000-1000-8000-00805f9b34fb'] },
          { namePrefix: 'TP' },
          { namePrefix: 'Printer' },
          { namePrefix: 'MTP' }
        ],
        optionalServices: ['000018f0-0000-1000-8000-00805f9b34fb']
      });

      const server = await device.gatt?.connect();
      if (!server) throw new Error("Could not connect to GATT server");

      const service = await server.getPrimaryService('000018f0-0000-1000-8000-00805f9b34fb');
      const characteristics = await service.getCharacteristics();
      
      const writableChar = characteristics.find(c => c.properties.write || c.properties.writeWithoutResponse);

      if (!writableChar) throw new Error("No writable characteristic found");

      this.printer = {
        device,
        characteristic: writableChar,
        connected: true
      };

      return this.printer;
    } catch (error) {
      console.error("Bluetooth connection failed", error);
      throw error;
    }
  }

  static isConnected(): boolean {
    return !!this.printer && this.printer.connected && this.printer.device.gatt?.connected === true;
  }

  static async printReceipt(text: string): Promise<void> {
    if (!this.printer?.characteristic) {
      throw new Error("Printer not connected");
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(text + '\n\n\n\n'); 
    
    // Chunk size for BLE MTU
    const CHUNK_SIZE = 20;
    for (let i = 0; i < data.length; i += CHUNK_SIZE) {
      const chunk = data.slice(i, i + CHUNK_SIZE);
      await this.printer.characteristic.writeValue(chunk);
    }
  }
  
  static disconnect() {
    if (this.printer?.device.gatt?.connected) {
      this.printer.device.gatt.disconnect();
    }
    this.printer = null;
  }
}