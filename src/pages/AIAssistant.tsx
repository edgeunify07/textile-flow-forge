import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Brain, 
  MessageSquare,
  TrendingUp,
  Lightbulb,
  Target,
  BarChart3,
  Zap,
  FileDown,
  Send,
  Bot,
  User,
  DollarSign,
  Package,
  AlertTriangle
} from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  message: string;
  timestamp: string;
}

interface AIInsight {
  id: string;
  type: 'cost-optimization' | 'demand-forecast' | 'quality-improvement' | 'efficiency';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  category: string;
  recommendation: string;
}

const mockInsights: AIInsight[] = [
  {
    id: '1',
    type: 'cost-optimization',
    title: 'Cotton Thread Cost Reduction',
    description: 'Alternative suppliers can reduce cotton thread costs by 12%',
    impact: 'high',
    category: 'Cost Optimization',
    recommendation: 'Switch to Supplier B for cotton threads while maintaining quality standards'
  },
  {
    id: '2',
    type: 'demand-forecast',
    title: 'Increased Denim Demand',
    description: 'Denim products expected to see 25% increase in Q2',
    impact: 'medium',
    category: 'Demand Forecasting',
    recommendation: 'Increase denim production capacity by 20% for next quarter'
  },
  {
    id: '3',
    type: 'quality-improvement',
    title: 'Color Fastness Enhancement',
    description: 'Adjusting dye process can improve color fastness by 8%',
    impact: 'medium',
    category: 'Quality Enhancement',
    recommendation: 'Implement new dye process for premium product lines'
  }
];

