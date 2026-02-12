
import { Product, StoreSettings } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  // Men's Wear (20 items)
  { id: 'm1', name: 'Silk Peak Lapel Suit', price: 2450, category: 'Men', image: 'https://picsum.photos/seed/m1/400/400', sku: 'EM-M-001' },
  { id: 'm2', name: 'Cashmere Overcoat', price: 1800, category: 'Men', image: 'https://picsum.photos/seed/m2/400/400', sku: 'EM-M-002' },
  { id: 'm3', name: 'Egyptian Cotton Shirt', price: 350, category: 'Men', image: 'https://picsum.photos/seed/m3/400/400', sku: 'EM-M-003' },
  { id: 'm4', name: 'Velvet Smoking Jacket', price: 1200, category: 'Men', image: 'https://picsum.photos/seed/m4/400/400', sku: 'EM-M-004' },
  { id: 'm5', name: 'Merino Wool Turtleneck', price: 420, category: 'Men', image: 'https://picsum.photos/seed/m5/400/400', sku: 'EM-M-005' },
  { id: 'm6', name: 'Hand-Stitched Loafers', price: 850, category: 'Men', image: 'https://picsum.photos/seed/m6/400/400', sku: 'EM-M-006' },
  { id: 'm7', name: 'Linen Summer Blazer', price: 950, category: 'Men', image: 'https://picsum.photos/seed/m7/400/400', sku: 'EM-M-007' },
  { id: 'm8', name: 'Selvedge Denim Jeans', price: 280, category: 'Men', image: 'https://picsum.photos/seed/m8/400/400', sku: 'EM-M-008' },
  { id: 'm9', name: 'Suede Chelsea Boots', price: 650, category: 'Men', image: 'https://picsum.photos/seed/m9/400/400', sku: 'EM-M-009' },
  { id: 'm10', name: 'Polo Silk T-Shirt', price: 195, category: 'Men', image: 'https://picsum.photos/seed/m10/400/400', sku: 'EM-M-010' },
  { id: 'm11', name: 'Tweed Herringbone Vest', price: 380, category: 'Men', image: 'https://picsum.photos/seed/m11/400/400', sku: 'EM-M-011' },
  { id: 'm12', name: 'Oxford Button Down', price: 220, category: 'Men', image: 'https://picsum.photos/seed/m12/400/400', sku: 'EM-M-012' },
  { id: 'm13', name: 'Gabardine Chinos', price: 310, category: 'Men', image: 'https://picsum.photos/seed/m13/400/400', sku: 'EM-M-013' },
  { id: 'm14', name: 'Leather Biker Jacket', price: 1550, category: 'Men', image: 'https://picsum.photos/seed/m14/400/400', sku: 'EM-M-014' },
  { id: 'm15', name: 'Silk Bow Tie', price: 125, category: 'Men', image: 'https://picsum.photos/seed/m15/400/400', sku: 'EM-M-015' },
  { id: 'm16', name: 'Alligator Skin Belt', price: 550, category: 'Men', image: 'https://picsum.photos/seed/m16/400/400', sku: 'EM-M-016' },
  { id: 'm17', name: 'V-Neck Cashmere Vest', price: 480, category: 'Men', image: 'https://picsum.photos/seed/m17/400/400', sku: 'EM-M-017' },
  { id: 'm18', name: 'Double-Breasted Coat', price: 2100, category: 'Men', image: 'https://picsum.photos/seed/m18/400/400', sku: 'EM-M-018' },
  { id: 'm19', name: 'Wool Tailored Shorts', price: 250, category: 'Men', image: 'https://picsum.photos/seed/m19/400/400', sku: 'EM-M-019' },
  { id: 'm20', name: 'Embroidered Night Robe', price: 720, category: 'Men', image: 'https://picsum.photos/seed/m20/400/400', sku: 'EM-M-020' },

  // Women's Wear (21 items)
  { id: 'w1', name: 'Evening Silk Gown', price: 3200, category: 'Women', image: 'https://picsum.photos/seed/w1/400/400', sku: 'EM-W-001' },
  { id: 'w2', name: 'Cashmere Wrap Cardigan', price: 680, category: 'Women', image: 'https://picsum.photos/seed/w2/400/400', sku: 'EM-W-002' },
  { id: 'w3', name: 'Tweed Mini Skirt', price: 450, category: 'Women', image: 'https://picsum.photos/seed/w3/400/400', sku: 'EM-W-003' },
  { id: 'w4', name: 'Satin Slip Dress', price: 590, category: 'Women', image: 'https://picsum.photos/seed/w4/400/400', sku: 'EM-W-004' },
  { id: 'w5', name: 'Embellished Tulle Top', price: 820, category: 'Women', image: 'https://picsum.photos/seed/w5/400/400', sku: 'EM-W-005' },
  { id: 'w6', name: 'Leather Pencil Skirt', price: 950, category: 'Women', image: 'https://picsum.photos/seed/w6/400/400', sku: 'EM-W-006' },
  { id: 'w7', name: 'Shearling Trim Jacket', price: 2400, category: 'Women', image: 'https://picsum.photos/seed/w7/400/400', sku: 'EM-W-007' },
  { id: 'w8', name: 'High-Waist Silk Trousers', price: 780, category: 'Women', image: 'https://picsum.photos/seed/w8/400/400', sku: 'EM-W-008' },
  { id: 'w9', name: 'Pointed Toe Stilettos', price: 890, category: 'Women', image: 'https://picsum.photos/seed/w9/400/400', sku: 'EM-W-009' },
  { id: 'w10', name: 'Velvet Bodysuit', price: 340, category: 'Women', image: 'https://picsum.photos/seed/w10/400/400', sku: 'EM-W-010' },
  { id: 'w11', name: 'Chiffon Ruffle Blouse', price: 420, category: 'Women', image: 'https://picsum.photos/seed/w11/400/400', sku: 'EM-W-011' },
  { id: 'w12', name: 'Angora Wool Beret', price: 180, category: 'Women', image: 'https://picsum.photos/seed/w12/400/400', sku: 'EM-W-012' },
  { id: 'w13', name: 'Oversized Trench Coat', price: 1450, category: 'Women', image: 'https://picsum.photos/seed/w13/400/400', sku: 'EM-W-013' },
  { id: 'w14', name: 'Pearl Accent Clutch', price: 650, category: 'Women', image: 'https://picsum.photos/seed/w14/400/400', sku: 'EM-W-014' },
  { id: 'w15', name: 'Jacquard Floral Dress', price: 1100, category: 'Women', image: 'https://picsum.photos/seed/w15/400/400', sku: 'EM-W-015' },
  { id: 'w16', name: 'Lace Trim Cami', price: 280, category: 'Women', image: 'https://picsum.photos/seed/w16/400/400', sku: 'EM-W-016' },
  { id: 'w17', name: 'Belted Safari Shirt', price: 390, category: 'Women', image: 'https://picsum.photos/seed/w17/400/400', sku: 'EM-W-017' },
  { id: 'w18', name: 'Merino Wrap Scarf', price: 210, category: 'Women', image: 'https://picsum.photos/seed/w18/400/400', sku: 'EM-W-018' },
  { id: 'w19', name: 'Gold Button Blazer', price: 1250, category: 'Women', image: 'https://picsum.photos/seed/w19/400/400', sku: 'EM-W-019' },
  { id: 'w20', name: 'Knit Ribbed Midi Dress', price: 540, category: 'Women', image: 'https://picsum.photos/seed/w20/400/400', sku: 'EM-W-020' },
  { id: 'w21', name: 'Wide Leg Palazzo Pants', price: 620, category: 'Women', image: 'https://picsum.photos/seed/w21/400/400', sku: 'EM-W-021' },
];

export const DEFAULT_SETTINGS: StoreSettings = {
  storeName: 'Emrys Luxury',
  address: '12 Savile Row, Mayfair, London W1S 3PQ',
  phone: '+44 20 7123 4567',
  taxRate: 20, // 20% VAT
  currency: '£',
};
