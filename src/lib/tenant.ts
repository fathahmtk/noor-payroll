import { headers } from 'next/headers';

export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  customDomain?: string;
  logo?: string;
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
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Default tenant configuration
export const DEFAULT_TENANT: Partial<Tenant> = {
  theme: {
    primaryColor: '#2563eb',
    secondaryColor: '#7c3aed',
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
  },
  features: {
    wpsEnabled: true,
    bankIntegration: true,
    reporting: true,
    attendance: true,
    leaveManagement: true,
  },
  settings: {
    currency: 'QAR',
    timezone: 'Asia/Qatar',
    dateFormat: 'DD/MM/YYYY',
    language: 'en',
  },
  isActive: true,
};

// Get tenant from request headers
export async function getTenantFromRequest(): Promise<Tenant | null> {
  const headerList = headers();
  const host = headerList.get('host') || '';
  
  // Extract subdomain from host
  const subdomain = extractSubdomain(host);
  
  if (!subdomain) {
    return null;
  }
  
  // Get tenant from database
  return await getTenantBySubdomain(subdomain);
}

// Extract subdomain from host
export function extractSubdomain(host: string): string | null {
  // Remove port if present
  host = host.split(':')[0];
  
  // Remove localhost for development
  if (host === 'localhost' || host === '127.0.0.1') {
    return null;
  }
  
  // Split by dots
  const parts = host.split('.');
  
  // If we have more than 2 parts, the first part is the subdomain
  if (parts.length > 2) {
    return parts[0];
  }
  
  return null;
}

// Get tenant by subdomain from database
export async function getTenantBySubdomain(subdomain: string): Promise<Tenant | null> {
  try {
    // Import database client
    const { db } = await import('@/lib/db');
    
    // Find tenant by subdomain
    const tenant = await db.tenant.findUnique({
      where: { subdomain },
      include: {
        company: true,
      },
    });
    
    if (!tenant || !tenant.isActive) {
      return null;
    }
    
    return {
      id: tenant.id,
      name: tenant.name,
      subdomain: tenant.subdomain,
      customDomain: tenant.customDomain || undefined,
      logo: tenant.logo || undefined,
      theme: {
        primaryColor: tenant.primaryColor || DEFAULT_TENANT.theme?.primaryColor || '#2563eb',
        secondaryColor: tenant.secondaryColor || DEFAULT_TENANT.theme?.secondaryColor || '#7c3aed',
        backgroundColor: tenant.backgroundColor || DEFAULT_TENANT.theme?.backgroundColor || '#ffffff',
        textColor: tenant.textColor || DEFAULT_TENANT.theme?.textColor || '#1f2937',
      },
      features: {
        wpsEnabled: tenant.wpsEnabled ?? DEFAULT_TENANT.features?.wpsEnabled ?? true,
        bankIntegration: tenant.bankIntegration ?? DEFAULT_TENANT.features?.bankIntegration ?? true,
        reporting: tenant.reportingEnabled ?? DEFAULT_TENANT.features?.reporting ?? true,
        attendance: tenant.attendanceEnabled ?? DEFAULT_TENANT.features?.attendance ?? true,
        leaveManagement: tenant.leaveManagementEnabled ?? DEFAULT_TENANT.features?.leaveManagement ?? true,
      },
      settings: {
        currency: tenant.currency || DEFAULT_TENANT.settings?.currency || 'QAR',
        timezone: tenant.timezone || DEFAULT_TENANT.settings?.timezone || 'Asia/Qatar',
        dateFormat: tenant.dateFormat || DEFAULT_TENANT.settings?.dateFormat || 'DD/MM/YYYY',
        language: tenant.language || DEFAULT_TENANT.settings?.language || 'en',
      },
      isActive: tenant.isActive,
      createdAt: tenant.createdAt,
      updatedAt: tenant.updatedAt,
    };
  } catch (error) {
    console.error('Error fetching tenant:', error);
    return null;
  }
}

// Get tenant by custom domain
export async function getTenantByCustomDomain(domain: string): Promise<Tenant | null> {
  try {
    const { db } = await import('@/lib/db');
    
    const tenant = await db.tenant.findUnique({
      where: { customDomain: domain },
    });
    
    if (!tenant || !tenant.isActive) {
      return null;
    }
    
    return getTenantBySubdomain(tenant.subdomain);
  } catch (error) {
    console.error('Error fetching tenant by custom domain:', error);
    return null;
  }
}

// Validate tenant access
export async function validateTenantAccess(tenantId: string, userId: string): Promise<boolean> {
  try {
    const { db } = await import('@/lib/db');
    
    // Check if user belongs to this tenant
    const user = await db.user.findFirst({
      where: {
        id: userId,
        companyId: tenantId,
        isActive: true,
      },
    });
    
    return !!user;
  } catch (error) {
    console.error('Error validating tenant access:', error);
    return false;
  }
}

// Create new tenant
export async function createTenant(tenantData: {
  name: string;
  subdomain: string;
  customDomain?: string;
  companyName: string;
  crNumber: string;
  adminEmail: string;
  adminPassword: string;
  adminName: string;
}): Promise<Tenant | null> {
  try {
    const { db } = await import('@/lib/db');
    
    // Check if subdomain is available
    const existingTenant = await db.tenant.findUnique({
      where: { subdomain: tenantData.subdomain },
    });
    
    if (existingTenant) {
      throw new Error('Subdomain already taken');
    }
    
    // Hash password using server-side utilities
    const { hashPassword } = await import('@/lib/password-utils');
    const hashedPassword = await hashPassword(tenantData.adminPassword);
    
    // Create tenant and company in a transaction
    const result = await db.$transaction(async (tx) => {
      // Create company first
      const company = await tx.company.create({
        data: {
          name: tenantData.companyName,
          crNumber: tenantData.crNumber,
        },
      });
      
      // Create tenant
      const tenant = await tx.tenant.create({
        data: {
          name: tenantData.name,
          subdomain: tenantData.subdomain,
          customDomain: tenantData.customDomain,
          companyId: company.id,
          ...DEFAULT_TENANT,
        },
      });
      
      // Create admin user
      const user = await tx.user.create({
        data: {
          email: tenantData.adminEmail,
          password: hashedPassword,
          name: tenantData.adminName,
          role: 'OWNER',
          companyId: company.id,
        },
      });
      
      return { tenant, company, user };
    });
    
    return getTenantBySubdomain(result.tenant.subdomain);
  } catch (error) {
    console.error('Error creating tenant:', error);
    return null;
  }
}