
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Student, FeePayment, FeeStructure } from '@/types';
import { Plus, Search, FileText, CreditCard } from 'lucide-react';

// Mock data for students
const mockStudents: Student[] = [
  { 
    id: '1', 
    userId: '4',
    admissionNumber: 'VPS-2023-001',
    rollNumber: '101',
    guardianName: 'John Smith',
    guardianContact: '+91 9876543210',
    class: '10',
    section: 'A',
    address: '123 Main Street, Delhi',
    dateOfBirth: '2005-05-15',
    admissionDate: '2022-04-01',
    bloodGroup: 'O+'
  },
  { 
    id: '2', 
    userId: '5',
    admissionNumber: 'VPS-2023-002',
    rollNumber: '102',
    guardianName: 'Robert Williams',
    guardianContact: '+91 9876543211',
    class: '10',
    section: 'A',
    address: '456 Park Avenue, Delhi',
    dateOfBirth: '2005-06-22',
    admissionDate: '2022-04-01',
    bloodGroup: 'A+'
  },
  { 
    id: '3', 
    userId: '6',
    admissionNumber: 'VPS-2023-003',
    rollNumber: '103',
    guardianName: 'Michael Johnson',
    guardianContact: '+91 9876543212',
    class: '9',
    section: 'B',
    address: '789 Oak Lane, Delhi',
    dateOfBirth: '2006-03-10',
    admissionDate: '2022-04-02',
    bloodGroup: 'B+'
  },
];

// Mock data for fee structure
const mockFeeStructures: FeeStructure[] = [
  {
    id: '1',
    name: 'Annual Tuition Fee - Class 10',
    academicYear: '2023-2024',
    grade: '10',
    amount: 45000,
    dueDate: '2023-07-15',
    description: 'Annual tuition fee for Class 10 students'
  },
  {
    id: '2',
    name: 'Annual Tuition Fee - Class 9',
    academicYear: '2023-2024',
    grade: '9',
    amount: 42000,
    dueDate: '2023-07-15',
    description: 'Annual tuition fee for Class 9 students'
  },
  {
    id: '3',
    name: 'Computer Lab Fee',
    academicYear: '2023-2024',
    grade: 'All',
    amount: 5000,
    dueDate: '2023-08-15',
    description: 'Computer lab and technology resources fee'
  },
  {
    id: '4',
    name: 'Sports Fee',
    academicYear: '2023-2024',
    grade: 'All',
    amount: 3000,
    dueDate: '2023-08-15',
    description: 'Sports equipment and playground maintenance fee'
  },
];

// Mock fee payments
const mockFeePayments: FeePayment[] = [
  {
    id: '1',
    studentId: '1',
    feeStructureId: '1',
    amount: 45000,
    paymentDate: '2023-07-10',
    paymentMethod: 'online',
    status: 'paid',
    receiptNumber: 'VPS-REC-001',
    transactionId: 'TXN123456789'
  },
  {
    id: '2',
    studentId: '1',
    feeStructureId: '3',
    amount: 5000,
    paymentDate: '2023-08-05',
    paymentMethod: 'online',
    status: 'paid',
    receiptNumber: 'VPS-REC-002',
    transactionId: 'TXN123456790'
  },
  {
    id: '3',
    studentId: '2',
    feeStructureId: '1',
    amount: 45000,
    paymentDate: '2023-07-12',
    paymentMethod: 'cheque',
    status: 'paid',
    receiptNumber: 'VPS-REC-003',
  },
  {
    id: '4',
    studentId: '3',
    feeStructureId: '2',
    amount: 21000,
    paymentDate: '2023-07-20',
    paymentMethod: 'cash',
    status: 'partial',
    receiptNumber: 'VPS-REC-004',
  },
];

const FeeManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [feeStructures, setFeeStructures] = useState<FeeStructure[]>(mockFeeStructures);
  const [feePayments, setFeePayments] = useState<FeePayment[]>(mockFeePayments);
  const [isAddStructureDialogOpen, setIsAddStructureDialogOpen] = useState(false);
  const [isAddPaymentDialogOpen, setIsAddPaymentDialogOpen] = useState(false);
  const [newFeeStructure, setNewFeeStructure] = useState<Partial<FeeStructure>>({
    name: '',
    academicYear: '2023-2024',
    grade: '',
    amount: 0,
    dueDate: '',
    description: '',
  });
  const [newFeePayment, setNewFeePayment] = useState<Partial<FeePayment>>({
    studentId: '',
    feeStructureId: '',
    amount: 0,
    paymentDate: new Date().toISOString().split('T')[0],
    paymentMethod: 'cash',
    status: 'paid',
    receiptNumber: `VPS-REC-${String(feePayments.length + 1).padStart(3, '0')}`,
  });
  
  const { toast } = useToast();

  const handleAddFeeStructure = () => {
    if (!newFeeStructure.name || !newFeeStructure.grade || !newFeeStructure.amount || !newFeeStructure.dueDate) {
      toast({
        title: 'Missing Information',
        description: 'Please fill all required fields',
        variant: 'destructive',
      });
      return;
    }

    const feeStructure: FeeStructure = {
      id: String(feeStructures.length + 1),
      name: newFeeStructure.name,
      academicYear: newFeeStructure.academicYear || '2023-2024',
      grade: newFeeStructure.grade,
      amount: newFeeStructure.amount,
      dueDate: newFeeStructure.dueDate,
      description: newFeeStructure.description,
    };

    setFeeStructures([...feeStructures, feeStructure]);
    setNewFeeStructure({
      name: '',
      academicYear: '2023-2024',
      grade: '',
      amount: 0,
      dueDate: '',
      description: '',
    });
    setIsAddStructureDialogOpen(false);

    toast({
      title: 'Fee Structure Added',
      description: `${feeStructure.name} has been added successfully`,
    });
  };

  const handleAddFeePayment = () => {
    if (!newFeePayment.studentId || !newFeePayment.feeStructureId || !newFeePayment.amount) {
      toast({
        title: 'Missing Information',
        description: 'Please fill all required fields',
        variant: 'destructive',
      });
      return;
    }

    const feePayment: FeePayment = {
      id: String(feePayments.length + 1),
      studentId: newFeePayment.studentId,
      feeStructureId: newFeePayment.feeStructureId,
      amount: newFeePayment.amount,
      paymentDate: newFeePayment.paymentDate || new Date().toISOString().split('T')[0],
      paymentMethod: newFeePayment.paymentMethod as 'cash' | 'cheque' | 'online',
      status: newFeePayment.status as 'paid' | 'pending' | 'partial' | 'overdue',
      receiptNumber: newFeePayment.receiptNumber || `VPS-REC-${String(feePayments.length + 1).padStart(3, '0')}`,
      transactionId: newFeePayment.transactionId,
    };

    setFeePayments([...feePayments, feePayment]);
    setNewFeePayment({
      studentId: '',
      feeStructureId: '',
      amount: 0,
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMethod: 'cash',
      status: 'paid',
      receiptNumber: `VPS-REC-${String(feePayments.length + 2).padStart(3, '0')}`,
    });
    setIsAddPaymentDialogOpen(false);

    toast({
      title: 'Fee Payment Recorded',
      description: `Receipt number ${feePayment.receiptNumber} has been generated`,
    });
  };

  const filteredFeeStructures = feeStructures.filter(structure => 
    structure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    structure.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    structure.academicYear.includes(searchTerm)
  );

  const filteredFeePayments = feePayments.filter(payment => {
    const student = mockStudents.find(s => s.id === payment.studentId);
    const structure = feeStructures.find(s => s.id === payment.feeStructureId);
    
    return (
      student?.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student?.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (structure && structure.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const getFeeStructureName = (id: string) => {
    const structure = feeStructures.find(s => s.id === id);
    return structure ? structure.name : 'Unknown Fee';
  };

  const getStudentName = (id: string) => {
    const student = mockStudents.find(s => s.id === id);
    return student ? `${student.admissionNumber} (${student.guardianName})` : 'Unknown Student';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Fee Management</h2>
            <p className="text-muted-foreground">
              Manage fee structures and payments for Veena Public School
            </p>
          </div>
        </div>

        <div className="my-6 w-full">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, grade, or admission number..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="structures">
          <TabsList className="mb-6">
            <TabsTrigger value="structures">Fee Structure</TabsTrigger>
            <TabsTrigger value="payments">Fee Payments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="structures">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Fee Structures</h3>
              <Dialog open={isAddStructureDialogOpen} onOpenChange={setIsAddStructureDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Fee Structure
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>Add New Fee Structure</DialogTitle>
                    <DialogDescription>
                      Create a new fee structure for the school. All fields marked with * are required.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">
                        Fee Name *
                      </Label>
                      <Input
                        id="name"
                        value={newFeeStructure.name}
                        onChange={(e) => setNewFeeStructure({ ...newFeeStructure, name: e.target.value })}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="academicYear">Academic Year *</Label>
                        <Select
                          value={newFeeStructure.academicYear}
                          onValueChange={(value) => setNewFeeStructure({ ...newFeeStructure, academicYear: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2022-2023">2022-2023</SelectItem>
                            <SelectItem value="2023-2024">2023-2024</SelectItem>
                            <SelectItem value="2024-2025">2024-2025</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="grade">Class/Grade *</Label>
                        <Select
                          value={newFeeStructure.grade}
                          onValueChange={(value) => setNewFeeStructure({ ...newFeeStructure, grade: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select class" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="All">All Classes</SelectItem>
                            <SelectItem value="6">Class 6</SelectItem>
                            <SelectItem value="7">Class 7</SelectItem>
                            <SelectItem value="8">Class 8</SelectItem>
                            <SelectItem value="9">Class 9</SelectItem>
                            <SelectItem value="10">Class 10</SelectItem>
                            <SelectItem value="11">Class 11</SelectItem>
                            <SelectItem value="12">Class 12</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="amount">
                          Amount (₹) *
                        </Label>
                        <Input
                          id="amount"
                          type="number"
                          value={newFeeStructure.amount || ''}
                          onChange={(e) => setNewFeeStructure({ 
                            ...newFeeStructure, 
                            amount: parseInt(e.target.value) 
                          })}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="dueDate">Due Date *</Label>
                        <Input
                          id="dueDate"
                          type="date"
                          value={newFeeStructure.dueDate}
                          onChange={(e) => setNewFeeStructure({ ...newFeeStructure, dueDate: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        value={newFeeStructure.description}
                        onChange={(e) => setNewFeeStructure({ ...newFeeStructure, description: e.target.value })}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleAddFeeStructure}>
                      Add Fee Structure
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Academic Year</TableHead>
                      <TableHead>Class/Grade</TableHead>
                      <TableHead>Amount (₹)</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFeeStructures.map((structure) => (
                      <TableRow key={structure.id}>
                        <TableCell className="font-medium">{structure.name}</TableCell>
                        <TableCell>{structure.academicYear}</TableCell>
                        <TableCell>{structure.grade}</TableCell>
                        <TableCell>₹{structure.amount.toLocaleString()}</TableCell>
                        <TableCell>{new Date(structure.dueDate).toLocaleDateString()}</TableCell>
                        <TableCell>{structure.description}</TableCell>
                      </TableRow>
                    ))}
                    {filteredFeeStructures.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                          No fee structures found matching your search criteria.
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
              <h3 className="text-xl font-semibold">Fee Payments</h3>
              <Dialog open={isAddPaymentDialogOpen} onOpenChange={setIsAddPaymentDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Record Payment
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>Record Fee Payment</DialogTitle>
                    <DialogDescription>
                      Record a new fee payment. All fields marked with * are required.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="studentId">
                        Student *
                      </Label>
                      <Select
                        value={newFeePayment.studentId}
                        onValueChange={(value) => setNewFeePayment({ ...newFeePayment, studentId: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select student" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockStudents.map((student) => (
                            <SelectItem key={student.id} value={student.id}>
                              {student.admissionNumber} - {student.guardianName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="feeStructureId">
                        Fee Type *
                      </Label>
                      <Select
                        value={newFeePayment.feeStructureId}
                        onValueChange={(value) => {
                          const structure = feeStructures.find(s => s.id === value);
                          setNewFeePayment({ 
                            ...newFeePayment, 
                            feeStructureId: value,
                            amount: structure ? structure.amount : 0
                          });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select fee type" />
                        </SelectTrigger>
                        <SelectContent>
                          {feeStructures.map((structure) => (
                            <SelectItem key={structure.id} value={structure.id}>
                              {structure.name} (₹{structure.amount})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="amount">
                          Amount Paid (₹) *
                        </Label>
                        <Input
                          id="amount"
                          type="number"
                          value={newFeePayment.amount || ''}
                          onChange={(e) => setNewFeePayment({ 
                            ...newFeePayment, 
                            amount: parseInt(e.target.value) 
                          })}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="paymentDate">Payment Date *</Label>
                        <Input
                          id="paymentDate"
                          type="date"
                          value={newFeePayment.paymentDate}
                          onChange={(e) => setNewFeePayment({ ...newFeePayment, paymentDate: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="paymentMethod">Payment Method *</Label>
                        <Select
                          value={newFeePayment.paymentMethod}
                          onValueChange={(value: 'cash' | 'cheque' | 'online') => 
                            setNewFeePayment({ ...newFeePayment, paymentMethod: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cash">Cash</SelectItem>
                            <SelectItem value="cheque">Cheque</SelectItem>
                            <SelectItem value="online">Online Transfer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="status">Payment Status *</Label>
                        <Select
                          value={newFeePayment.status}
                          onValueChange={(value: 'paid' | 'pending' | 'partial' | 'overdue') => 
                            setNewFeePayment({ ...newFeePayment, status: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="partial">Partial</SelectItem>
                            <SelectItem value="overdue">Overdue</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="receiptNumber">
                        Receipt Number
                      </Label>
                      <Input
                        id="receiptNumber"
                        value={newFeePayment.receiptNumber}
                        onChange={(e) => setNewFeePayment({ ...newFeePayment, receiptNumber: e.target.value })}
                        readOnly
                      />
                    </div>
                    
                    {newFeePayment.paymentMethod === 'online' && (
                      <div className="grid gap-2">
                        <Label htmlFor="transactionId">
                          Transaction ID
                        </Label>
                        <Input
                          id="transactionId"
                          value={newFeePayment.transactionId || ''}
                          onChange={(e) => setNewFeePayment({ ...newFeePayment, transactionId: e.target.value })}
                        />
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleAddFeePayment}>
                      Record Payment
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Receipt No.</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Fee Type</TableHead>
                      <TableHead>Amount (₹)</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFeePayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.receiptNumber}</TableCell>
                        <TableCell>{getStudentName(payment.studentId)}</TableCell>
                        <TableCell>{getFeeStructureName(payment.feeStructureId)}</TableCell>
                        <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                        <TableCell>{new Date(payment.paymentDate).toLocaleDateString()}</TableCell>
                        <TableCell className="capitalize">{payment.paymentMethod}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            payment.status === 'paid'
                              ? 'bg-green-100 text-green-800'
                              : payment.status === 'partial'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {payment.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredFeePayments.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                          No payments found matching your search criteria.
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
    </DashboardLayout>
  );
};

export default FeeManagement;
