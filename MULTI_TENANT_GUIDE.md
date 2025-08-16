# Multi-Tenant Architecture Implementation Guide

## 🏗️ **Overview**

This document describes the multi-tenant architecture implemented for the Noor Payroll system, allowing multiple companies (tenants) to use the same codebase while maintaining data isolation and custom branding.

## 🎯 **Architecture Benefits**

### **For Businesses**
- **Cost Efficiency**: Single deployment serves multiple tenants
- **Quick Setup**: New tenants can be created in minutes
- **Custom Branding**: Each tenant gets their own look and feel
- **Data Isolation**: Complete separation of tenant data
- **Scalability**: Easy to add new tenants without infrastructure changes

### **For Developers**
- **Single Codebase**: Maintain one application for all tenants
- **Reusable Components**: Shared UI components and business logic
- **Centralized Management**: Easy updates and maintenance
- **Consistent API**: Same endpoints for all tenants with tenant context

## 🔧 **Implementation Details**

### **1. Tenant Identification System**

#### **Subdomain-Based Identification**
- Each tenant gets a unique subdomain (e.g., `company1.noorpayroll.com`)
- Middleware extracts subdomain from request headers
- Tenant configuration loaded from database

#### **Custom Domain Support**
- Tenants can use their own domains (e.g., `payroll.company1.com`)
- Fallback to subdomain if custom domain not configured

### **2. Database Schema**

#### **Tenant Model**
```sql
model Tenant {
  id                   String   @id @default(cuid())
  name                 String
  subdomain            String   @unique
  customDomain         String?
  logo                 String?
  primaryColor         String   @default("#2563eb")
  secondaryColor       String   @default("#7c3aed")
  backgroundColor      String   @default("#ffffff")
  textColor           String   @default("#1f2937")
  wpsEnabled           Boolean  @default(true)
  bankIntegration      Boolean  @default(true)
  reportingEnabled     Boolean  @default(true)
  attendanceEnabled    Boolean  @default(true)
  leaveManagementEnabled Boolean @default(true)
  currency             String   @default("QAR")
  timezone             String   @default("Asia/Qatar")
  dateFormat           String   @default("DD/MM/YYYY")
  language             String   @default("en")
  isActive             Boolean  @default(true)
  createdAt            DateTime @default(now())
  updatedAt            DateTime @updatedAt

  companyId String
  company   Company @relation(fields: [companyId], references: [id], onDelete: Cascade)

  @@map("tenants")
}
```

#### **Data Isolation**
- Each tenant has their own company record
- All users, employees, and data are associated with the company
- Database queries automatically filter by tenant context

### **3. Middleware System**

#### **Request Processing**
1. **Extract Subdomain**: Get subdomain from request headers
2. **Load Tenant**: Fetch tenant configuration from database
3. **Validate Access**: Ensure tenant is active and valid
4. **Set Context**: Add tenant information to request headers
5. **Route Processing**: Continue with tenant context

#### **Header Information**
- `x-tenant-id`: Tenant unique identifier
- `x-tenant-subdomain`: Tenant subdomain
- `x-tenant-name`: Tenant display name
- `x-tenant-primary-color`: Primary brand color
- `x-tenant-secondary-color`: Secondary brand color
- `x-tenant-bg-color`: Background color
- `x-tenant-text-color`: Text color

### **4. Context Provider**

#### **React Context**
```typescript
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
```

#### **Custom Hooks**
- `useTenant()`: Get tenant information
- `useTenantFeature()`: Check if a feature is enabled
- `useTenantSetting()`: Get tenant-specific settings
- `useTenantBranding()`: Get theme colors

### **5. Branding System**

#### **Dynamic Theming**
- CSS custom properties for colors
- Dynamic background and text colors
- Component-level theming support

#### **Branded Components**
- `TenantBranding`: Wrapper for applying tenant styles
- `TenantButton`: Tenant-themed buttons
- `TenantCard`: Tenant-themed cards
- `TenantHeader`: Tenant-themed headers
- `TenantLink`: Tenant-themed links

### **6. API Integration**

#### **Tenant Registration API**
- **Endpoint**: `POST /api/tenants/register`
- **Function**: Create new tenant with company and admin user
- **Validation**: Zod schema for input validation
- **Response**: Tenant information and access URL

#### **Tenant Configuration API**
- **Endpoint**: `GET /api/config`
- **Function**: Get tenant configuration and settings
- **Context**: Automatically loads tenant from request
- **Response**: Tenant and Edge Config information

## 🚀 **Deployment Guide**

### **Vercel Configuration**

