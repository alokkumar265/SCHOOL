import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { School } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import PublicLayout from '@/components/layout/PublicLayout';

const AdmissionEnquiry = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    childName: '',
    parentName: '',
    email: '',
    phone: '',
    gradeApplying: '',
    address: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Enquiry Submitted",
        description: "Thank you for your interest in Veena Public School. We will contact you shortly.",
      });
      
      setFormData({
        childName: '',
        parentName: '',
        email: '',
        phone: '',
        gradeApplying: '',
        address: '',
        message: ''
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-school-primary mb-4">
              Admission Enquiry
            </h1>
            <p className="text-lg text-school-dark max-w-2xl mx-auto">
              Complete the form below to register your interest in admission to Veena Public School. Our team will contact you with more information.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Enquiry Form</CardTitle>
              <CardDescription>
                Please provide accurate information to help us process your request efficiently.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="childName">Child's Full Name *</Label>
                    <Input 
                      id="childName" 
                      name="childName" 
                      value={formData.childName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="parentName">Parent/Guardian Name *</Label>
                    <Input 
                      id="parentName" 
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Contact Number *</Label>
                    <Input 
                      id="phone" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gradeApplying">Grade Applying For *</Label>
                    <Select 
                      value={formData.gradeApplying} 
                      onValueChange={(value) => handleSelectChange('gradeApplying', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Nursery">Nursery</SelectItem>
                        <SelectItem value="LKG">LKG</SelectItem>
                        <SelectItem value="UKG">UKG</SelectItem>
                        {[...Array(12)].map((_, i) => (
                          <SelectItem key={i+1} value={`${i+1}`}>
                            Class {i+1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="message">Additional Information</Label>
                    <Textarea 
                      id="message" 
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button 
                    type="submit" 
                    className="w-full bg-school-primary hover:bg-school-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col items-start text-sm text-gray-500">
              <p>
                * Required fields. By submitting this form, you agree to our privacy policy and consent to being contacted regarding your enquiry.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PublicLayout>
  );
};

export default AdmissionEnquiry;
