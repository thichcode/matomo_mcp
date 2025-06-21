# Matomo MCP Server

MCP (Model Context Protocol) server để quản trị Matomo Analytics. Server này cung cấp các công cụ để tương tác với Matomo API thông qua giao diện MCP.

## Tính năng

### Quản lý Sites
- Lấy danh sách tất cả sites
- Lấy thông tin chi tiết của một site
- Thêm site mới
- Cập nhật thông tin site
- Xóa site

### Quản lý Users
- Lấy danh sách tất cả users
- Lấy thông tin chi tiết của một user
- Thêm user mới
- Cập nhật thông tin user
- Xóa user
- Thiết lập quyền truy cập cho user

### Quản lý Goals
- Lấy danh sách goals của site
- Thêm goal mới
- Cập nhật goal
- Xóa goal

### Quản lý Segments
- Lấy danh sách segments
- Thêm segment mới
- Cập nhật segment
- Xóa segment

### Báo cáo Analytics
- Tổng quan lượt truy cập
- Top pages được truy cập nhiều nhất
- Top keywords
- Top referrers
- Visitor log

### Quản lý Hệ thống
- Thông tin hệ thống
- Quản lý plugins
- Kích hoạt/vô hiệu hóa plugins

## Cài đặt

1. Clone repository:
```bash
git clone <repository-url>
cd matomo-mcp
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Build project:
```bash
npm run build
```

## Cấu hình

Tạo file `.env` trong thư mục gốc:

```env
MATOMO_BASE_URL=https://your-matomo-instance.com
MATOMO_TOKEN_AUTH=your-api-token
```

## Sử dụng

### Chạy server:
```bash
npm start
```

### Chạy trong chế độ development:
```bash
npm run dev
```

## Các Tools có sẵn

### 1. matomo_connect
Kết nối đến Matomo instance.

**Tham số:**
- `baseUrl`: URL của Matomo instance
- `tokenAuth`: Token xác thực API

### 2. matomo_get_sites
Lấy danh sách tất cả sites.

### 3. matomo_get_site
Lấy thông tin chi tiết của một site.

**Tham số:**
- `siteId`: ID của site

### 4. matomo_add_site
Thêm site mới.

**Tham số:**
- `name`: Tên site
- `urls`: Danh sách URLs
- `timezone`: Múi giờ (tùy chọn, mặc định: UTC)

### 5. matomo_get_users
Lấy danh sách tất cả users.

### 6. matomo_add_user
Thêm user mới.

**Tham số:**
- `userLogin`: Tên đăng nhập
- `email`: Email
- `password`: Mật khẩu
- `alias`: Bí danh (tùy chọn)

### 7. matomo_get_goals
Lấy danh sách goals của site.

**Tham số:**
- `siteId`: ID của site

### 8. matomo_add_goal
Thêm goal mới.

**Tham số:**
- `siteId`: ID của site
- `name`: Tên goal
- `description`: Mô tả
- `matchAttribute`: Thuộc tính khớp
- `pattern`: Mẫu khớp
- `patternType`: Loại mẫu

### 9. matomo_get_visits_summary
Lấy tổng quan lượt truy cập.

**Tham số:**
- `siteId`: ID của site
- `date`: Ngày (YYYY-MM-DD)
- `period`: Chu kỳ (day, week, month, year)

### 10. matomo_get_top_pages
Lấy top pages.

**Tham số:**
- `siteId`: ID của site
- `date`: Ngày (YYYY-MM-DD)
- `period`: Chu kỳ (tùy chọn)
- `limit`: Số lượng kết quả (tùy chọn)

### 11. matomo_get_system_info
Lấy thông tin hệ thống.

## Ví dụ sử dụng

### Kết nối đến Matomo:
```json
{
  "name": "matomo_connect",
  "arguments": {
    "baseUrl": "https://analytics.example.com",
    "tokenAuth": "your-api-token"
  }
}
```

### Lấy danh sách sites:
```json
{
  "name": "matomo_get_sites",
  "arguments": {}
}
```

### Thêm site mới:
```json
{
  "name": "matomo_add_site",
  "arguments": {
    "name": "My Website",
    "urls": ["https://example.com", "https://www.example.com"],
    "timezone": "Asia/Ho_Chi_Minh"
  }
}
```

## Lưu ý

- Đảm bảo bạn có quyền truy cập API với token xác thực hợp lệ
- Một số chức năng có thể yêu cầu quyền admin
- Luôn kiểm tra kết nối trước khi sử dụng các tools khác

## Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng tạo issue hoặc pull request.

## License

MIT License 