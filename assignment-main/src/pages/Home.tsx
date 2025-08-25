import React, { useState, useEffect, useCallback } from 'react';
import HeroSlider from '../components/HeroSlider';
import NavigationBar from '../components/NavigationBar';
import ProductGrid from '../components/ProductGrid';
import Toast, { ToastType } from '../components/Toast';

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

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState('name-asc');
  const [toasts, setToasts] = useState<Array<{ id: number; message: string; type: ToastType }>>([]);
  const [toastId, setToastId] = useState(0);

  // Load products from JSON file
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/products.json');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    loadProducts();
  }, []);

  // Show toast function
  const showToast = useCallback((message: string, type: ToastType) => {
    const id = toastId;
    setToastId(prev => prev + 1);
    
    setToasts(prev => [...prev, { id, message, type }]);
    
    // Auto remove toast after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  }, [toastId]);

  // Remove toast
  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Navigation Bar */}
      <NavigationBar
        onSearchChange={setSearchQuery}
        onSortChange={setSortType}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Xe máy chất lượng cao
          </h1>
          <p className="text-gray-600">
            Khám phá bộ sưu tập xe máy đa dạng với giá cả hợp lý
          </p>
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={products}
          searchQuery={searchQuery}
          sortType={sortType}
          showToast={showToast}
        />
      </main>

      {/* Toast Notifications */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default Home; 