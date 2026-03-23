import { motion } from 'motion/react';
import { Product } from '../types';

export default function ProductDetail({ product, onClose }: { product: Product, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="bg-surface-container-low rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border-t border-outline-variant/10 p-8 pb-32 w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={onClose}
            className="p-2 -ml-2 hover:bg-surface-container-highest rounded-full transition-colors flex items-center justify-center text-on-surface"
            aria-label="Go back"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="w-12 h-1 bg-surface-container-highest rounded-full flex-1 cursor-pointer" onClick={onClose}></div>
          <div className="w-8"></div> {/* Spacer for symmetry */}
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <div>
            <span className="text-on-surface-variant text-[11px] font-medium uppercase tracking-[0.2em] mb-1 block">Detail View</span>
            <h2 className="font-headline font-bold text-2xl text-on-surface">{product.name}</h2>
          </div>
          <div className="text-right">
            <span className="font-headline font-bold text-2xl text-primary">${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-surface-container-highest p-4 rounded-xl">
            <span className="text-on-surface-variant text-[10px] uppercase block mb-1">SKU</span>
            <span className="text-on-surface font-mono text-[13px]">{product.sku}</span>
          </div>
          <div className="bg-surface-container-highest p-4 rounded-xl">
            <span className="text-on-surface-variant text-[10px] uppercase block mb-1">Availability</span>
            <span className="text-on-surface font-body text-[13px]">{product.stock} Pieces in Vault</span>
          </div>
        </div>

        <p className="text-on-surface-variant text-[13px] font-body leading-relaxed mb-8">
          {product.description}
        </p>

        <button className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold text-[15px] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity active:scale-95">
          <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
          Add to order
        </button>
      </motion.div>
    </div>
  );
}
