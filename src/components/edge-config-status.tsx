'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/components/ui/button';
import { Badge } from '@/components/ui/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/components/ui/alert';
import { RefreshCw, CheckCircle, AlertCircle, Settings } from 'lucide-react';

interface EdgeConfigData {
  [key: string]: any;
}

interface ConfigStatus {
  success: boolean;
  config: EdgeConfigData;
  timestamp: string;
  error?: string;
}

export function EdgeConfigStatus() {
  const [configStatus, setConfigStatus] = useState<ConfigStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchConfig = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/config');
      const data = await response.json();
      
      if (data.success) {
        setConfigStatus(data);
        setLastUpdated(new Date());
      } else {
        setConfigStatus({
          success: false,
          config: {},
          timestamp: new Date().toISOString(),
          error: data.error || 'Unknown error'
        });
      }
    } catch (error) {
      setConfigStatus({
        success: false,
        config: {},
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Failed to fetch configuration'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const formatValue = (value: any): string => {
    if (typeof value === 'boolean') {
      return value ? 'Enabled' : 'Disabled';
    }
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return String(value);
  };

  const getStatusBadge = () => {
    if (!configStatus) {
      return <Badge variant="secondary">Loading...</Badge>;
    }
    
    return configStatus.success ? (
      <Badge variant="default" className="bg-green-500">
        <CheckCircle className="w-3 h-3 mr-1" />
        Connected
      </Badge>
    ) : (
      <Badge variant="destructive">
        <AlertCircle className="w-3 h-3 mr-1" />
        Error
      </Badge>
    );
  };

  const importantConfigKeys = [
    'app_name',
    'app_version',
    'maintenance_mode',
    'wps_enabled',
    'qatar_currency',
    'enable_dashboard',
    'enable_sif_generation'
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Edge Configuration Status
        </CardTitle>
        <CardDescription>
          Vercel Edge Config provides fast, global configuration storage for your Noor Payroll application.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusBadge()}
            {lastUpdated && (
              <span className="text-sm text-muted-foreground">
                Last updated: {lastUpdated.toLocaleString()}
              </span>
            )}
          </div>
          <Button
            onClick={fetchConfig}
            disabled={loading}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`w-4 h-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Error Display */}
        {configStatus && !configStatus.success && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {configStatus.error || 'Failed to fetch Edge Configuration'}
            </AlertDescription>
          </Alert>
        )}

        {/* Configuration Display */}
        {configStatus && configStatus.success && (
          <div className="space-y-4">
            {/* Important Configuration */}
            <div>
              <h4 className="text-sm font-medium mb-2">Important Configuration</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {importantConfigKeys.map((key) => {
                  const value = configStatus.config[key];
                  return (
                    <div key={key} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="text-sm font-medium capitalize">
                        {key.replace(/_/g, ' ')}
                      </span>
                      <Badge variant={value === true || value === 'enabled' ? 'default' : 'secondary'}>
                        {formatValue(value)}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* All Configuration */}
            <div>
              <h4 className="text-sm font-medium mb-2">All Configuration Values</h4>
              <div className="bg-muted p-4 rounded-lg max-h-96 overflow-y-auto">
                <pre className="text-sm">
                  {JSON.stringify(configStatus.config, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Information */}
        <Alert>
          <Settings className="h-4 w-4" />
          <AlertDescription>
            <strong>Edge Config Benefits:</strong> Fast global reads, instant updates, 
            no database queries needed for configuration values. Perfect for feature flags, 
            WPS settings, and Qatar-specific configurations.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}