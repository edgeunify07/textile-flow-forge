import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Package, 
  Calculator, 
  Layers, 
  Truck, 
  ClipboardCheck, 
  FileText, 
  BarChart3, 
  Bell, 
  Brain,
  ArrowRight,
  CheckCircle,
  Star,
  Users
} from 'lucide-react';

const Index = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  // If user is authenticated, redirect to appropriate dashboard
  if (user && profile) {
    navigate('/organizations');
    return null;
  }

  const features = [
    {
      icon: Building2,
      title: 'Organizations',
      description: 'Manage multiple textile companies with complete profile management',
      href: '/organizations',
      color: 'text-textile-blue',
      bgColor: 'bg-textile-blue/10'
    },
    {
      icon: Package,
      title: 'Variables',
      description: 'Comprehensive database of threads, fabrics, trims & accessories',
      href: '/variables',
      color: 'text-textile-green',
      bgColor: 'bg-textile-green/10'
    },
    {
      icon: Calculator,
      title: 'BOM & Costing',
      description: 'Automated Bill of Materials and Cost Per Piece calculations',
      href: '/bom',
      color: 'text-textile-orange',
      bgColor: 'bg-textile-orange/10'
    },
    {
      icon: Layers,
      title: 'Production',
      description: 'Track production orders from planning to completion',
      href: '/production',
      color: 'text-textile-purple',
      bgColor: 'bg-textile-purple/10'
    },
    {
      icon: Truck,
      title: 'Live Inventory',
      description: 'Real-time inventory management with AI-powered insights',
      href: '/inventory',
      color: 'text-textile-teal',
      bgColor: 'bg-textile-teal/10'
    },
    {
      icon: ClipboardCheck,
      title: 'Quality Control',
      description: 'Comprehensive quality testing and parameter tracking',
      href: '/quality',
      color: 'text-textile-blue',
      bgColor: 'bg-textile-blue/10'
    },
    {
      icon: FileText,
      title: 'Reports',
      description: 'Export to Excel, PDF & Word with customizable templates',
      href: '/reports',
      color: 'text-textile-green',
      bgColor: 'bg-textile-green/10'
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'Business insights and performance analytics',
      href: '/analytics',
      color: 'text-textile-orange',
      bgColor: 'bg-textile-orange/10'
    },
    {
      icon: Bell,
      title: 'Payment Reminders',
      description: 'Automated payment tracking with email notifications',
      href: '/payments',
      color: 'text-textile-purple',
      bgColor: 'bg-textile-purple/10'
    },
    {
      icon: Brain,
      title: 'AI Assistant',
      description: 'AI-powered insights for cost optimization and forecasting',
      href: '/ai',
      color: 'text-textile-teal',
      bgColor: 'bg-textile-teal/10'
    }
  ];

  const stats = [
    { label: 'Active Organizations', value: '500+', icon: Building2 },
    { label: 'Products Managed', value: '10,000+', icon: Package },
    { label: 'BOMs Created', value: '25,000+', icon: Calculator },
    { label: 'Reports Generated', value: '100,000+', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-textile flex items-center justify-center">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">UnifyEdge LLP</h1>
              <p className="text-xs text-muted-foreground">Complete Textile Management Suite</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
            <Button variant="gradient" asChild>
              <Link to="/auth">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              Enterprise Textile ERP Solution
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Complete Textile
              <span className="bg-gradient-textile bg-clip-text text-transparent"> Management </span>
              Suite
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              From organizations to variables, BOM calculations to inventory management - 
              everything you need to run your textile business efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="gradient" className="gap-2" asChild>
                <Link to="/auth">
                  Get Started Today
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <Link to="/auth">
                  Sign In
                  <Package className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need for Textile Management
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive ERP solution covering every aspect of textile manufacturing
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-3`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all" asChild>
                    <Link to={feature.href}>
                      Explore {feature.title}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Why Choose UnifyEdge LLP?
            </h2>
            
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                {[
                  'Complete textile industry variable management',
                  'Automated BOM and CPP calculations',
                  'Real-time inventory tracking with AI',
                  'Comprehensive quality control systems',
                  'Multi-format report generation (Excel, PDF, Word)'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-6">
                {[
                  'Integrated payment reminder system',
                  'AI-powered business insights',
                  'Multi-organization support',
                  'Customizable workflows and templates',
                  'Export capabilities for all major formats'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Star className="h-6 w-6 text-warning flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="bg-gradient-textile text-white border-0">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Textile Business?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join hundreds of textile companies using UnifyEdge LLP to streamline 
                their operations and boost productivity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="gap-2" asChild>
                  <Link to="/organizations">
                    Start Free Trial
                    <Building2 className="h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="gap-2 border-white text-white hover:bg-white hover:text-primary" asChild>
                  <Link to="/variables">
                    Schedule Demo
                    <Users className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="h-8 w-8 rounded-lg bg-gradient-textile flex items-center justify-center">
              <Package className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-foreground">UnifyEdge LLP</span>
          </div>
          <p className="text-muted-foreground mb-4">
            Complete Textile Management Solution for Modern Manufacturing
          </p>
          <p className="text-sm text-muted-foreground">
            © 2024 UnifyEdge LLP. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
