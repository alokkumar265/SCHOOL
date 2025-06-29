import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { School, CreditCard, Info, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PublicLayout from '@/components/layout/PublicLayout';

const FeePayment = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('verify');
  const [studentDetails, setStudentDetails] = useState<any>(null);
  const [verificationForm, setVerificationForm] = useState({
    admissionNumber: '',
    dateOfBirth: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const mockFeeDetails = {
    studentName: 'Rahul Sharma',
    class: '10',
    section: 'A',
    admissionNumber: 'VPS-2023-001',
    guardianName: 'John Smith',
    outstandingFees: [
      { id: '1', description: 'Tuition Fee (Q3)', amount: 15000, dueDate: '2023-10-15' },
      { id: '2', description: 'Computer Lab Fee', amount: 2000, dueDate: '2023-10-15' },
      { id: '3', description: 'Activity Fee', amount: 1500, dueDate: '2023-10-15' }
    ]
  };

  const handleVerificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVerificationForm(prev => ({ ...prev, [name]: value }));
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    
    // Simulate verification
    setTimeout(() => {
      if (verificationForm.admissionNumber === 'VPS-2023-001') {
        setStudentDetails(mockFeeDetails);
        setActiveTab('payment');
      } else {
        toast({
          title: "Verification Failed",
          description: "No student found with the provided details. Please try again.",
          variant: "destructive"
        });
      }
      setIsVerifying(false);
    }, 1500);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      toast({
        title: "Payment Successful",
        description: "Your payment has been processed successfully. A receipt has been sent to your registered email.",
      });
    }, 2000);
  };

  const totalAmount = studentDetails?.outstandingFees.reduce((sum: number, fee: any) => sum + fee.amount, 0) || 0;

  if (isSuccess) {
    return (
      <PublicLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto mt-10">
            <Card className="border-green-200 shadow-lg">
              <CardHeader className="bg-green-50 border-b border-green-100">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-center text-green-700">Payment Successful</CardTitle>
                <CardDescription className="text-center text-green-600">
                  Your transaction has been processed successfully
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transaction ID</span>
                    <span className="font-medium">VPSFEE{Math.floor(Math.random() * 1000000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Student Name</span>
                    <span className="font-medium">{studentDetails?.studentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Admission Number</span>
                    <span className="font-medium">{studentDetails?.admissionNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Class</span>
                    <span className="font-medium">{studentDetails?.class}-{studentDetails?.section}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span className="text-gray-700">Amount Paid</span>
                    <span className="text-school-primary">₹{totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Date & Time</span>
                    <span className="text-gray-500">{new Date().toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col space-y-4">
                <Button onClick={() => window.print()} variant="outline" className="w-full">
                  Download Receipt
                </Button>
                <Button asChild className="w-full">
                  <Link to="/">Return to Home</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-school-primary mb-4">
              Online Fee Payment
            </h1>
            <p className="text-lg text-school-dark max-w-2xl mx-auto">
              Pay your school fees securely online using credit card, debit card, or net banking.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Fee Payment Portal</CardTitle>
              <CardDescription>
                Secure and convenient way to pay school fees
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="verify">Verify Student</TabsTrigger>
                  <TabsTrigger value="payment" disabled={!studentDetails}>Payment</TabsTrigger>
                </TabsList>
                <TabsContent value="verify" className="py-4">
                  <form onSubmit={handleVerify}>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="admissionNumber">Admission Number *</Label>
                        <Input 
                          id="admissionNumber" 
                          name="admissionNumber"
                          value={verificationForm.admissionNumber}
                          onChange={handleVerificationChange}
                          placeholder="Enter admission number"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                        <Input 
                          id="dateOfBirth" 
                          name="dateOfBirth"
                          type="date"
                          value={verificationForm.dateOfBirth}
                          onChange={handleVerificationChange}
                          required
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-school-primary hover:bg-school-primary/90"
                        disabled={isVerifying}
                      >
                        {isVerifying ? 'Verifying...' : 'Verify Student'}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
                
                <TabsContent value="payment" className="py-4">
                  {studentDetails && (
                    <div className="space-y-6">
                      {/* Student Details */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Student Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm text-gray-500">Student Name</Label>
                              <p className="font-medium">{studentDetails.studentName}</p>
                            </div>
                            <div>
                              <Label className="text-sm text-gray-500">Class & Section</Label>
                              <p className="font-medium">{studentDetails.class}-{studentDetails.section}</p>
                            </div>
                            <div>
                              <Label className="text-sm text-gray-500">Admission Number</Label>
                              <p className="font-medium">{studentDetails.admissionNumber}</p>
                            </div>
                            <div>
                              <Label className="text-sm text-gray-500">Guardian Name</Label>
                              <p className="font-medium">{studentDetails.guardianName}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Outstanding Fees */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Outstanding Fees</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {studentDetails.outstandingFees.map((fee: any) => (
                              <div key={fee.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <div>
                                  <p className="font-medium">{fee.description}</p>
                                  <p className="text-sm text-gray-500">Due: {fee.dueDate}</p>
                                </div>
                                <span className="font-bold text-school-primary">₹{fee.amount.toLocaleString()}</span>
                              </div>
                            ))}
                            <Separator />
                            <div className="flex justify-between items-center font-bold text-lg">
                              <span>Total Amount</span>
                              <span className="text-school-primary">₹{totalAmount.toLocaleString()}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Payment Method */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Payment Method</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                            <div className="flex items-center space-x-2 mb-4">
                              <RadioGroupItem value="card" id="card" />
                              <Label htmlFor="card" className="flex items-center">
                                <CreditCard className="h-4 w-4 mr-2" />
                                Credit/Debit Card
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2 mb-4">
                              <RadioGroupItem value="netbanking" id="netbanking" />
                              <Label htmlFor="netbanking">Net Banking</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="upi" id="upi" />
                              <Label htmlFor="upi">UPI</Label>
                            </div>
                          </RadioGroup>
                        </CardContent>
                      </Card>

                      {/* Payment Form */}
                      <form onSubmit={handlePayment}>
                        <Card>
                          <CardHeader>
                            <CardTitle>Payment Details</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="cardNumber">Card Number</Label>
                                <Input 
                                  id="cardNumber" 
                                  placeholder="1234 5678 9012 3456"
                                  required
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="expiry">Expiry Date</Label>
                                  <Input 
                                    id="expiry" 
                                    placeholder="MM/YY"
                                    required
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="cvv">CVV</Label>
                                  <Input 
                                    id="cvv" 
                                    placeholder="123"
                                    required
                                  />
                                </div>
                              </div>
                              <div>
                                <Label htmlFor="cardName">Cardholder Name</Label>
                                <Input 
                                  id="cardName" 
                                  placeholder="John Doe"
                                  required
                                />
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button 
                              type="submit" 
                              className="w-full bg-school-primary hover:bg-school-primary/90"
                              disabled={isProcessing}
                            >
                              {isProcessing ? 'Processing Payment...' : `Pay ₹${totalAmount.toLocaleString()}`}
                            </Button>
                          </CardFooter>
                        </Card>
                      </form>

                      {/* Security Notice */}
                      <Card className="border-blue-200">
                        <CardContent className="pt-6">
                          <div className="flex items-start space-x-3">
                            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-blue-800 mb-2">Secure Payment</h4>
                              <p className="text-sm text-blue-700">
                                Your payment information is encrypted and secure. We use industry-standard SSL encryption to protect your data.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </PublicLayout>
  );
};

export default FeePayment;
