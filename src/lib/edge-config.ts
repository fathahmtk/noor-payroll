import { get } from '@vercel/edge-config';

// Configuration keys for Noor Payroll
export const edgeConfigKeys = {
  // Application settings
  APP_NAME: 'app_name',
  APP_VERSION: 'app_version',
  MAINTENANCE_MODE: 'maintenance_mode',
  
  // WPS Configuration
  WPS_ENABLED: 'wps_enabled',
  WPS_BANK_CODES: 'wps_bank_codes',
  WPS_SIF_FORMAT: 'wps_sif_format',
  
  // Qatar-specific settings
  QATAR_CURRENCY: 'qatar_currency',
  QATAR_TIMEZONE: 'qatar_timezone',
  QATAR_BANK_LIST: 'qatar_bank_list',
  
  // Security settings
  RATE_LIMIT_ENABLED: 'rate_limit_enabled',
  SESSION_TIMEOUT: 'session_timeout',
  
  // Feature flags
  ENABLE_DASHBOARD: 'enable_dashboard',
  ENABLE_REPORTS: 'enable_reports',
  ENABLE_SIF_GENERATION: 'enable_sif_generation',
};

// Helper functions to get configuration values
export const getConfig = async (key: string) => {
  try {
    return await get(key);
  } catch (error) {
    console.error(`Error fetching Edge Config for key ${key}:`, error);
    return null;
  }
};

// Get all configuration values
export const getAllConfig = async () => {
  try {
    // Note: Edge Config doesn't have a getAll method, so we'll fetch individual keys
    const config: Record<string, any> = {};
    for (const key of Object.values(edgeConfigKeys)) {
      config[key] = await get(key);
    }
    return config;
  } catch (error) {
    console.error('Error fetching all Edge Config:', error);
    return {};
  }
};

// Check if a feature is enabled
export const isFeatureEnabled = async (featureKey: string) => {
  const config = await getConfig(featureKey);
  return config === true || config === 'true' || config === '1';
};

// Get WPS configuration
export const getWpsConfig = async () => {
  const [enabled, bankCodes, sifFormat] = await Promise.all([
    getConfig(edgeConfigKeys.WPS_ENABLED),
    getConfig(edgeConfigKeys.WPS_BANK_CODES),
    getConfig(edgeConfigKeys.WPS_SIF_FORMAT),
  ]);

  return {
    enabled: enabled === true || enabled === 'true',
    bankCodes: bankCodes || [],
    sifFormat: sifFormat || 'standard',
  };
};

// Get Qatar-specific configuration
export const getQatarConfig = async () => {
  const [currency, timezone, bankList] = await Promise.all([
    getConfig(edgeConfigKeys.QATAR_CURRENCY),
    getConfig(edgeConfigKeys.QATAR_TIMEZONE),
    getConfig(edgeConfigKeys.QATAR_BANK_LIST),
  ]);

  return {
    currency: currency || 'QAR',
    timezone: timezone || 'Asia/Qatar',
    bankList: bankList || [],
  };
};