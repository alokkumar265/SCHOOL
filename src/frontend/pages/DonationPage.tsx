import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';
import { 
  Heart, 
  CreditCard, 
  DollarSign,
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock,
  Download,
  Receipt,
  TrendingUp,
  FileText,
  Users,
  Award,
  Building,
  GraduationCap,
  BookOpen,
  Activity,
  Star,
  Target,
  Trophy,
  ArrowRight,
  Plus,
  Minus,
  Eye,
  EyeOff,
  RefreshCw,
  Check,
  X,
  AlertTriangle,
  Info,
  Gift,
  HandHeart,
  School,
  Library,
  Microscope,
  Computer,
  Bus,
  Utensils,
  Shield,
  QrCode,
  Smartphone,
  Wallet,
  Banknote
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Add print styles for the receipt
const printStyles = `
  @media print {
    body * { visibility: hidden !important; }
    .donation-receipt-content, .donation-receipt-content * { visibility: visible !important; }
    .donation-receipt-content {
      position: absolute !important;
      left: 0; top: 0; width: 100vw !important; max-width: 400px !important;
      margin: 0 auto !important;
      background: white !important;
      box-shadow: none !important;
      border: none !important;
      padding: 0.5cm !important;
      font-size: 12pt !important;
    }
    .donation-receipt-content table { width: 100% !important; table-layout: fixed !important; }
    .donation-receipt-content th, .donation-receipt-content td { word-break: break-word !important; font-size: 11pt !important; }
    .no-print, .no-print * { display: none !important; }
    .modal, .modal * { display: none !important; }
    .bg-black, .bg-opacity-50 { background: none !important; }
  }
`;

interface DonationCampaign {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  category: 'Scholarship' | 'Infrastructure' | 'Technology' | 'Library' | 'Sports' | 'Arts' | 'General';
  image: string;
  deadline: string;
  status: 'Active' | 'Completed' | 'Upcoming';
  priority: 'High' | 'Medium' | 'Low';
  createdAt: string;
  updatedAt: string;
}

interface Donation {
  id: string;
  amount: number;
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  campaignId: string;
  campaignTitle: string;
  message?: string;
  anonymous: boolean;
  paymentMethod: string;
  transactionId: string;
  status: 'Completed' | 'Pending' | 'Failed';
  date: string;
  receiptNumber: string;
  createdAt: string;
  updatedAt: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  type: 'card' | 'upi' | 'netbanking' | 'wallet' | 'cash';
  icon: React.ReactElement;
  description: string;
  processingFee: number;
  estimatedTime: string;
}

interface DonationStats {
  totalDonated: number;
  totalDonations: number;
  campaignsSupported: number;
  successfulDonations: number;
  monthlyDonations: number;
  averageDonation: number;
}

// API Service Layer - Ready for real database integration
class DonationService {
  private static instance: DonationService;
  
  static getInstance(): DonationService {
    if (!DonationService.instance) {
      DonationService.instance = new DonationService();
    }
    return DonationService.instance;
  }

  // Campaigns API
  async getCampaigns(): Promise<DonationCampaign[]> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/donations/campaigns');
      // return await response.json();
      
      // Mock data for now
      return this.getMockCampaigns();
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      return [];
    }
  }

  async getCampaignById(id: string): Promise<DonationCampaign | null> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/donations/campaigns/${id}`);
      // return await response.json();
      
      const campaigns = this.getMockCampaigns();
      return campaigns.find(c => c.id === id) || null;
    } catch (error) {
      console.error('Error fetching campaign:', error);
      return null;
    }
  }

  async updateCampaignProgress(id: string, newAmount: number): Promise<boolean> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/donations/campaigns/${id}/progress`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ currentAmount: newAmount })
      // });
      // return response.ok;
      
      // Mock update
      return true;
    } catch (error) {
      console.error('Error updating campaign progress:', error);
      return false;
    }
  }

  // Donations API
  async getDonations(): Promise<Donation[]> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/donations');
      // return await response.json();
      
      // Load from localStorage for now
      const saved = localStorage.getItem('alumni_donations');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error fetching donations:', error);
      return [];
    }
  }

  async createDonation(donation: Omit<Donation, 'id' | 'createdAt' | 'updatedAt'>): Promise<Donation | null> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/donations', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(donation)
      // });
      // return await response.json();
      
      // Mock creation
      const newDonation: Donation = {
        ...donation,
        id: `DON-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Save to localStorage for now
      const existing = await this.getDonations();
      const updated = [newDonation, ...existing];
      localStorage.setItem('alumni_donations', JSON.stringify(updated));

      return newDonation;
    } catch (error) {
      console.error('Error creating donation:', error);
      return null;
    }
  }

  async getDonationById(id: string): Promise<Donation | null> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/donations/${id}`);
      // return await response.json();
      
      const donations = await this.getDonations();
      return donations.find(d => d.id === id) || null;
    } catch (error) {
      console.error('Error fetching donation:', error);
      return null;
    }
  }

  // Stats API
  async getDonationStats(): Promise<DonationStats> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/donations/stats');
      // return await response.json();
      
      const donations = await this.getDonations();
      const totalDonated = donations.reduce((sum, d) => sum + d.amount, 0);
      const successfulDonations = donations.filter(d => d.status === 'Completed').length;
      const campaignsSupported = [...new Set(donations.map(d => d.campaignId))].length;
      
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const monthlyDonations = donations.filter(d => {
        const date = new Date(d.date);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
      }).length;

      return {
        totalDonated,
        totalDonations: donations.length,
        campaignsSupported,
        successfulDonations,
        monthlyDonations,
        averageDonation: donations.length > 0 ? totalDonated / donations.length : 0
      };
    } catch (error) {
      console.error('Error fetching donation stats:', error);
      return {
        totalDonated: 0,
        totalDonations: 0,
        campaignsSupported: 0,
        successfulDonations: 0,
        monthlyDonations: 0,
        averageDonation: 0
      };
    }
  }

  // Payment API
  async processPayment(paymentData: {
    amount: number;
    method: string;
    donorInfo: any;
    campaignId: string;
  }): Promise<{ success: boolean; transactionId?: string; error?: string }> {
    try {
      // TODO: Replace with actual payment gateway API call
      // const response = await fetch('/api/payments/process', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(paymentData)
      // });
      // return await response.json();
      
      // Mock payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return {
        success: true,
        transactionId: `TXN-${Date.now()}`
      };
    } catch (error) {
      console.error('Error processing payment:', error);
      return {
        success: false,
        error: 'Payment processing failed'
      };
    }
  }

  // Mock data
  private getMockCampaigns(): DonationCampaign[] {
    return [
      {
        id: '1',
        title: 'Alumni Scholarship Fund',
        description: 'Support deserving students from underprivileged backgrounds to pursue quality education. Your donation helps cover tuition fees, books, and other educational expenses.',
        targetAmount: 500000,
        currentAmount: 325000,
        category: 'Scholarship',
        image: '/api/placeholder/400/200',
        deadline: '2024-12-31',
        status: 'Active',
        priority: 'High',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      {
        id: '2',
        title: 'Computer Lab Modernization',
        description: 'Help us upgrade our computer lab with the latest technology and software to prepare students for the digital future.',
        targetAmount: 750000,
        currentAmount: 450000,
        category: 'Technology',
        image: '/api/placeholder/400/200',
        deadline: '2024-11-30',
        status: 'Active',
        priority: 'High',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      {
        id: '3',
        title: 'Library Enhancement Project',
        description: 'Expand our library collection with new books, digital resources, and study spaces to foster a love for reading and learning.',
        targetAmount: 300000,
        currentAmount: 180000,
        category: 'Library',
        image: '/api/placeholder/400/200',
        deadline: '2024-10-31',
        status: 'Active',
        priority: 'Medium',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      {
        id: '4',
        title: 'Sports Equipment Fund',
        description: 'Provide modern sports equipment and facilities to encourage physical fitness and sports excellence among students.',
        targetAmount: 250000,
        currentAmount: 120000,
        category: 'Sports',
        image: '/api/placeholder/400/200',
        deadline: '2024-09-30',
        status: 'Active',
        priority: 'Medium',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      {
        id: '5',
        title: 'Science Lab Equipment',
        description: 'Upgrade our science laboratories with modern equipment and materials to enhance practical learning experiences.',
        targetAmount: 400000,
        currentAmount: 280000,
        category: 'Infrastructure',
        image: '/api/placeholder/400/200',
        deadline: '2024-08-31',
        status: 'Active',
        priority: 'High',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      {
        id: '6',
        title: 'Arts & Culture Program',
        description: 'Support arts, music, and cultural programs to nurture creativity and artistic talents in our students.',
        targetAmount: 200000,
        currentAmount: 95000,
        category: 'Arts',
        image: '/api/placeholder/400/200',
        deadline: '2024-07-31',
        status: 'Active',
        priority: 'Low',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ];
  }
}

const DonationPage = () => {
  const [campaigns, setCampaigns] = useState<DonationCampaign[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [stats, setStats] = useState<DonationStats>({
    totalDonated: 0,
    totalDonations: 0,
    campaignsSupported: 0,
    successfulDonations: 0,
    monthlyDonations: 0,
    averageDonation: 0
  });
  const [selectedCampaign, setSelectedCampaign] = useState<DonationCampaign | null>(null);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<Donation | null>(null);
  const [donationSuccess, setDonationSuccess] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const donationService = DonationService.getInstance();

  // Mock alumni info - This will come from auth context later
  const alumniInfo = {
    name: 'Priya Sharma',
    alumniId: 'AL2020-001',
    graduationYear: '2020',
    degree: 'Bachelor of Science',
    currentCompany: 'Tech Solutions Inc.',
    position: 'Software Engineer',
    email: 'priya.sharma@example.com',
    phone: '+91 98765 43210'
  };

  const schoolInfo = {
    name: 'Veena Public School',
    logo: '', // Add logo URL if available
    address: '123 School Road, Delhi',
    email: 'info@veenapublicschool.edu.in',
    phone: '+91 11 2345 6789',
  };

  const paymentMethods: PaymentMethod[] = [
    { id: 'card', name: 'Credit/Debit Card', type: 'card', icon: <CreditCard className="h-5 w-5" />, description: 'Use your credit or debit card for secure payment', processingFee: 0, estimatedTime: 'Instant' },
    { id: 'upi', name: 'UPI', type: 'upi', icon: <QrCode className="h-5 w-5" />, description: 'Use UPI for instant payment', processingFee: 0, estimatedTime: 'Instant' },
    { id: 'netbanking', name: 'Netbanking', type: 'netbanking', icon: <Banknote className="h-5 w-5" />, description: 'Use your bank account for payment', processingFee: 0, estimatedTime: '1-3 business days' },
    { id: 'wallet', name: 'Wallet', type: 'wallet', icon: <Smartphone className="h-5 w-5" />, description: 'Use your mobile wallet for payment', processingFee: 0, estimatedTime: 'Instant' },
  ];

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setError(null);
      const [campaignsData, donationsData, statsData] = await Promise.all([
        donationService.getCampaigns(),
        donationService.getDonations(),
        donationService.getDonationStats()
      ]);

      setCampaigns(campaignsData);
      setDonations(donationsData);
      setStats(statsData);
    } catch (err) {
      setError('Failed to load donation data. Please try again.');
      console.error('Error loading data:', err);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Scholarship': return <GraduationCap className="h-5 w-5" />;
      case 'Technology': return <Computer className="h-5 w-5" />;
      case 'Library': return <BookOpen className="h-5 w-5" />;
      case 'Sports': return <Activity className="h-5 w-5" />;
      case 'Infrastructure': return <Building className="h-5 w-5" />;
      case 'Arts': return <Award className="h-5 w-5" />;
      default: return <Heart className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Scholarship': return 'bg-blue-100 text-blue-800';
      case 'Technology': return 'bg-purple-100 text-purple-800';
      case 'Library': return 'bg-green-100 text-green-800';
      case 'Sports': return 'bg-orange-100 text-orange-800';
      case 'Infrastructure': return 'bg-red-100 text-red-800';
      case 'Arts': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDonate = (campaign: DonationCampaign) => {
    setSelectedCampaign(campaign);
    setShowDonationModal(true);
  };

  const handlePayment = async () => {
    if (!selectedCampaign) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Process payment
      const paymentResult = await donationService.processPayment({
        amount: 1000, // This would come from form
        method: selectedMethod,
        donorInfo: alumniInfo,
        campaignId: selectedCampaign.id
      });

      if (!paymentResult.success) {
        throw new Error(paymentResult.error || 'Payment failed');
      }

      // Create donation record
      const newDonation = await donationService.createDonation({
        amount: 1000,
        donorName: alumniInfo.name,
        donorEmail: alumniInfo.email,
        donorPhone: alumniInfo.phone,
        campaignId: selectedCampaign.id,
        campaignTitle: selectedCampaign.title,
        message: 'Supporting education for future generations',
        anonymous: false,
        paymentMethod: paymentMethods.find(m => m.id === selectedMethod)?.name || 'Credit Card',
        transactionId: paymentResult.transactionId!,
        status: 'Completed',
        date: new Date().toISOString(),
        receiptNumber: `RCP-${Date.now()}`
      });

      if (newDonation) {
        // Update campaign progress
        await donationService.updateCampaignProgress(
          selectedCampaign.id, 
          selectedCampaign.currentAmount + 1000
        );

        // Refresh data
        await loadData();
        
        setDonationSuccess(true);
        setTimeout(() => {
          setShowDonationModal(false);
          setDonationSuccess(false);
          setSelectedCampaign(null);
        }, 3000);
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <DashboardLayout>
      <style>{printStyles}</style>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Alumni Donations</h2>
            <p className="text-muted-foreground max-w-xl">
              Make a difference in the lives of current students and contribute to the growth of your alma mater. Every donation counts towards building a better future.
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Alumni Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Heart className="h-8 w-8 text-red-600" />
                <div>
                  <p className="text-2xl font-bold">₹{stats.totalDonated.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Donated</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Users className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.totalDonations}</p>
                  <p className="text-sm text-muted-foreground">Total Donations</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Target className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.campaignsSupported}</p>
                  <p className="text-sm text-muted-foreground">Campaigns Supported</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Star className="h-8 w-8 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.successfulDonations}</p>
                  <p className="text-sm text-muted-foreground">Successful</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="campaigns" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="campaigns">Active Campaigns</TabsTrigger>
            <TabsTrigger value="history">Donation History</TabsTrigger>
            <TabsTrigger value="impact">Our Impact</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((campaign) => (
                <Card key={campaign.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative">
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    <div className="absolute top-4 left-4">
                      <Badge className={getCategoryColor(campaign.category)}>
                        {getCategoryIcon(campaign.category)}
                        <span className="ml-1">{campaign.category}</span>
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className={getPriorityColor(campaign.priority)}>
                        {campaign.priority} Priority
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-semibold text-lg">{campaign.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {campaign.description}
                    </p>
                    
                    <div className="space-y-3 mb-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{Math.round((campaign.currentAmount / campaign.targetAmount) * 100)}%</span>
                        </div>
                        <Progress value={(campaign.currentAmount / campaign.targetAmount) * 100} className="h-2" />
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>Raised: ₹{campaign.currentAmount.toLocaleString()}</span>
                        <span>Goal: ₹{campaign.targetAmount.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <span>Deadline: {new Date(campaign.deadline).toLocaleDateString()}</span>
                      <span className={`px-2 py-1 rounded-full ${
                        campaign.status === 'Active' ? 'bg-green-100 text-green-800' : 
                        campaign.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>

                    <Button 
                      className="w-full" 
                      onClick={() => handleDonate(campaign)}
                      disabled={campaign.status !== 'Active'}
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      Donate Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Donation History</CardTitle>
                <CardDescription>Your complete donation history and receipts</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead className="no-print">Receipt</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {donations.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                          <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                          <p>No donations yet. Make your first donation to support your alma mater!</p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      donations.map((donation) => (
                        <TableRow key={donation.id}>
                          <TableCell>{new Date(donation.date).toLocaleDateString()}</TableCell>
                          <TableCell>{donation.campaignTitle}</TableCell>
                          <TableCell>₹{donation.amount.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge className={
                              donation.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              donation.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }>
                              {donation.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{donation.paymentMethod}</TableCell>
                          <TableCell className="no-print">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => {
                                setSelectedReceipt(donation);
                                setShowReceiptModal(true);
                              }}
                            >
                              <Receipt className="mr-2 h-4 w-4" />
                              View Receipt
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="impact" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Impact Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <GraduationCap className="h-8 w-8 text-blue-600" />
                        <div>
                          <p className="font-semibold">Students Supported</p>
                          <p className="text-sm text-muted-foreground">Through scholarships</p>
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">45</p>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Computer className="h-8 w-8 text-green-600" />
                        <div>
                          <p className="font-semibold">Computers Added</p>
                          <p className="text-sm text-muted-foreground">To computer labs</p>
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-green-600">25</p>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-8 w-8 text-purple-600" />
                        <div>
                          <p className="font-semibold">Books Added</p>
                          <p className="text-sm text-muted-foreground">To library</p>
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-purple-600">500+</p>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Activity className="h-8 w-8 text-orange-600" />
                        <div>
                          <p className="font-semibold">Sports Equipment</p>
                          <p className="text-sm text-muted-foreground">Provided</p>
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-orange-600">100+</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Recent Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                      <Award className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Scholarship Program Success</p>
                        <p className="text-sm text-muted-foreground">15 students received full scholarships this year</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <Computer className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Tech Lab Upgrade</p>
                        <p className="text-sm text-muted-foreground">New computer lab inaugurated with latest equipment</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <BookOpen className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Library Expansion</p>
                        <p className="text-sm text-muted-foreground">Digital library section added with 1000+ e-books</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                      <Activity className="h-5 w-5 text-purple-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Sports Excellence</p>
                        <p className="text-sm text-muted-foreground">School won district sports championship</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Donation Modal */}
        {showDonationModal && selectedCampaign && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Make a Donation</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowDonationModal(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {!donationSuccess ? (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">{selectedCampaign.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{selectedCampaign.description}</p>
                    <div className="flex justify-between text-sm">
                      <span>Target: ₹{selectedCampaign.targetAmount.toLocaleString()}</span>
                      <span>Raised: ₹{selectedCampaign.currentAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="amount">Donation Amount (₹)</Label>
                      <Input 
                        id="amount" 
                        type="number" 
                        placeholder="Enter amount" 
                        min="100"
                        defaultValue="1000"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message (Optional)</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Leave a message with your donation..."
                        rows={3}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="anonymous" />
                      <Label htmlFor="anonymous">Make this donation anonymous</Label>
                    </div>

                    <div>
                      <Label>Payment Method</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {paymentMethods.map(method => (
                          <Button 
                            key={method.id} 
                            variant={selectedMethod === method.id ? 'default' : 'outline'} 
                            onClick={() => setSelectedMethod(method.id)}
                            className="justify-start"
                          >
                            {method.icon}
                            <span className="ml-2">{method.name}</span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Button 
                      className="w-full" 
                      onClick={handlePayment}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Heart className="mr-2 h-4 w-4" />
                          Donate ₹1,000
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Donation Successful!</h3>
                  <p className="text-muted-foreground mb-4">
                    Thank you for your generous contribution to {selectedCampaign.title}. Your donation will make a real difference.
                  </p>
                  <Button onClick={() => setShowDonationModal(false)}>
                    Continue
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Receipt Modal */}
        {showReceiptModal && selectedReceipt && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Donation Receipt</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowReceiptModal(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="donation-receipt-content border rounded-lg p-4 bg-white shadow print:shadow-none print:border print:p-2 mb-4 text-left" style={{maxWidth: 400, margin: '0 auto'}}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h2 className="text-xl font-bold text-blue-600">{schoolInfo.name}</h2>
                    <p className="text-xs text-muted-foreground">{schoolInfo.address}</p>
                    <p className="text-xs text-muted-foreground">{schoolInfo.email} | {schoolInfo.phone}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Receipt #</p>
                    <p className="text-xs text-muted-foreground">{selectedReceipt.receiptNumber}</p>
                  </div>
                </div>
                
                <div className="border-t border-b py-2 mb-2">
                  <div className="flex justify-between text-sm">
                    <span><strong>Date:</strong></span>
                    <span>{new Date(selectedReceipt.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span><strong>Donor:</strong></span>
                    <span>{selectedReceipt.donorName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span><strong>Alumni ID:</strong></span>
                    <span>{alumniInfo.alumniId}</span>
                  </div>
                </div>
                
                <div className="mb-2">
                  <p className="text-sm font-medium mb-1">Donation Details:</p>
                  <div className="bg-gray-50 p-2 rounded text-sm">
                    <div className="flex justify-between">
                      <span>Campaign:</span>
                      <span>{selectedReceipt.campaignTitle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Amount:</span>
                      <span>₹{selectedReceipt.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment Method:</span>
                      <span>{selectedReceipt.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Transaction ID:</span>
                      <span className="text-xs">{selectedReceipt.transactionId}</span>
                    </div>
                  </div>
                </div>
                
                {selectedReceipt.message && (
                  <div className="mb-2">
                    <p className="text-sm font-medium">Message:</p>
                    <p className="text-sm text-muted-foreground italic">"{selectedReceipt.message}"</p>
                  </div>
                )}
                
                <div className="text-center text-xs text-muted-foreground mt-4">
                  <p><strong>Thank you for your generous contribution!</strong></p>
                  <p>Your donation helps us provide quality education and opportunities to deserving students.</p>
                  <p className="mt-2">This is a computer-generated receipt. Please keep it for your records.</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={handlePrint} className="no-print">
                  <Download className="mr-2 h-4 w-4" />
                  Print Receipt
                </Button>
                <Button onClick={() => setShowReceiptModal(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DonationPage; 