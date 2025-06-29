import React from 'react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Download, Building, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockSalaryHistory = [
  { 
    date: '2025-06-01', 
    amount: 65000, 
    status: 'Paid', 
    payslipUrl: '#',
    bankName: 'State Bank of India',
    accountNumber: '1234567890',
    ifscCode: 'SBIN0001234',
    transactionId: 'TXN20250601001',
    paymentMethod: 'NEFT'
  },
  { 
    date: '2025-05-01', 
    amount: 65000, 
    status: 'Paid', 
    payslipUrl: '#',
    bankName: 'State Bank of India',
    accountNumber: '1234567890',
    ifscCode: 'SBIN0001234',
    transactionId: 'TXN20250501001',
    paymentMethod: 'NEFT'
  },
  { 
    date: '2025-04-01', 
    amount: 65000, 
    status: 'Paid', 
    payslipUrl: '#',
    bankName: 'State Bank of India',
    accountNumber: '1234567890',
    ifscCode: 'SBIN0001234',
    transactionId: 'TXN20250401001',
    paymentMethod: 'NEFT'
  },
  { 
    date: '2025-03-01', 
    amount: 65000, 
    status: 'Paid', 
    payslipUrl: '#',
    bankName: 'State Bank of India',
    accountNumber: '1234567890',
    ifscCode: 'SBIN0001234',
    transactionId: 'TXN20250301001',
    paymentMethod: 'NEFT'
  },
  { 
    date: '2025-02-01', 
    amount: 65000, 
    status: 'Paid', 
    payslipUrl: '#',
    bankName: 'State Bank of India',
    accountNumber: '1234567890',
    ifscCode: 'SBIN0001234',
    transactionId: 'TXN20250201001',
    paymentMethod: 'NEFT'
  },
  { 
    date: '2025-01-01', 
    amount: 65000, 
    status: 'Paid', 
    payslipUrl: '#',
    bankName: 'State Bank of India',
    accountNumber: '1234567890',
    ifscCode: 'SBIN0001234',
    transactionId: 'TXN20250101001',
    paymentMethod: 'NEFT'
  },
];

const SalaryHistoryPage = () => (
  <DashboardLayout>
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-6">
      {/* Bank Details Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Bank Account for Salary
          </CardTitle>
          <CardDescription>All salary payments are credited to this account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">State Bank of India</p>
                <p className="text-xs text-muted-foreground">Account: 1234567890</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Mumbai Main Branch</p>
                <p className="text-xs text-muted-foreground">IFSC: SBIN0001234</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Savings Account</p>
                <p className="text-xs text-muted-foreground">Payment: NEFT/RTGS</p>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-amber-50 rounded-lg">
            <p className="text-sm text-amber-700">
              <strong>Update Bank Details:</strong> To change your bank account details, please visit your 
              <a href="/profile" className="text-blue-600 hover:underline ml-1">Profile Page</a> 
              and update the information in the Professional section.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Salary History Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Salary History
          </CardTitle>
          <CardDescription>All past salary payments and downloadable payslips</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Bank Details</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Payslip</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSalaryHistory.map((rec, idx) => (
                <TableRow key={idx}>
                  <TableCell>{rec.date}</TableCell>
                  <TableCell>₹{rec.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-green-600">{rec.status}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{rec.bankName}</div>
                      <div className="text-muted-foreground font-mono">{rec.accountNumber}</div>
                      <div className="text-xs text-muted-foreground">{rec.paymentMethod}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-mono text-muted-foreground">
                      {rec.transactionId}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button asChild size="sm" variant="outline">
                      <a href={rec.payslipUrl} download>
                        <Download className="h-4 w-4 mr-1" />Payslip
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  </DashboardLayout>
);

export default SalaryHistoryPage; 