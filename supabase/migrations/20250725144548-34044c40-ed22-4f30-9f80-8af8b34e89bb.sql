-- Create enum for user roles
CREATE TYPE public.user_role AS ENUM ('superadmin', 'org_admin', 'org_user');

-- Create organizations table
CREATE TABLE public.organizations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  role user_role NOT NULL DEFAULT 'org_user',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_roles table for role management
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role user_role NOT NULL,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role, organization_id)
);

-- Enable RLS
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid UUID)
RETURNS user_role
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT role FROM public.profiles WHERE user_id = user_uuid LIMIT 1;
$$;

-- Create security definer function to get user organization
CREATE OR REPLACE FUNCTION public.get_user_organization(user_uuid UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT organization_id FROM public.profiles WHERE user_id = user_uuid LIMIT 1;
$$;

-- RLS Policies for organizations
CREATE POLICY "Superadmin can view all organizations"
ON public.organizations FOR SELECT
USING (public.get_user_role(auth.uid()) = 'superadmin');

CREATE POLICY "Org admins and users can view their organization"
ON public.organizations FOR SELECT
USING (
  id = public.get_user_organization(auth.uid()) OR
  public.get_user_role(auth.uid()) = 'superadmin'
);

CREATE POLICY "Superadmin can create organizations"
ON public.organizations FOR INSERT
WITH CHECK (public.get_user_role(auth.uid()) = 'superadmin');

CREATE POLICY "Superadmin can update organizations"
ON public.organizations FOR UPDATE
USING (public.get_user_role(auth.uid()) = 'superadmin');

CREATE POLICY "Superadmin can delete organizations"
ON public.organizations FOR DELETE
USING (public.get_user_role(auth.uid()) = 'superadmin');

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Superadmin can view all profiles"
ON public.profiles FOR SELECT
USING (public.get_user_role(auth.uid()) = 'superadmin');

CREATE POLICY "Org admins can view profiles in their organization"
ON public.profiles FOR SELECT
USING (
  organization_id = public.get_user_organization(auth.uid()) AND
  public.get_user_role(auth.uid()) = 'org_admin'
);

CREATE POLICY "Superadmin can create any profile"
ON public.profiles FOR INSERT
WITH CHECK (public.get_user_role(auth.uid()) = 'superadmin');

CREATE POLICY "Org admins can create profiles in their organization"
ON public.profiles FOR INSERT
WITH CHECK (
  organization_id = public.get_user_organization(auth.uid()) AND
  public.get_user_role(auth.uid()) = 'org_admin'
);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (user_id = auth.uid());

CREATE POLICY "Superadmin can update any profile"
ON public.profiles FOR UPDATE
USING (public.get_user_role(auth.uid()) = 'superadmin');

CREATE POLICY "Org admins can update profiles in their organization"
ON public.profiles FOR UPDATE
USING (
  organization_id = public.get_user_organization(auth.uid()) AND
  public.get_user_role(auth.uid()) = 'org_admin'
);

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Superadmin can view all roles"
ON public.user_roles FOR SELECT
USING (public.get_user_role(auth.uid()) = 'superadmin');

CREATE POLICY "Org admins can view roles in their organization"
ON public.user_roles FOR SELECT
USING (
  organization_id = public.get_user_organization(auth.uid()) AND
  public.get_user_role(auth.uid()) = 'org_admin'
);

CREATE POLICY "Superadmin can manage all roles"
ON public.user_roles FOR ALL
USING (public.get_user_role(auth.uid()) = 'superadmin');

CREATE POLICY "Org admins can manage roles in their organization"
ON public.user_roles FOR ALL
USING (
  organization_id = public.get_user_organization(auth.uid()) AND
  public.get_user_role(auth.uid()) = 'org_admin'
);

-- Update existing tables to include organization_id
ALTER TABLE public.products ADD COLUMN organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE;
ALTER TABLE public.bom ADD COLUMN organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE;
ALTER TABLE public.material_costing ADD COLUMN organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE;
ALTER TABLE public.size_inventory ADD COLUMN organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE;

-- Update RLS policies for existing tables to include organization check
DROP POLICY IF EXISTS "Users can view their own products" ON public.products;
DROP POLICY IF EXISTS "Users can create their own products" ON public.products;
DROP POLICY IF EXISTS "Users can update their own products" ON public.products;
DROP POLICY IF EXISTS "Users can delete their own products" ON public.products;

CREATE POLICY "Users can view products in their organization"
ON public.products FOR SELECT
USING (
  organization_id = public.get_user_organization(auth.uid()) OR
  public.get_user_role(auth.uid()) = 'superadmin'
);

CREATE POLICY "Users can create products in their organization"
ON public.products FOR INSERT
WITH CHECK (
  organization_id = public.get_user_organization(auth.uid()) AND
  user_id = auth.uid()
);

CREATE POLICY "Users can update products in their organization"
ON public.products FOR UPDATE
USING (
  organization_id = public.get_user_organization(auth.uid()) AND
  user_id = auth.uid()
);

CREATE POLICY "Users can delete products in their organization"
ON public.products FOR DELETE
USING (
  organization_id = public.get_user_organization(auth.uid()) AND
  user_id = auth.uid()
);

-- Create trigger for auto-updating timestamps
CREATE TRIGGER update_organizations_updated_at
BEFORE UPDATE ON public.organizations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger to auto-create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, first_name, last_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name',
    COALESCE((NEW.raw_user_meta_data ->> 'role')::user_role, 'org_user')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();