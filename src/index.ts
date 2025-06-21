import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { MatomoApiService } from './services/matomo-api.js';
import { MatomoConfig } from './types/matomo.js';
import dotenv from 'dotenv';

dotenv.config();

class MatomoMCPServer {
  private server: Server;
  private matomoService: MatomoApiService | null = null;

  constructor() {
    this.server = new Server(
      {
        name: 'matomo-mcp',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
  }

  private setupToolHandlers() {
    // Initialize Matomo connection
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'matomo_connect',
            description: 'Kết nối đến Matomo instance với URL và token xác thực',
            inputSchema: {
              type: 'object',
              properties: {
                baseUrl: {
                  type: 'string',
                  description: 'URL của Matomo instance (ví dụ: https://analytics.example.com)',
                },
                tokenAuth: {
                  type: 'string',
                  description: 'Token xác thực Matomo API',
                },
              },
              required: ['baseUrl', 'tokenAuth'],
            },
          },
          {
            name: 'matomo_get_sites',
            description: 'Lấy danh sách tất cả các sites trong Matomo',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'matomo_get_site',
            description: 'Lấy thông tin chi tiết của một site',
            inputSchema: {
              type: 'object',
              properties: {
                siteId: {
                  type: 'number',
                  description: 'ID của site cần lấy thông tin',
                },
              },
              required: ['siteId'],
            },
          },
          {
            name: 'matomo_add_site',
            description: 'Thêm một site mới vào Matomo',
            inputSchema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Tên của site',
                },
                urls: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Danh sách URLs của site',
                },
                timezone: {
                  type: 'string',
                  description: 'Múi giờ của site (mặc định: UTC)',
                  default: 'UTC',
                },
              },
              required: ['name', 'urls'],
            },
          },
          {
            name: 'matomo_get_users',
            description: 'Lấy danh sách tất cả users trong Matomo',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'matomo_add_user',
            description: 'Thêm một user mới vào Matomo',
            inputSchema: {
              type: 'object',
              properties: {
                userLogin: {
                  type: 'string',
                  description: 'Tên đăng nhập của user',
                },
                email: {
                  type: 'string',
                  description: 'Email của user',
                },
                password: {
                  type: 'string',
                  description: 'Mật khẩu của user',
                },
                alias: {
                  type: 'string',
                  description: 'Bí danh của user (tùy chọn)',
                },
              },
              required: ['userLogin', 'email', 'password'],
            },
          },
          {
            name: 'matomo_get_goals',
            description: 'Lấy danh sách goals của một site',
            inputSchema: {
              type: 'object',
              properties: {
                siteId: {
                  type: 'number',
                  description: 'ID của site',
                },
              },
              required: ['siteId'],
            },
          },
          {
            name: 'matomo_add_goal',
            description: 'Thêm một goal mới cho site',
            inputSchema: {
              type: 'object',
              properties: {
                siteId: {
                  type: 'number',
                  description: 'ID của site',
                },
                name: {
                  type: 'string',
                  description: 'Tên của goal',
                },
                description: {
                  type: 'string',
                  description: 'Mô tả của goal',
                },
                matchAttribute: {
                  type: 'string',
                  description: 'Thuộc tính khớp (url, title, event, etc.)',
                },
                pattern: {
                  type: 'string',
                  description: 'Mẫu khớp',
                },
                patternType: {
                  type: 'string',
                  description: 'Loại mẫu (exact, contains, regex, etc.)',
                },
              },
              required: ['siteId', 'name', 'description', 'matchAttribute', 'pattern', 'patternType'],
            },
          },
          {
            name: 'matomo_get_visits_summary',
            description: 'Lấy tổng quan lượt truy cập của site',
            inputSchema: {
              type: 'object',
              properties: {
                siteId: {
                  type: 'number',
                  description: 'ID của site',
                },
                date: {
                  type: 'string',
                  description: 'Ngày cần lấy dữ liệu (YYYY-MM-DD)',
                },
                period: {
                  type: 'string',
                  description: 'Chu kỳ (day, week, month, year)',
                  default: 'day',
                },
              },
              required: ['siteId', 'date'],
            },
          },
          {
            name: 'matomo_get_top_pages',
            description: 'Lấy danh sách trang được truy cập nhiều nhất',
            inputSchema: {
              type: 'object',
              properties: {
                siteId: {
                  type: 'number',
                  description: 'ID của site',
                },
                date: {
                  type: 'string',
                  description: 'Ngày cần lấy dữ liệu (YYYY-MM-DD)',
                },
                period: {
                  type: 'string',
                  description: 'Chu kỳ (day, week, month, year)',
                  default: 'day',
                },
                limit: {
                  type: 'number',
                  description: 'Số lượng kết quả tối đa',
                  default: 10,
                },
              },
              required: ['siteId', 'date'],
            },
          },
          {
            name: 'matomo_get_system_info',
            description: 'Lấy thông tin hệ thống Matomo',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
        ] as Tool[],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'matomo_connect':
            return await this.handleConnect(args as { baseUrl: string; tokenAuth: string });

          case 'matomo_get_sites':
            return await this.handleGetSites();

          case 'matomo_get_site':
            return await this.handleGetSite(args as { siteId: number });

          case 'matomo_add_site':
            return await this.handleAddSite(args as { name: string; urls: string[]; timezone?: string });

          case 'matomo_get_users':
            return await this.handleGetUsers();

          case 'matomo_add_user':
            return await this.handleAddUser(args as { userLogin: string; email: string; password: string; alias?: string });

          case 'matomo_get_goals':
            return await this.handleGetGoals(args as { siteId: number });

          case 'matomo_add_goal':
            return await this.handleAddGoal(args as {
              siteId: number;
              name: string;
              description: string;
              matchAttribute: string;
              pattern: string;
              patternType: string;
            });

          case 'matomo_get_visits_summary':
            return await this.handleGetVisitsSummary(args as { siteId: number; date: string; period?: string });

          case 'matomo_get_top_pages':
            return await this.handleGetTopPages(args as { siteId: number; date: string; period?: string; limit?: number });

          case 'matomo_get_system_info':
            return await this.handleGetSystemInfo();

          default:
            throw new Error(`Tool không được hỗ trợ: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Lỗi: ${error instanceof Error ? error.message : 'Lỗi không xác định'}`,
            },
          ],
        };
      }
    });
  }

  private async handleConnect(args: { baseUrl: string; tokenAuth: string }) {
    const config: MatomoConfig = {
      baseUrl: args.baseUrl,
      tokenAuth: args.tokenAuth,
    };

    this.matomoService = new MatomoApiService(config);
    
    // Test connection
    await this.matomoService.getSites();

    return {
      content: [
        {
          type: 'text',
          text: `Đã kết nối thành công đến Matomo tại ${args.baseUrl}`,
        },
      ],
    };
  }

  private async handleGetSites() {
    if (!this.matomoService) {
      throw new Error('Chưa kết nối đến Matomo. Vui lòng sử dụng matomo_connect trước.');
    }

    const sites = await this.matomoService.getSites();
    return {
      content: [
        {
          type: 'text',
          text: `Danh sách sites:\n${JSON.stringify(sites, null, 2)}`,
        },
      ],
    };
  }

  private async handleGetSite(args: { siteId: number }) {
    if (!this.matomoService) {
      throw new Error('Chưa kết nối đến Matomo. Vui lòng sử dụng matomo_connect trước.');
    }

    const site = await this.matomoService.getSite(args.siteId);
    return {
      content: [
        {
          type: 'text',
          text: `Thông tin site:\n${JSON.stringify(site, null, 2)}`,
        },
      ],
    };
  }

  private async handleAddSite(args: { name: string; urls: string[]; timezone?: string }) {
    if (!this.matomoService) {
      throw new Error('Chưa kết nối đến Matomo. Vui lòng sử dụng matomo_connect trước.');
    }

    const siteId = await this.matomoService.addSite(args.name, args.urls, args.timezone);
    return {
      content: [
        {
          type: 'text',
          text: `Đã thêm site thành công với ID: ${siteId}`,
        },
      ],
    };
  }

  private async handleGetUsers() {
    if (!this.matomoService) {
      throw new Error('Chưa kết nối đến Matomo. Vui lòng sử dụng matomo_connect trước.');
    }

    const users = await this.matomoService.getUsers();
    return {
      content: [
        {
          type: 'text',
          text: `Danh sách users:\n${JSON.stringify(users, null, 2)}`,
        },
      ],
    };
  }

  private async handleAddUser(args: { userLogin: string; email: string; password: string; alias?: string }) {
    if (!this.matomoService) {
      throw new Error('Chưa kết nối đến Matomo. Vui lòng sử dụng matomo_connect trước.');
    }

    await this.matomoService.addUser(args.userLogin, args.email, args.password, args.alias);
    return {
      content: [
        {
          type: 'text',
          text: `Đã thêm user thành công: ${args.userLogin}`,
        },
      ],
    };
  }

  private async handleGetGoals(args: { siteId: number }) {
    if (!this.matomoService) {
      throw new Error('Chưa kết nối đến Matomo. Vui lòng sử dụng matomo_connect trước.');
    }

    const goals = await this.matomoService.getGoals(args.siteId);
    return {
      content: [
        {
          type: 'text',
          text: `Danh sách goals:\n${JSON.stringify(goals, null, 2)}`,
        },
      ],
    };
  }

  private async handleAddGoal(args: {
    siteId: number;
    name: string;
    description: string;
    matchAttribute: string;
    pattern: string;
    patternType: string;
  }) {
    if (!this.matomoService) {
      throw new Error('Chưa kết nối đến Matomo. Vui lòng sử dụng matomo_connect trước.');
    }

    const goalId = await this.matomoService.addGoal(
      args.siteId,
      args.name,
      args.description,
      args.matchAttribute,
      args.pattern,
      args.patternType
    );
    return {
      content: [
        {
          type: 'text',
          text: `Đã thêm goal thành công với ID: ${goalId}`,
        },
      ],
    };
  }

  private async handleGetVisitsSummary(args: { siteId: number; date: string; period?: string }) {
    if (!this.matomoService) {
      throw new Error('Chưa kết nối đến Matomo. Vui lòng sử dụng matomo_connect trước.');
    }

    const summary = await this.matomoService.getVisitsSummary(args.siteId, args.date, args.period);
    return {
      content: [
        {
          type: 'text',
          text: `Tổng quan lượt truy cập:\n${JSON.stringify(summary, null, 2)}`,
        },
      ],
    };
  }

  private async handleGetTopPages(args: { siteId: number; date: string; period?: string; limit?: number }) {
    if (!this.matomoService) {
      throw new Error('Chưa kết nối đến Matomo. Vui lòng sử dụng matomo_connect trước.');
    }

    const pages = await this.matomoService.getTopPages(args.siteId, args.date, args.period, args.limit);
    return {
      content: [
        {
          type: 'text',
          text: `Top pages:\n${JSON.stringify(pages, null, 2)}`,
        },
      ],
    };
  }

  private async handleGetSystemInfo() {
    if (!this.matomoService) {
      throw new Error('Chưa kết nối đến Matomo. Vui lòng sử dụng matomo_connect trước.');
    }

    const info = await this.matomoService.getSystemInfo();
    return {
      content: [
        {
          type: 'text',
          text: `Thông tin hệ thống:\n${JSON.stringify(info, null, 2)}`,
        },
      ],
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Matomo MCP Server đang chạy...');
  }
}

const server = new MatomoMCPServer();
server.run().catch(console.error); 