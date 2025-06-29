import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Download, CreditCard, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

// --- Enhanced Fee Data ---
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();

const allFeeData = [
  // Academic
  { id: '1', name: 'Tuition Fee', category: 'Academic', amount: 8000, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-10`, status: 'Pending', description: 'Monthly tuition fee', frequency: 'Monthly' },
  { id: '2', name: 'Lab Fee', category: 'Academic', amount: 1500, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-15`, status: 'Paid', description: 'Lab usage', frequency: 'Quarterly' },
  { id: '3', name: 'Examination Fee', category: 'Academic', amount: 2000, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-20`, status: 'Upcoming', description: 'Exam fee', frequency: 'Quarterly' },
  // Services
  { id: '4', name: 'Library Membership', category: 'Services', amount: 500, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-25`, status: 'Pending', description: 'Library access', frequency: 'Annual' },
  { id: '5', name: 'Transport Fee', category: 'Services', amount: 1200, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-10`, status: 'Overdue', description: 'School bus', frequency: 'Monthly' },
  { id: '6', name: 'Canteen Fee', category: 'Services', amount: 600, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-18`, status: 'Paid', description: 'Canteen subscription', frequency: 'Monthly' },
  // Optional
  { id: '7', name: 'Digital Resources', category: 'Optional', amount: 300, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-12`, status: 'Pending', description: 'E-books, online content', frequency: 'Annual' },
  { id: '8', name: 'Extracurricular', category: 'Optional', amount: 800, dueDate: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-22`, status: 'Paid', description: 'Sports, clubs', frequency: 'Monthly' },
];

const paymentHistory = [
  { id: 'p1', date: `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-05`, amount: 1500, method: 'UPI', status: 'Completed', description: 'Lab Fee, Canteen Fee' },
  { id: 'p2', date: `${currentYear}-${String(currentMonth).padStart(2,'0')}-10`, amount: 8000, method: 'Card', status: 'Completed', description: 'Tuition Fee' },
];

export default function FeeStructurePage() {
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedFees, setSelectedFees] = useState([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Filter fees for selected month/year and only due/pending/overdue
  const filteredFees = allFeeData.filter(fee => {
    const feeDate = new Date(fee.dueDate);
    return (
      feeDate.getMonth() === selectedMonth &&
      feeDate.getFullYear() === selectedYear &&
      (fee.status === 'Pending' || fee.status === 'Overdue')
    );
  });

  const totalDue = filteredFees.reduce((sum, fee) => sum + fee.amount, 0);

  // Fee breakdown by category
  const categories = ['Academic', 'Services', 'Optional'];
  const breakdown = categories.map(cat => ({
    name: cat,
    total: filteredFees.filter(fee => fee.category === cat).reduce((sum, fee) => sum + fee.amount, 0),
    items: filteredFees.filter(fee => fee.category === cat)
  }));

  // Handle fee selection for payment
  const toggleFee = (id) => {
    setSelectedFees(fees => fees.includes(id) ? fees.filter(f => f !== id) : [...fees, id]);
  };
  const selectedFeeObjs = filteredFees.filter(fee => selectedFees.includes(fee.id));
  const selectedTotal = selectedFeeObjs.reduce((sum, fee) => sum + fee.amount, 0);

  // Print slip
  const handlePrint = () => {
    window.print();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Fee Structure & Payment</h2>
            <p className="text-muted-foreground max-w-xl">
              View a detailed breakdown of all school fees for your child. Select a month to see only due or pending fees. Pay securely online and print/download a parent-friendly fee slip or receipt.
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <select value={selectedMonth} onChange={e => setSelectedMonth(Number(e.target.value))} className="border rounded px-2 py-1">
              {monthNames.map((m, i) => <option key={m} value={i}>{m}</option>)}
            </select>
            <select value={selectedYear} onChange={e => setSelectedYear(Number(e.target.value))} className="border rounded px-2 py-1">
              <option value={currentYear}>{currentYear}</option>
              <option value={currentYear-1}>{currentYear-1}</option>
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
            <CardDescription>Only due, pending, or overdue fees for this month are shown. Upcoming fees are not payable yet.</CardDescription>
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
                    <TableCell>{fee.name}</TableCell>
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
                          <span>{fee.name}</span>
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
                  <Button className="w-full" onClick={() => { setPaymentSuccess(true); setTimeout(() => { setShowPaymentModal(false); setPaymentSuccess(false); setSelectedFees([]); }, 2000); }}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay ₹{selectedTotal.toLocaleString()}
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-green-700 mb-2">Payment Successful!</h4>
                  <p className="text-gray-600 mb-4">
                    Your payment of ₹{selectedTotal.toLocaleString()} has been processed successfully.
                  </p>
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentHistory.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">No payments yet.</TableCell>
                  </TableRow>
                )}
                {paymentHistory.map(p => (
                  <TableRow key={p.id}>
                    <TableCell>{new Date(p.date).toLocaleDateString()}</TableCell>
                    <TableCell>₹{p.amount.toLocaleString()}</TableCell>
                    <TableCell>{p.method}</TableCell>
                    <TableCell>{p.status}</TableCell>
                    <TableCell>{p.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
