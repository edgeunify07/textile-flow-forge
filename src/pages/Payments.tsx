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
  Bell, 
  Plus, 
  Search, 
  Filter,
  DollarSign,
  Calendar,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  XCircle,
  FileDown,
  FileUp,
  Mail
} from 'lucide-react';

interface PaymentReminder {
  id: string;
  invoiceNumber: string;
  customerName: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'sent' | 'overdue' | 'paid' | 'cancelled';
  lastReminder: string;
  reminderCount: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  paymentMethod: string;
}

const mockReminders: PaymentReminder[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    customerName: 'Fashion Forward Ltd.',
    amount: 15750,
    dueDate: '2024-02-15',
    status: 'overdue',
    lastReminder: '2024-02-10',
    reminderCount: 2,
    priority: 'urgent',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    customerName: 'Style Inc.',
    amount: 8940,
    dueDate: '2024-02-20',
    status: 'sent',
    lastReminder: '2024-02-18',
    reminderCount: 1,
    priority: 'high',
    paymentMethod: 'Credit Card'
  },
  {
    id: '3',
    invoiceNumber: 'INV-2024-003',
    customerName: 'Trendy Wear Co.',
    amount: 12300,
    dueDate: '2024-02-25',
    status: 'pending',
    lastReminder: '',
    reminderCount: 0,
    priority: 'medium',
    paymentMethod: 'Check'
  }
];

const Payments = () => {
  const [reminders, setReminders] = useState<PaymentReminder[]>(mockReminders);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  const getStatusBadge = (status: PaymentReminder['status']) => {
    const statusConfig = {
      'pending': { variant: 'secondary', label: 'Pending', icon: Clock },
      'sent': { variant: 'default', label: 'Reminder Sent', icon: Send },
      'overdue': { variant: 'destructive', label: 'Overdue', icon: AlertCircle },
      'paid': { variant: 'success', label: 'Paid', icon: CheckCircle },
      'cancelled': { variant: 'outline', label: 'Cancelled', icon: XCircle }
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

  const getPriorityBadge = (priority: PaymentReminder['priority']) => {
    const priorityConfig = {
      'low': { variant: 'secondary', label: 'Low' },
      'medium': { variant: 'default', label: 'Medium' },
      'high': { variant: 'warning', label: 'High' },
      'urgent': { variant: 'destructive', label: 'Urgent' }
    };
    
    const config = priorityConfig[priority];
    return <Badge variant={config.variant as any}>{config.label}</Badge>;
  };

  const filteredReminders = reminders.filter(reminder => {
    const matchesSearch = reminder.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reminder.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || reminder.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSendReminder = (id: string) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id 
        ? { 
            ...reminder, 
            status: 'sent' as const, 
            lastReminder: new Date().toISOString().split('T')[0],
            reminderCount: reminder.reminderCount + 1
          }
        : reminder
    ));
    toast({
      title: "Reminder Sent",
      description: "Payment reminder has been sent successfully.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Payment data export has been initiated.",
    });
  };

  const handleImportData = () => {
    toast({
      title: "Import Ready",
      description: "Please select your payment data file to import.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payment Reminders</h1>
          <p className="text-muted-foreground">Automated payment tracking with email notifications</p>
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
            New Reminder
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$236,990</div>
            <p className="text-xs text-muted-foreground">Across 47 invoices</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Payments</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">12</div>
            <p className="text-xs text-muted-foreground">Requiring attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reminders Sent</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">Within 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reminders">Payment Reminders</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Payment Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredReminders.slice(0, 5).map((reminder) => (
                  <div key={reminder.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{reminder.customerName}</p>
                      <p className="text-sm text-muted-foreground">{reminder.invoiceNumber}</p>
                      <div className="flex gap-2">
                        {getStatusBadge(reminder.status)}
                        {getPriorityBadge(reminder.priority)}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">${reminder.amount.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Due: {reminder.dueDate}</p>
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
                  <Bell className="mr-2 h-4 w-4" />
                  Send Bulk Reminders
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Reminders
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Templates
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileDown className="mr-2 h-4 w-4" />
                  Export Overdue Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reminders" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reminders..."
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
                <SelectItem value="sent">Reminder Sent</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reminders List */}
          <div className="space-y-4">
            {filteredReminders.map((reminder) => (
              <Card key={reminder.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{reminder.customerName}</h3>
                        {getStatusBadge(reminder.status)}
                        {getPriorityBadge(reminder.priority)}
                      </div>
                      <p className="text-sm text-muted-foreground">Invoice: {reminder.invoiceNumber}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-sm font-medium">Amount</p>
                          <p className="text-sm text-muted-foreground">${reminder.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Due Date</p>
                          <p className="text-sm text-muted-foreground">{reminder.dueDate}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Payment Method</p>
                          <p className="text-sm text-muted-foreground">{reminder.paymentMethod}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Reminders Sent</p>
                          <p className="text-sm text-muted-foreground">{reminder.reminderCount}</p>
                        </div>
                      </div>
                      {reminder.lastReminder && (
                        <div className="mt-2">
                          <p className="text-sm font-medium">Last Reminder</p>
                          <p className="text-sm text-muted-foreground">{reminder.lastReminder}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleSendReminder(reminder.id)}
                        disabled={reminder.status === 'paid'}
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Send Reminder
                      </Button>
                      <Button size="sm" variant="outline">
                        View Invoice
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Automation Settings</CardTitle>
              <p className="text-sm text-muted-foreground">Configure automatic payment reminder schedules</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="reminder-days">Days Before Due Date</Label>
                    <Input id="reminder-days" type="number" placeholder="7" />
                  </div>
                  <div>
                    <Label htmlFor="overdue-days">Days After Due Date</Label>
                    <Input id="overdue-days" type="number" placeholder="3" />
                  </div>
                  <div>
                    <Label htmlFor="reminder-frequency">Reminder Frequency</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="max-reminders">Maximum Reminders</Label>
                    <Input id="max-reminders" type="number" placeholder="5" />
                  </div>
                  <div>
                    <Label htmlFor="email-template">Email Template</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="friendly">Friendly Reminder</SelectItem>
                        <SelectItem value="formal">Formal Notice</SelectItem>
                        <SelectItem value="urgent">Urgent Payment Request</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="custom-message">Custom Message</Label>
                    <Textarea id="custom-message" placeholder="Add any custom message to include in reminders" />
                  </div>
                </div>
              </div>
              <Button className="w-full">Save Automation Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <FileDown className="mr-2 h-4 w-4" />
                  Overdue Payments Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileDown className="mr-2 h-4 w-4" />
                  Payment Collection Summary
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileDown className="mr-2 h-4 w-4" />
                  Reminder Effectiveness Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileDown className="mr-2 h-4 w-4" />
                  Customer Payment History
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
                  Email Reports
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Payments;