import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
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

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<ToastType>('success');

  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetch('/products.json');
        const products = await response.json();
        const foundProduct = products.find((p: Product) => p.id === parseInt(id!));
        
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          // Product not found, redirect to home
          navigate('/');
        }
      } catch (error) {
        console.error('Error loading product:', error);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id, navigate]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setToastMessage('Đã thêm vào giỏ hàng!');
      setToastType('success');
      setShowToast(true);
    }
  };

  const handleWishlistAction = () => {
    if (!isAuthenticated) {
      setToastMessage('Vui lòng đăng nhập để lưu danh sách yêu thích');
      setToastType('info');
      setShowToast(true);
      setTimeout(() => {
        navigate(`/login?redirect_uri=/product/${id}`);
      }, 2000);
      return;
    }

    if (product) {
      if (isInWishlist(product.id)) {
        navigate('/wishlist');
      } else {
        addToWishlist(product);
        setToastMessage('Đã thêm vào danh sách yêu thích!');
        setToastType('success');
        setShowToast(true);
      }
    }
  };

  const closeToast = () => {
    setShowToast(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải thông tin sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="p-8">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
                
                {/* Hot Badge */}
                {product.tags.includes('hot') && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-sm px-3 py-1 rounded-full font-semibold">
                    HOT
                  </div>
                )}
                
                {/* Sale Badge */}
                {product.tags.includes('sale') && product.salePrice && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white text-sm px-3 py-1 rounded-full font-semibold">
                    SALE
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {product.title}
              </h1>
              
              <p className="text-lg text-gray-600 mb-6">
                {product.name}
              </p>

              {/* Price */}
              <div className="mb-6">
                {product.salePrice ? (
                  <div className="space-y-2">
                    <span className="text-3xl font-bold text-green-600">
                      {formatPrice(product.salePrice)}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xl text-gray-500 line-through">
                        {formatPrice(product.price)}
                      </span>
                      <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded-full font-medium">
                        Giảm {Math.round(((product.price - product.salePrice) / product.price) * 100)}%
                      </span>
                    </div>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-gray-800">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Mô tả sản phẩm
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Tags */}
              {product.tags.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Tính năng
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          tag === 'hot' 
                            ? 'bg-red-100 text-red-800'
                            : tag === 'sale'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {tag === 'hot' ? 'Nổi bật' : tag === 'sale' ? 'Khuyến mãi' : tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-200 text-lg font-medium"
                >
                  Thêm vào giỏ hàng
                </button>
                
                <button
                  onClick={handleWishlistAction}
                  className={`w-full py-3 px-6 rounded-md transition-colors duration-200 text-lg font-medium ${
                    isInWishlist(product.id)
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {isInWishlist(product.id) ? 'Xem danh sách yêu thích' : 'Thêm vào danh sách yêu thích'}
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Bảo hành:</span>
                    <p>12 tháng chính hãng</p>
                  </div>
                  <div>
                    <span className="font-medium">Vận chuyển:</span>
                    <p>Miễn phí toàn quốc</p>
                  </div>
                  <div>
                    <span className="font-medium">Thanh toán:</span>
                    <p>Tiền mặt, chuyển khoản</p>
                  </div>
                  <div>
                    <span className="font-medium">Hỗ trợ:</span>
                    <p>24/7 qua hotline</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={closeToast}
        />
      )}
    </div>
  );
};

export default ProductDetail; 