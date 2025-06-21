import { MatomoApiService } from '../services/matomo-api.js';
import { MatomoConfig } from '../types/matomo.js';

// Ví dụ cấu hình
const config: MatomoConfig = {
  baseUrl: 'https://analytics.example.com',
  tokenAuth: 'your-api-token-here',
};

const matomoService = new MatomoApiService(config);

// Ví dụ 1: Lấy danh sách sites
async function getSitesExample() {
  try {
    const sites = await matomoService.getSites();
    console.log('Danh sách sites:', sites);
  } catch (error) {
    console.error('Lỗi khi lấy sites:', error);
  }
}

// Ví dụ 2: Thêm site mới
async function addSiteExample() {
  try {
    const siteId = await matomoService.addSite(
      'My Website',
      ['https://example.com', 'https://www.example.com'],
      'Asia/Ho_Chi_Minh'
    );
    console.log('Đã thêm site với ID:', siteId);
  } catch (error) {
    console.error('Lỗi khi thêm site:', error);
  }
}

// Ví dụ 3: Lấy thông tin site
async function getSiteExample(siteId: number) {
  try {
    const site = await matomoService.getSite(siteId);
    console.log('Thông tin site:', site);
  } catch (error) {
    console.error('Lỗi khi lấy thông tin site:', error);
  }
}

// Ví dụ 4: Thêm user mới
async function addUserExample() {
  try {
    await matomoService.addUser(
      'newuser',
      'user@example.com',
      'securepassword123',
      'New User'
    );
    console.log('Đã thêm user thành công');
  } catch (error) {
    console.error('Lỗi khi thêm user:', error);
  }
}

// Ví dụ 5: Lấy danh sách users
async function getUsersExample() {
  try {
    const users = await matomoService.getUsers();
    console.log('Danh sách users:', users);
  } catch (error) {
    console.error('Lỗi khi lấy users:', error);
  }
}

// Ví dụ 6: Thêm goal mới
async function addGoalExample(siteId: number) {
  try {
    const goalId = await matomoService.addGoal(
      siteId,
      'Contact Form Submission',
      'Track when users submit contact form',
      'url',
      '/contact/thank-you',
      'exact'
    );
    console.log('Đã thêm goal với ID:', goalId);
  } catch (error) {
    console.error('Lỗi khi thêm goal:', error);
  }
}

// Ví dụ 7: Lấy tổng quan lượt truy cập
async function getVisitsSummaryExample(siteId: number) {
  try {
    const summary = await matomoService.getVisitsSummary(siteId, '2024-01-15', 'day');
    console.log('Tổng quan lượt truy cập:', summary);
  } catch (error) {
    console.error('Lỗi khi lấy tổng quan lượt truy cập:', error);
  }
}

// Ví dụ 8: Lấy top pages
async function getTopPagesExample(siteId: number) {
  try {
    const pages = await matomoService.getTopPages(siteId, '2024-01-15', 'day', 10);
    console.log('Top pages:', pages);
  } catch (error) {
    console.error('Lỗi khi lấy top pages:', error);
  }
}

// Ví dụ 9: Lấy thông tin hệ thống
async function getSystemInfoExample() {
  try {
    const info = await matomoService.getSystemInfo();
    console.log('Thông tin hệ thống:', info);
  } catch (error) {
    console.error('Lỗi khi lấy thông tin hệ thống:', error);
  }
}

// Ví dụ 10: Quản lý segments
async function segmentsExample() {
  try {
    // Lấy danh sách segments
    const segments = await matomoService.getSegments();
    console.log('Danh sách segments:', segments);

    // Thêm segment mới
    const segmentId = await matomoService.addSegment(
      'Mobile Users',
      'deviceType==mobile',
      1 // siteId
    );
    console.log('Đã thêm segment với ID:', segmentId);
  } catch (error) {
    console.error('Lỗi khi quản lý segments:', error);
  }
}

// Ví dụ 11: Lấy visitor log
async function getVisitorLogExample(siteId: number) {
  try {
    const visitors = await matomoService.getVisitorLog(siteId, '2024-01-15', 'day', 5);
    console.log('Visitor log:', visitors);
  } catch (error) {
    console.error('Lỗi khi lấy visitor log:', error);
  }
}

// Ví dụ 12: Lấy top keywords
async function getTopKeywordsExample(siteId: number) {
  try {
    const keywords = await matomoService.getTopKeywords(siteId, '2024-01-15', 'day', 10);
    console.log('Top keywords:', keywords);
  } catch (error) {
    console.error('Lỗi khi lấy top keywords:', error);
  }
}

// Ví dụ 13: Lấy top referrers
async function getTopReferrersExample(siteId: number) {
  try {
    const referrers = await matomoService.getTopReferrers(siteId, '2024-01-15', 'day', 10);
    console.log('Top referrers:', referrers);
  } catch (error) {
    console.error('Lỗi khi lấy top referrers:', error);
  }
}

// Ví dụ 14: Quản lý plugins
async function pluginsExample() {
  try {
    // Lấy danh sách plugins
    const plugins = await matomoService.getPlugins();
    console.log('Danh sách plugins:', plugins);

    // Kích hoạt plugin (ví dụ)
    // await matomoService.activatePlugin('PluginName');
    
    // Vô hiệu hóa plugin (ví dụ)
    // await matomoService.deactivatePlugin('PluginName');
  } catch (error) {
    console.error('Lỗi khi quản lý plugins:', error);
  }
}

// Hàm chạy tất cả ví dụ
export async function runAllExamples() {
  console.log('=== Bắt đầu chạy các ví dụ ===\n');

  // Lấy danh sách sites trước
  await getSitesExample();
  
  // Giả sử có site với ID = 1
  const exampleSiteId = 1;
  
  await getSiteExample(exampleSiteId);
  await getUsersExample();
  await getVisitsSummaryExample(exampleSiteId);
  await getTopPagesExample(exampleSiteId);
  await getSystemInfoExample();
  await segmentsExample();
  await getVisitorLogExample(exampleSiteId);
  await getTopKeywordsExample(exampleSiteId);
  await getTopReferrersExample(exampleSiteId);
  await pluginsExample();

  console.log('\n=== Hoàn thành tất cả ví dụ ===');
}

// Export các hàm ví dụ để sử dụng riêng lẻ
export {
  getSitesExample,
  addSiteExample,
  getSiteExample,
  addUserExample,
  getUsersExample,
  addGoalExample,
  getVisitsSummaryExample,
  getTopPagesExample,
  getSystemInfoExample,
  segmentsExample,
  getVisitorLogExample,
  getTopKeywordsExample,
  getTopReferrersExample,
  pluginsExample,
}; 