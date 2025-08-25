# Hướng Dẫn Test Tài Khoản

## Tài Khoản Test Có Sẵn

### 1. Tài Khoản Hoạt Động Bình Thường
- **Email**: `admin@example.com`
- **Mật khẩu**: `admin123`
- **Trạng thái**: `active`
- **Kết quả**: Đăng nhập thành công

- **Email**: `cuong@gmail.com`
- **Mật khẩu**: `123456`
- **Trạng thái**: `active`
- **Kết quả**: Đăng nhập thành công

### 2. Tài Khoản Không Khả Dụng
- **Email**: `inactive@test.com`
- **Mật khẩu**: `123456`
- **Trạng thái**: `inactive`
- **Kết quả**: Hiển thị modal "Tài khoản không khả dụng. Vui lòng liên hệ admin để được hỗ trợ."

### 3. Tài Khoản Bị Cấm
- **Email**: `banned@test.com`
- **Mật khẩu**: `123456`
- **Trạng thái**: `banned`
- **Kết quả**: Hiển thị modal "Tài khoản không khả dụng. Vui lòng liên hệ admin để được hỗ trợ."

### 4. Tài Khoản Không Tồn Tại
- **Email**: `nonexistent@test.com`
- **Mật khẩu**: `123456`
- **Kết quả**: Hiển thị modal "Tài khoản không tồn tại. Vui lòng kiểm tra lại email hoặc đăng ký tài khoản mới."

### 5. Sai Mật Khẩu
- **Email**: `admin@example.com`
- **Mật khẩu**: `wrongpassword`
- **Kết quả**: Hiển thị toast "Mật khẩu không chính xác. Vui lòng thử lại."

## Các Trường Hợp Test

### Test Case 1: Đăng Nhập Thành Công
1. Vào trang `/login`
2. Nhập email: `admin@example.com`
3. Nhập mật khẩu: `admin123`
4. Click "Đăng nhập"
5. **Kết quả mong đợi**: Toast thành công, chuyển về trang chủ

### Test Case 2: Tài Khoản Không Tồn Tại
1. Vào trang `/login`
2. Nhập email: `nonexistent@test.com`
3. Nhập mật khẩu: `123456`
4. Click "Đăng nhập"
5. **Kết quả mong đợi**: 
   - Modal hiển thị với tiêu đề "Tài khoản không tồn tại"
   - Có nút "Thử lại", "Đăng ký tài khoản mới", "Về trang chủ"

### Test Case 3: Tài Khoản Không Khả Dụng
1. Vào trang `/login`
2. Nhập email: `inactive@test.com`
3. Nhập mật khẩu: `123456`
4. Click "Đăng nhập"
5. **Kết quả mong đợi**:
   - Modal hiển thị với tiêu đề "Tài khoản không khả dụng"
   - Có nút "Thử lại", "Về trang chủ" (không có nút đăng ký)

### Test Case 4: Tài Khoản Bị Cấm
1. Vào trang `/login`
2. Nhập email: `banned@test.com`
3. Nhập mật khẩu: `123456`
4. Click "Đăng nhập"
5. **Kết quả mong đợi**: Tương tự Test Case 3

### Test Case 5: Sai Mật Khẩu
1. Vào trang `/login`
2. Nhập email: `admin@example.com`
3. Nhập mật khẩu: `wrongpassword`
4. Click "Đăng nhập"
5. **Kết quả mong đợi**: Toast lỗi hiển thị "Mật khẩu không chính xác"

## Giao Diện Modal

### Modal cho Tài Khoản Không Tồn Tại:
- **Icon**: Cảnh báo màu đỏ
- **Tiêu đề**: "Tài khoản không tồn tại"
- **Nội dung**: Thông báo lỗi cụ thể
- **Nút hành động**:
  - "Thử lại" (màu xanh dương)
  - "Đăng ký tài khoản mới" (màu xanh lá)
  - "Về trang chủ" (màu xám)

### Modal cho Tài Khoản Không Khả Dụng:
- **Icon**: Cảnh báo màu đỏ
- **Tiêu đề**: "Tài khoản không khả dụng"
- **Nội dung**: Thông báo lỗi cụ thể
- **Nút hành động**:
  - "Thử lại" (màu xanh dương)
  - "Về trang chủ" (màu xám)

## Lưu Ý Kỹ Thuật

- Các trạng thái tài khoản được lưu trong trường `status` của `db.json`
- Giá trị hợp lệ: `active`, `inactive`, `banned`
- Tài khoản mới tạo sẽ có `status: "active"` mặc định
- Modal sử dụng Tailwind CSS với overlay backdrop
- Toast chỉ được sử dụng cho lỗi mật khẩu và thông báo thành công 