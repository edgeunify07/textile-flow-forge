import { useState } from 'react';
import { Plus, Building2, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Organization } from '@/types/textile';

// Mock data - will be replaced with actual data management
const mockOrganizations: Organization[] = [
  {
    id: '1',
    name: 'Textile Innovations Ltd.',
    address: '123 Industrial Estate, Mumbai, Maharashtra',
    phone: '+91 98765 43210',
    email: 'info@textileinnovations.com',
    gstNumber: '27AABCT1234E1Z5',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Premium Garments Co.',
    address: '456 Export Zone, Tirupur, Tamil Nadu',
    phone: '+91 87654 32109',
    email: 'contact@premiumgarments.in',
    gstNumber: '33AABCP5678F1Z2',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
  },
];

export default function Organizations() {
  const [organizations, setOrganizations] = useState<Organization[]>(mockOrganizations);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrganizations = organizations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Organizations</h1>
          <p className="text-muted-foreground mt-1">
            Manage your textile manufacturing companies and their details
          </p>
        </div>
        <Button variant="gradient" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Organization
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search organizations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
      </div>

      {/* Organizations Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredOrganizations.map((org) => (
          <Card key={org.id} className="hover:shadow-elegant transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-gradient-textile flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{org.name}</CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      Active
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-muted-foreground">Address:</span>
                  <p className="text-foreground">{org.address}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-muted-foreground">Phone:</span>
                    <p className="text-foreground">{org.phone}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Email:</span>
                    <p className="text-foreground text-xs">{org.email}</p>
                  </div>
                </div>
                
                {org.gstNumber && (
                  <div>
                    <span className="font-medium text-muted-foreground">GST Number:</span>
                    <p className="text-foreground font-mono text-xs">{org.gstNumber}</p>
                  </div>
                )}
                
                <div>
                  <span className="font-medium text-muted-foreground">Created:</span>
                  <p className="text-foreground">{org.createdAt.toLocaleDateString()}</p>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t">
                <Button variant="outline" size="sm" className="flex-1 gap-1">
                  <Eye className="h-3 w-3" />
                  View
                </Button>
                <Button variant="secondary" size="sm" className="flex-1 gap-1">
                  <Edit className="h-3 w-3" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" className="gap-1">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredOrganizations.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No organizations found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first organization.'}
          </p>
          {!searchTerm && (
            <Button variant="textile" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Your First Organization
            </Button>
          )}
        </div>
      )}
    </div>
  );
}