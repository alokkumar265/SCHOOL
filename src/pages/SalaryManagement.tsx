
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, CreditCard, FileText, UserPlus, Check } from 'lucide-react';

// Mock data for staff
const mockStaff = [
  { 
    id: '1', 
    userId: '101',
    name: 'Dr. Anand Kumar',
    role: 'Principal',
    department: 'Administration',
    email: 'anand.kumar@vps.edu',
    phone: '+91 9876543201',
    accountNumber: 'XXXX1234',
    ifscCode: 'SBIN0001234',
    bankName: 'State Bank of India',
    salary: 85000,
    joiningDate: '2018-04-01'
  },
  { 
    id: '2', 
    userId: '102',
    name: 'Mrs. Priya Sharma',
    role: 'Senior Teacher',
    department: 'Science',
    email: 'priya.sharma@vps.edu',
    phone: '+91 9876543202',
    accountNumber: 'XXXX5678',
    ifscCode: 'HDFC0002345',
    bankName: 'HDFC Bank',
    salary: 55000,
    joiningDate: '2019-06-15'
  },
  { 
    id: '3', 
    userId: '103',
    name: 'Mr. Rajesh Verma',
    role: 'Accountant',
    department: 'Finance',
    email: 'rajesh.verma@vps.edu',
    phone: '+91 9876543203',
    accountNumber: 'XXXX9876',
    ifscCode: 'ICIC0003456',
    bankName: 'ICICI Bank',
    salary: 45000,
    joiningDate: '2020-02-10'
  },
  { 
    id: '4', 
    userId: '104',
    name: 'Mr. Amit Singh',
    role: 'Teacher',
    department: 'Mathematics',
    email: 'amit.singh@vps.edu',
    phone: '+91 9876543204',
    accountNumber: 'XXXX4321',
    ifscCode: 'AXIS0004567',
    bankName: 'Axis Bank',
    salary: 42000,
    joiningDate: '2020-07-20'
  },
  { 
    id: '5', 
    userId: '105',
    name: 'Ms. Neha Gupta',
    role: 'Teacher',
    department: 'English',
    email: 'neha.gupta@vps.edu',
    phone: '+91 9876543205',
    accountNumber: 'XXXX8765',
    ifscCode: 'PUNB0005678',
    bankName: 'Punjab National Bank',
    salary: 42000,
    joiningDate: '2021-01-05'
  }
];

// Mock data for salary payments
const mockSalaryPayments = [
  {
    id: '1',
    staffId: '1',
    month: 'March',
    year: '2023',
    amount: 85000,
    paymentDate: '2023-03-30',
    status: 'paid',
    transactionId: 'TRX123456789'
  },
  {
    id: '2',
    staffId: '2',
    month: 'March',
    year: '2023',
    amount: 55000,
    paymentDate: '2023-03-30',
    status: 'paid',
    transactionId: 'TRX123456790'
  },
  {
    id: '3',
    staffId: '3',
    month: 'March',
    year: '2023',
    amount: 45000,
    paymentDate: '2023-03-30',
    status: 'paid',
    transactionId: 'TRX123456791'
  },
  {
    id: '4',
    staffId: '4',
    month: 'March',
    year: '2023',
    amount: 42000,
    paymentDate: '2023-03-30',
    status: 'paid',
    transactionId: 'TRX123456792'
  },
  {
    id: '5',
    staffId: '5',
    month: 'March',
    year: '2023',
    amount: 42000,
    paymentDate: '2023-03-30',
    status: 'paid',
    transactionId: 'TRX123456793'
  }
];

const SalaryManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [staff, setStaff] = useState(mockStaff);
  const [salaryPayments, setSalaryPayments] = useState(mockSalaryPayments);
  const [isAddStaffDialogOpen, setIsAddStaffDialogOpen] = useState(false);
  const [isBulkPaymentDialogOpen, setIsBulkPaymentDialogOpen] = useState(false);
  const [isSinglePaymentDialogOpen, setIsSinglePaymentDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth().toString());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  
  const [newStaff, setNewStaff] = useState({
    name: '',
    role: '',
    department: '',
    email: '',
    phone: '',
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    salary: 0
  });

  const [newPayment, setNewPayment] = useState({
    staffId: '',
    month: new Date().toLocaleString('default', { month: 'long' }),
    year: new Date().getFullYear().toString(),
    amount: 0
  });
  
  const { toast } = useToast();

  const handleAddStaff = () => {
    if (!newStaff.name || !newStaff.role || !newStaff.department || !newStaff.email || !newStaff.salary) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    const staffMember = {
      id: String(staff.length + 1),
      userId: `10${staff.length + 1}`,
      name: newStaff.name,
      role: newStaff.role,
      department: newStaff.department,
      email: newStaff.email,
      phone: newStaff.phone,
      accountNumber: newStaff.accountNumber,
      ifscCode: newStaff.ifscCode,
      bankName: newStaff.bankName,
      salary: newStaff.salary,
      joiningDate: new Date().toISOString().split('T')[0]
    };

    setStaff([...staff, staffMember]);
    setNewStaff({
      name: '',
      role: '',
      department: '',
      email: '',
      phone: '',
      accountNumber: '',
      ifscCode: '',
      bankName: '',
      salary: 0
    });
    setIsAddStaffDialogOpen(false);

    toast({
      title: "Staff Added",
      description: `${staffMember.name} has been added successfully`,
    });
  };

  const handleSinglePayment = () => {
    if (!newPayment.staffId || !newPayment.month || !newPayment.year || !newPayment.amount) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    setSelectedStaffId(newPayment.staffId);
    setIsSinglePaymentDialogOpen(false);
    setIsConfirmDialogOpen(true);
  };

  const processSinglePayment = () => {
    setPaymentProcessing(true);
    setIsConfirmDialogOpen(false);

    // Simulate processing delay
    setTimeout(() => {
      const staffMember = staff.find(s => s.id === selectedStaffId);
      if (!staffMember) return;

      const payment = {
        id: String(salaryPayments.length + 1),
        staffId: selectedStaffId!,
        month: newPayment.month,
        year: newPayment.year,
        amount: staffMember.salary,
        paymentDate: new Date().toISOString().split('T')[0],
        status: 'paid',
        transactionId: `TRX${Math.floor(Math.random() * 1000000000)}`
      };

      setSalaryPayments([...salaryPayments, payment]);
      setNewPayment({
        staffId: '',
        month: new Date().toLocaleString('default', { month: 'long' }),
        year: new Date().getFullYear().toString(),
        amount: 0
      });
      
      toast({
        title: "Payment Successful",
        description: `Salary for ${staffMember.name} has been processed successfully.`,
      });
      
      setPaymentProcessing(false);
    }, 2000);
  };

  const processBulkPayment = () => {
    setPaymentProcessing(true);
    setIsBulkPaymentDialogOpen(false);

    // Simulate processing delay
    setTimeout(() => {
      const monthName = new Date(0, parseInt(selectedMonth)).toLocaleString('default', { month: 'long' });
      const newPayments = staff.map((staffMember, index) => ({
        id: String(salaryPayments.length + index + 1),
        staffId: staffMember.id,
        month: monthName,
        year: selectedYear,
        amount: staffMember.salary,
        paymentDate: new Date().toISOString().split('T')[0],
        status: 'paid',
        transactionId: `TRX${Math.floor(Math.random() * 1000000000)}`
      }));

      setSalaryPayments([...salaryPayments, ...newPayments]);
      
      toast({
        title: "Bulk Payment Successful",
        description: `Salaries for ${monthName} ${selectedYear} have been processed for all staff members.`,
      });
      
      setPaymentProcessing(false);
    }, 3000);
  };

  const filteredStaff = staff.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPayments = salaryPayments.filter(payment => {
    const staffMember = staff.find(s => s.id === payment.staffId);
    
    return (
      staffMember?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.month.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.year.includes(searchTerm) ||
      payment.transactionId?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getStaffName = (id: string) => {
    const staffMember = staff.find(s => s.id === id);
    return staffMember ? staffMember.name : 'Unknown Staff';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Salary Management</h2>
            <p className="text-muted-foreground">
              Manage staff records and process salary payments
            </p>
          </div>
        </div>

        <div className="my-6 w-full">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, department, role..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="staff">
          <TabsList className="mb-6">
            <TabsTrigger value="staff">Staff Directory</TabsTrigger>
            <TabsTrigger value="payments">Salary Payments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="staff">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Staff Records</h3>
              <div className="space-x-2">
                <Button onClick={() => setIsBulkPaymentDialogOpen(true)}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Process Bulk Payment
                </Button>
                <Dialog open={isAddStaffDialogOpen} onOpenChange={setIsAddStaffDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add Staff
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Add New Staff Member</DialogTitle>
                      <DialogDescription>
                        Add a new staff member to the system. All fields marked with * are required.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={newStaff.name}
                            onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={newStaff.email}
                            onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="role">Role *</Label>
                          <Input
                            id="role"
                            value={newStaff.role}
                            onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="department">Department *</Label>
                          <Input
                            id="department"
                            value={newStaff.department}
                            onChange={(e) => setNewStaff({ ...newStaff, department: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={newStaff.phone}
                            onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="salary">Monthly Salary (₹) *</Label>
                          <Input
                            id="salary"
                            type="number"
                            value={newStaff.salary || ''}
                            onChange={(e) => setNewStaff({ ...newStaff, salary: parseInt(e.target.value) })}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Bank Details</h4>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="accountNumber">Account Number</Label>
                          <Input
                            id="accountNumber"
                            value={newStaff.accountNumber}
                            onChange={(e) => setNewStaff({ ...newStaff, accountNumber: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ifscCode">IFSC Code</Label>
                          <Input
                            id="ifscCode"
                            value={newStaff.ifscCode}
                            onChange={(e) => setNewStaff({ ...newStaff, ifscCode: e.target.value })}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bankName">Bank Name</Label>
                        <Input
                          id="bankName"
                          value={newStaff.bankName}
                          onChange={(e) => setNewStaff({ ...newStaff, bankName: e.target.value })}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsAddStaffDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" onClick={handleAddStaff}>
                        Add Staff Member
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Salary (₹)</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStaff.map((staffMember) => (
                      <TableRow key={staffMember.id}>
                        <TableCell className="font-medium">{staffMember.name}</TableCell>
                        <TableCell>{staffMember.department}</TableCell>
                        <TableCell>{staffMember.role}</TableCell>
                        <TableCell>{staffMember.email}</TableCell>
                        <TableCell>{staffMember.phone}</TableCell>
                        <TableCell>₹{staffMember.salary.toLocaleString()}</TableCell>
                        <TableCell>
                          <Dialog open={isSinglePaymentDialogOpen && newPayment.staffId === staffMember.id} onOpenChange={(open) => {
                            setIsSinglePaymentDialogOpen(open);
                            if (open) setNewPayment({ ...newPayment, staffId: staffMember.id, amount: staffMember.salary });
                          }}>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <CreditCard className="h-4 w-4 mr-1" /> Pay
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Process Salary Payment</DialogTitle>
                                <DialogDescription>
                                  You are about to process salary payment for {staffMember.name}.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="month">Month</Label>
                                    <Select 
                                      value={newPayment.month}
                                      onValueChange={(value) => setNewPayment({ ...newPayment, month: value })}
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="January">January</SelectItem>
                                        <SelectItem value="February">February</SelectItem>
                                        <SelectItem value="March">March</SelectItem>
                                        <SelectItem value="April">April</SelectItem>
                                        <SelectItem value="May">May</SelectItem>
                                        <SelectItem value="June">June</SelectItem>
                                        <SelectItem value="July">July</SelectItem>
                                        <SelectItem value="August">August</SelectItem>
                                        <SelectItem value="September">September</SelectItem>
                                        <SelectItem value="October">October</SelectItem>
                                        <SelectItem value="November">November</SelectItem>
                                        <SelectItem value="December">December</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="year">Year</Label>
                                    <Select 
                                      value={newPayment.year}
                                      onValueChange={(value) => setNewPayment({ ...newPayment, year: value })}
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="2023">2023</SelectItem>
                                        <SelectItem value="2024">2024</SelectItem>
                                        <SelectItem value="2025">2025</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <Label htmlFor="amount">Amount (₹)</Label>
                                  <Input
                                    id="amount"
                                    type="number"
                                    value={newPayment.amount || staffMember.salary}
                                    onChange={(e) => setNewPayment({ ...newPayment, amount: parseInt(e.target.value) })}
                                    readOnly
                                  />
                                </div>
                                
                                <div className="bg-gray-50 p-3 rounded-md text-sm">
                                  <div><strong>Name:</strong> {staffMember.name}</div>
                                  <div><strong>Account Number:</strong> {staffMember.accountNumber || '(Not provided)'}</div>
                                  <div><strong>Bank:</strong> {staffMember.bankName || '(Not provided)'}</div>
                                  <div><strong>IFSC Code:</strong> {staffMember.ifscCode || '(Not provided)'}</div>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setIsSinglePaymentDialogOpen(false)}>
                                  Cancel
                                </Button>
                                <Button onClick={handleSinglePayment}>
                                  Proceed to Payment
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredStaff.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                          No staff members found matching your search criteria.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payments">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Payment History</h3>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Staff Name</TableHead>
                      <TableHead>Month</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Amount (₹)</TableHead>
                      <TableHead>Payment Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{getStaffName(payment.staffId)}</TableCell>
                        <TableCell>{payment.month}</TableCell>
                        <TableCell>{payment.year}</TableCell>
                        <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                        <TableCell>{new Date(payment.paymentDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                            {payment.status}
                          </span>
                        </TableCell>
                        <TableCell>{payment.transactionId}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" title="Generate Receipt">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredPayments.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                          No payment records found matching your search criteria.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bulk Payment Dialog */}
      <Dialog open={isBulkPaymentDialogOpen} onOpenChange={setIsBulkPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Process Bulk Salary Payment</DialogTitle>
            <DialogDescription>
              This will process salary payments for all staff members at once.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="month">Month</Label>
                <Select 
                  value={selectedMonth}
                  onValueChange={setSelectedMonth}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">January</SelectItem>
                    <SelectItem value="1">February</SelectItem>
                    <SelectItem value="2">March</SelectItem>
                    <SelectItem value="3">April</SelectItem>
                    <SelectItem value="4">May</SelectItem>
                    <SelectItem value="5">June</SelectItem>
                    <SelectItem value="6">July</SelectItem>
                    <SelectItem value="7">August</SelectItem>
                    <SelectItem value="8">September</SelectItem>
                    <SelectItem value="9">October</SelectItem>
                    <SelectItem value="10">November</SelectItem>
                    <SelectItem value="11">December</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Select 
                  value={selectedYear}
                  onValueChange={setSelectedYear}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-md text-sm text-amber-800">
              <p>
                You are about to process salary payments for all {staff.length} staff members for{' '}
                {new Date(0, parseInt(selectedMonth)).toLocaleString('default', { month: 'long' })} {selectedYear}.
                Total amount: ₹{staff.reduce((sum, s) => sum + s.salary, 0).toLocaleString()}.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBulkPaymentDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={processBulkPayment} disabled={paymentProcessing}>
              {paymentProcessing ? 'Processing...' : 'Confirm Payment'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Payment Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Salary Payment</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {selectedStaffId && (
              <div className="space-y-4">
                <p>
                  You are about to process the following payment:
                </p>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Staff:</span>
                      <span className="font-medium">{getStaffName(selectedStaffId)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Period:</span>
                      <span className="font-medium">{newPayment.month} {newPayment.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-medium">₹{newPayment.amount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <p>
                  The payment will be processed to the staff member's registered bank account.
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={processSinglePayment} disabled={paymentProcessing}>
              {paymentProcessing ? 'Processing...' : 'Confirm Payment'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Processing Dialog */}
      {paymentProcessing && (
        <Dialog open={paymentProcessing} onOpenChange={() => {}}>
          <DialogContent className="sm:max-w-md">
            <div className="flex flex-col items-center justify-center py-10">
              <div className="mb-6 w-14 h-14 rounded-full border-4 border-t-school-primary border-gray-200 animate-spin"></div>
              <h3 className="text-lg font-medium text-center">Processing Payment</h3>
              <p className="text-sm text-gray-500 text-center mt-2">
                Please wait while we process the salary payment. This may take a few moments.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </DashboardLayout>
  );
};

export default SalaryManagement;
