
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAdd: () => void;
  quantityInCart: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd, quantityInCart }) => {
  return (
    <div className="group glass rounded-2xl overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#8b5e3c]/20">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold">
          {product.category}
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-white/90">{product.name}</h3>
          <p className="text-sm text-white/60 line-clamp-2 mt-1">{product.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-serif text-[#d4a373]">₹{product.price}</span>
          <button 
            onClick={onAdd}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
              quantityInCart > 0 
              ? 'bg-[#8b5e3c] text-white shadow-lg' 
              : 'border border-white/20 hover:bg-white/10'
            }`}
          >
            <i className="fa-solid fa-plus text-sm"></i>
            <span className="font-semibold text-sm">
              {quantityInCart > 0 ? `Added (${quantityInCart})` : 'Add to Cart'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
