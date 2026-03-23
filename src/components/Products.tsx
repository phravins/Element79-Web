import { Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';

export default function Products({ onSelectProduct }: { onSelectProduct: (product: Product) => void }) {
  return (
    <div className="space-y-10">
      <section className="mb-10">
        <h1 className="font-headline font-bold text-4xl text-primary tracking-tight mb-2">Upcycled Products</h1>
        <p className="text-on-surface-variant text-[13px] font-body max-w-md">
          Transforming industrial waste into refined luxury collectibles and artisan goods.
        </p>
      </section>

      <section className="mb-8 bg-surface-container-low p-4 rounded-xl flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button className="bg-primary-container text-primary px-4 py-2 rounded-lg text-[13px] font-medium whitespace-nowrap">All Items</button>
          <button className="bg-surface-container-highest text-on-surface-variant px-4 py-2 rounded-lg text-[13px] font-medium whitespace-nowrap hover:text-on-surface transition-colors">Jewellery</button>
          <button className="bg-surface-container-highest text-on-surface-variant px-4 py-2 rounded-lg text-[13px] font-medium whitespace-nowrap hover:text-on-surface transition-colors">Mosaic Art</button>
          <button className="bg-surface-container-highest text-on-surface-variant px-4 py-2 rounded-lg text-[13px] font-medium whitespace-nowrap hover:text-on-surface transition-colors">Corporate</button>
        </div>
        <div className="flex items-center gap-4 ml-auto">
          <div className="flex items-center gap-2 text-on-surface-variant text-[13px] bg-surface-container-highest px-3 py-2 rounded-lg cursor-pointer">
            <span className="material-symbols-outlined text-sm">sort</span>
            <span>Sort by Price</span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {MOCK_PRODUCTS.map((product) => (
          <div 
            key={product.id} 
            className="flex flex-col gap-4 group cursor-pointer"
            onClick={() => onSelectProduct(product)}
          >
            <div className="aspect-square bg-surface-container-high rounded-2xl overflow-hidden relative border border-outline-variant/5">
              <img 
                alt={product.name} 
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" 
                src={product.image}
                referrerPolicy="no-referrer"
              />
              {product.isUnique && (
                <div className="absolute top-3 right-3 bg-primary/20 backdrop-blur-md text-primary text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">
                  Unique
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-primary font-bold text-xs uppercase tracking-widest">View Details</span>
              </div>
            </div>
            <div className="px-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-headline font-bold text-[15px] text-on-surface">{product.name}</h3>
                <span className="font-headline font-bold text-primary text-[15px]">${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant text-[11px] font-medium uppercase tracking-wider">{product.category}</span>
                <span className="text-on-surface-variant text-[13px] font-body">Stock: {product.stock}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
