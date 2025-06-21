import { MatomoConfig } from '../types/matomo.js';

export function validateMatomoConfig(config: MatomoConfig): void {
  if (!config.baseUrl) {
    throw new Error('baseUrl là bắt buộc');
  }
  
  if (!config.tokenAuth) {
    throw new Error('tokenAuth là bắt buộc');
  }
  
  // Validate URL format
  try {
    new URL(config.baseUrl);
  } catch {
    throw new Error('baseUrl không hợp lệ');
  }
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function parseDate(dateString: string): Date {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error('Định dạng ngày không hợp lệ. Sử dụng YYYY-MM-DD');
  }
  return date;
}

export function validatePeriod(period: string): void {
  const validPeriods = ['day', 'week', 'month', 'year'];
  if (!validPeriods.includes(period)) {
    throw new Error(`Chu kỳ không hợp lệ. Sử dụng một trong: ${validPeriods.join(', ')}`);
  }
}

export function validatePatternType(patternType: string): void {
  const validTypes = ['exact', 'contains', 'regex'];
  if (!validTypes.includes(patternType)) {
    throw new Error(`Loại mẫu không hợp lệ. Sử dụng một trong: ${validTypes.join(', ')}`);
  }
}

export function validateMatchAttribute(matchAttribute: string): void {
  const validAttributes = ['url', 'title', 'event', 'visit_duration', 'visit_total_time'];
  if (!validAttributes.includes(matchAttribute)) {
    throw new Error(`Thuộc tính khớp không hợp lệ. Sử dụng một trong: ${validAttributes.join(', ')}`);
  }
}

export function sanitizeUrl(url: string): string {
  // Remove trailing slash
  return url.replace(/\/$/, '');
}

export function validateUrls(urls: string[]): void {
  if (!Array.isArray(urls) || urls.length === 0) {
    throw new Error('Danh sách URLs không được để trống');
  }
  
  for (const url of urls) {
    try {
      new URL(url);
    } catch {
      throw new Error(`URL không hợp lệ: ${url}`);
    }
  }
}

export function formatResponse(data: any): string {
  if (typeof data === 'string') {
    return data;
  }
  
  if (Array.isArray(data)) {
    if (data.length === 0) {
      return 'Không có dữ liệu';
    }
    return JSON.stringify(data, null, 2);
  }
  
  if (typeof data === 'object' && data !== null) {
    return JSON.stringify(data, null, 2);
  }
  
  return String(data);
}

export function createErrorResponse(error: unknown): string {
  if (error instanceof Error) {
    return `Lỗi: ${error.message}`;
  }
  return `Lỗi không xác định: ${String(error)}`;
}

export function validateSiteId(siteId: number): void {
  if (!Number.isInteger(siteId) || siteId <= 0) {
    throw new Error('siteId phải là số nguyên dương');
  }
}

export function validateLimit(limit: number): void {
  if (!Number.isInteger(limit) || limit <= 0 || limit > 100) {
    throw new Error('limit phải là số nguyên từ 1 đến 100');
  }
} 