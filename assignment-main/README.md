# Ứng Dụng Bán Xe Máy React by YoungLTC

## Tính Năng Chính

### 1. Trang Cá Nhân (Profile)
- **Đường dẫn**: `/profile`
- **Yêu cầu**: Đăng nhập (Protected Route)

#### Các Tab Chính:

##### Tab Thông Tin Cá Nhân
- Hiển thị avatar, thông tin cá nhân
- Chỉnh sửa: username, email, họ tên, câu hỏi bảo mật
- Thay đổi avatar (upload ảnh)
- Nút "Chỉnh Sửa" để bật/tắt chế độ edit

##### Tab Lịch Sử Đơn Hàng
- Hiển thị danh sách đơn hàng đã đặt
- Thông tin: mã đơn hàng, ngày đặt, sản phẩm, tổng tiền, trạng thái
- Trạng thái: "Đã giao hàng", "Đang xử lý"

##### Tab Danh Sách Yêu Thích
- Hiển thị các sản phẩm đã thêm vào wishlist
- Thông tin: hình ảnh, tên, giá, giá khuyến mãi (nếu có)

##### Tab Bảo Mật
- Đổi mật khẩu
- Form nhập: mật khẩu hiện tại, mật khẩu mới, xác nhận mật khẩu
- Validation: mật khẩu xác nhận phải khớp

#### Cách Sử Dụng:

1. **Đăng nhập** vào tài khoản
2. Click vào **tên người dùng** ở header
3. Chọn **"Trang cá nhân"** từ dropdown menu
4. Sử dụng các tab để xem và chỉnh sửa thông tin

#### Tính Năng Bảo Mật:
- Chỉ người dùng đã đăng nhập mới có thể truy cập
- Tự động redirect về trang login nếu chưa đăng nhập
- Thông tin được lưu vào json-server (localhost:3001)

### 2. Các Trang Khác

#### Trang Chủ (`/`)
- Hero slider với sản phẩm nổi bật
- Danh sách sản phẩm mới nhất

#### Sản Phẩm (`/products`)
- Hiển thị tất cả sản phẩm
- Tìm kiếm và sắp xếp
- Thêm vào giỏ hàng/wishlist

#### Chi Tiết Sản Phẩm (`/product/:id`)
- Thông tin chi tiết sản phẩm
- Hình ảnh, giá, mô tả
- Nút thêm vào giỏ hàng/wishlist

#### Giỏ Hàng (`/cart`)
- Xem sản phẩm đã thêm
- Thay đổi số lượng, xóa sản phẩm
- Tính tổng tiền

#### Yêu Thích (`/wishlist`)
- Danh sách sản phẩm yêu thích
- Chuyển sản phẩm vào giỏ hàng

#### Đặt Hàng (`/checkout`)
- Form thông tin giao hàng
- Xác nhận đơn hàng

#### Đăng Nhập (`/login`)
- Form đăng nhập
- Redirect sau khi đăng nhập thành công

#### Đăng Ký (`/register`)
- Form đăng ký 2 bước
- Validation thông tin

#### Giới Thiệu (`/about`)
- Thông tin về công ty
- Đội ngũ nhân viên

#### Liên Hệ (`/contact`)
- Form liên hệ
- Thông tin liên lạc

## Cài Đặt và Chạy

### Yêu Cầu Hệ Thống
- Node.js 18+
- npm hoặc yarn

### Cài Đặt
```bash
cd my-react-app
npm install
```

### Chạy Dự Án
```bash
# Terminal 1: Chạy React app
npm start

# Terminal 2: Chạy json-server
npm run server
```

### Truy Cập
- React App: http://localhost:3000
- JSON Server: http://localhost:3001

## Cấu Trúc Dự Án

```
src/
├── components/          # Components tái sử dụng
├── contexts/           # Context API cho state management
├── pages/             # Các trang của ứng dụng
├── types/             # TypeScript type definitions
└── App.tsx            # Component chính với routing
```

## Công Nghệ Sử Dụng

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: Context API + useReducer
- **Mock API**: json-server
- **Build Tool**: Create React App

## Lưu Ý

- Đảm bảo json-server đang chạy trước khi sử dụng các tính năng cần database
- Xóa localStorage cũ nếu gặp vấn đề với dữ liệu
- Tài khoản admin mặc định: admin@example.com / admin123
