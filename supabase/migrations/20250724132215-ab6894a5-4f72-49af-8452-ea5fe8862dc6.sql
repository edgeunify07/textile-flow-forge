-- Create products table
CREATE TABLE public.products (
  product_id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  art_no TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  combo_detail TEXT,
  client TEXT,
  cpp_1 DECIMAL(10,2),
  cpp_2 DECIMAL(10,2),
  cpp_total DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create size enum
CREATE TYPE size_enum AS ENUM ('S', 'M', 'L', 'XL');

-- Create size_inventory table
CREATE TABLE public.size_inventory (
  inventory_id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(product_id) ON DELETE CASCADE,
  size size_enum NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(product_id, size)
);

-- Create bom (Bill of Materials) table
CREATE TABLE public.bom (
  bom_id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(product_id) ON DELETE CASCADE,
  material_name TEXT NOT NULL,
  material_quantity DECIMAL(10,2) NOT NULL,
  material_cost DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create material_costing table
CREATE TABLE public.material_costing (
  costing_id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(product_id) ON DELETE CASCADE,
  size size_enum NOT NULL,
  cpp_1 DECIMAL(10,2),
  cpp_2 DECIMAL(10,2),
  cpp_total DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(product_id, size)
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.size_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bom ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.material_costing ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for products
CREATE POLICY "Users can view their own products" 
ON public.products 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own products" 
ON public.products 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own products" 
ON public.products 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own products" 
ON public.products 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for size_inventory
CREATE POLICY "Users can view inventory for their products" 
ON public.size_inventory 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.products 
  WHERE products.product_id = size_inventory.product_id 
  AND products.user_id = auth.uid()
));

CREATE POLICY "Users can create inventory for their products" 
ON public.size_inventory 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.products 
  WHERE products.product_id = size_inventory.product_id 
  AND products.user_id = auth.uid()
));

CREATE POLICY "Users can update inventory for their products" 
ON public.size_inventory 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.products 
  WHERE products.product_id = size_inventory.product_id 
  AND products.user_id = auth.uid()
));

CREATE POLICY "Users can delete inventory for their products" 
ON public.size_inventory 
FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM public.products 
  WHERE products.product_id = size_inventory.product_id 
  AND products.user_id = auth.uid()
));

-- Create RLS policies for bom
CREATE POLICY "Users can view BOM for their products" 
ON public.bom 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.products 
  WHERE products.product_id = bom.product_id 
  AND products.user_id = auth.uid()
));

CREATE POLICY "Users can create BOM for their products" 
ON public.bom 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.products 
  WHERE products.product_id = bom.product_id 
  AND products.user_id = auth.uid()
));

CREATE POLICY "Users can update BOM for their products" 
ON public.bom 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.products 
  WHERE products.product_id = bom.product_id 
  AND products.user_id = auth.uid()
));

CREATE POLICY "Users can delete BOM for their products" 
ON public.bom 
FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM public.products 
  WHERE products.product_id = bom.product_id 
  AND products.user_id = auth.uid()
));

-- Create RLS policies for material_costing
CREATE POLICY "Users can view costing for their products" 
ON public.material_costing 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.products 
  WHERE products.product_id = material_costing.product_id 
  AND products.user_id = auth.uid()
));

CREATE POLICY "Users can create costing for their products" 
ON public.material_costing 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.products 
  WHERE products.product_id = material_costing.product_id 
  AND products.user_id = auth.uid()
));

CREATE POLICY "Users can update costing for their products" 
ON public.material_costing 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.products 
  WHERE products.product_id = material_costing.product_id 
  AND products.user_id = auth.uid()
));

CREATE POLICY "Users can delete costing for their products" 
ON public.material_costing 
FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM public.products 
  WHERE products.product_id = material_costing.product_id 
  AND products.user_id = auth.uid()
));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_size_inventory_updated_at
  BEFORE UPDATE ON public.size_inventory
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bom_updated_at
  BEFORE UPDATE ON public.bom
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_material_costing_updated_at
  BEFORE UPDATE ON public.material_costing
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();