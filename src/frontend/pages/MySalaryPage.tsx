import React from 'react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Download, Building } from 'lucide-react';
import { useAuth } from '@/backend/contexts/AuthContext';

const mockTeacherSalary = {
  name: 'Teacher User',
  payGrade: 'Senior Teacher',
  currentSalary: 65000,
  lastPayment: '2025-06-01',
  nextPayment: '2025-07-01',
  payslipUrl: '#',
  // Bank details from profile
  bankName: 'State Bank of India',
  accountNumber: '1234567890',
  ifscCode: 'SBIN0001234',
  branchName: 'Mumbai Main Branch',
  accountType: 'Savings'
};

const mockStaffSalary = {
  name: 'Staff User',
  payGrade: 'Office Staff',
  currentSalary: 45000,
  lastPayment: '2025-06-01',
  nextPayment: '2025-07-01',
  payslipUrl: '#',
  // Bank details from profile
  bankName: 'ICICI Bank',
  accountNumber: '9876543210',
  ifscCode: 'ICIC0003456',
  branchName: 'Delhi Main Branch',
  accountType: 'Savings'
};

const MySalaryPage = () => {
  const { user } = useAuth();
  const isStaff = user?.role === 'staff';
  const isTeacher = user?.role === 'teacher';
  const salary = isStaff ? mockStaffSalary : mockTeacherSalary;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
        {/* Salary Details Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              My Salary
            </CardTitle>
            <CardDescription>Current salary details and payslip</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-lg">
                <span>Pay Grade:</span>
                <span className="font-semibold">{salary.payGrade}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Current Salary:</span>
                <span className="font-semibold text-green-600">₹{salary.currentSalary.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Last Payment:</span>
                <span>{salary.lastPayment}</span>
              </div>
              <div className="flex justify-between">
                <span>Next Payment:</span>
                <span>{salary.nextPayment}</span>
              </div>
              <div className="flex justify-end pt-4">
                <Button asChild variant="outline">
                  <a href={salary.payslipUrl} download>
                    <Download className="h-4 w-4 mr-2" />
                    Download Payslip
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bank Details Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Bank Details for Salary
            </CardTitle>
            <CardDescription>Your salary will be credited to this account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bank Name:</span>
                  <span className="font-medium">{salary.bankName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account Number:</span>
                  <span className="font-medium font-mono">{salary.accountNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">IFSC Code:</span>
                  <span className="font-medium font-mono">{salary.ifscCode}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Branch Name:</span>
                  <span className="font-medium">{salary.branchName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account Type:</span>
                  <span className="font-medium">{salary.accountType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Method:</span>
                  <span className="font-medium text-green-600">NEFT/RTGS</span>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Note:</strong> Salary is automatically credited to your registered bank account on the 1st of every month. 
                Please ensure your bank details are up to date in your profile.
              </p>
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
      </div>
    </DashboardLayout>
  );
};

export default MySalaryPage;