#### **vercel.json**
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build && npm run db:generate",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    },
    "app/api/**/*.js": {
      "maxDuration": 30
    }
  },
  "rewrites": [
    {
      "source": "/tenants",
      "destination": "/tenants"
    },
    {
      "source": "/api/tenants/:path*",
      "destination": "/api/tenants/:path*"
    }
  ],
  "env": {
    "DATABASE_URL": "@database_url",
    "EDGE_CONFIG_URL": "@edge_config_url",
    "EDGE_CONFIG_TOKEN": "@edge_config_token",
    "NEXTAUTH_URL": "@nextauth_url",
    "NEXTAUTH_SECRET": "@nextauth_secret"
  }
}
```

### **Environment Variables**

#### **Required Variables**
- `DATABASE_URL`: Database connection string
- `EDGE_CONFIG_URL`: Edge Config service URL
- `EDGE_CONFIG_TOKEN`: Edge Config authentication token
- `NEXTAUTH_URL`: Application URL
- `NEXTAUTH_SECRET`: NextAuth secret key

### **Domain Configuration**

#### **Wildcard Domain**
- Configure `*.noorpayroll.com` to point to Vercel deployment
- Set up custom domains for tenants as needed
- Configure SSL certificates for all domains

## 📝 **Usage Guide**

### **Creating a New Tenant**

#### **1. Using the Management Interface**
1. Go to `/tenants` in your browser
2. Fill in the tenant creation form
3. Submit the form
4. Get the access URL for the new tenant

#### **2. Using the API**
```bash
curl -X POST https://noorpayroll.com/api/tenants/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "ABC Company Payroll",
    "subdomain": "abc-company",
    "companyName": "ABC Company W.L.L.",
    "crNumber": "12345-67890",
    "adminEmail": "admin@abccompany.com",
    "adminPassword": "securepassword123",
    "adminName": "John Doe"
  }'
```

### **Accessing Tenant Sites**

#### **Subdomain Access**
- URL: `https://abc-company.noorpayroll.com`
- Automatically applies tenant branding
- Loads tenant-specific configuration
- Filters data by tenant context

#### **Custom Domain Access**
- URL: `https://payroll.abccompany.com`
- Works the same as subdomain access
- Requires domain configuration

### **Managing Tenant Settings**

#### **Theme Customization**
- Primary and secondary colors
- Background and text colors
- Logo and branding assets

#### **Feature Configuration**
- Enable/disable WPS integration
- Bank integration settings
- Reporting and attendance features
- Leave management settings

#### **Regional Settings**
- Currency (QAR by default)
- Timezone (Asia/Qatar by default)
- Date format and language

## 🔒 **Security Considerations**

### **Data Isolation**
- Each tenant's data is completely separate
- Database queries automatically filter by tenant
- No cross-tenant data access possible

### **Authentication**
- Tenant-specific user accounts
- Role-based access control
- Session management per tenant

### **Access Control**
- Middleware validates tenant for each request
- API endpoints check tenant context
- Unauthorized access blocked

## 📊 **Monitoring and Analytics**

### **Tenant Usage**
- Track active tenants
- Monitor resource usage
- Analyze feature adoption

### **Performance Metrics**
- Response times per tenant
- Database query performance
- API endpoint usage

### **Error Tracking**
- Tenant-specific error logs
- Middleware failure tracking
- Authentication error monitoring

## 🛠️ **Maintenance**

### **Updates and Patches**
- Single codebase updates all tenants
- Feature releases available immediately
- Security patches applied universally

### **Backup and Recovery**
- Database backups include all tenants
- Tenant-specific recovery options
- Disaster recovery procedures

### **Scaling**
- Add new tenants without infrastructure changes
- Handle increased load per tenant
- Optimize resource allocation

## 🎯 **Best Practices**

### **Tenant Management**
- Use descriptive subdomains
- Implement proper validation
- Monitor tenant activity

### **Development**
- Test with multiple tenants
- Use tenant context in all components
- Implement proper error handling

### **Deployment**
- Configure domains properly
- Set up environment variables
- Monitor performance metrics

## 📞 **Support**

### **Documentation**
- This guide provides comprehensive information
- API documentation available in code
- Component usage examples included

### **Troubleshooting**
- Check tenant configuration
- Verify database connections
- Validate domain settings

### **Contact**
- For technical issues, check the codebase
- For deployment problems, review Vercel configuration
- For tenant management, use the admin interface

---

## **Summary**

The multi-tenant architecture provides a robust, scalable, and efficient solution for serving multiple companies from a single codebase. With proper configuration and management, it offers excellent performance and user experience while maintaining data isolation and security.