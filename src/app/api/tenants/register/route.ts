import { NextRequest, NextResponse } from 'next/server';
import { createTenant } from '@/lib/tenant';
import { z } from 'zod';

// Validation schema for tenant registration
const tenantRegistrationSchema = z.object({
  name: z.string().min(1, 'Tenant name is required').max(100, 'Tenant name too long'),
  subdomain: z.string().min(1, 'Subdomain is required').max(50, 'Subdomain too long')
    .regex(/^[a-z0-9-]+$/, 'Subdomain can only contain lowercase letters, numbers, and hyphens'),
  customDomain: z.string().optional(),
  companyName: z.string().min(1, 'Company name is required').max(100, 'Company name too long'),
  crNumber: z.string().min(1, 'CR number is required').max(50, 'CR number too long'),
  adminEmail: z.string().email('Invalid email address'),
  adminPassword: z.string().min(8, 'Password must be at least 8 characters'),
  adminName: z.string().min(1, 'Admin name is required').max(100, 'Admin name too long'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input data
    const validatedData = tenantRegistrationSchema.parse(body);
    
    // Create tenant
    const tenant = await createTenant(validatedData);
    
    if (!tenant) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to create tenant',
          message: 'Subdomain may already be taken or there was an error during creation',
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json({
      success: true,
      tenant: {
        id: tenant.id,
        name: tenant.name,
        subdomain: tenant.subdomain,
        customDomain: tenant.customDomain,
      },
      message: 'Tenant created successfully',
      accessUrl: `https://${tenant.subdomain}.your-domain.com`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Tenant registration error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          message: error.errors[0]?.message || 'Invalid input data',
          details: error.errors,
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create tenant',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}

// Get tenant information by subdomain
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const subdomain = searchParams.get('subdomain');
    
    if (!subdomain) {
      return NextResponse.json(
        {
          success: false,
          error: 'Subdomain parameter is required',
        },
        { status: 400 }
      );
    }
    
    const { getTenantBySubdomain } = await import('@/lib/tenant');
    const tenant = await getTenantBySubdomain(subdomain);
    
    if (!tenant) {
      return NextResponse.json(
        {
          success: false,
          error: 'Tenant not found',
          message: 'The specified subdomain does not exist or is inactive',
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      tenant: {
        id: tenant.id,
        name: tenant.name,
        subdomain: tenant.subdomain,
        customDomain: tenant.customDomain,
        theme: tenant.theme,
        features: tenant.features,
        settings: tenant.settings,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching tenant:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch tenant information',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}