export interface MatomoConfig {
  baseUrl: string;
  tokenAuth: string;
  siteId?: number;
}

export interface MatomoSite {
  idsite: number;
  name: string;
  main_url: string;
  ts_created: string;
  ecommerce: number;
  sitesearch: number;
  sitesearch_keyword_parameters: string;
  sitesearch_category_parameters: string;
  timezone: string;
  currency: string;
  exclude_unknown_urls: number;
  excluded_ips: string;
  excluded_parameters: string;
  excluded_user_agents: string;
  group: string;
  type: string;
  keep_url_fragment: number;
  creator_login: string;
  timezone_name: string;
  currency_name: string;
}

export interface MatomoUser {
  login: string;
  email: string;
  alias: string;
  role: string;
  capabilities: string[];
  superuser_access: boolean;
  date_registered: string;
  last_access: string;
}

export interface MatomoReport {
  reportData: any[];
  reportMetadata: {
    name: string;
    category: string;
    metrics: string[];
    dimensions: string[];
  };
}

export interface MatomoGoal {
  idgoal: number;
  name: string;
  description: string;
  match_attribute: string;
  pattern: string;
  pattern_type: string;
  case_sensitive: number;
  allow_multiple: number;
  revenue: number;
  deleted: number;
}

export interface MatomoSegment {
  idsegment: number;
  name: string;
  definition: string;
  login: string;
  enable_all_users: number;
  enable_only_idsite: number;
  auto_archive: number;
  archive_email_reports: number;
  ts_created: string;
  ts_last_edit: string;
  deleted: number;
}

export interface MatomoPlugin {
  name: string;
  displayName: string;
  description: string;
  version: string;
  isActivated: boolean;
  isUnneeded: boolean;
  isMissing: boolean;
  isCorePlugin: boolean;
  isTheme: boolean;
}

export interface MatomoSystemInfo {
  phpVersion: string;
  matomoVersion: string;
  databaseVersion: string;
  serverInfo: string;
  plugins: MatomoPlugin[];
} 