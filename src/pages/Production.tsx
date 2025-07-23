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
  Layers, 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  Clock,
  Users,
  Package,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  FileDown,
  FileUp
} from 'lucide-react';

interface ProductionOrder {
  id: string;
  orderNumber: string;
  productName: string;
  quantity: number;
  status: 'planning' | 'in-progress' | 'quality-check' | 'completed' | 'delayed';
  startDate: string;
  expectedCompletion: string;
  assignedTeam: string;
  progress: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

const mockOrders: ProductionOrder[] = [
  {
    id: '1',
    orderNumber: 'PO-2024-001',
    productName: 'Cotton T-Shirt Basic',
    quantity: 5000,
    status: 'in-progress',
    startDate: '2024-01-15',
    expectedCompletion: '2024-02-15',
    assignedTeam: 'Team Alpha',
    progress: 65,
    priority: 'high'
  },
  {
    id: '2',
    orderNumber: 'PO-2024-002',
    productName: 'Denim Jeans Premium',
    quantity: 2500,
    status: 'quality-check',
    startDate: '2024-01-10',
    expectedCompletion: '2024-02-10',
    assignedTeam: 'Team Beta',
    progress: 90,
    priority: 'medium'
  },
  {
    id: '3',
    orderNumber: 'PO-2024-003',
    productName: 'Silk Dress Formal',
    quantity: 1000,
    status: 'planning',
    startDate: '2024-02-01',
    expectedCompletion: '2024-03-01',
    assignedTeam: 'Team Gamma',
    progress: 15,
    priority: 'urgent'
  }
];

const Production = () => {
  const [orders, setOrders] = useState<ProductionOrder[]>(mockOrders);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  const getStatusBadge = (status: ProductionOrder['status']) => {
    const statusConfig = {
      'planning': { variant: 'secondary', label: 'Planning' },
      'in-progress': { variant: 'default', label: 'In Progress' },
      'quality-check': { variant: 'warning', label: 'Quality Check' },
      'completed': { variant: 'success', label: 'Completed' },
      'delayed': { variant: 'destructive', label: 'Delayed' }
    };
    
    const config = statusConfig[status];
    return <Badge variant={config.variant as any}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority: ProductionOrder['priority']) => {
    const priorityConfig = {
      'low': { variant: 'secondary', label: 'Low' },
      'medium': { variant: 'default', label: 'Medium' },
      'high': { variant: 'warning', label: 'High' },
      'urgent': { variant: 'destructive', label: 'Urgent' }
    };
    
    const config = priorityConfig[priority];
    return <Badge variant={config.variant as any}>{config.label}</Badge>;
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Production data export has been initiated.",
    });
  };

  const handleImportData = () => {
    toast({
      title: "Import Ready",
      description: "Please select your production data file to import.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Production Management</h1>
          <p className="text-muted-foreground">Track and manage your production orders</p>
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
            New Production Order
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Production</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,500</div>
            <p className="text-xs text-muted-foreground">Units this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Teams Active</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Across all shifts</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Production Orders</TabsTrigger>
          <TabsTrigger value="planning">Production Planning</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Current Production Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredOrders.slice(0, 3).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{order.productName}</p>
                      <p className="text-sm text-muted-foreground">{order.orderNumber}</p>
                      <div className="flex gap-2">
                        {getStatusBadge(order.status)}
                        {getPriorityBadge(order.priority)}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{order.progress}%</p>
                      <p className="text-sm text-muted-foreground">Progress</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Production Order
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Production
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Quality Inspection
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Clock className="mr-2 h-4 w-4" />
                  Track Progress
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="quality-check">Quality Check</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="delayed">Delayed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{order.productName}</h3>
                        {getStatusBadge(order.status)}
                        {getPriorityBadge(order.priority)}
                      </div>
                      <p className="text-sm text-muted-foreground">Order: {order.orderNumber}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-sm font-medium">Quantity</p>
                          <p className="text-sm text-muted-foreground">{order.quantity.toLocaleString()} units</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Team</p>
                          <p className="text-sm text-muted-foreground">{order.assignedTeam}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Start Date</p>
                          <p className="text-sm text-muted-foreground">{order.startDate}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Expected Completion</p>
                          <p className="text-sm text-muted-foreground">{order.expectedCompletion}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="text-3xl font-bold text-primary">{order.progress}%</div>
                      <div className="w-32 bg-secondary rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all" 
                          style={{ width: `${order.progress}%` }}
                        />
                      </div>
                      <Button size="sm">View Details</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="planning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Production Planning</CardTitle>
              <p className="text-sm text-muted-foreground">Plan and schedule new production orders</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="product-name">Product Name</Label>
                    <Input id="product-name" placeholder="Enter product name" />
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input id="quantity" type="number" placeholder="Enter quantity" />
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input id="start-date" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="team">Assigned Team</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select team" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alpha">Team Alpha</SelectItem>
                        <SelectItem value="beta">Team Beta</SelectItem>
                        <SelectItem value="gamma">Team Gamma</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="notes">Production Notes</Label>
                    <Textarea id="notes" placeholder="Enter any special instructions" />
                  </div>
                </div>
              </div>
              <Button className="w-full">Create Production Order</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Production Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Production analytics and insights coming soon...</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Quality Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Quality tracking charts coming soon...</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Production;