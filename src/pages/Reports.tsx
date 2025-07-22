import { useState } from 'react';
import { FileText, Download, Calendar, Filter, Plus, Eye, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ReportConfig } from '@/types/textile';

// Mock report data
const mockReports: ReportConfig[] = [
  {
    id: '1',
    name: 'Monthly BOM Cost Analysis',
    type: 'bom',
    format: 'excel',
    template: 'cost-analysis-template',
    fields: ['styleName', 'totalMaterialCost', 'laborCost', 'sellingPrice', 'profitMargin'],
    filters: { month: 'current', organization: 'all' },
    schedule: 'monthly',
    recipients: ['manager@company.com', 'finance@company.com'],
    isActive: true,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Inventory Status Report',
    type: 'inventory',
    format: 'pdf',
    template: 'inventory-status-template',
    fields: ['itemName', 'currentStock', 'reorderLevel', 'totalValue', 'supplier'],
    filters: { category: 'all', stockStatus: 'low' },
    schedule: 'weekly',
    recipients: ['inventory@company.com'],
    isActive: true,
    createdAt: new Date('2024-01-10'),
  },
  {
    id: '3',
    name: 'Production Summary',
    type: 'production',
    format: 'word',
    template: 'production-summary-template',
    fields: ['orderNumber', 'styleName', 'quantity', 'status', 'deliveryDate'],
    filters: { status: 'in-production', dateRange: 'current-month' },
    recipients: ['production@company.com', 'manager@company.com'],
    isActive: true,
    createdAt: new Date('2024-01-08'),
  },
];

const reportTemplates = [
  { 
    id: 'bom-detailed', 
    name: 'Detailed BOM Report', 
    type: 'bom', 
    description: 'Complete bill of materials with cost breakdown' 
  },
  { 
    id: 'cost-comparison', 
    name: 'Cost Comparison Report', 
    type: 'costing', 
    description: 'Compare costs across different styles and periods' 
  },
  { 
    id: 'inventory-valuation', 
    name: 'Inventory Valuation', 
    type: 'inventory', 
    description: 'Current inventory value and aging analysis' 
  },
  { 
    id: 'production-efficiency', 
    name: 'Production Efficiency', 
    type: 'production', 
    description: 'Production performance and efficiency metrics' 
  },
  { 
    id: 'quality-dashboard', 
    name: 'Quality Dashboard', 
    type: 'quality', 
    description: 'Quality control metrics and test results' 
  },
  { 
    id: 'financial-summary', 
    name: 'Financial Summary', 
    type: 'financial', 
    description: 'Revenue, costs, and profitability analysis' 
  },
];

export default function Reports() {
  const [reports, setReports] = useState<ReportConfig[]>(mockReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredReports = reports.filter(report =>
    (selectedType === 'all' || report.type === selectedType) &&
    report.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGenerateReport = (reportId: string) => {
    // This would typically trigger report generation
    console.log('Generating report:', reportId);
  };

  const ReportListTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Generated Reports</h3>
        <Button variant="textile" className="gap-2">
          <Plus className="h-4 w-4" />
          Create Report
        </Button>
      </div>
      
      <div className="grid gap-4">
        {filteredReports.map((report) => (
          <Card key={report.id} className="hover:shadow-elegant transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">{report.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">Type: {report.type}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={report.isActive ? 'default' : 'secondary'}>
                    {report.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                  <Badge variant="outline" className="uppercase">
                    {report.format}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-4">
                <div>
                  <span className="text-muted-foreground">Schedule:</span>
                  <p className="font-medium capitalize">{report.schedule || 'Manual'}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Recipients:</span>
                  <p className="font-medium">{report.recipients.length} contacts</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Created:</span>
                  <p className="font-medium">{report.createdAt.toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <span className="text-muted-foreground text-sm">Fields:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {report.fields.slice(0, 5).map((field, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {field}
                    </Badge>
                  ))}
                  {report.fields.length > 5 && (
                    <Badge variant="secondary" className="text-xs">
                      +{report.fields.length - 5} more
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="default" 
                  size="sm" 
                  className="gap-1"
                  onClick={() => handleGenerateReport(report.id)}
                >
                  <Download className="h-3 w-3" />
                  Generate
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Eye className="h-3 w-3" />
                  Preview
                </Button>
                <Button variant="secondary" size="sm" className="gap-1">
                  <Edit className="h-3 w-3" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const TemplatesTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Report Templates</h3>
        <Button variant="textile" className="gap-2">
          <Plus className="h-4 w-4" />
          Create Template
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reportTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-elegant transition-all group">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {template.type}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {template.description}
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Use Template
                </Button>
                <Button variant="secondary" size="sm">
                  Customize
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const ScheduledTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Scheduled Reports</h3>
        <Button variant="textile" className="gap-2">
          <Calendar className="h-4 w-4" />
          Schedule Report
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Automated Report Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Next Run</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.filter(r => r.schedule).map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{report.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="uppercase">
                      {report.format}
                    </Badge>
                  </TableCell>
                  <TableCell className="capitalize">{report.schedule}</TableCell>
                  <TableCell>
                    {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{report.recipients.length} contacts</TableCell>
                  <TableCell>
                    <Badge variant={report.isActive ? 'default' : 'secondary'}>
                      {report.isActive ? 'Active' : 'Paused'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button 
                        variant={report.isActive ? 'secondary' : 'default'} 
                        size="sm"
                      >
                        {report.isActive ? 'Pause' : 'Resume'}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground mt-1">
            Generate and manage reports in Excel, PDF, and Word formats
          </p>
        </div>
        <Button variant="gradient" className="gap-2">
          <FileText className="h-4 w-4" />
          Quick Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.length}</div>
            <div className="text-xs text-muted-foreground">Configured reports</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {reports.filter(r => r.schedule).length}
            </div>
            <div className="text-xs text-muted-foreground">Auto-generated</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{reportTemplates.length}</div>
            <div className="text-xs text-muted-foreground">Available templates</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Formats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-textile-purple">3</div>
            <div className="text-xs text-muted-foreground">Excel, PDF, Word</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-3 py-2 border border-input bg-background rounded-md text-sm"
        >
          <option value="all">All Types</option>
          <option value="bom">BOM</option>
          <option value="costing">Costing</option>
          <option value="inventory">Inventory</option>
          <option value="production">Production</option>
          <option value="quality">Quality</option>
          <option value="financial">Financial</option>
        </select>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Reports Tabs */}
      <Tabs defaultValue="reports" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reports" className="gap-2">
            <FileText className="h-4 w-4" />
            Reports
          </TabsTrigger>
          <TabsTrigger value="templates" className="gap-2">
            <Eye className="h-4 w-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="gap-2">
            <Calendar className="h-4 w-4" />
            Scheduled
          </TabsTrigger>
        </TabsList>

        <TabsContent value="reports">
          <ReportListTab />
        </TabsContent>

        <TabsContent value="templates">
          <TemplatesTab />
        </TabsContent>

        <TabsContent value="scheduled">
          <ScheduledTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}