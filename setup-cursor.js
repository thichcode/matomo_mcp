#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Thiết lập MCP Matomo cho Cursor...\n');

// Kiểm tra Node.js version
try {
  const nodeVersion = process.version;
  console.log(`✅ Node.js version: ${nodeVersion}`);
} catch (error) {
  console.error('❌ Node.js không được cài đặt hoặc không thể truy cập');
  process.exit(1);
}

// Cài đặt dependencies
console.log('\n📦 Cài đặt dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies đã được cài đặt');
} catch (error) {
  console.error('❌ Lỗi khi cài đặt dependencies:', error.message);
  process.exit(1);
}

// Build dự án
console.log('\n🔨 Building dự án...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Dự án đã được build thành công');
} catch (error) {
  console.error('❌ Lỗi khi build dự án:', error.message);
  process.exit(1);
}

// Kiểm tra file .env
const envPath = join(__dirname, '.env');
if (!existsSync(envPath)) {
  console.log('\n📝 Tạo file .env...');
  const envContent = `# Matomo Configuration
MATOMO_BASE_URL=https://your-matomo-instance.com
MATOMO_TOKEN_AUTH=your-api-token-here

# Optional: Default site ID
MATOMO_DEFAULT_SITE_ID=1
`;
  writeFileSync(envPath, envContent);
  console.log('✅ File .env đã được tạo');
  console.log('⚠️  Vui lòng cập nhật thông tin Matomo trong file .env');
} else {
  console.log('✅ File .env đã tồn tại');
}

// Tạo file cấu hình Cursor
console.log('\n⚙️  Tạo file cấu hình Cursor...');
const cursorConfigPath = join(__dirname, '.cursor', 'settings.json');
const cursorConfigDir = dirname(cursorConfigPath);

if (!existsSync(cursorConfigDir)) {
  execSync(`mkdir -p "${cursorConfigDir}"`, { stdio: 'inherit' });
}

const cursorConfig = {
  "mcp.servers": {
    "matomo": {
      "command": "node",
      "args": [join(__dirname, 'dist', 'index.js')],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
};

writeFileSync(cursorConfigPath, JSON.stringify(cursorConfig, null, 2));
console.log('✅ File cấu hình Cursor đã được tạo');

// Test MCP server
console.log('\n🧪 Kiểm tra MCP server...');
try {
  const testProcess = execSync('npm run mcp', { 
    stdio: 'pipe', 
    timeout: 5000 
  });
  console.log('✅ MCP server hoạt động bình thường');
} catch (error) {
  console.log('⚠️  MCP server có thể cần cấu hình thêm');
}

console.log('\n🎉 Thiết lập hoàn tất!');
console.log('\n📋 Hướng dẫn tiếp theo:');
console.log('1. Mở Cursor');
console.log('2. Mở Command Palette (Ctrl+Shift+P)');
console.log('3. Gõ "MCP: List Servers" để kiểm tra');
console.log('4. Cập nhật thông tin Matomo trong file .env');
console.log('5. Sử dụng AI Assistant để tương tác với Matomo');
console.log('\n📖 Xem file CURSOR_SETUP.md để biết thêm chi tiết'); 