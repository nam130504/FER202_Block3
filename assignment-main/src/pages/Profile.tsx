import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import Toast from '../components/Toast';

interface ProfileData {
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  secretQuestion: string;
  answer: string;
}

interface Order {
  id: string;
  userId: string;
  date: string;
  items: any[];
  total: number;
  status: string;
  shippingInfo?: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    district: string;
    ward: string;
    note?: string;
  };
}

const Profile: React.FC = () => {
  const { user, updateUserWishlist } = useAuth();
  const { items: wishlistItems } = useWishlist();
  const { items: cartItems, count: cartCount, subtotal } = useCart();
  
  const [profileData, setProfileData] = useState<ProfileData>({
    username: '',
    email: '',
    fullName: '',
    avatar: '',
    secretQuestion: '',
    answer: ''
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('info');
  
  // Password change form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Orders data from json-server
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    if (user) {
      // Load user profile data and orders
      const loadUserData = async () => {
        try {
          // Load profile data
          const accountsResponse = await fetch('http://localhost:3001/accounts');
          if (accountsResponse.ok) {
            const accounts = await accountsResponse.json();
            const userAccount = accounts.find((acc: any) => acc.id === user.id);
            if (userAccount) {
              setProfileData({
                username: userAccount.username || '',
                email: userAccount.email || '',
                fullName: userAccount.fullName || '',
                avatar: userAccount.avatar || '',
                secretQuestion: userAccount.secretQuestion || '',
                answer: userAccount.answer || ''
              });
            }
          }

          // Load user's orders
          setLoadingOrders(true);
          const ordersResponse = await fetch(`http://localhost:3001/orders?userId=${user.id}`);
          if (ordersResponse.ok) {
            const userOrders = await ordersResponse.json();
            // Sort orders by date (newest first)
            const sortedOrders = userOrders.sort((a: Order, b: Order) => 
              new Date(b.date).getTime() - new Date(a.date).getTime()
            );
            setOrders(sortedOrders);
            console.log(`Loaded ${sortedOrders.length} orders for user ${user.id}`);
          }
          setLoadingOrders(false);
        } catch (error) {
          console.error('Error loading user data:', error);
          setLoadingOrders(false);
        }
      };
      
      loadUserData();
    } else {
      // Clear data when user logs out
      setProfileData({
        username: '',
        email: '',
        fullName: '',
        avatar: '',
        secretQuestion: '',
        answer: ''
      });
      setOrders([]);
    }
  }, [user]);

  const handleProfileUpdate = async () => {
    try {
      if (!user) return;
      
      const response = await fetch(`http://localhost:3001/accounts/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...profileData,
          id: user.id
        }),
      });

      if (response.ok) {
        setShowToast(true);
        setToastMessage('Cập nhật thông tin thành công!');
        setToastType('success');
        setIsEditing(false);
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      setShowToast(true);
      setToastMessage('Có lỗi xảy ra khi cập nhật thông tin!');
      setToastType('error');
    }
  };

  const handlePasswordChange = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setShowToast(true);
      setToastMessage('Mật khẩu xác nhận không khớp!');
      setToastType('error');
      return;
    }

    try {
      if (!user) return;
      
      const response = await fetch(`http://localhost:3001/accounts/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: passwordForm.newPassword
        }),
      });

      if (response.ok) {
        setShowToast(true);
        setToastMessage('Đổi mật khẩu thành công!');
        setToastType('success');
        setIsChangingPassword(false);
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        throw new Error('Failed to change password');
      }
    } catch (error) {
      setShowToast(true);
      setToastMessage('Có lỗi xảy ra khi đổi mật khẩu!');
      setToastType('error');
    }
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfileData(prev => ({ ...prev, avatar: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Vui lòng đăng nhập</h1>
          <p className="text-gray-600">Bạn cần đăng nhập để xem trang cá nhân</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Trang Cá Nhân</h1>
            <p className="text-gray-600">Quản lý thông tin cá nhân và tài khoản</p>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'profile', name: 'Thông Tin Cá Nhân' },
                { id: 'orders', name: 'Lịch Sử Đơn Hàng' },
                { id: 'wishlist', name: 'Danh Sách Yêu Thích' },
                { id: 'security', name: 'Bảo Mật' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <img
                      src={profileData.avatar || 'https://via.placeholder.com/100x100?text=Avatar'}
                      alt="Avatar"
                      className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                    />
                    {isEditing && (
                      <label className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer hover:bg-blue-600">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="hidden"
                        />
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </label>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900">{profileData.fullName}</h2>
                    <p className="text-gray-600">{profileData.email}</p>
                    <p className="text-gray-500">ID: {user.id}</p>
                  </div>
                  
                  <div className="flex space-x-3">
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      >
                        Chỉnh Sửa
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={handleProfileUpdate}
                          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        >
                          Lưu
                        </button>
                        <button
                          onClick={() => setIsEditing(false)}
                          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                        >
                          Hủy
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tên đăng nhập
                    </label>
                    <input
                      type="text"
                      value={profileData.username}
                      onChange={(e) => setProfileData(prev => ({ ...prev, username: e.target.value }))}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      value={profileData.fullName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Câu hỏi bảo mật
                    </label>
                    <input
                      type="text"
                      value={profileData.secretQuestion}
                      onChange={(e) => setProfileData(prev => ({ ...prev, secretQuestion: e.target.value }))}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Câu trả lời
                    </label>
                    <input
                      type="text"
                      value={profileData.answer}
                      onChange={(e) => setProfileData(prev => ({ ...prev, answer: e.target.value }))}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Lịch Sử Đơn Hàng</h3>
                {loadingOrders ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-600">Đang tải đơn hàng...</span>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-8">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Chưa có đơn hàng</h3>
                    <p className="mt-1 text-sm text-gray-500">Bạn chưa có đơn hàng nào được đặt.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium text-gray-900">Đơn hàng #{order.id}</h4>
                            <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString('vi-VN')}</p>
                            {order.shippingInfo && (
                              <p className="text-sm text-gray-600 mt-1">
                                Giao đến: {order.shippingInfo.fullName} - {order.shippingInfo.phone}
                              </p>
                            )}
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            order.status === 'Đã giao hàng' || order.status === 'completed'
                              ? 'bg-green-100 text-green-800' 
                              : order.status === 'Đang xử lý' || order.status === 'processing'
                              ? 'bg-yellow-100 text-yellow-800'
                              : order.status === 'pending'
                              ? 'bg-gray-100 text-gray-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {order.status === 'completed' ? 'Đã giao hàng' : 
                             order.status === 'processing' ? 'Đang xử lý' :
                             order.status === 'pending' ? 'Chờ xử lý' : order.status}
                          </span>
                        </div>
                        
                        <div className="space-y-3">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <img
                                src={item.image || 'https://via.placeholder.com/60x40?text=No+Image'}
                                alt={item.name}
                                className="w-15 h-10 object-cover rounded"
                              />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                <p className="text-xs text-gray-500">Số lượng: {item.quantity}</p>
                              </div>
                              <span className="text-sm text-gray-600 font-medium">
                                {item.price.toLocaleString('vi-VN')}đ
                              </span>
                            </div>
                          ))}
                        </div>
                        
                        {order.shippingInfo && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-md">
                            <h5 className="font-medium text-gray-800 mb-2">Thông tin giao hàng:</h5>
                            <p className="text-sm text-gray-600">
                              <strong>Người nhận:</strong> {order.shippingInfo.fullName}
                            </p>
                            <p className="text-sm text-gray-600">
                              <strong>Số điện thoại:</strong> {order.shippingInfo.phone}
                            </p>
                            <p className="text-sm text-gray-600">
                              <strong>Địa chỉ:</strong> {order.shippingInfo.address}, {order.shippingInfo.ward}, {order.shippingInfo.district}, {order.shippingInfo.city}
                            </p>
                            {order.shippingInfo.note && (
                              <p className="text-sm text-gray-600">
                                <strong>Ghi chú:</strong> {order.shippingInfo.note}
                              </p>
                            )}
                          </div>
                        )}
                        
                        <div className="border-t border-gray-200 pt-3 mt-3">
                          <div className="flex justify-between font-medium">
                            <span>Tổng cộng:</span>
                            <span>{order.total.toLocaleString('vi-VN')}đ</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Danh Sách Yêu Thích</h3>
                {wishlistItems.length === 0 ? (
                  <p className="text-gray-500">Bạn chưa có sản phẩm nào trong danh sách yêu thích</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlistItems.map((item) => (
                      <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <h4 className="font-medium text-gray-900 mb-2">{item.name}</h4>
                        <p className="text-gray-600 mb-2">{item.title}</p>
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-blue-600">
                            {item.salePrice ? item.salePrice.toLocaleString('vi-VN') : item.price.toLocaleString('vi-VN')}đ
                          </span>
                          {item.salePrice && (
                            <span className="text-sm text-gray-500 line-through">
                              {item.price.toLocaleString('vi-VN')}đ
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Bảo Mật Tài Khoản</h3>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Đổi Mật Khẩu</h4>
                  
                  {!isChangingPassword ? (
                    <button
                      onClick={() => setIsChangingPassword(true)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Đổi Mật Khẩu
                    </button>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mật khẩu hiện tại
                        </label>
                        <input
                          type="password"
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mật khẩu mới
                        </label>
                        <input
                          type="password"
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Xác nhận mật khẩu mới
                        </label>
                        <input
                          type="password"
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      
                      <div className="flex space-x-3">
                        <button
                          onClick={handlePasswordChange}
                          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        >
                          Lưu Mật Khẩu
                        </button>
                        <button
                          onClick={() => setIsChangingPassword(false)}
                          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                        >
                          Hủy
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default Profile; 