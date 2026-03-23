export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sku: string;
  description: string;
  image: string;
  isUnique?: boolean;
}

export interface Batch {
  id: string;
  name: string;
  method: string;
  inputCount: number;
  estYield: number;
  progress: number;
  startedAt: string;
  status: 'processing' | 'complete';
}

export interface CollectionLog {
  id: string;
  sourceName: string;
  sourceType: string;
  quantity: number;
  date: string;
}

export type Screen = 'home' | 'collection' | 'processing' | 'products' | 'profile';
