# Hướng dẫn cấu hình MCP Matomo cho Cursor

## Bước 1: Cài đặt và Build dự án

```bash
# Cài đặt dependencies
npm install

# Build dự án
npm run build
```

## Bước 2: Cấu hình Cursor

### Cách 1: Sử dụng file cấu hình (Khuyến nghị)

1. **Mở Cursor Settings**:
   - Windows/Linux: `Ctrl + ,`
   - Mac: `Cmd + ,`

2. **Tìm đến phần MCP Settings**:
   - Tìm kiếm "MCP" trong settings
   - Hoặc điều hướng đến `Extensions > MCP`

3. **Thêm MCP Server**:
   - Click "Add MCP Server"
   - Điền thông tin:
     - **Name**: `matomo`
     - **Command**: `node`
     - **Args**: `["/path/to/your/project/dist/index.js"]`
     - **Working Directory**: `/path/to/your/project`

### Cách 2: Sử dụng Command Palette

1. **Mở Command Palette**:
   - Windows/Linux: `Ctrl + Shift + P`
   - Mac: `Cmd + Shift + P`

2. **Tìm lệnh MCP**:
   - Gõ "MCP: Add Server"
   - Chọn lệnh tương ứng

3. **Cấu hình server**:
   - Điền thông tin như trên

## Bước 3: Tạo file .env

Tạo file `.env` trong thư mục dự án:

```env
MATOMO_BASE_URL=https://your-matomo-instance.com
MATOMO_TOKEN_AUTH=your-api-token-here
```

## Bước 4: Kiểm tra kết nối

1. **Mở Command Palette**:
   - Windows/Linux: `Ctrl + Shift + P`
   - Mac: `Cmd + Shift + P`

2. **Tìm lệnh MCP**:
   - Gõ "MCP: List Servers"
   - Kiểm tra xem server "matomo" đã xuất hiện chưa

## Bước 5: Sử dụng trong Cursor

### Ví dụ sử dụng với AI Assistant:

```
Hãy kết nối đến Matomo instance của tôi và lấy danh sách tất cả sites.
```

### Các lệnh có thể sử dụng:

1. **Kết nối Matomo**:
   ```
   Kết nối đến Matomo tại https://analytics.example.com với token xác thực
   ```

2. **Quản lý Sites**:
   ```
   Lấy danh sách tất cả sites trong Matomo
   Thêm site mới tên "My Website" với URL https://example.com
   Lấy thông tin site có ID 1
   ```

3. **Quản lý Users**:
   ```
   Lấy danh sách tất cả users
   Thêm user mới với tên đăng nhập "newuser" và email "user@example.com"
   ```

4. **Báo cáo Analytics**:
   ```
   Lấy tổng quan lượt truy cập của site ID 1 cho ngày hôm nay
   Lấy top 10 pages được truy cập nhiều nhất
   ```

## Troubleshooting

### Lỗi thường gặp:

1. **"Server not found"**:
   - Kiểm tra đường dẫn trong cấu hình
   - Đảm bảo đã build dự án (`npm run build`)

2. **"Connection failed"**:
   - Kiểm tra file `.env` có đúng thông tin không
   - Kiểm tra kết nối mạng đến Matomo instance

3. **"Permission denied"**:
   - Đảm bảo token API có đủ quyền
   - Kiểm tra quyền truy cập file

### Debug:

1. **Chạy MCP server độc lập**:
   ```bash
   npm run mcp
   ```

2. **Kiểm tra logs**:
   - Mở Developer Tools trong Cursor
   - Xem tab Console để kiểm tra lỗi

## Lưu ý quan trọng

- Đảm bảo Matomo instance có thể truy cập được từ máy của bạn
- Token API phải có đủ quyền để thực hiện các thao tác
- Một số chức năng có thể yêu cầu quyền admin
- Luôn kiểm tra kết nối trước khi sử dụng các tools khác 