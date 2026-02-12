
export type Category = 'Men' | 'Women' | 'Accessories';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  sku: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface StoreSettings {
  storeName: string;
  address: string;
  phone: string;
  taxRate: number;
  currency: string;
}

// Fix: Use 'any' for Web Bluetooth types as they are not defined in the standard TypeScript environment
export interface BLEPrinter {
  device: any;
  characteristic?: any;
  connected: boolean;
}