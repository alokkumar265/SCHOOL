import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';
import { useAuth } from '@/backend/contexts/AuthContext';
import { 
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
  Bus,
  Utensils,
  Library,
  Activity,
  BookOpen,
  Users,
  Package,
  Zap,
  Shield,
  QrCode,
  Smartphone,
  Wallet,
  Banknote,
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
  GraduationCap,
  School,
  Microscope,
  Computer,
  Award,
  Building
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Add print styles for the slip
const printStyles = `
  @media print {
    body * { visibility: hidden !important; }
    .fee-slip-content, .fee-slip-content * { visibility: visible !important; }
    .fee-slip-content {
      position: absolute !important;
      left: 0; top: 0; width: 100vw !important; max-width: 400px !important;
      margin: 0 auto !important;
      background: white !important;
      box-shadow: none !important;
      border: none !important;
      padding: 0.5cm !important;
      font-size: 12pt !important;
    }
    .fee-slip-content table { width: 100% !important; table-layout: fixed !important; }
    .fee-slip-content th, .fee-slip-content td { word-break: break-word !important; font-size: 11pt !important; }
    .no-print, .no-print * { display: none !important; }
    .modal, .modal * { display: none !important; }
    .bg-black, .bg-opacity-50 { background: none !important; }
  }
`;

interface ServiceFee {
  id: string;
  serviceName: string;
  category: 'Transportation' | 'Canteen' | 'Library' | 'Extracurricular' | 'Academic' | 'Other' | 'Alumni Association' | 'Events & Reunions' | 'Mentorship' | 'Professional Development' | 'Donations' | 'Tuition' | 'Laboratory' | 'Sports' | 'Technology' | 'Examination' | 'Uniform' | 'Books' | 'Medical';
  description: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Upcoming';
  paidAmount?: number;
  paidDate?: string;
  frequency: 'One-time' | 'Monthly' | 'Quarterly' | 'Annual';
  isOptional: boolean;
  icon: string;
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

interface PaymentHistory {
  id: string;
  date: string;
  amount: number;
  method: string;
  reference: string;
  status: 'Completed' | 'Pending' | 'Failed' | 'Processing';
  description: string;
  services: string[];
  transactionId?: string;
}

const FeeManagementPage = () => {
  const { user } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedFees, setSelectedFees] = useState<string[]>([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [history, setHistory] = useState<PaymentHistory[]>([]);
  const [showHistorySlip, setShowHistorySlip] = useState(false);
  const [historySlip, setHistorySlip] = useState(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  // Student info
  const studentInfo = {
    name: 'Alex Johnson',
    studentId: 'ST2024-001',
    grade: '10',
    section: 'A',
    rollNumber: '10A001',
    parentName: 'Mr. & Mrs. Johnson',
    parentPhone: '+91 98765 43210',
    parentEmail: 'johnson@example.com'
  };

  // Alumni info
  const alumniInfo = {
    name: 'Priya Sharma',
    alumniId: 'AL2020-001',
    graduationYear: '2020',
    degree: 'Bachelor of Science',
    currentCompany: 'Tech Solutions Inc.',
    position: 'Software Engineer',
  };

  const schoolInfo = {
    name: 'Veena Public School',
    logo: '', // Add logo URL if available
    address: '123 School Road, Delhi',
  };

  // Student-specific fee data
  const studentFeeData: ServiceFee[] = [
    // Tuition Fees
    { id: '1', serviceName: 'Tuition Fee - March 2024', category: 'Tuition', amount: 5000, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-10`, status: 'Pending', description: 'Monthly tuition fee for March 2024', frequency: 'Monthly', icon: 'School', isOptional: false },
    { id: '2', serviceName: 'Tuition Fee - February 2024', category: 'Tuition', amount: 5000, dueDate: `${currentYear}-${String(currentMonth).padStart(2,'0')}-10`, status: 'Paid', description: 'Monthly tuition fee for February 2024', frequency: 'Monthly', icon: 'School', isOptional: false, paidAmount: 5000, paidDate: '2024-02-08' },
    
    // Academic Fees
    { id: '3', serviceName: 'Examination Fee', category: 'Examination', amount: 800, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-15`, status: 'Pending', description: 'Mid-term examination fee', frequency: 'One-time', icon: 'FileText', isOptional: false },
    { id: '4', serviceName: 'Laboratory Fee', category: 'Laboratory', amount: 1200, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-20`, status: 'Pending', description: 'Science laboratory usage fee', frequency: 'Quarterly', icon: 'Microscope', isOptional: false },
    { id: '5', serviceName: 'Computer Lab Fee', category: 'Technology', amount: 600, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-25`, status: 'Pending', description: 'Computer laboratory access fee', frequency: 'Quarterly', icon: 'Computer', isOptional: false },
    
    // Library & Books
    { id: '6', serviceName: 'Library Fee', category: 'Library', amount: 300, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-12`, status: 'Paid', description: 'Library membership and book borrowing fee', frequency: 'Annual', icon: 'Library', isOptional: false, paidAmount: 300, paidDate: '2024-01-15' },
    { id: '7', serviceName: 'Textbook Fee', category: 'Books', amount: 1500, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-18`, status: 'Pending', description: 'New academic year textbook fee', frequency: 'Annual', icon: 'BookOpen', isOptional: false },
    
    // Transportation
    { id: '8', serviceName: 'Transportation Fee', category: 'Transportation', amount: 2000, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-05`, status: 'Pending', description: 'Monthly school bus transportation fee', frequency: 'Monthly', icon: 'Bus', isOptional: true },
    
    // Extracurricular
    { id: '9', serviceName: 'Sports Fee', category: 'Sports', amount: 400, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-22`, status: 'Pending', description: 'Sports equipment and facility usage fee', frequency: 'Quarterly', icon: 'Activity', isOptional: true },
    { id: '10', serviceName: 'Music Class Fee', category: 'Extracurricular', amount: 800, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-28`, status: 'Pending', description: 'Music class and instrument rental fee', frequency: 'Quarterly', icon: 'Award', isOptional: true },
    
    // Other Services
    { id: '11', serviceName: 'Canteen Fee', category: 'Canteen', amount: 500, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-08`, status: 'Paid', description: 'Monthly canteen meal plan fee', frequency: 'Monthly', icon: 'Utensils', isOptional: true, paidAmount: 500, paidDate: '2024-03-05' },
    { id: '12', serviceName: 'Medical Checkup Fee', category: 'Medical', amount: 300, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-30`, status: 'Upcoming', description: 'Annual health checkup fee', frequency: 'Annual', icon: 'Shield', isOptional: true },
    { id: '13', serviceName: 'Uniform Fee', category: 'Other', amount: 1200, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-14`, status: 'Pending', description: 'New academic year uniform fee', frequency: 'Annual', icon: 'Users', isOptional: false },
  ];

  // Alumni-specific fee data
  const alumniFeeData: ServiceFee[] = [
    // Alumni Association
    { id: '1', serviceName: 'Alumni Association Membership', category: 'Alumni Association', amount: 2000, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-10`, status: 'Pending', description: 'Annual alumni association membership', frequency: 'Annual', icon: 'Users', isOptional: false },
    { id: '2', serviceName: 'Alumni Directory Access', category: 'Alumni Association', amount: 500, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-15`, status: 'Paid', description: 'Premium alumni directory access', frequency: 'Annual', icon: 'Users', isOptional: true },
    // Events & Reunions
    { id: '3', serviceName: 'Annual Alumni Meet', category: 'Events & Reunions', amount: 1500, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-20`, status: 'Upcoming', description: 'Annual alumni reunion event', frequency: 'Annual', icon: 'Calendar', isOptional: true },
    { id: '4', serviceName: 'Homecoming Event', category: 'Events & Reunions', amount: 800, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-25`, status: 'Pending', description: 'Homecoming celebration event', frequency: 'Annual', icon: 'Calendar', isOptional: true },
    // Mentorship Programs
    { id: '5', serviceName: 'Mentorship Program Fee', category: 'Mentorship', amount: 1000, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-12`, status: 'Pending', description: 'Alumni mentorship program participation', frequency: 'Annual', icon: 'Users', isOptional: true },
    { id: '6', serviceName: 'Career Guidance Session', category: 'Mentorship', amount: 300, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-18`, status: 'Paid', description: 'Career guidance for current students', frequency: 'One-time', icon: 'Activity', isOptional: true },
    // Professional Development
    { id: '7', serviceName: 'Professional Workshop', category: 'Professional Development', amount: 1200, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-22`, status: 'Overdue', description: 'Professional development workshop', frequency: 'One-time', icon: 'Activity', isOptional: true },
    { id: '8', serviceName: 'Networking Event', category: 'Professional Development', amount: 600, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-28`, status: 'Pending', description: 'Alumni networking event', frequency: 'One-time', icon: 'Users', isOptional: true },
    // Donations & Contributions
    { id: '9', serviceName: 'Alumni Scholarship Fund', category: 'Donations', amount: 5000, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-05`, status: 'Paid', description: 'Contribution to alumni scholarship fund', frequency: 'One-time', icon: 'Award', isOptional: true },
    { id: '10', serviceName: 'School Development Fund', category: 'Donations', amount: 2000, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-30`, status: 'Pending', description: 'School infrastructure development', frequency: 'One-time', icon: 'Building', isOptional: true },
  ];

  // Use appropriate fee data based on user role
  const allFeeData = user?.role === 'student' ? studentFeeData : alumniFeeData;
  const userInfo = user?.role === 'student' ? studentInfo : alumniInfo;

  const paymentMethods: PaymentMethod[] = [
    { id: 'card', name: 'Credit/Debit Card', type: 'card', icon: <CreditCard className="h-5 w-5" />, description: 'Use your credit or debit card for payment', processingFee: 0, estimatedTime: 'Instant' },
    { id: 'upi', name: 'UPI', type: 'upi', icon: <QrCode className="h-5 w-5" />, description: 'Use UPI for instant payment', processingFee: 0, estimatedTime: 'Instant' },
    { id: 'netbanking', name: 'Netbanking', type: 'netbanking', icon: <Banknote className="h-5 w-5" />, description: 'Use your bank account for payment', processingFee: 0, estimatedTime: '1-3 business days' },
    { id: 'wallet', name: 'Wallet', type: 'wallet', icon: <Smartphone className="h-5 w-5" />, description: 'Use your mobile wallet for payment', processingFee: 0, estimatedTime: 'Instant' },
  ];

  const filteredFees = allFeeData.filter(fee => {
    const feeDate = new Date(fee.dueDate);
    return (
      feeDate.getMonth() === selectedMonth &&
      feeDate.getFullYear() === selectedYear &&
      (fee.status === 'Pending' || fee.status === 'Overdue')
    );
  });

  const totalDue = filteredFees.reduce((sum, fee) => sum + fee.amount, 0);

  const categories = user?.role === 'student' 
    ? ['Tuition', 'Academic', 'Transportation', 'Canteen', 'Library', 'Extracurricular', 'Other']
    : ['Alumni Association', 'Events & Reunions', 'Mentorship', 'Professional Development', 'Donations'];
    
  const breakdown = categories.map(cat => ({
    name: cat,
    total: filteredFees.filter(fee => fee.category === cat).reduce((sum, fee) => sum + fee.amount, 0),
    items: filteredFees.filter(fee => fee.category === cat)
  }));

  const toggleFee = (id) => {
    setSelectedFees(fees => fees.includes(id) ? fees.filter(f => f !== id) : [...fees, id]);
  };
  const selectedFeeObjs = filteredFees.filter(fee => selectedFees.includes(fee.id));
  const selectedTotal = selectedFeeObjs.reduce((sum, fee) => sum + fee.amount, 0);

  const handlePrint = () => {
    window.print();
  };

  const handlePayment = () => {
    // Mark selected fees as paid in real time
    selectedFeeObjs.forEach(fee => {
      const idx = allFeeData.findIndex(f => f.id === fee.id);
      if (idx !== -1) allFeeData[idx].status = 'Paid';
    });
    setHistory([
      ...history,
      {
        id: `p${history.length+1}`,
        date: new Date().toISOString().slice(0,10),
        amount: selectedTotal,
        method: paymentMethods.find(m => m.id === selectedMethod)?.name || '',
        reference: `REF-${Date.now()}`,
        status: 'Completed',
        description: selectedFeeObjs.map(f => f.serviceName).join(', '),
        services: selectedFeeObjs.map(f => f.serviceName),
      },
    ]);
    setPaymentSuccess(true);
    setTimeout(() => {
      setShowPaymentModal(false);
      setPaymentSuccess(false);
      setSelectedFees([]);
    }, 2000);
  };

  // Helper to get fee objects by names for a payment
  const getFeesByNames = (names) => {
    return allFeeData.filter(fee => names.includes(fee.serviceName));
  };

  return (
    <DashboardLayout>
      <style>{printStyles}</style>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              {user?.role === 'student' ? 'Student Fee Management' : 'Alumni Fee Management'}
            </h2>
            <p className="text-muted-foreground max-w-xl">
              {user?.role === 'student' 
                ? 'Manage your academic fees, transportation, and other school services. View payment history and download receipts for your records.'
                : 'Manage your alumni association fees, event registrations, and other alumni services. View payment history and download receipts for your records.'
              }
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <select value={selectedMonth} onChange={e => setSelectedMonth(Number(e.target.value))} className="border rounded px-2 py-1">
              {monthNames.map((m, i) => <option key={m} value={i}>{m}</option>)}
            </select>
            <select value={selectedYear} onChange={e => setSelectedYear(Number(e.target.value))} className="border rounded px-2 py-1">
              <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
              <option value={new Date().getFullYear()-1}>{new Date().getFullYear()-1}</option>
            </select>
            <Button variant="outline" onClick={handlePrint} className="no-print">
              <Download className="mr-2 h-4 w-4" />
              Print/Download Slip
            </Button>
          </div>
        </div>

        {/* Fee Breakdown Table */}
        <Card>
          <CardHeader>
            <CardTitle>Fee Breakdown for {monthNames[selectedMonth]} {selectedYear}</CardTitle>
            <CardDescription>
              {user?.role === 'student' 
                ? 'All available fees for student services. Only due, pending, or overdue fees for this month are payable. Upcoming fees are not shown.'
                : 'All available fees for alumni services. Only due, pending, or overdue fees for this month are payable. Upcoming fees are not shown.'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Particulars</TableHead>
                  <TableHead>Amount (₹)</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="no-print">Select</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFees.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">No due or pending fees for this month.</TableCell>
                  </TableRow>
                )}
                {filteredFees.map(fee => (
                  <TableRow key={fee.id}>
                    <TableCell>{fee.category}</TableCell>
                    <TableCell title={fee.description}>{fee.serviceName}</TableCell>
                    <TableCell>₹{fee.amount.toLocaleString()}</TableCell>
                    <TableCell>{new Date(fee.dueDate).toLocaleDateString()}</TableCell>
                    <TableCell>{fee.status}</TableCell>
                    <TableCell className="no-print">
                      <input type="checkbox" checked={selectedFees.includes(fee.id)} onChange={() => toggleFee(fee.id)} />
                    </TableCell>
                  </TableRow>
                ))}
                {filteredFees.length > 0 && (
                  <TableRow className="bg-muted/50">
                    <TableCell colSpan={2} className="font-bold">Total Due</TableCell>
                    <TableCell className="font-bold">₹{totalDue.toLocaleString()}</TableCell>
                    <TableCell colSpan={3}></TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            {filteredFees.length > 0 && (
              <div className="mt-4 flex gap-2">
                <Button onClick={() => setShowPaymentModal(true)} disabled={selectedFees.length === 0}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pay Selected Fees (₹{selectedTotal.toLocaleString()})
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Complete Payment</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowPaymentModal(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              {!paymentSuccess ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Selected Fees</h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {selectedFeeObjs.map(fee => (
                        <div key={fee.id} className="flex justify-between text-sm">
                          <span>{fee.serviceName}</span>
                          <span>₹{fee.amount.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total Amount</span>
                        <span>₹{selectedTotal.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Select Payment Method</h4>
                    <div className="flex gap-2 flex-wrap">
                      {paymentMethods.map(method => (
                        <Button key={method.id} variant={selectedMethod === method.id ? 'default' : 'outline'} onClick={() => setSelectedMethod(method.id)}>
                          {method.icon} <span className="ml-2">{method.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full" onClick={handlePayment}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay ₹{selectedTotal.toLocaleString()}
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  {/* Payment Slip/Receipt */}
                  <div className="fee-slip-content border rounded-lg p-4 bg-white shadow print:shadow-none print:border print:p-2 mb-4 text-left" style={{maxWidth: 400, margin: '0 auto'}}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h2 className="text-xl font-bold text-school-primary">{schoolInfo.name}</h2>
                        <p className="text-xs text-muted-foreground">{schoolInfo.address}</p>
                      </div>
                      {schoolInfo.logo && <img src={schoolInfo.logo} alt="School Logo" className="h-10" />}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2 text-xs">
                      {user?.role === 'student' ? (
                        <>
                          <div><b>Student:</b> {(userInfo as typeof studentInfo).name}</div>
                          <div><b>Student ID:</b> {(userInfo as typeof studentInfo).studentId}</div>
                          <div><b>Grade:</b> {(userInfo as typeof studentInfo).grade}-{(userInfo as typeof studentInfo).section}</div>
                          <div><b>Roll No:</b> {(userInfo as typeof studentInfo).rollNumber}</div>
                          <div><b>Parent:</b> {(userInfo as typeof studentInfo).parentName}</div>
                          <div><b>Month:</b> {monthNames[selectedMonth]} {selectedYear}</div>
                        </>
                      ) : (
                        <>
                          <div><b>Alumni:</b> {(userInfo as typeof alumniInfo).name}</div>
                          <div><b>Alumni ID:</b> {(userInfo as typeof alumniInfo).alumniId}</div>
                          <div><b>Graduation Year:</b> {(userInfo as typeof alumniInfo).graduationYear}</div>
                          <div><b>Degree:</b> {(userInfo as typeof alumniInfo).degree}</div>
                          <div><b>Current Company:</b> {(userInfo as typeof alumniInfo).currentCompany}</div>
                          <div><b>Position:</b> {(userInfo as typeof alumniInfo).position}</div>
                          <div><b>Month:</b> {monthNames[selectedMonth]} {selectedYear}</div>
                        </>
                      )}
                    </div>
                    <div className="mb-2">
                      <b>Payment Date:</b> {new Date().toLocaleDateString()}<br/>
                      <b>Payment Method:</b> {paymentMethods.find(m => m.id === selectedMethod)?.name}
                    </div>
                    <div className="mb-2">
                      <b>Fee Breakdown:</b>
                      <Table className="mt-1" style={{ tableLayout: 'fixed' }}>
                        <TableHeader>
                          <TableRow>
                            <TableHead style={{ width: '80px' }}>Category</TableHead>
                            <TableHead>Fee Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Amount (₹)</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedFeeObjs.map(fee => (
                            <TableRow key={fee.id}>
                              <TableCell style={{ width: '80px', wordBreak: 'break-word' }}>{fee.category}</TableCell>
                              <TableCell style={{ wordBreak: 'break-word' }}>{fee.serviceName}</TableCell>
                              <TableCell style={{ wordBreak: 'break-word' }}>{fee.description}</TableCell>
                              <TableCell style={{ wordBreak: 'break-word' }}>₹{fee.amount.toLocaleString()}</TableCell>
                            </TableRow>
                          ))}
                          <TableRow className="bg-muted/50">
                            <TableCell colSpan={3} className="font-bold">Total Paid</TableCell>
                            <TableCell className="font-bold">₹{selectedTotal.toLocaleString()}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      <b>Note:</b> This is a computer-generated receipt. Please keep it for your records.
                    </div>
                  </div>
                  <Button variant="outline" onClick={handlePrint} className="no-print mb-2">
                    <Download className="mr-2 h-4 w-4" />
                    Print/Download Slip
                  </Button>
                  <Button onClick={() => setShowPaymentModal(false)}>
                    Continue
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Payment History */}
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>All completed payments for this academic year.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount (₹)</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="no-print">Slip</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">No payments yet.</TableCell>
                  </TableRow>
                )}
                {history.map(p => (
                  <TableRow key={p.id}>
                    <TableCell>{new Date(p.date).toLocaleDateString()}</TableCell>
                    <TableCell>₹{p.amount.toLocaleString()}</TableCell>
                    <TableCell>{p.method}</TableCell>
                    <TableCell>{p.status}</TableCell>
                    <TableCell>{p.description}</TableCell>
                    <TableCell className="no-print">
                      <Button size="sm" variant="outline" onClick={() => { setHistorySlip(p); setShowHistorySlip(true); }}>View Slip</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Payment History Slip Modal */}
        {showHistorySlip && historySlip && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Payment Slip</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowHistorySlip(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="fee-slip-content border rounded-lg p-4 bg-white shadow print:shadow-none print:border print:p-2 mb-4 text-left" style={{maxWidth: 400, margin: '0 auto'}}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h2 className="text-xl font-bold text-school-primary">{schoolInfo.name}</h2>
                    <p className="text-xs text-muted-foreground">{schoolInfo.address}</p>
                  </div>
                  {schoolInfo.logo && <img src={schoolInfo.logo} alt="School Logo" className="h-10" />}
                </div>
                <div className="flex flex-wrap gap-2 mb-2 text-xs">
                  {user?.role === 'student' ? (
                    <>
                      <div><b>Student:</b> {(userInfo as typeof studentInfo).name}</div>
                      <div><b>Student ID:</b> {(userInfo as typeof studentInfo).studentId}</div>
                      <div><b>Grade:</b> {(userInfo as typeof studentInfo).grade}-{(userInfo as typeof studentInfo).section}</div>
                      <div><b>Roll No:</b> {(userInfo as typeof studentInfo).rollNumber}</div>
                      <div><b>Parent:</b> {(userInfo as typeof studentInfo).parentName}</div>
                    </>
                  ) : (
                    <>
                      <div><b>Alumni:</b> {(userInfo as typeof alumniInfo).name}</div>
                      <div><b>Alumni ID:</b> {(userInfo as typeof alumniInfo).alumniId}</div>
                      <div><b>Graduation Year:</b> {(userInfo as typeof alumniInfo).graduationYear}</div>
                      <div><b>Degree:</b> {(userInfo as typeof alumniInfo).degree}</div>
                      <div><b>Current Company:</b> {(userInfo as typeof alumniInfo).currentCompany}</div>
                      <div><b>Position:</b> {(userInfo as typeof alumniInfo).position}</div>
                    </>
                  )}
                </div>
                <div className="mb-2">
                  <b>Payment Date:</b> {new Date(historySlip.date).toLocaleDateString()}<br/>
                  <b>Payment Method:</b> {historySlip.method}
                </div>
                <div className="mb-2">
                  <b>Fee Breakdown:</b>
                  <Table className="mt-1" style={{ tableLayout: 'fixed' }}>
                    <TableHeader>
                      <TableRow>
                        <TableHead style={{ width: '80px' }}>Category</TableHead>
                        <TableHead>Fee Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount (₹)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getFeesByNames(historySlip.description.split(',').map(s => s.trim())).map(fee => (
                        <TableRow key={fee.id}>
                          <TableCell style={{ width: '80px', wordBreak: 'break-word' }}>{fee.category}</TableCell>
                          <TableCell style={{ wordBreak: 'break-word' }}>{fee.serviceName}</TableCell>
                          <TableCell style={{ wordBreak: 'break-word' }}>{fee.description}</TableCell>
                          <TableCell style={{ wordBreak: 'break-word' }}>₹{fee.amount.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-muted/50">
                        <TableCell colSpan={3} className="font-bold">Total Paid</TableCell>
                        <TableCell className="font-bold">₹{historySlip.amount.toLocaleString()}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  <b>Note:</b> This is a computer-generated receipt. Please keep it for your records.
                </div>
              </div>
              <Button variant="outline" onClick={handlePrint} className="no-print mb-2">
                <Download className="mr-2 h-4 w-4" />
                Print/Download Slip
              </Button>
              <Button onClick={() => setShowHistorySlip(false)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FeeManagementPage; 