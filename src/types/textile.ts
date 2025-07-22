// Comprehensive Textile Industry Types and Interfaces

export interface Organization {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  gstNumber?: string;
  logo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ThreadCategory {
  id: string;
  name: string;
  type: 'cotton' | 'polyester' | 'silk' | 'wool' | 'blend' | 'synthetic';
  count: number; // Thread count (e.g., 40s, 50s, 60s)
  ply: number; // Single ply, 2-ply, etc.
  twist: 'S' | 'Z'; // Twist direction
  strength: number; // Breaking strength in grams
  color: string;
  colorCode: string;
  supplier: string;
  costPerCone: number;
  lengthPerCone: number; // in meters
  wastagePercentage: number;
  createdAt: Date;
}

export interface FabricSpecification {
  id: string;
  name: string;
  type: 'woven' | 'knitted' | 'non-woven';
  composition: string; // e.g., "100% Cotton", "65% Polyester 35% Cotton"
  gsm: number; // Grams per square meter
  width: number; // Fabric width in inches/cm
  construction: string; // e.g., "Plain weave", "Twill", "Jersey"
  threadCount: {
    warp: number;
    weft: number;
  };
  shrinkage: {
    lengthwise: number;
    widthwise: number;
  };
  colorFastness: {
    washing: number; // 1-5 rating
    light: number;
    rubbing: number;
    perspiration: number;
  };
  supplier: string;
  costPerMeter: number;
  costPerKg: number;
  minimumOrderQuantity: number;
  leadTime: number; // in days
  createdAt: Date;
}

export interface Trim {
  id: string;
  name: string;
  category: 'button' | 'zipper' | 'label' | 'tape' | 'elastic' | 'velcro' | 'hook' | 'snap' | 'rivet' | 'eyelet' | 'drawstring' | 'other';
  specification: string;
  color: string;
  size: string;
  material: string;
  supplier: string;
  costPerPiece: number;
  costPerMeter?: number; // For items sold per meter
  minimumOrderQuantity: number;
  leadTime: number;
  createdAt: Date;
}

export interface Accessory {
  id: string;
  name: string;
  category: 'packaging' | 'hanger' | 'tag' | 'sticker' | 'polybag' | 'carton' | 'tissue' | 'other';
  specification: string;
  size: string;
  material: string;
  supplier: string;
  costPerPiece: number;
  minimumOrderQuantity: number;
  environmentalImpact?: 'biodegradable' | 'recyclable' | 'non-recyclable';
  createdAt: Date;
}

export interface GarmentStyle {
  id: string;
  styleNumber: string;
  name: string;
  category: 'shirt' | 'tshirt' | 'polo' | 'dress' | 'pants' | 'shorts' | 'skirt' | 'jacket' | 'sweater' | 'other';
  description: string;
  sizes: string[]; // ["XS", "S", "M", "L", "XL", "XXL"]
  colors: string[];
  season: 'spring' | 'summer' | 'autumn' | 'winter' | 'all-season';
  targetMarket: 'domestic' | 'export' | 'both';
  complexity: 'simple' | 'medium' | 'complex';
  estimatedSAM: number; // Standard Allowed Minutes
  createdAt: Date;
}

export interface BOMItem {
  id: string;
  category: 'fabric' | 'thread' | 'trim' | 'accessory' | 'packaging';
  itemId: string; // Reference to specific item
  itemName: string;
  specification: string;
  consumption: number; // Quantity needed per piece
  unit: 'meter' | 'piece' | 'gram' | 'kg' | 'yard';
  wastagePercentage: number;
  totalConsumption: number; // Including wastage
  unitCost: number;
  totalCost: number;
  supplier: string;
  leadTime: number;
  critical: boolean; // Is this a critical component?
}

export interface BillOfMaterials {
  id: string;
  organizationId: string;
  styleId: string;
  styleName: string;
  version: string;
  size: string;
  items: BOMItem[];
  totalMaterialCost: number;
  laborCost: number;
  overheadCost: number;
  totalCost: number;
  profitMargin: number;
  sellingPrice: number;
  cppCalculation: CPPCalculation;
  approvedBy: string;
  status: 'draft' | 'approved' | 'rejected' | 'revised';
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CPPCalculation {
  materialCost: number;
  threadCost: number;
  trimsCost: number;
  accessoriesCost: number;
  packagingCost: number;
  totalMaterialCost: number;
  
  cuttingCost: number;
  sewingCost: number;
  finishingCost: number;
  packingCost: number;
  totalLaborCost: number;
  
  factoryOverhead: number;
  adminOverhead: number;
  qualityControlCost: number;
  totalOverheadCost: number;
  
  totalDirectCost: number;
  indirectCostPercentage: number;
  totalIndirectCost: number;
  
  totalManufacturingCost: number;
  profitMargin: number;
  sellingPrice: number;
  
  exportCharges?: number;
  shippingCost?: number;
  insuranceCost?: number;
  bankCharges?: number;
  totalExportCost?: number;
  
  finalFOBPrice?: number;
}

export interface ProductionOrder {
  id: string;
  orderNumber: string;
  organizationId: string;
  styleId: string;
  bomId: string;
  quantity: number;
  sizes: { [size: string]: number };
  colors: { [color: string]: number };
  deliveryDate: Date;
  status: 'pending' | 'in-production' | 'quality-check' | 'completed' | 'shipped';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InventoryItem {
  id: string;
  category: 'fabric' | 'thread' | 'trim' | 'accessory' | 'finished-goods';
  itemId: string;
  itemName: string;
  currentStock: number;
  unit: string;
  reorderLevel: number;
  maxStock: number;
  location: string;
  lastUpdated: Date;
  supplier: string;
  costPerUnit: number;
  totalValue: number;
  expiryDate?: Date;
  batchNumber?: string;
}

export interface QualityParameter {
  id: string;
  category: 'fabric' | 'garment' | 'packaging';
  parameter: string;
  standardValue: string;
  tolerance: string;
  testMethod: string;
  frequency: 'incoming' | 'in-process' | 'final' | 'all';
  critical: boolean;
}

export interface QualityCheckRecord {
  id: string;
  orderId: string;
  parameterId: string;
  testedValue: string;
  result: 'pass' | 'fail' | 'conditional-pass';
  testedBy: string;
  testedAt: Date;
  notes: string;
  images?: string[];
}

export interface Supplier {
  id: string;
  name: string;
  category: 'fabric' | 'thread' | 'trim' | 'accessory' | 'packaging' | 'multiple';
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  gstNumber?: string;
  rating: number; // 1-5 stars
  paymentTerms: string;
  leadTime: number;
  minimumOrderValue: number;
  qualityCertifications: string[];
  isActive: boolean;
  createdAt: Date;
}

export interface PaymentReminder {
  id: string;
  organizationId: string;
  customerName: string;
  customerEmail: string;
  invoiceNumber: string;
  amount: number;
  dueDate: Date;
  overdueDays: number;
  reminderType: 'gentle' | 'firm' | 'final' | 'legal';
  status: 'pending' | 'sent' | 'paid' | 'disputed';
  ccEmails: string[];
  lastSentAt?: Date;
  notes: string;
  createdAt: Date;
}

export interface ReportConfig {
  id: string;
  name: string;
  type: 'bom' | 'costing' | 'inventory' | 'production' | 'quality' | 'financial';
  format: 'excel' | 'pdf' | 'word';
  template: string;
  fields: string[];
  filters: { [key: string]: any };
  schedule?: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  recipients: string[];
  isActive: boolean;
  createdAt: Date;
}

export interface AIInsight {
  id: string;
  category: 'cost-optimization' | 'quality-prediction' | 'demand-forecast' | 'supplier-analysis';
  title: string;
  description: string;
  recommendation: string;
  confidence: number; // 0-100%
  impact: 'low' | 'medium' | 'high';
  actionable: boolean;
  dataPoints: any[];
  generatedAt: Date;
}

// Utility types for form validations and calculations
export type ThreadCountOptions = [10, 16, 20, 24, 30, 40, 50, 60, 80, 100, 120, 140, 200];
export type FabricTypeOptions = ['cotton', 'polyester', 'silk', 'wool', 'linen', 'rayon', 'nylon', 'spandex', 'blend'];
export type GarmentCategoryOptions = ['shirt', 'tshirt', 'polo', 'dress', 'pants', 'shorts', 'skirt', 'jacket', 'sweater', 'blouse', 'jeans', 'hoodie'];
export type SizeOptions = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
export type ColorOptions = ['White', 'Black', 'Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple', 'Pink', 'Brown', 'Gray', 'Navy', 'Maroon'];