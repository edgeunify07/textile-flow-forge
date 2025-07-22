import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Package, 
  Layers, 
  Calculator, 
  FileText, 
  BarChart3, 
  Settings, 
  Users, 
  Truck,
  ClipboardCheck,
  Bell,
  Brain,
  Menu,
  X
} from 'lucide-react';

const navItems = [
  { 
    label: 'Organizations', 
    href: '/organizations', 
    icon: Building2,
    description: 'Manage your textile companies'
  },
  { 
    label: 'Variables', 
    href: '/variables', 
    icon: Package,
    description: 'Threads, fabrics, trims & accessories'
  },
  { 
    label: 'BOM & Costing', 
    href: '/bom', 
    icon: Calculator,
    description: 'Bill of materials & CPP calculations'
  },
  { 
    label: 'Production', 
    href: '/production', 
    icon: Layers,
    description: 'Production orders & tracking'
  },
  { 
    label: 'Inventory', 
    href: '/inventory', 
    icon: Truck,
    description: 'Live inventory management'
  },
  { 
    label: 'Quality', 
    href: '/quality', 
    icon: ClipboardCheck,
    description: 'Quality control & testing'
  },
  { 
    label: 'Reports', 
    href: '/reports', 
    icon: FileText,
    description: 'Excel, PDF & Word reports'
  },
  { 
    label: 'Analytics', 
    href: '/analytics', 
    icon: BarChart3,
    description: 'Business insights & trends'
  },
  { 
    label: 'Payments', 
    href: '/payments', 
    icon: Bell,
    description: 'Payment reminders & tracking'
  },
  { 
    label: 'AI Assistant', 
    href: '/ai', 
    icon: Brain,
    description: 'AI-powered textile insights'
  },
  { 
    label: 'Suppliers', 
    href: '/suppliers', 
    icon: Users,
    description: 'Supplier management'
  },
  { 
    label: 'Settings', 
    href: '/settings', 
    icon: Settings,
    description: 'System configuration'
  }
];

export function Navigation() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-background/80 backdrop-blur-sm"
        >
          {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={cn(
        "fixed left-0 top-0 z-40 h-screen w-72 transform bg-card border-r transition-transform duration-300 ease-in-out lg:translate-x-0",
        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Package className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">TextileFlow</h1>
                <p className="text-xs text-muted-foreground">ERP Suite</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1 px-3">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      "group flex items-center rounded-lg px-3 py-3 text-sm font-medium transition-all hover:bg-accent/50",
                      isActive 
                        ? "bg-primary text-primary-foreground shadow-sm" 
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className={cn(
                      "mr-3 h-5 w-5 transition-colors",
                      isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                    )} />
                    <div className="flex-1">
                      <div className={cn(
                        "font-medium",
                        isActive ? "text-primary-foreground" : "text-foreground"
                      )}>
                        {item.label}
                      </div>
                      <div className={cn(
                        "text-xs",
                        isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                      )}>
                        {item.description}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="border-t p-4">
            <div className="text-center text-xs text-muted-foreground">
              <p>TextileFlow ERP v2.0</p>
              <p className="mt-1">Comprehensive Textile Management</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}