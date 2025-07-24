import { useState } from 'react';
import { Truck, Package, AlertTriangle, TrendingUp, Search, Filter, Plus, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { InventoryItem } from '@/types/textile';

// Mock inventory data
const mockInventory: InventoryItem[] = [
  {
    id: '1',
    category: 'fabric',
    itemId: 'FAB001',
    itemName: 'Cotton Shirting Fabric',
    currentStock: 250,
    unit: 'meters',
    reorderLevel: 100,
    maxStock: 500,
    location: 'Warehouse A-1',
    lastUpdated: new Date('2024-01-20'),
    supplier: 'Cotton Mills Ltd.',
    costPerUnit: 45.50,
    totalValue: 11375,
    batchNumber: 'CT2024001'
  },
  {
    id: '2',
    category: 'thread',
    itemId: 'THR001',
    itemName: 'Cotton Thread 40s',
    currentStock: 45,
    unit: 'cones',
    reorderLevel: 50,
    maxStock: 200,
    location: 'Store Room B-2',
    lastUpdated: new Date('2024-01-22'),
    supplier: 'Thread Masters Ltd.',
    costPerUnit: 125.50,
    totalValue: 5647.5,
    batchNumber: 'TH2024012'
  },
  {
    id: '3',
    category: 'trim',
    itemId: 'BTN001',
    itemName: 'Polyester Buttons 15mm',
    currentStock: 2500,
    unit: 'pieces',
    reorderLevel: 1000,
    maxStock: 10000,
    location: 'Accessories Room C-1',
    lastUpdated: new Date('2024-01-21'),
    supplier: 'Button World',
    costPerUnit: 0.85,
    totalValue: 2125,
    batchNumber: 'BT2024008'
  },
];

export default function Inventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAddStockOpen, setIsAddStockOpen] = useState(false);
  const [newStock, setNewStock] = useState({
    itemName: '',
    category: 'fabric',
    currentStock: 0,
    unit: 'meters',
    reorderLevel: 0,
    maxStock: 0,
    location: '',
    supplier: '',
    costPerUnit: 0,
    batchNumber: ''
  });
  const { toast } = useToast();

  const filteredInventory = inventory.filter(item =>
    (selectedCategory === 'all' || item.category === selectedCategory) &&
    (item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.itemId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const lowStockItems = inventory.filter(item => item.currentStock <= item.reorderLevel);
  const totalValue = inventory.reduce((sum, item) => sum + item.totalValue, 0);

  const getStockStatus = (item: InventoryItem) => {
    const percentage = (item.currentStock / item.maxStock) * 100;
    if (item.currentStock <= item.reorderLevel) return 'critical';
    if (percentage <= 30) return 'low';
    if (percentage <= 70) return 'medium';
    return 'good';
  };

  const getStockColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-destructive';
      case 'low': return 'text-warning';
      case 'medium': return 'text-info';
      case 'good': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const handleAddStock = () => {
    if (!newStock.itemName || !newStock.location || !newStock.supplier) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newItem: InventoryItem = {
      id: Date.now().toString(),
      itemId: `${newStock.category.toUpperCase()}${String(inventory.length + 1).padStart(3, '0')}`,
      itemName: newStock.itemName,
      category: newStock.category as any,
      currentStock: newStock.currentStock,
      unit: newStock.unit,
      reorderLevel: newStock.reorderLevel,
      maxStock: newStock.maxStock,
      location: newStock.location,
      supplier: newStock.supplier,
      costPerUnit: newStock.costPerUnit,
      totalValue: newStock.currentStock * newStock.costPerUnit,
      batchNumber: newStock.batchNumber,
      lastUpdated: new Date()
    };

    setInventory([...inventory, newItem]);
    setNewStock({
      itemName: '', category: 'fabric', currentStock: 0, unit: 'meters',
      reorderLevel: 0, maxStock: 0, location: '', supplier: '', costPerUnit: 0, batchNumber: ''
    });
    setIsAddStockOpen(false);

    toast({
      title: "Stock Added",
      description: `${newStock.itemName} has been added to inventory.`
    });
  };

  const handleAIInsights = () => {
    toast({
      title: "AI Analysis Started",
      description: "Analyzing inventory patterns and generating insights...",
    });
    
    // Simulate AI processing
    setTimeout(() => {
      toast({
        title: "AI Insights Ready",
        description: "New optimization recommendations are available in the insights panel.",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Live Inventory</h1>
          <p className="text-muted-foreground mt-1">
            Real-time inventory management with AI-powered insights
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={handleAIInsights}>
            <Brain className="h-4 w-4" />
            AI Insights
          </Button>
          <Dialog open={isAddStockOpen} onOpenChange={setIsAddStockOpen}>
            <DialogTrigger asChild>
              <Button variant="gradient" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Stock
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventory.length}</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Package className="h-3 w-3" />
              Across all categories
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">₹{totalValue.toLocaleString()}</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              Current stock value
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{lowStockItems.length}</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <AlertTriangle className="h-3 w-3" />
              Need reordering
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Truck className="h-3 w-3" />
              Active categories
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alerts */}
      {lowStockItems.length > 0 && (
        <Card className="border-warning">
          <CardHeader>
            <CardTitle className="text-warning flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Low Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {lowStockItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-2 bg-warning/10 rounded">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">{item.category}</Badge>
                    <span className="font-medium">{item.itemName}</span>
                    <span className="text-sm text-muted-foreground">({item.itemId})</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-warning font-medium">{item.currentStock} {item.unit}</span>
                    <span className="text-muted-foreground"> / {item.reorderLevel} min</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search inventory items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 max-w-md"
            />
          </div>
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-input bg-background rounded-md text-sm"
        >
          <option value="all">All Categories</option>
          <option value="fabric">Fabrics</option>
          <option value="thread">Threads</option>
          <option value="trim">Trims</option>
          <option value="accessory">Accessories</option>
          <option value="finished-goods">Finished Goods</option>
        </select>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          More Filters
        </Button>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Stock Level</TableHead>
                <TableHead>Reorder Level</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => {
                const stockStatus = getStockStatus(item);
                const stockPercentage = (item.currentStock / item.maxStock) * 100;
                
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.itemName}</div>
                        <div className="text-sm text-muted-foreground">{item.itemId}</div>
                        {item.batchNumber && (
                          <div className="text-xs text-muted-foreground">Batch: {item.batchNumber}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{item.category}</Badge>
                    </TableCell>
                    <TableCell className={getStockColor(stockStatus)}>
                      <div className="font-medium">
                        {item.currentStock} {item.unit}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Progress value={stockPercentage} className="h-2" />
                        <div className="text-xs text-muted-foreground">
                          {stockPercentage.toFixed(1)}% of max
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {item.reorderLevel} {item.unit}
                    </TableCell>
                    <TableCell className="text-sm">{item.location}</TableCell>
                    <TableCell className="font-medium text-success">
                      ₹{item.totalValue.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-sm">{item.supplier}</TableCell>
                    <TableCell className="text-sm">
                      {item.lastUpdated.toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* AI Insights Panel */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI Inventory Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Demand Forecast</h4>
              <p className="text-sm text-muted-foreground">
                Based on historical data, Cotton Thread 40s consumption is expected to increase by 15% next month.
              </p>
            </div>
            <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Cost Optimization</h4>
              <p className="text-sm text-muted-foreground">
                Consider bulk ordering Polyester Buttons to save ₹2,500 (12% cost reduction).
              </p>
            </div>
            <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Supplier Performance</h4>
              <p className="text-sm text-muted-foreground">
                Cotton Mills Ltd. has 98% on-time delivery rate. Excellent reliability score.
              </p>
            </div>
            <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Stock Optimization</h4>
              <p className="text-sm text-muted-foreground">
                Reduce Cotton Shirting Fabric max stock to 400m to free up ₹4,550 in working capital.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Stock Dialog */}
      <Dialog open={isAddStockOpen} onOpenChange={setIsAddStockOpen}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Stock Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="item-name">Item Name *</Label>
              <Input
                id="item-name"
                value={newStock.itemName}
                onChange={(e) => setNewStock({ ...newStock, itemName: e.target.value })}
                placeholder="Enter item name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={newStock.category} onValueChange={(value) => setNewStock({ ...newStock, category: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fabric">Fabric</SelectItem>
                  <SelectItem value="thread">Thread</SelectItem>
                  <SelectItem value="trim">Trim</SelectItem>
                  <SelectItem value="accessory">Accessory</SelectItem>
                  <SelectItem value="finished-goods">Finished Goods</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="current-stock">Current Stock *</Label>
                <Input
                  id="current-stock"
                  type="number"
                  value={newStock.currentStock}
                  onChange={(e) => setNewStock({ ...newStock, currentStock: Number(e.target.value) })}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unit *</Label>
                <Select value={newStock.unit} onValueChange={(value) => setNewStock({ ...newStock, unit: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meters">Meters</SelectItem>
                    <SelectItem value="pieces">Pieces</SelectItem>
                    <SelectItem value="kg">Kilograms</SelectItem>
                    <SelectItem value="cones">Cones</SelectItem>
                    <SelectItem value="rolls">Rolls</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reorder-level">Reorder Level</Label>
                <Input
                  id="reorder-level"
                  type="number"
                  value={newStock.reorderLevel}
                  onChange={(e) => setNewStock({ ...newStock, reorderLevel: Number(e.target.value) })}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-stock">Max Stock</Label>
                <Input
                  id="max-stock"
                  type="number"
                  value={newStock.maxStock}
                  onChange={(e) => setNewStock({ ...newStock, maxStock: Number(e.target.value) })}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={newStock.location}
                onChange={(e) => setNewStock({ ...newStock, location: e.target.value })}
                placeholder="e.g., Warehouse A-1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="supplier">Supplier *</Label>
              <Input
                id="supplier"
                value={newStock.supplier}
                onChange={(e) => setNewStock({ ...newStock, supplier: e.target.value })}
                placeholder="Enter supplier name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cost-per-unit">Cost Per Unit</Label>
                <Input
                  id="cost-per-unit"
                  type="number"
                  step="0.01"
                  value={newStock.costPerUnit}
                  onChange={(e) => setNewStock({ ...newStock, costPerUnit: Number(e.target.value) })}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="batch-number">Batch Number</Label>
                <Input
                  id="batch-number"
                  value={newStock.batchNumber}
                  onChange={(e) => setNewStock({ ...newStock, batchNumber: e.target.value })}
                  placeholder="Optional"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setIsAddStockOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1"
                onClick={handleAddStock}
              >
                Add Stock
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}