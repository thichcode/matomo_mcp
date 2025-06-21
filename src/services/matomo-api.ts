import axios, { AxiosInstance } from 'axios';
import { MatomoConfig, MatomoSite, MatomoUser, MatomoReport, MatomoGoal, MatomoSegment, MatomoSystemInfo } from '../types/matomo.js';

export class MatomoApiService {
  private client: AxiosInstance;
  private config: MatomoConfig;

  constructor(config: MatomoConfig) {
    this.config = config;
    this.client = axios.create({
      baseURL: config.baseUrl,
      timeout: 30000,
    });
  }

  private async makeRequest(method: string, params: Record<string, any> = {}): Promise<any> {
    const requestParams = {
      module: 'API',
      format: 'JSON',
      token_auth: this.config.tokenAuth,
      ...params,
    };

    try {
      const response = await this.client.get('', { params: requestParams });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Matomo API error: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }

  // Sites Management
  async getSites(): Promise<MatomoSite[]> {
    const response = await this.makeRequest('SitesManager.getSitesFromGroup');
    return Array.isArray(response) ? response : [];
  }

  async getSite(siteId: number): Promise<MatomoSite> {
    const response = await this.makeRequest('SitesManager.getSiteFromId', { idSite: siteId });
    return response;
  }

  async addSite(name: string, urls: string[], timezone: string = 'UTC'): Promise<number> {
    const response = await this.makeRequest('SitesManager.addSite', {
      siteName: name,
      urls: urls.join(','),
      timezone,
    });
    return response.value;
  }

  async updateSite(siteId: number, name?: string, urls?: string[]): Promise<void> {
    const params: any = { idSite: siteId };
    if (name) params.siteName = name;
    if (urls) params.urls = urls.join(',');
    
    await this.makeRequest('SitesManager.updateSite', params);
  }

  async deleteSite(siteId: number): Promise<void> {
    await this.makeRequest('SitesManager.deleteSite', { idSite: siteId });
  }

  // Users Management
  async getUsers(): Promise<MatomoUser[]> {
    const response = await this.makeRequest('UsersManager.getUsers');
    return Array.isArray(response) ? response : [];
  }

  async getUser(userLogin: string): Promise<MatomoUser> {
    const response = await this.makeRequest('UsersManager.getUser', { userLogin });
    return response;
  }

  async addUser(userLogin: string, email: string, password: string, alias?: string): Promise<void> {
    const params: any = { userLogin, email, password };
    if (alias) params.alias = alias;
    
    await this.makeRequest('UsersManager.addUser', params);
  }

  async updateUser(userLogin: string, email?: string, alias?: string): Promise<void> {
    const params: any = { userLogin };
    if (email) params.email = email;
    if (alias) params.alias = alias;
    
    await this.makeRequest('UsersManager.updateUser', params);
  }

  async deleteUser(userLogin: string): Promise<void> {
    await this.makeRequest('UsersManager.deleteUser', { userLogin });
  }

  async setUserAccess(userLogin: string, access: string, idSites: number[]): Promise<void> {
    await this.makeRequest('UsersManager.setUserAccess', {
      userLogin,
      access,
      idSites: idSites.join(','),
    });
  }

  // Goals Management
  async getGoals(siteId: number): Promise<MatomoGoal[]> {
    const response = await this.makeRequest('Goals.getGoals', { idSite: siteId });
    return Array.isArray(response) ? response : [];
  }

  async addGoal(siteId: number, name: string, description: string, matchAttribute: string, pattern: string, patternType: string): Promise<number> {
    const response = await this.makeRequest('Goals.addGoal', {
      idSite: siteId,
      name,
      description,
      matchAttribute,
      pattern,
      patternType,
    });
    return response.value;
  }

  async updateGoal(siteId: number, goalId: number, name?: string, description?: string): Promise<void> {
    const params: any = { idSite: siteId, idGoal: goalId };
    if (name) params.name = name;
    if (description) params.description = description;
    
    await this.makeRequest('Goals.updateGoal', params);
  }

  async deleteGoal(siteId: number, goalId: number): Promise<void> {
    await this.makeRequest('Goals.deleteGoal', { idSite: siteId, idGoal: goalId });
  }

  // Segments Management
  async getSegments(): Promise<MatomoSegment[]> {
    const response = await this.makeRequest('SegmentEditor.getAll');
    return Array.isArray(response) ? response : [];
  }

  async addSegment(name: string, definition: string, idSite?: number): Promise<number> {
    const params: any = { name, definition };
    if (idSite) params.idSite = idSite;
    
    const response = await this.makeRequest('SegmentEditor.add', params);
    return response.value;
  }

  async updateSegment(segmentId: number, name?: string, definition?: string): Promise<void> {
    const params: any = { idSegment: segmentId };
    if (name) params.name = name;
    if (definition) params.definition = definition;
    
    await this.makeRequest('SegmentEditor.update', params);
  }

  async deleteSegment(segmentId: number): Promise<void> {
    await this.makeRequest('SegmentEditor.delete', { idSegment: segmentId });
  }

  // Reports
  async getReport(siteId: number, date: string, period: string = 'day', segment?: string): Promise<MatomoReport> {
    const params: any = { idSite: siteId, date, period };
    if (segment) params.segment = segment;
    
    const response = await this.makeRequest('API.getReport', params);
    return response;
  }

  async getVisitsSummary(siteId: number, date: string, period: string = 'day'): Promise<any> {
    return await this.makeRequest('VisitsSummary.get', {
      idSite: siteId,
      date,
      period,
    });
  }

  async getActions(siteId: number, date: string, period: string = 'day'): Promise<any> {
    return await this.makeRequest('Actions.get', {
      idSite: siteId,
      date,
      period,
    });
  }

  // System Information
  async getSystemInfo(): Promise<MatomoSystemInfo> {
    const response = await this.makeRequest('API.getSystemInfo');
    return response;
  }

  async getPlugins(): Promise<any[]> {
    const response = await this.makeRequest('CorePluginsAdmin.getPluginsInfo');
    return Array.isArray(response) ? response : [];
  }

  async activatePlugin(pluginName: string): Promise<void> {
    await this.makeRequest('CorePluginsAdmin.activatePlugin', { pluginName });
  }

  async deactivatePlugin(pluginName: string): Promise<void> {
    await this.makeRequest('CorePluginsAdmin.deactivatePlugin', { pluginName });
  }

  // Analytics Data
  async getTopPages(siteId: number, date: string, period: string = 'day', limit: number = 10): Promise<any> {
    return await this.makeRequest('Actions.getPageUrls', {
      idSite: siteId,
      date,
      period,
      filter_limit: limit,
    });
  }

  async getTopKeywords(siteId: number, date: string, period: string = 'day', limit: number = 10): Promise<any> {
    return await this.makeRequest('Referrers.getKeywords', {
      idSite: siteId,
      date,
      period,
      filter_limit: limit,
    });
  }

  async getTopReferrers(siteId: number, date: string, period: string = 'day', limit: number = 10): Promise<any> {
    return await this.makeRequest('Referrers.getAll', {
      idSite: siteId,
      date,
      period,
      filter_limit: limit,
    });
  }

  async getVisitorLog(siteId: number, date: string, period: string = 'day', limit: number = 10): Promise<any> {
    return await this.makeRequest('Live.getLastVisitsDetails', {
      idSite: siteId,
      date,
      period,
      filter_limit: limit,
    });
  }
} 