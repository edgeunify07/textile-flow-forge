import { useState } from 'react';
import { Plus, Package, Palette, Scissors, Tags, Box, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThreadCategory, FabricSpecification, Trim, Accessory } from '@/types/textile';

// Mock data with comprehensive textile industry variables
const mockThreads: ThreadCategory[] = [
  {
    id: '1',
    name: 'Cotton Thread 40s',
    type: 'cotton',
    count: 40,
    ply: 2,
    twist: 'Z',
    strength: 850,
    color: 'White',
    colorCode: '#FFFFFF',
    supplier: 'Thread Masters Ltd.',
    costPerCone: 125.50,
    lengthPerCone: 5000,
    wastagePercentage: 5,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Polyester Thread 50s',
    type: 'polyester',
    count: 50,
    ply: 3,
    twist: 'S',
    strength: 950,
    color: 'Navy Blue',
    colorCode: '#000080',
    supplier: 'Synthetic Threads Co.',
    costPerCone: 98.75,
    lengthPerCone: 6000,
    wastagePercentage: 3,
    createdAt: new Date('2024-01-20'),
  },
];

const mockFabrics: FabricSpecification[] = [
  {
    id: '1',
    name: 'Premium Cotton Shirting',
    type: 'woven',
    composition: '100% Cotton',
    gsm: 120,
    width: 58,
    construction: 'Plain Weave',
    threadCount: { warp: 68, weft: 68 },
    shrinkage: { lengthwise: 2.5, widthwise: 1.5 },
    colorFastness: { washing: 4, light: 4, rubbing: 4, perspiration: 4 },
    supplier: 'Cotton Mills Ltd.',
    costPerMeter: 45.50,
    costPerKg: 380.00,
    minimumOrderQuantity: 500,
    leadTime: 15,
    createdAt: new Date('2024-01-10'),
  },
  {
    id: '2',
    name: 'Jersey Knit Fabric',
    type: 'knitted',
    composition: '95% Cotton 5% Elastane',
    gsm: 180,
    width: 60,
    construction: 'Single Jersey',
    threadCount: { warp: 0, weft: 0 },
    shrinkage: { lengthwise: 3.0, widthwise: 2.0 },
    colorFastness: { washing: 5, light: 4, rubbing: 4, perspiration: 5 },
    supplier: 'Knit Fab Industries',
    costPerMeter: 52.25,
    costPerKg: 290.00,
    minimumOrderQuantity: 300,
    leadTime: 12,
    createdAt: new Date('2024-01-12'),
  },
];

const mockTrims: Trim[] = [
  {
    id: '1',
    name: 'Polyester Button 15mm',
    category: 'button',
    specification: '4-hole, round, flat',
    color: 'White',
    size: '15mm',
    material: 'Polyester',
    supplier: 'Button World',
    costPerPiece: 0.85,
    minimumOrderQuantity: 1000,
    leadTime: 7,
    createdAt: new Date('2024-01-08'),
  },
  {
    id: '2',
    name: 'YKK Zipper 5"',
    category: 'zipper',
    specification: 'Closed-end, #5 chain',
    color: 'Black',
    size: '5 inches',
    material: 'Nylon',
    supplier: 'YKK India',
    costPerPiece: 12.50,
    minimumOrderQuantity: 500,
    leadTime: 10,
    createdAt: new Date('2024-01-09'),
  },
];

const mockAccessories: Accessory[] = [
  {
    id: '1',
    name: 'Woven Care Label',
    category: 'tag',
    specification: 'Size & care instructions',
    size: '25mm x 15mm',
    material: 'Polyester',
    supplier: 'Label Print Co.',
    costPerPiece: 0.45,
    minimumOrderQuantity: 5000,
    environmentalImpact: 'recyclable',
    createdAt: new Date('2024-01-05'),
  },
  {
    id: '2',
    name: 'Poly Mailer Bag',
    category: 'packaging',
    specification: 'Self-seal, tear resistant',
    size: '10" x 13"',
    material: 'LDPE',
    supplier: 'Pack Solutions',
    costPerPiece: 2.25,
    minimumOrderQuantity: 1000,
    environmentalImpact: 'recyclable',
    createdAt: new Date('2024-01-06'),
  },
];

