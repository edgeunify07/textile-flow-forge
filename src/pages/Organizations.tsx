import { useState } from 'react';
import { Plus, Building2, Edit, Trash2, Eye, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
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
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);
  const [viewingOrg, setViewingOrg] = useState<Organization | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    gstNumber: ''
  });
  const { toast } = useToast();

  const filteredOrganizations = organizations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddOrganization = () => {
    if (!formData.name || !formData.address || !formData.phone || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newOrg: Organization = {
      id: Date.now().toString(),
      name: formData.name,
      address: formData.address,
      phone: formData.phone,
      email: formData.email,
      gstNumber: formData.gstNumber,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setOrganizations([...organizations, newOrg]);
    setFormData({ name: '', address: '', phone: '', email: '', gstNumber: '' });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Organization Added",
      description: `${formData.name} has been successfully added.`
    });
  };

  const handleEditOrganization = () => {
    if (!editingOrg || !formData.name || !formData.address || !formData.phone || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const updatedOrgs = organizations.map(org =>
      org.id === editingOrg.id
        ? {
            ...org,
            name: formData.name,
            address: formData.address,
            phone: formData.phone,
            email: formData.email,
            gstNumber: formData.gstNumber,
            updatedAt: new Date()
          }
        : org
    );

    setOrganizations(updatedOrgs);
    setEditingOrg(null);
    setFormData({ name: '', address: '', phone: '', email: '', gstNumber: '' });
    
    toast({
      title: "Organization Updated",
      description: `${formData.name} has been successfully updated.`
    });
  };

  const handleDeleteOrganization = (orgId: string) => {
    const orgToDelete = organizations.find(org => org.id === orgId);
    setOrganizations(organizations.filter(org => org.id !== orgId));
    
    toast({
      title: "Organization Deleted",
      description: `${orgToDelete?.name} has been successfully deleted.`
    });
  };

  const openEditDialog = (org: Organization) => {
    setEditingOrg(org);
    setFormData({
      name: org.name,
      address: org.address,
      phone: org.phone,
      email: org.email,
      gstNumber: org.gstNumber || ''
    });
  };

  const openAddDialog = () => {
    setFormData({ name: '', address: '', phone: '', email: '', gstNumber: '' });
    setIsAddDialogOpen(true);
  };

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
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="gradient" className="gap-2" onClick={openAddDialog}>
              <Plus className="h-4 w-4" />
              Add Organization
            </Button>
          </DialogTrigger>
        </Dialog>
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
                <Dialog open={viewingOrg?.id === org.id} onOpenChange={(open) => !open && setViewingOrg(null)}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => setViewingOrg(org)}>
                      <Eye className="h-3 w-3" />
                      View
                    </Button>
                  </DialogTrigger>
                </Dialog>
                
                <Dialog open={editingOrg?.id === org.id} onOpenChange={(open) => !open && setEditingOrg(null)}>
                  <DialogTrigger asChild>
                    <Button variant="secondary" size="sm" className="flex-1 gap-1" onClick={() => openEditDialog(org)}>
                      <Edit className="h-3 w-3" />
                      Edit
                    </Button>
                  </DialogTrigger>
                </Dialog>
                
                <Button variant="destructive" size="sm" className="gap-1" onClick={() => handleDeleteOrganization(org.id)}>
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
            <Button variant="textile" className="gap-2" onClick={openAddDialog}>
              <Plus className="h-4 w-4" />
              Add Your First Organization
            </Button>
          )}
        </div>
      )}

      {/* Add/Edit Organization Dialog */}
      <Dialog open={isAddDialogOpen || !!editingOrg} onOpenChange={(open) => {
        if (!open) {
          setIsAddDialogOpen(false);
          setEditingOrg(null);
        }
      }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingOrg ? 'Edit Organization' : 'Add New Organization'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Organization Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter organization name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Enter complete address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter phone number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gstNumber">GST Number</Label>
              <Input
                id="gstNumber"
                value={formData.gstNumber}
                onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                placeholder="Enter GST number (optional)"
              />
            </div>
            <div className="flex gap-2 pt-4">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  setIsAddDialogOpen(false);
                  setEditingOrg(null);
                }}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1"
                onClick={editingOrg ? handleEditOrganization : handleAddOrganization}
              >
                {editingOrg ? 'Update' : 'Add'} Organization
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Organization Dialog */}
      <Dialog open={!!viewingOrg} onOpenChange={(open) => !open && setViewingOrg(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              {viewingOrg?.name}
            </DialogTitle>
          </DialogHeader>
          {viewingOrg && (
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Address</Label>
                <p className="text-sm mt-1">{viewingOrg.address}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                  <p className="text-sm mt-1">{viewingOrg.phone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                  <p className="text-sm mt-1">{viewingOrg.email}</p>
                </div>
              </div>
              {viewingOrg.gstNumber && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">GST Number</Label>
                  <p className="text-sm mt-1 font-mono">{viewingOrg.gstNumber}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Created</Label>
                  <p className="text-sm mt-1">{viewingOrg.createdAt.toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Updated</Label>
                  <p className="text-sm mt-1">{viewingOrg.updatedAt.toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setViewingOrg(null)}>
                  Close
                </Button>
                <Button className="flex-1" onClick={() => {
                  setViewingOrg(null);
                  openEditDialog(viewingOrg);
                }}>
                  Edit Organization
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}