import React from 'react';
import { Link } from 'react-router-dom';

interface AccountStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  isAccountNotFound?: boolean;
}

const AccountStatusModal: React.FC<AccountStatusModalProps> = ({
  isOpen,
  onClose,
  message,
  isAccountNotFound = false
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          
          <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4">
            {isAccountNotFound ? 'Tài khoản không tồn tại' : 'Tài khoản không khả dụng'}
          </h3>
          
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">{message}</p>
          </div>
          
          <div className="items-center px-4 py-3">
            <div className="space-y-2">
              <button
                onClick={onClose}
                className="w-full px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Thử lại
              </button>
              
              {isAccountNotFound && (
                <Link
                  to="/register"
                  className="w-full inline-block px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 text-center"
                  onClick={onClose}
                >
                  Đăng ký tài khoản mới
                </Link>
              )}
              
              <Link
                to="/"
                className="w-full inline-block px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 text-center"
                onClick={onClose}
              >
                Về trang chủ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountStatusModal; 