import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getTenantFromRequest, extractSubdomain } from '@/lib/tenant';

export async function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const url = request.nextUrl;
  
  // Extract subdomain
  const subdomain = extractSubdomain(host);
  
  // If no subdomain, redirect to main landing page or tenant selection
  if (!subdomain) {
    // For development, allow localhost
    if (host === 'localhost:3000' || host === '127.0.0.1:3000') {
      return NextResponse.next();
    }
    
    // In production, redirect to main landing page
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // Get tenant from database
  const tenant = await getTenantFromRequest();
  
  // If tenant not found or inactive, redirect to error page
  if (!tenant) {
    return NextResponse.redirect(new URL('/tenant-not-found', request.url));
  }
  
  // Add tenant information to request headers for downstream use
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-tenant-id', tenant.id);
  requestHeaders.set('x-tenant-subdomain', tenant.subdomain);
  requestHeaders.set('x-tenant-name', tenant.name);
  
  // Add tenant theme information
  requestHeaders.set('x-tenant-primary-color', tenant.theme.primaryColor);
  requestHeaders.set('x-tenant-secondary-color', tenant.theme.secondaryColor);
  requestHeaders.set('x-tenant-bg-color', tenant.theme.backgroundColor);
  requestHeaders.set('x-tenant-text-color', tenant.theme.textColor);
  
  // Clone the response and add headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  
  // Add tenant info to response headers for client-side access
  response.headers.set('x-tenant-id', tenant.id);
  response.headers.set('x-tenant-name', tenant.name);
  response.headers.set('x-tenant-subdomain', tenant.subdomain);
  
  // Handle API routes - ensure tenant context
  if (url.pathname.startsWith('/api/')) {
    // Add tenant validation for protected API routes
    const protectedRoutes = [
      '/api/auth/',
      '/api/wps/',
      '/api/sif/',
      '/api/payroll/',
      '/api/employees/',
      '/api/departments/',
    ];
    
    const isProtectedRoute = protectedRoutes.some(route => 
      url.pathname.startsWith(route)
    );
    
    if (isProtectedRoute) {
      // For protected routes, ensure tenant context is available
      if (!tenant) {
        return NextResponse.json(
          { error: 'Tenant not found or inactive' },
          { status: 404 }
        );
      }
    }
  }
  
  return response;
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};