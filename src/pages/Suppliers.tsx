import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  Star,
  MapPin,
  Phone,
  Mail,
  Package,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  FileDown,
  FileUp,
  Eye
} from 'lucide-react';

interface Supplier {
  id: string;
  name: string;
  category: 'fabric' | 'thread' | 'accessories' | 'trims' | 'dyes';
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  rating: number;
  status: 'active' | 'inactive' | 'pending' | 'blocked';
  totalOrders: number;
  totalValue: number;
  lastOrderDate: string;
  quality: number;
  deliveryTime: number;
  reliability: number;
}

const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'Premium Cotton Mills Ltd.',
    category: 'fabric',
    contactPerson: 'John Anderson',
    email: 'j.anderson@premiumcotton.com',
    phone: '+1-555-0123',
    address: '123 Industrial Ave',
    country: 'USA',
    rating: 4.8,
    status: 'active',
    totalOrders: 156,
    totalValue: 845600,
    lastOrderDate: '2024-01-15',
    quality: 95,
    deliveryTime: 7,
    reliability: 92
  },
  {
    id: '2',
    name: 'Silk Threads International',
    category: 'thread',
    contactPerson: 'Maria Rodriguez',
    email: 'm.rodriguez@silkthreads.com',
    phone: '+1-555-0124',
    address: '456 Textile Road',
    country: 'Mexico',
    rating: 4.5,
    status: 'active',
    totalOrders: 89,
    totalValue: 234500,
    lastOrderDate: '2024-01-12',
    quality: 88,
    deliveryTime: 10,
    reliability: 89
  },
  {
    id: '3',
    name: 'European Dye Solutions',
    category: 'dyes',
    contactPerson: 'Hans Mueller',
    email: 'h.mueller@eurodyes.de',
    phone: '+49-555-0125',
    address: '789 Chemical District',
    country: 'Germany',
    rating: 4.9,
    status: 'active',
    totalOrders: 67,
    totalValue: 189300,
    lastOrderDate: '2024-01-18',
    quality: 97,
    deliveryTime: 14,
    reliability: 95
  }
];

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  const getStatusBadge = (status: Supplier['status']) => {
    const statusConfig = {
      'active': { variant: 'success', label: 'Active', icon: CheckCircle },
      'inactive': { variant: 'secondary', label: 'Inactive', icon: AlertCircle },
      'pending': { variant: 'warning', label: 'Pending', icon: AlertCircle },
      'blocked': { variant: 'destructive', label: 'Blocked', icon: AlertCircle }
    };
    
    const config = statusConfig[status];
    const Icon = config.icon;
    return (
      <Badge variant={config.variant as any} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const getCategoryBadge = (category: Supplier['category']) => {
    const categoryConfig = {
      'fabric': { variant: 'default', label: 'Fabric' },
      'thread': { variant: 'secondary', label: 'Thread' },
      'accessories': { variant: 'outline', label: 'Accessories' },
      'trims': { variant: 'info', label: 'Trims' },
      'dyes': { variant: 'warning', label: 'Dyes' }
    };
    
    const config = categoryConfig[category];
    return <Badge variant={config.variant as any}>{config.label}</Badge>;
  };

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || supplier.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || supplier.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'fill-warning text-warning' : 'text-muted-foreground'
            }`}
          />
        ))}
        <span className="text-sm text-muted-foreground ml-1">({rating})</span>
      </div>
    );
  };

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Supplier data export has been initiated.",
    });
  };

  const handleImportData = () => {
    toast({
      title: "Import Ready",
      description: "Please select your supplier data file to import.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Supplier Management</h1>
          <p className="text-muted-foreground">Manage and track your textile suppliers</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleImportData}>
            <FileUp className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" onClick={handleExportData}>
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Supplier
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Suppliers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">+12 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Suppliers</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">70% of total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">This year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.6</div>
            <p className="text-xs text-muted-foreground">Out of 5 stars</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Suppliers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredSuppliers.slice(0, 5).map((supplier) => (
                  <div key={supplier.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{supplier.name}</p>
                      <p className="text-sm text-muted-foreground">{supplier.contactPerson}</p>
                      <div className="flex gap-2">
                        {getStatusBadge(supplier.status)}
                        {getCategoryBadge(supplier.category)}
                      </div>
                    </div>
                    <div className="text-right">
                      {renderStarRating(supplier.rating)}
                      <p className="text-sm text-muted-foreground mt-1">{supplier.totalOrders} orders</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Supplier Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { category: 'Fabric', count: 45, percentage: 35 },
                    { category: 'Thread', count: 28, percentage: 22 },
                    { category: 'Dyes', count: 23, percentage: 18 },
                    { category: 'Accessories', count: 19, percentage: 15 },
                    { category: 'Trims', count: 12, percentage: 10 }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{item.category}</span>
                        <span className="text-muted-foreground">{item.count} suppliers</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all" 
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search suppliers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="fabric">Fabric</SelectItem>
                <SelectItem value="thread">Thread</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
                <SelectItem value="trims">Trims</SelectItem>
                <SelectItem value="dyes">Dyes</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Suppliers List */}
          <div className="space-y-4">
            {filteredSuppliers.map((supplier) => (
              <Card key={supplier.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{supplier.name}</h3>
                        {getStatusBadge(supplier.status)}
                        {getCategoryBadge(supplier.category)}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Contact Person</p>
                            <p className="text-sm text-muted-foreground">{supplier.contactPerson}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Email</p>
                            <p className="text-sm text-muted-foreground">{supplier.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Phone</p>
                            <p className="text-sm text-muted-foreground">{supplier.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Location</p>
                            <p className="text-sm text-muted-foreground">{supplier.country}</p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t">
                        <div>
                          <p className="text-sm font-medium">Total Orders</p>
                          <p className="text-sm text-muted-foreground">{supplier.totalOrders}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Total Value</p>
                          <p className="text-sm text-muted-foreground">${supplier.totalValue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Last Order</p>
                          <p className="text-sm text-muted-foreground">{supplier.lastOrderDate}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Rating</p>
                          {renderStarRating(supplier.rating)}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <Button size="sm" variant="outline">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                      <Button size="sm">Edit Supplier</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredSuppliers.slice(0, 3).map((supplier) => (
                  <div key={supplier.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{supplier.name}</h4>
                      {renderStarRating(supplier.rating)}
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Quality</p>
                        <div className="w-full bg-secondary rounded-full h-2 mt-1">
                          <div 
                            className="bg-success h-2 rounded-full" 
                            style={{ width: `${supplier.quality}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{supplier.quality}%</p>
                      </div>
                      <div>
                        <p className="font-medium">Delivery</p>
                        <div className="w-full bg-secondary rounded-full h-2 mt-1">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${(30 - supplier.deliveryTime) * 3}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{supplier.deliveryTime} days</p>
                      </div>
                      <div>
                        <p className="font-medium">Reliability</p>
                        <div className="w-full bg-secondary rounded-full h-2 mt-1">
                          <div 
                            className="bg-warning h-2 rounded-full" 
                            style={{ width: `${supplier.reliability}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{supplier.reliability}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Average Delivery Time</h4>
                      <span className="text-lg font-bold">10.2 days</span>
                    </div>
                    <p className="text-sm text-muted-foreground">2 days improvement from last quarter</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Quality Score</h4>
                      <span className="text-lg font-bold text-success">92%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Above industry average</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Supplier Reliability</h4>
                      <span className="text-lg font-bold">89%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">On-time delivery rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Supplier Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
                  <div className="text-center space-y-2">
                    <TrendingUp className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Supplier analytics charts</p>
                    <p className="text-xs text-muted-foreground">Coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Top Performing Category</h4>
                    <p className="text-lg font-bold text-success">Fabric Suppliers</p>
                    <p className="text-sm text-muted-foreground">4.8 average rating</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Cost Optimization</h4>
                    <p className="text-sm text-muted-foreground">Switch to Supplier B for 12% savings</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Risk Assessment</h4>
                    <p className="text-sm text-muted-foreground">2 suppliers need performance review</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Suppliers;