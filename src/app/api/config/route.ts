import { NextRequest, NextResponse } from 'next/server';
import { edgeConfig, getAllConfig } from '@/lib/edge-config';
import { getTenantFromRequest } from '@/lib/tenant';

export async function GET(request: NextRequest) {
  try {
    // Get tenant information from request headers
    const tenant = await getTenantFromRequest();
    
    // Get all configuration from Edge Config
    const config = await getAllConfig();
    
    return NextResponse.json({
      success: true,
      tenant,
      config,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching configuration:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch configuration',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, value } = body;

    if (!key || value === undefined) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: key and value',
        },
        { status: 400 }
      );
    }

    // Note: Edge Config values are typically set through the Vercel dashboard
    // This endpoint is for configuration management and validation
    
    return NextResponse.json({
      success: true,
      message: 'Configuration update request received',
      key,
      value,
      note: 'Edge Config values should be updated through Vercel dashboard',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error updating Edge Config:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update configuration',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}