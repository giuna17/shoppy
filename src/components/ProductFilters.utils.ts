export interface FilterValues {
  priceRange: [number, number];
  categories: string[];
  materials: string[];
  colors: string[];
  inStock: boolean;
}

export const materialOptions = ['Metal', 'Silver', 'Gold', 'Fabric', 'Glass', 'Plastic'];
export const colorOptions = ['Silver', 'Gold', 'Black', 'White', 'Red', 'Green', 'Blue', 'Purple', 'Pink']; 