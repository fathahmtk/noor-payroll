'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TenantHeader } from '@/components/tenant-branding';
import { TenantButton } from '@/components/tenant-branding';
import { useToast } from '@/hooks/use-toast';

interface TenantFormData {
  name: string;
  subdomain: string;
  customDomain: string;
  companyName: string;
  crNumber: string;
  adminEmail: string;
  adminPassword: string;
  adminName: string;
}

export default function TenantsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<TenantFormData>({
    name: '',
    subdomain: '',
    customDomain: '',
    companyName: '',
    crNumber: '',
    adminEmail: '',
    adminPassword: '',
    adminName: '',
  });
  const [createdTenant, setCreatedTenant] = useState<any>(null);
  const { toast } = useToast();

  const handleInputChange = (field: keyof TenantFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/tenants/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setCreatedTenant(data.tenant);
        toast({
          title: 'Tenant Created Successfully',
          description: `Access URL: ${data.accessUrl}`,
        });
        
        // Reset form
        setFormData({
          name: '',
          subdomain: '',
          customDomain: '',
          companyName: '',
          crNumber: '',
          adminEmail: '',
          adminPassword: '',
          adminName: '',
        });
      } else {
        toast({
          title: 'Creation Failed',
          description: data.error || 'Failed to create tenant',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error creating tenant:', error);
      toast({
        title: 'Error',
        description: 'Failed to create tenant. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <TenantHeader level={1}>Tenant Management</TenantHeader>
          <p className="text-gray-600">
            Create and manage tenant instances for your payroll system
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create New Tenant</CardTitle>
            <CardDescription>
              Set up a new tenant with custom branding and configuration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tenant Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="e.g., ABC Company Payroll"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subdomain">Subdomain</Label>
                  <Input
                    id="subdomain"
                    value={formData.subdomain}
                    onChange={(e) => handleInputChange('subdomain', e.target.value.toLowerCase())}
                    placeholder="e.g., abc-company"
                    pattern="[a-z0-9-]+"
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Only lowercase letters, numbers, and hyphens allowed
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customDomain">Custom Domain (Optional)</Label>
                  <Input
                    id="customDomain"
                    value={formData.customDomain}
                    onChange={(e) => handleInputChange('customDomain', e.target.value)}
                    placeholder="e.g., payroll.abccompany.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="e.g., ABC Company W.L.L."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="crNumber">Commercial Registration Number</Label>
                  <Input
                    id="crNumber"
                    value={formData.crNumber}
                    onChange={(e) => handleInputChange('crNumber', e.target.value)}
                    placeholder="e.g., 12345-67890"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adminName">Admin Name</Label>
                  <Input
                    id="adminName"
                    value={formData.adminName}
                    onChange={(e) => handleInputChange('adminName', e.target.value)}
                    placeholder="e.g., John Doe"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adminEmail">Admin Email</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={formData.adminEmail}
                    onChange={(e) => handleInputChange('adminEmail', e.target.value)}
                    placeholder="admin@abccompany.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adminPassword">Admin Password</Label>
                  <Input
                    id="adminPassword"
                    type="password"
                    value={formData.adminPassword}
                    onChange={(e) => handleInputChange('adminPassword', e.target.value)}
                    placeholder="Minimum 8 characters"
                    required
                  />
                </div>
              </div>

              <TenantButton
                type="submit"
                disabled={isLoading || !formData.name || !formData.subdomain || !formData.companyName || !formData.crNumber || !formData.adminEmail || !formData.adminPassword || !formData.adminName}
                className="w-full"
              >
                {isLoading ? 'Creating Tenant...' : 'Create Tenant'}
              </TenantButton>
            </form>
          </CardContent>
        </Card>

        {createdTenant && (
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800">Tenant Created Successfully!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold text-green-700">Tenant Name</Label>
                  <p className="text-green-800">{createdTenant.name}</p>
                </div>
                <div>
                  <Label className="font-semibold text-green-700">Subdomain</Label>
                  <p className="text-green-800">{createdTenant.subdomain}</p>
                </div>
              </div>
              <div>
                <Label className="font-semibold text-green-700">Access URL</Label>
                <p className="text-green-800 font-mono">
                  https://{createdTenant.subdomain}.your-domain.com
                </p>
              </div>
              <div className="text-sm text-green-700">
                <p>✅ Tenant setup complete</p>
                <p>✅ Admin account created</p>
                <p>✅ Database initialized</p>
                <p>✅ Ready for login</p>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Tenant Features</CardTitle>
            <CardDescription>
              All tenants include these features by default
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">🏢 WPS Compliance</h4>
                <p className="text-sm text-gray-600">
                  Full integration with Qatar Wage Protection System
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">👥 Multi-Role Access</h4>
                <p className="text-sm text-gray-600">
                  Owner, HR, Accountant, and Employee roles
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">🎨 Custom Branding</h4>
                <p className="text-sm text-gray-600">
                  Custom colors, logos, and themes
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">📊 Real-time Reports</h4>
                <p className="text-sm text-gray-600">
                  Live payroll and attendance reporting
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">🏦 Bank Integration</h4>
                <p className="text-sm text-gray-600">
                  Direct bank transfer capabilities
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">🔒 Data Security</h4>
                <p className="text-sm text-gray-600">
                  Secure tenant data isolation
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}