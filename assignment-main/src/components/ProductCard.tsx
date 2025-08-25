import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

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

interface ProductCardProps {
  product: Product;
  showToast: (message: string, type: 'success' | 'info') => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showToast }) => {
  const { user, isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product);
    showToast('Đã thêm vào giỏ hàng!', 'success');
  };

  const handleWishlistAction = () => {
    if (!isAuthenticated) {
      showToast('Vui lòng đăng nhập để lưu danh sách yêu thích', 'info');
      navigate(`/login?redirect_uri=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    if (isInWishlist(product.id)) {
      navigate('/wishlist');
    } else {
      addToWishlist(product);
      showToast('Đã thêm vào danh sách yêu thích!', 'success');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        
        {/* Hot Badge */}
        {product.tags.includes('hot') && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
            HOT
          </div>
        )}
        
        {/* Sale Badge */}
        {product.tags.includes('sale') && product.salePrice && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
            SALE
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.name}
        </p>

        {/* Price */}
        <div className="mb-4">
          {product.salePrice ? (
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-green-600">
                {formatPrice(product.salePrice)}
              </span>
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold text-gray-800">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
          >
            Thêm vào giỏ
          </button>
          
          <button
            onClick={handleWishlistAction}
            className={`px-4 py-2 rounded-md transition-colors duration-200 text-sm font-medium ${
              isInWishlist(product.id)
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {isInWishlist(product.id) ? 'Xem Wishlist' : '♥'}
          </button>
        </div>

        {/* View Details */}
        <Link
          to={`/product/${product.id}`}
          className="block text-center text-blue-600 hover:text-blue-800 mt-3 text-sm font-medium"
        >
          Xem chi tiết →
        </Link>
      </div>
    </div>
  );
};

export default ProductCard; 