import React, { useMemo } from 'react';
import ProductCard from './ProductCard';
import { ToastType } from './Toast';

interface Product {
  id: number;
  title: string;
  name: string;
  image: string;
  price: number;
  salePrice?: number;
  tags: string[];
  description: string;
}

interface ProductGridProps {
  products: Product[];
  searchQuery: string;
  sortType: string;
  showToast: (message: string, type: ToastType) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  searchQuery, 
  sortType, 
  showToast 
}) => {
  // Use useMemo for filtering and sorting products
  const visibleProducts = useMemo(() => {
    let filtered = products;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products
    switch (sortType) {
      case 'name-asc':
        filtered = [...filtered].sort((a, b) => 
          a.title.localeCompare(b.title)
        );
        break;
      case 'price-asc':
        filtered = [...filtered].sort((a, b) => 
          (a.salePrice || a.price) - (b.salePrice || b.price)
        );
        break;
      case 'price-desc':
        filtered = [...filtered].sort((a, b) => 
          (b.salePrice || b.price) - (a.salePrice || a.price)
        );
        break;
      default:
        break;
    }

    return filtered;
  }, [products, searchQuery, sortType]);

  if (visibleProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-4">
          {searchQuery.trim() 
            ? `Không tìm thấy sản phẩm nào phù hợp với "${searchQuery}"`
            : 'Không có sản phẩm nào'
          }
        </div>
        <div className="text-gray-400">
          Vui lòng thử tìm kiếm với từ khóa khác
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {visibleProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          showToast={showToast}
        />
      ))}
    </div>
  );
};

export default ProductGrid; 