const AIAssistant = () => {
  const [selectedTab, setSelectedTab] = useState('chat');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      message: 'Hello! I\'m your textile AI assistant. I can help you optimize costs, forecast demand, improve quality, and enhance efficiency. What would you like to know?',
      timestamp: '10:00 AM'
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const { toast } = useToast();

  const getImpactBadge = (impact: AIInsight['impact']) => {
    const impactConfig = {
      'low': { variant: 'secondary', label: 'Low Impact' },
      'medium': { variant: 'warning', label: 'Medium Impact' },
      'high': { variant: 'destructive', label: 'High Impact' }
    };
    
    const config = impactConfig[impact];
    return <Badge variant={config.variant as any}>{config.label}</Badge>;
  };

  const getInsightIcon = (type: AIInsight['type']) => {
    const iconMap = {
      'cost-optimization': DollarSign,
      'demand-forecast': TrendingUp,
      'quality-improvement': Target,
      'efficiency': Zap
    };
    return iconMap[type];
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: currentMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        message: getAIResponse(currentMessage),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setCurrentMessage('');
  };

  const getAIResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('cost') || lowerMessage.includes('price')) {
      return 'Based on your current data, I recommend switching to Supplier B for cotton threads to reduce costs by 12%. This could save approximately $45,000 annually while maintaining quality standards.';
    } else if (lowerMessage.includes('demand') || lowerMessage.includes('forecast')) {
      return 'My analysis shows denim products will see a 25% increase in demand next quarter. I suggest increasing production capacity by 20% and securing additional raw materials now.';
    } else if (lowerMessage.includes('quality')) {
      return 'Quality metrics show your color fastness can be improved by 8% with a new dye process. This would reduce customer returns and increase satisfaction ratings.';
    } else if (lowerMessage.includes('efficiency') || lowerMessage.includes('production')) {
      return 'Your production efficiency can be improved by optimizing shift schedules. Peak performance hours are 10 AM - 2 PM. Consider scheduling high-priority orders during this window.';
    } else {
      return 'I can help you with cost optimization, demand forecasting, quality improvements, and production efficiency. What specific area would you like to explore?';
    }
  };

  const handleGenerateReport = () => {
    toast({
      title: "AI Report Generated",
      description: "Comprehensive AI insights report has been generated.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Assistant</h1>
          <p className="text-muted-foreground">AI-powered insights for cost optimization and forecasting</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleGenerateReport}>
            <FileDown className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button>
            <Brain className="mr-2 h-4 w-4" />
            New Analysis
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Savings Identified</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">$127,450</div>
            <p className="text-xs text-muted-foreground">Potential annual savings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Recommendations</CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Active insights</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accuracy Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">Prediction accuracy</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency Gain</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+18%</div>
            <p className="text-xs text-muted-foreground">Process improvement</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="chat">AI Chat</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card className="h-96">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    AI Assistant Chat
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col h-full">
                  <div className="flex-1 space-y-4 overflow-y-auto mb-4">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`flex gap-2 max-w-[80%] ${
                            message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                          }`}
                        >
                          <div className="flex-shrink-0">
                            {message.type === 'user' ? (
                              <User className="h-8 w-8 p-1 bg-primary text-primary-foreground rounded-full" />
                            ) : (
                              <Bot className="h-8 w-8 p-1 bg-accent text-accent-foreground rounded-full" />
                            )}
                          </div>
                          <div
                            className={`p-3 rounded-lg ${
                              message.type === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm">{message.message}</p>
                            <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask about costs, demand, quality, or efficiency..."
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                    onClick={() => setCurrentMessage('How can I reduce production costs?')}
                  >
                    How can I reduce production costs?
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                    onClick={() => setCurrentMessage('What products will be in demand next quarter?')}
                  >
                    What products will be in demand?
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                    onClick={() => setCurrentMessage('How can I improve quality metrics?')}
                  >
                    How can I improve quality?
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                    onClick={() => setCurrentMessage('Optimize my production schedule')}
                  >
                    Optimize production schedule
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="space-y-4">
            {mockInsights.map((insight) => {
              const Icon = getInsightIcon(insight.type);
              return (
                <Card key={insight.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold">{insight.title}</h3>
                            {getImpactBadge(insight.impact)}
                            <Badge variant="outline">{insight.category}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{insight.description}</p>
                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-1">Recommendation:</h4>
                            <p className="text-sm text-muted-foreground">{insight.recommendation}</p>
                          </div>
                        </div>
                      </div>
                      <Button size="sm">Apply</Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="forecasting" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Demand Forecasting</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
                  <div className="text-center space-y-2">
                    <BarChart3 className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Demand forecasting charts</p>
                    <p className="text-xs text-muted-foreground">AI-powered predictions coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Forecast Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Next Quarter Revenue</h4>
                      <span className="text-lg font-bold text-success">$1.45M</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Predicted +17% growth</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Top Product Category</h4>
                      <span className="text-lg font-bold">Denim</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Expected 25% demand increase</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Seasonal Trend</h4>
                      <span className="text-lg font-bold">Spring 2024</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Light fabrics trending upward</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Cost Optimization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Material Costs</p>
                      <p className="text-sm text-muted-foreground">Optimize supplier selection</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-success">-12%</p>
                      <p className="text-xs text-muted-foreground">Potential savings</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Energy Usage</p>
                      <p className="text-sm text-muted-foreground">Optimize production schedule</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-success">-8%</p>
                      <p className="text-xs text-muted-foreground">Potential savings</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Labor Efficiency</p>
                      <p className="text-sm text-muted-foreground">Optimize shift patterns</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-success">+15%</p>
                      <p className="text-xs text-muted-foreground">Efficiency gain</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Process Optimization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Production Flow</p>
                      <p className="text-sm text-muted-foreground">Reduce bottlenecks</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-primary">18%</p>
                      <p className="text-xs text-muted-foreground">Improvement</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Quality Control</p>
                      <p className="text-sm text-muted-foreground">Predictive quality checks</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-primary">94%</p>
                      <p className="text-xs text-muted-foreground">Accuracy rate</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Inventory Management</p>
                      <p className="text-sm text-muted-foreground">Optimize stock levels</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-primary">22%</p>
                      <p className="text-xs text-muted-foreground">Reduction</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIAssistant;