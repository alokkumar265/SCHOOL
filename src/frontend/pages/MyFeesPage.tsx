
import React from 'react';
import { useAuth } from '@/backend/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CreditCard, Download, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const MyFeesPage = () => {
  const { user } = useAuth();
  
  // Mock fee data
  const feeSummary = {
    totalFees: 12000,
    paid: 8000,
    pending: 4000,
    dueDate: '2023-06-30'
  };
  
  const feeHistory = [
    {
      id: 1,
      description: "Tuition Fee - Term 1",
      amount: 4000,
      dueDate: "2023-03-15",
      status: "paid",
      paymentDate: "2023-03-10",
      receiptNo: "REC-20230310-001"
    },
    {
      id: 2,
      description: "Library Fee",
      amount: 500,
      dueDate: "2023-03-15",
      status: "paid",
      paymentDate: "2023-03-10",
      receiptNo: "REC-20230310-002"
    },
    {
      id: 3,
      description: "Laboratory Fee",
      amount: 1500,
      dueDate: "2023-03-15",
      status: "paid",
      paymentDate: "2023-03-10",
      receiptNo: "REC-20230310-003"
    },
    {
      id: 4,
      description: "Examination Fee",
      amount: 2000,
      dueDate: "2023-03-15",
      status: "paid",
      paymentDate: "2023-03-10",
      receiptNo: "REC-20230310-004"
    },
    {
      id: 5,
      description: "Tuition Fee - Term 2",
      amount: 4000,
      dueDate: "2023-06-30",
      status: "pending",
      paymentDate: null,
      receiptNo: null
    }
  ];
  
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'paid':
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Paid</Badge>;
      case 'pending':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'overdue':
        return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" />Overdue</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const progressPercentage = (feeSummary.paid / feeSummary.totalFees) * 100;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Fees</h1>
            <p className="text-muted-foreground">
              View and manage your fee details
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Fee Receipt
            </Button>
            <Button className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Pay Fees
            </Button>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Fee Summary</CardTitle>
              <CardDescription>Academic Year 2023-2024</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Payment Progress</span>
                    <span className="font-medium">{progressPercentage.toFixed(0)}% Complete</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  <div className="p-4 rounded-lg bg-gray-50">
                    <p className="text-sm text-muted-foreground">Total Fees</p>
                    <p className="text-2xl font-bold">₹{feeSummary.totalFees.toLocaleString()}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <p className="text-sm text-muted-foreground">Paid</p>
                    <p className="text-2xl font-bold text-green-600">₹{feeSummary.paid.toLocaleString()}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold text-amber-600">₹{feeSummary.pending.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground">
                    Next payment due: <span className="font-medium">{formatDate(feeSummary.dueDate)}</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Fee Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Tuition Fee</span>
                  <span className="font-medium">₹8,000</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Library Fee</span>
                  <span className="font-medium">₹500</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Laboratory Fee</span>
                  <span className="font-medium">₹1,500</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Examination Fee</span>
                  <span className="font-medium">₹2,000</span>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>₹12,000</span>
                </div>
              </div>
              <div className="mt-4 pt-2">
                <Button variant="outline" className="w-full">
                  <span>View Full Fee Structure</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment Date</TableHead>
                  <TableHead>Receipt No.</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {feeHistory.map((fee) => (
                  <TableRow key={fee.id}>
                    <TableCell className="font-medium">{fee.description}</TableCell>
                    <TableCell className="text-right">₹{fee.amount.toLocaleString()}</TableCell>
                    <TableCell>{formatDate(fee.dueDate)}</TableCell>
                    <TableCell>{getStatusBadge(fee.status)}</TableCell>
                    <TableCell>{fee.paymentDate ? formatDate(fee.paymentDate) : "-"}</TableCell>
                    <TableCell>{fee.receiptNo || "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MyFeesPage;
