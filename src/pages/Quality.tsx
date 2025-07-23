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
  ClipboardCheck, 
  Plus, 
  Search, 
  Filter,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Users,
  Package,
  FileDown,
  FileUp,
  Eye
} from 'lucide-react';

interface QualityTest {
  id: string;
  testNumber: string;
  productName: string;
  batchNumber: string;
  testType: 'fabric' | 'color' | 'dimension' | 'durability' | 'composition';
  status: 'pending' | 'in-progress' | 'passed' | 'failed' | 'needs-retest';
  testDate: string;
  inspector: string;
  result: number;
  standard: number;
  notes: string;
}

const mockTests: QualityTest[] = [
  {
    id: '1',
    testNumber: 'QT-2024-001',
    productName: 'Cotton T-Shirt Basic',
    batchNumber: 'BATCH-001',
    testType: 'fabric',
    status: 'passed',
    testDate: '2024-01-20',
    inspector: 'John Smith',
    result: 95,
    standard: 90,
    notes: 'Excellent fabric quality, meets all standards'
  },
  {
    id: '2',
    testNumber: 'QT-2024-002',
    productName: 'Denim Jeans Premium',
    batchNumber: 'BATCH-002',
    testType: 'durability',
    status: 'failed',
    testDate: '2024-01-19',
    inspector: 'Sarah Johnson',
    result: 75,
    standard: 85,
    notes: 'Seam strength below required standards'
  },
  {
    id: '3',
    testNumber: 'QT-2024-003',
    productName: 'Silk Dress Formal',
    batchNumber: 'BATCH-003',
    testType: 'color',
    status: 'in-progress',
    testDate: '2024-01-21',
    inspector: 'Mike Chen',
    result: 0,
    standard: 92,
    notes: 'Color fastness test in progress'
  }
];

const Quality = () => {
  const [tests, setTests] = useState<QualityTest[]>(mockTests);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  const getStatusBadge = (status: QualityTest['status']) => {
    const statusConfig = {
      'pending': { variant: 'secondary', label: 'Pending', icon: AlertTriangle },
      'in-progress': { variant: 'default', label: 'In Progress', icon: ClipboardCheck },
      'passed': { variant: 'success', label: 'Passed', icon: CheckCircle },
      'failed': { variant: 'destructive', label: 'Failed', icon: XCircle },
      'needs-retest': { variant: 'warning', label: 'Needs Retest', icon: AlertTriangle }
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

  const getTestTypeBadge = (type: QualityTest['testType']) => {
    const typeConfig = {
      'fabric': { variant: 'default', label: 'Fabric Quality' },
      'color': { variant: 'secondary', label: 'Color Test' },
      'dimension': { variant: 'outline', label: 'Dimensions' },
      'durability': { variant: 'warning', label: 'Durability' },
      'composition': { variant: 'info', label: 'Composition' }
    };
    
    const config = typeConfig[type];
    return <Badge variant={config.variant as any}>{config.label}</Badge>;
  };

  const filteredTests = tests.filter(test => {
    const matchesSearch = test.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.testNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.batchNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || test.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Quality test data export has been initiated.",
    });
  };

  const handleImportData = () => {
    toast({
      title: "Import Ready",
      description: "Please select your quality test data file to import.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quality Control</h1>
          <p className="text-muted-foreground">Comprehensive quality testing and parameter tracking</p>
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
            New Quality Test
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tests This Month</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92.5%</div>
            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Inspectors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Across all shifts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products Tested</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">Unique products</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tests">Quality Tests</TabsTrigger>
          <TabsTrigger value="standards">Test Standards</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Test Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredTests.slice(0, 5).map((test) => (
                  <div key={test.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{test.productName}</p>
                      <p className="text-sm text-muted-foreground">{test.testNumber}</p>
                      <div className="flex gap-2">
                        {getStatusBadge(test.status)}
                        {getTestTypeBadge(test.testType)}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{test.result > 0 ? `${test.result}%` : '-'}</p>
                      <p className="text-sm text-muted-foreground">Score</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quality Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Fabric Quality</span>
                    <span className="text-sm text-muted-foreground">94%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: '94%' }} />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Color Fastness</span>
                    <span className="text-sm text-muted-foreground">88%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-warning h-2 rounded-full" style={{ width: '88%' }} />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Durability</span>
                    <span className="text-sm text-muted-foreground">91%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: '91%' }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tests" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tests..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="passed">Passed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="needs-retest">Needs Retest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tests List */}
          <div className="space-y-4">
            {filteredTests.map((test) => (
              <Card key={test.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{test.productName}</h3>
                        {getStatusBadge(test.status)}
                        {getTestTypeBadge(test.testType)}
                      </div>
                      <p className="text-sm text-muted-foreground">Test: {test.testNumber} | Batch: {test.batchNumber}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-sm font-medium">Inspector</p>
                          <p className="text-sm text-muted-foreground">{test.inspector}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Test Date</p>
                          <p className="text-sm text-muted-foreground">{test.testDate}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Result</p>
                          <p className="text-sm text-muted-foreground">
                            {test.result > 0 ? `${test.result}%` : 'Pending'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Standard</p>
                          <p className="text-sm text-muted-foreground">{test.standard}%</p>
                        </div>
                      </div>
                      {test.notes && (
                        <div className="mt-3">
                          <p className="text-sm font-medium">Notes</p>
                          <p className="text-sm text-muted-foreground">{test.notes}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                      <Button size="sm">Edit Test</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="standards" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quality Standards Configuration</CardTitle>
              <p className="text-sm text-muted-foreground">Define and manage quality testing standards</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="test-type">Test Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select test type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fabric">Fabric Quality</SelectItem>
                        <SelectItem value="color">Color Test</SelectItem>
                        <SelectItem value="dimension">Dimensions</SelectItem>
                        <SelectItem value="durability">Durability</SelectItem>
                        <SelectItem value="composition">Composition</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="min-standard">Minimum Standard (%)</Label>
                    <Input id="min-standard" type="number" placeholder="Enter minimum percentage" />
                  </div>
                  <div>
                    <Label htmlFor="test-method">Test Method</Label>
                    <Textarea id="test-method" placeholder="Describe the testing method" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="standard-name">Standard Name</Label>
                    <Input id="standard-name" placeholder="Enter standard name" />
                  </div>
                  <div>
                    <Label htmlFor="tolerance">Tolerance Range</Label>
                    <Input id="tolerance" placeholder="e.g., ±5%" />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Enter standard description" />
                  </div>
                </div>
              </div>
              <Button className="w-full">Save Standard</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Quality Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <FileDown className="mr-2 h-4 w-4" />
                  Monthly Quality Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileDown className="mr-2 h-4 w-4" />
                  Test Results Summary
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileDown className="mr-2 h-4 w-4" />
                  Failed Tests Analysis
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileDown className="mr-2 h-4 w-4" />
                  Inspector Performance
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Export Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  Export to Excel
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  Export to PDF
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  Export to Word
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  Custom Report Builder
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Quality;