export default function Variables() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('threads');

  const ThreadsTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Thread Categories</h3>
        <Button variant="textile" size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Thread
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockThreads.map((thread) => (
          <Card key={thread.id} className="hover:shadow-elegant transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{thread.name}</CardTitle>
                <div 
                  className="w-6 h-6 rounded-full border-2 border-border"
                  style={{ backgroundColor: thread.colorCode }}
                />
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary">{thread.type}</Badge>
                <Badge variant="outline">{thread.count}s</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-muted-foreground">Ply:</span>
                  <span className="ml-1 font-medium">{thread.ply}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Twist:</span>
                  <span className="ml-1 font-medium">{thread.twist}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Strength:</span>
                  <span className="ml-1 font-medium">{thread.strength}g</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Length:</span>
                  <span className="ml-1 font-medium">{thread.lengthPerCone}m</span>
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Cost per Cone:</span>
                <span className="ml-1 font-medium text-success">₹{thread.costPerCone}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Supplier:</span>
                <p className="text-foreground text-xs">{thread.supplier}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Wastage:</span>
                <span className="ml-1 font-medium text-warning">{thread.wastagePercentage}%</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const FabricsTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Fabric Specifications</h3>
        <Button variant="textile" size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Fabric
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {mockFabrics.map((fabric) => (
          <Card key={fabric.id} className="hover:shadow-elegant transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{fabric.name}</CardTitle>
              <div className="flex gap-2">
                <Badge variant="secondary">{fabric.type}</Badge>
                <Badge variant="outline">{fabric.gsm} GSM</Badge>
                <Badge variant="outline">{fabric.width}"</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <span className="text-muted-foreground">Composition:</span>
                <span className="ml-1 font-medium">{fabric.composition}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Construction:</span>
                <span className="ml-1 font-medium">{fabric.construction}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-muted-foreground">Warp:</span>
                  <span className="ml-1 font-medium">{fabric.threadCount.warp}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Weft:</span>
                  <span className="ml-1 font-medium">{fabric.threadCount.weft}</span>
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Shrinkage (L×W):</span>
                <span className="ml-1 font-medium">{fabric.shrinkage.lengthwise}% × {fabric.shrinkage.widthwise}%</span>
              </div>
              <div>
                <span className="text-muted-foreground">Color Fastness:</span>
                <div className="grid grid-cols-2 gap-1 mt-1 text-xs">
                  <span>Wash: {fabric.colorFastness.washing}/5</span>
                  <span>Light: {fabric.colorFastness.light}/5</span>
                  <span>Rub: {fabric.colorFastness.rubbing}/5</span>
                  <span>Sweat: {fabric.colorFastness.perspiration}/5</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-muted-foreground">Per Meter:</span>
                  <span className="ml-1 font-medium text-success">₹{fabric.costPerMeter}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Per Kg:</span>
                  <span className="ml-1 font-medium text-success">₹{fabric.costPerKg}</span>
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">MOQ:</span>
                <span className="ml-1 font-medium">{fabric.minimumOrderQuantity}m</span>
              </div>
              <div>
                <span className="text-muted-foreground">Lead Time:</span>
                <span className="ml-1 font-medium">{fabric.leadTime} days</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const TrimsTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Trims & Fasteners</h3>
        <Button variant="textile" size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Trim
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockTrims.map((trim) => (
          <Card key={trim.id} className="hover:shadow-elegant transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{trim.name}</CardTitle>
              <Badge variant="secondary">{trim.category}</Badge>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <span className="text-muted-foreground">Specification:</span>
                <p className="font-medium">{trim.specification}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-muted-foreground">Color:</span>
                  <span className="ml-1 font-medium">{trim.color}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Size:</span>
                  <span className="ml-1 font-medium">{trim.size}</span>
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Material:</span>
                <span className="ml-1 font-medium">{trim.material}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Cost per Piece:</span>
                <span className="ml-1 font-medium text-success">₹{trim.costPerPiece}</span>
              </div>
              <div>
                <span className="text-muted-foreground">MOQ:</span>
                <span className="ml-1 font-medium">{trim.minimumOrderQuantity} pcs</span>
              </div>
              <div>
                <span className="text-muted-foreground">Lead Time:</span>
                <span className="ml-1 font-medium">{trim.leadTime} days</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const AccessoriesTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Accessories & Packaging</h3>
        <Button variant="textile" size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Accessory
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockAccessories.map((accessory) => (
          <Card key={accessory.id} className="hover:shadow-elegant transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{accessory.name}</CardTitle>
              <div className="flex gap-2">
                <Badge variant="secondary">{accessory.category}</Badge>
                {accessory.environmentalImpact && (
                  <Badge variant="outline" className="text-textile-green">
                    {accessory.environmentalImpact}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <span className="text-muted-foreground">Specification:</span>
                <p className="font-medium">{accessory.specification}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-muted-foreground">Size:</span>
                  <span className="ml-1 font-medium">{accessory.size}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Material:</span>
                  <span className="ml-1 font-medium">{accessory.material}</span>
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Cost per Piece:</span>
                <span className="ml-1 font-medium text-success">₹{accessory.costPerPiece}</span>
              </div>
              <div>
                <span className="text-muted-foreground">MOQ:</span>
                <span className="ml-1 font-medium">{accessory.minimumOrderQuantity} pcs</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Variables</h1>
          <p className="text-muted-foreground mt-1">
            Manage threads, fabrics, trims, and accessories for your textile products
          </p>
        </div>
        <Button variant="gradient" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Variable
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search variables..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 max-w-md"
            />
          </div>
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Variables Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="threads" className="gap-2">
            <Package className="h-4 w-4" />
            Threads
          </TabsTrigger>
          <TabsTrigger value="fabrics" className="gap-2">
            <Palette className="h-4 w-4" />
            Fabrics
          </TabsTrigger>
          <TabsTrigger value="trims" className="gap-2">
            <Scissors className="h-4 w-4" />
            Trims
          </TabsTrigger>
          <TabsTrigger value="accessories" className="gap-2">
            <Box className="h-4 w-4" />
            Accessories
          </TabsTrigger>
        </TabsList>

        <TabsContent value="threads">
          <ThreadsTab />
        </TabsContent>

        <TabsContent value="fabrics">
          <FabricsTab />
        </TabsContent>

        <TabsContent value="trims">
          <TrimsTab />
        </TabsContent>

        <TabsContent value="accessories">
          <AccessoriesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}