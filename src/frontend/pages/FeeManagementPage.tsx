import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';
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
  Info
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
  category: 'Transportation' | 'Canteen' | 'Library' | 'Extracurricular' | 'Academic' | 'Other';
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
  icon: string;
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

  // Mock student and school info
  const studentInfo = {
    name: 'Aarav Sharma',
    roll: '23',
    class: '10',
    section: 'B',
    parent: 'Mr. Rajesh Sharma',
  };
  const schoolInfo = {
    name: 'Veena Public School',
    logo: '', // Add logo URL if available
    address: '123 School Road, Delhi',
  };

  // All possible student service fees (sidebar services)
  const allFeeData: ServiceFee[] = [
    // Academics
    { id: '1', serviceName: 'Tuition Fee', category: 'Academic', amount: 8000, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-10`, status: 'Pending', description: 'Monthly tuition fee', frequency: 'Monthly', icon: 'BookOpen', isOptional: false },
    { id: '2', serviceName: 'Lab Fee', category: 'Academic', amount: 1500, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-15`, status: 'Paid', description: 'Lab usage', frequency: 'Quarterly', icon: 'Activity', isOptional: false },
    { id: '3', serviceName: 'Examination Fee', category: 'Academic', amount: 2000, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-20`, status: 'Upcoming', description: 'Exam fee', frequency: 'Quarterly', icon: 'FileText', isOptional: false },
    // Library
    { id: '4', serviceName: 'Library Membership', category: 'Library', amount: 500, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-25`, status: 'Pending', description: 'Library access', frequency: 'Annual', icon: 'Library', isOptional: false },
    { id: '5', serviceName: 'Digital Resources', category: 'Library', amount: 300, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-12`, status: 'Pending', description: 'E-books, online content', frequency: 'Annual', icon: 'BookOpen', isOptional: true },
    // Transport
    { id: '6', serviceName: 'Transport Fee', category: 'Transportation', amount: 1200, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-10`, status: 'Overdue', description: 'School bus', frequency: 'Monthly', icon: 'Bus', isOptional: false },
    // Canteen
    { id: '7', serviceName: 'Canteen Fee', category: 'Canteen', amount: 600, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-18`, status: 'Paid', description: 'Canteen subscription', frequency: 'Monthly', icon: 'Utensils', isOptional: true },
    // Extracurricular
    { id: '8', serviceName: 'Sports Fee', category: 'Extracurricular', amount: 800, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-22`, status: 'Pending', description: 'Sports, clubs', frequency: 'Monthly', icon: 'Activity', isOptional: true },
    // Study Resources
    { id: '9', serviceName: 'Study Material Fee', category: 'Academic', amount: 400, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-05`, status: 'Paid', description: 'Books, notes, online resources', frequency: 'Annual', icon: 'BookOpen', isOptional: true },
    // AI Assistant (optional)
    { id: '10', serviceName: 'AI Assistant Subscription', category: 'Academic', amount: 200, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-28`, status: 'Pending', description: 'AI learning tools', frequency: 'Annual', icon: 'BookOpen', isOptional: true },
  ];

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

  const categories = ['Academic', 'Transportation', 'Canteen', 'Library', 'Extracurricular'];
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
        status: 'Completed',
        description: selectedFeeObjs.map(f => f.serviceName).join(', '),
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
            <h2 className="text-3xl font-bold tracking-tight">Fee Management</h2>
            <p className="text-muted-foreground max-w-xl">
              View a detailed breakdown of all school fees for your child. Select a month to see only due or pending fees. Pay securely online and print/download a parent-friendly fee slip or receipt.
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
            <CardDescription>All available fees for every student service. Only due, pending, or overdue fees for this month are payable. Upcoming fees are not shown.</CardDescription>
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
                      <div><b>Student:</b> {studentInfo.name}</div>
                      <div><b>Roll No:</b> {studentInfo.roll}</div>
                      <div><b>Class:</b> {studentInfo.class}-{studentInfo.section}</div>
                      <div><b>Parent:</b> {studentInfo.parent}</div>
                      <div><b>Month:</b> {monthNames[selectedMonth]} {selectedYear}</div>
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
                  <div><b>Student:</b> {studentInfo.name}</div>
                  <div><b>Roll No:</b> {studentInfo.roll}</div>
                  <div><b>Class:</b> {studentInfo.class}-{studentInfo.section}</div>
                  <div><b>Parent:</b> {studentInfo.parent}</div>
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