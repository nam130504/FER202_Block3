import React from 'react';

const ClearStorageButton: React.FC = () => {
  const clearStorage = () => {
    localStorage.clear();
    alert('Đã xóa tất cả dữ liệu localStorage! Hãy reload trang.');
    window.location.reload();
  };

  const showStorage = () => {
    const items: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key);
        items.push(`${key}: ${value}`);
      }
    }
    
    if (items.length === 0) {
      alert('localStorage trống');
    } else {
      alert('localStorage hiện tại:\n' + items.join('\n\n'));
    }
  };

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      <button
        onClick={showStorage}
        className="block px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
      >
        Show Storage
      </button>
      <button
        onClick={clearStorage}
        className="block px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
      >
        Clear Storage
      </button>
    </div>
  );
};

export default ClearStorageButton; 