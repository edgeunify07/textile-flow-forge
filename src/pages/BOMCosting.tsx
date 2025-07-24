import { useState } from 'react';
import { Calculator, Plus, FileText, Download, Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { BillOfMaterials, BOMItem, CPPCalculation } from '@/types/textile';

// Mock BOM data
const mockBOMs: BillOfMaterials[] = [
  {
    id: '1',
    organizationId: '1',
    styleId: 'ST001',
    styleName: 'Cotton Polo Shirt',
    version: 'v1.0',
    size: 'M',
    items: [
      {
        id: '1',
        category: 'fabric',
        itemId: 'FAB001',
        itemName: 'Pique Cotton Fabric',
        specification: '220 GSM, White',
        consumption: 0.75,
        unit: 'meter',
        wastagePercentage: 8,
        totalConsumption: 0.81,
        unitCost: 45.50,
        totalCost: 36.86,
        supplier: 'Cotton Mills Ltd.',
        leadTime: 15,
        critical: true,
      },
      {
        id: '2',
        category: 'thread',
        itemId: 'THR001',
        itemName: 'Cotton Thread 40s',
        specification: '2-ply, White',
        consumption: 25,
        unit: 'meter',
        wastagePercentage: 5,
        totalConsumption: 26.25,
        unitCost: 0.025,
        totalCost: 0.66,
        supplier: 'Thread Masters Ltd.',
        leadTime: 7,
        critical: false,
      },
      {
        id: '3',
        category: 'trim',
        itemId: 'BTN001',
        itemName: 'Polyester Button',
        specification: '15mm, 4-hole, White',
        consumption: 3,
        unit: 'piece',
        wastagePercentage: 2,
        totalConsumption: 3.06,
        unitCost: 0.85,
        totalCost: 2.60,
        supplier: 'Button World',
        leadTime: 7,
        critical: false,
      },
      {
        id: '4',
        category: 'accessory',
        itemId: 'LBL001',
        itemName: 'Care Label',
        specification: 'Woven, Size/Care info',
        consumption: 1,
        unit: 'piece',
        wastagePercentage: 5,
        totalConsumption: 1.05,
        unitCost: 0.45,
        totalCost: 0.47,
        supplier: 'Label Print Co.',
        leadTime: 10,
        critical: false,
      },
    ],
    totalMaterialCost: 40.59,
    laborCost: 18.50,
    overheadCost: 12.25,
    totalCost: 71.34,
    profitMargin: 25,
    sellingPrice: 89.18,
    cppCalculation: {
      materialCost: 36.86,
      threadCost: 0.66,
      trimsCost: 2.60,
      accessoriesCost: 0.47,
      packagingCost: 2.50,
      totalMaterialCost: 43.09,
      
      cuttingCost: 4.50,
      sewingCost: 12.00,
      finishingCost: 2.00,
      packingCost: 1.50,
      totalLaborCost: 20.00,
      
      factoryOverhead: 8.50,
      adminOverhead: 3.00,
      qualityControlCost: 1.25,
      totalOverheadCost: 12.75,
      
      totalDirectCost: 63.09,
      indirectCostPercentage: 8,
      totalIndirectCost: 5.05,
      
      totalManufacturingCost: 68.14,
      profitMargin: 25,
      sellingPrice: 85.18,
      
      exportCharges: 2.50,
      shippingCost: 3.25,
      insuranceCost: 0.75,
      bankCharges: 1.50,
      totalExportCost: 8.00,
      
      finalFOBPrice: 93.18,
    },
    approvedBy: 'John Doe',
    status: 'approved',
    notes: 'Standard polo shirt with 3-button placket',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
];

export default function BOMCosting() {
  const [boms, setBoms] = useState<BillOfMaterials[]>(mockBOMs);
  const [selectedBOM, setSelectedBOM] = useState<BillOfMaterials | null>(mockBOMs[0]);
  const [activeTab, setActiveTab] = useState('bom-list');
  const { toast } = useToast();

  const BOMListTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Bill of Materials</h3>
        <Button variant="textile" className="gap-2" onClick={() => {
          toast({
            title: "Create BOM",
            description: "Opening BOM creation wizard...",
          });
        }}>
          <Plus className="h-4 w-4" />
          Create New BOM
        </Button>
      </div>
      
      <div className="grid gap-4">
        {boms.map((bom) => (
          <Card key={bom.id} className="hover:shadow-elegant transition-all cursor-pointer" 
                onClick={() => setSelectedBOM(bom)}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">{bom.styleName}</CardTitle>
                  <p className="text-sm text-muted-foreground">Style: {bom.styleId} | Size: {bom.size}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={bom.status === 'approved' ? 'default' : 'secondary'}>
                    {bom.status}
                  </Badge>
                  <Badge variant="outline">{bom.version}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Material Cost:</span>
                  <p className="font-medium text-success">₹{bom.totalMaterialCost.toFixed(2)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Labor Cost:</span>
                  <p className="font-medium">₹{bom.laborCost.toFixed(2)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Total Cost:</span>
                  <p className="font-medium">₹{bom.totalCost.toFixed(2)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Selling Price:</span>
                  <p className="font-medium text-primary">₹{bom.sellingPrice.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="gap-1" onClick={() => {
                  setSelectedBOM(bom);
                  setActiveTab('bom-details');
                  toast({
                    title: "BOM Selected",
                    description: `Viewing details for ${bom.styleName}`,
                  });
                }}>
                  <Eye className="h-3 w-3" />
                  View
                </Button>
                <Button variant="secondary" size="sm" className="gap-1" onClick={() => {
                  toast({
                    title: "Edit BOM",
                    description: `Opening editor for ${bom.styleName}`,
                  });
                }}>
                  <Edit className="h-3 w-3" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="gap-1" onClick={() => {
                  toast({
                    title: "Export Started",
                    description: `Exporting BOM for ${bom.styleName}`,
                  });
                }}>
                  <Download className="h-3 w-3" />
                  Export
                </Button>
                <Button variant="destructive" size="sm" className="gap-1" onClick={() => {
                  toast({
                    title: "BOM Deleted",
                    description: `${bom.styleName} BOM has been removed.`,
                  });
                }}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const BOMDetailsTab = () => {
    if (!selectedBOM) return <div>Select a BOM to view details</div>;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{selectedBOM.styleName}</h3>
            <p className="text-sm text-muted-foreground">
              Style: {selectedBOM.styleId} | Size: {selectedBOM.size} | Version: {selectedBOM.version}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1" onClick={() => {
              toast({
                title: "Export Started",
                description: `Exporting BOM for ${selectedBOM.styleName}`,
              });
            }}>
              <Download className="h-3 w-3" />
              Export BOM
            </Button>
            <Button variant="secondary" size="sm" onClick={() => {
              toast({
                title: "Edit Mode",
                description: `Opening BOM editor for ${selectedBOM.styleName}`,
              });
            }}>Edit BOM</Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>BOM Items</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Specification</TableHead>
                  <TableHead>Consumption</TableHead>
                  <TableHead>Wastage</TableHead>
                  <TableHead>Total Qty</TableHead>
                  <TableHead>Unit Cost</TableHead>
                  <TableHead>Total Cost</TableHead>
                  <TableHead>Supplier</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedBOM.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Badge variant="secondary">{item.category}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{item.itemName}</TableCell>
                    <TableCell className="text-sm">{item.specification}</TableCell>
                    <TableCell>{item.consumption} {item.unit}</TableCell>
                    <TableCell>{item.wastagePercentage}%</TableCell>
                    <TableCell>{item.totalConsumption.toFixed(3)} {item.unit}</TableCell>
                    <TableCell>₹{item.unitCost.toFixed(2)}</TableCell>
                    <TableCell className="font-medium text-success">₹{item.totalCost.toFixed(2)}</TableCell>
                    <TableCell className="text-sm">{item.supplier}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  };

  const CPPCalculationTab = () => {
    if (!selectedBOM) return <div>Select a BOM to view CPP calculation</div>;

    const cpp = selectedBOM.cppCalculation;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Cost Per Piece (CPP) Calculation</h3>
            <p className="text-sm text-muted-foreground">
              Detailed breakdown for {selectedBOM.styleName}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1" onClick={() => {
              toast({
                title: "Export Started",
                description: `Exporting CPP calculation for ${selectedBOM.styleName}`,
              });
            }}>
              <Download className="h-3 w-3" />
              Export CPP
            </Button>
            <Button variant="secondary" size="sm" onClick={() => {
              toast({
                title: "Recalculating",
                description: "Updating CPP calculation with latest data...",
              });
            }}>Recalculate</Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Material Costs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Material Costs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Fabric Cost:</span>
                <span className="font-medium">₹{cpp.materialCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Thread Cost:</span>
                <span className="font-medium">₹{cpp.threadCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Trims Cost:</span>
                <span className="font-medium">₹{cpp.trimsCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Accessories Cost:</span>
                <span className="font-medium">₹{cpp.accessoriesCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Packaging Cost:</span>
                <span className="font-medium">₹{cpp.packagingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Total Material Cost:</span>
                <span className="text-success">₹{cpp.totalMaterialCost.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Labor Costs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Labor Costs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Cutting Cost:</span>
                <span className="font-medium">₹{cpp.cuttingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Sewing Cost:</span>
                <span className="font-medium">₹{cpp.sewingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Finishing Cost:</span>
                <span className="font-medium">₹{cpp.finishingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Packing Cost:</span>
                <span className="font-medium">₹{cpp.packingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Total Labor Cost:</span>
                <span className="text-primary">₹{cpp.totalLaborCost.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Overhead Costs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Overhead Costs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Factory Overhead:</span>
                <span className="font-medium">₹{cpp.factoryOverhead.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Admin Overhead:</span>
                <span className="font-medium">₹{cpp.adminOverhead.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Quality Control:</span>
                <span className="font-medium">₹{cpp.qualityControlCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Total Overhead Cost:</span>
                <span className="text-warning">₹{cpp.totalOverheadCost.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Final Calculation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Final Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Total Direct Cost:</span>
                <span className="font-medium">₹{cpp.totalDirectCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Indirect Cost ({cpp.indirectCostPercentage}%):</span>
                <span className="font-medium">₹{cpp.totalIndirectCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Manufacturing Cost:</span>
                <span className="font-medium">₹{cpp.totalManufacturingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Profit Margin ({cpp.profitMargin}%):</span>
                <span className="font-medium text-success">₹{(cpp.totalManufacturingCost * cpp.profitMargin / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Selling Price:</span>
                <span className="text-primary text-lg">₹{cpp.sellingPrice.toFixed(2)}</span>
              </div>
              {cpp.finalFOBPrice && (
                <div className="flex justify-between font-semibold border-t pt-2">
                  <span>Final FOB Price:</span>
                  <span className="text-textile-purple text-lg">₹{cpp.finalFOBPrice.toFixed(2)}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Export Costs */}
        {cpp.exportCharges && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Export Costs (Optional)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Export Charges:</span>
                  <p className="font-medium">₹{cpp.exportCharges.toFixed(2)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Shipping Cost:</span>
                  <p className="font-medium">₹{cpp.shippingCost?.toFixed(2)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Insurance:</span>
                  <p className="font-medium">₹{cpp.insuranceCost?.toFixed(2)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Bank Charges:</span>
                  <p className="font-medium">₹{cpp.bankCharges?.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">BOM & Costing</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage Bill of Materials with automated CPP calculations
          </p>
        </div>
        <Button variant="gradient" className="gap-2" onClick={() => {
          toast({
            title: "Quick Calculator",
            description: "Opening CPP quick calculator...",
          });
        }}>
          <Calculator className="h-4 w-4" />
          Quick CPP Calculator
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="bom-list" className="gap-2">
            <FileText className="h-4 w-4" />
            BOM List
          </TabsTrigger>
          <TabsTrigger value="bom-details" className="gap-2">
            <Eye className="h-4 w-4" />
            BOM Details
          </TabsTrigger>
          <TabsTrigger value="cpp-calculation" className="gap-2">
            <Calculator className="h-4 w-4" />
            CPP Calculation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bom-list">
          <BOMListTab />
        </TabsContent>

        <TabsContent value="bom-details">
          <BOMDetailsTab />
        </TabsContent>

        <TabsContent value="cpp-calculation">
          <CPPCalculationTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}