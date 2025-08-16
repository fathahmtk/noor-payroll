'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface TenantContextType {
  tenant: {
    id: string;
    name: string;
    subdomain: string;
    theme: {
      primaryColor: string;
      secondaryColor: string;
      backgroundColor: string;
      textColor: string;
    };
    features: {
      wpsEnabled: boolean;
      bankIntegration: boolean;
      reporting: boolean;
      attendance: boolean;
      leaveManagement: boolean;
    };
    settings: {
      currency: string;
      timezone: string;
      dateFormat: string;
      language: string;
    };
  } | null;
  isLoading: boolean;
  error: string | null;
}

const TenantContext = createContext<TenantContextType>({
  tenant: null,
  isLoading: true,
  error: null,
});

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [tenant, setTenant] = useState<TenantContextType['tenant']>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get tenant information from headers
    const fetchTenantInfo = async () => {
      try {
        const response = await fetch('/api/config');
        if (response.ok) {
          const data = await response.json();
          setTenant(data.tenant);
        } else {
          setError('Failed to load tenant information');
        }
      } catch (err) {
        setError('Error loading tenant information');
        console.error('Tenant context error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTenantInfo();
  }, []);

  return (
    <TenantContext.Provider value={{ tenant, isLoading, error }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
}

export function useTenantFeature(feature: keyof TenantContextType['tenant']['features']) {
  const { tenant } = useTenant();
  return tenant?.features[feature] ?? false;
}

export function useTenantSetting(setting: keyof TenantContextType['tenant']['settings']) {
  const { tenant } = useTenant();
  return tenant?.settings[setting] ?? 'QAR'; // Default currency
}

// Hook for tenant branding
export function useTenantBranding() {
  const { tenant } = useTenant();
  
  if (!tenant) {
    return {
      primaryColor: '#2563eb',
      secondaryColor: '#7c3aed',
      backgroundColor: '#ffffff',
      textColor: '#1f2937',
    };
  }
  
  return tenant.theme;
}