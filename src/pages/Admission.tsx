import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Calendar, Users, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import PublicLayout from '@/components/layout/PublicLayout';

const Admission = () => {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-gradient-to-r from-school-primary to-school-secondary flex items-center justify-center text-white">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Students in a classroom" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 text-center px-4 md:px-8 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Admission Information</h1>
          <p className="text-xl md:text-2xl">Begin your journey with Veena Public School</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Introduction */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <BookOpen className="h-12 w-12 text-school-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-school-primary mb-4">Welcome to Our Admissions Process</h2>
          <p className="text-lg text-gray-700">
            We are delighted that you are considering Veena Public School for your child's education. 
            Our admissions process is designed to be transparent and supportive, ensuring the best 
            fit for both students and our school community.
          </p>
        </div>

        {/* Admission Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-school-primary mb-10 text-center">Admission Process</h2>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-school-primary hidden md:block"></div>
            
            <div className="space-y-12 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="md:text-right order-2 md:order-1">
                  <h3 className="text-2xl font-bold text-school-primary mb-3">Step 1: Enquiry</h3>
                  <p className="text-gray-700 mb-4">
                    Begin by filling out our online enquiry form or visit our campus to collect 
                    the admission information package. Our staff will guide you through the available 
                    options based on your child's age and academic background.
                  </p>
                  <Link to="/admission-enquiry" className="inline-block bg-school-primary hover:bg-school-primary/90 text-white px-4 py-2 rounded-md">
                    Submit Enquiry
                  </Link>
                </div>
                <div className="order-1 md:order-2 flex justify-center md:justify-start">
                  <div className="bg-school-light p-4 rounded-full h-24 w-24 flex items-center justify-center relative z-10">
                    <span className="text-3xl font-bold text-school-primary">1</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="flex justify-center md:justify-end">
                  <div className="bg-school-light p-4 rounded-full h-24 w-24 flex items-center justify-center relative z-10">
                    <span className="text-3xl font-bold text-school-primary">2</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-school-primary mb-3">Step 2: Application Submission</h3>
                  <p className="text-gray-700 mb-4">
                    Complete the application form and submit it along with the required documents, including birth certificate, 
                    previous academic records, transfer certificate (if applicable), and passport-sized photographs.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="md:text-right order-2 md:order-1">
                  <h3 className="text-2xl font-bold text-school-primary mb-3">Step 3: Assessment</h3>
                  <p className="text-gray-700 mb-4">
                    For classes II and above, students may be required to take an entrance assessment to evaluate 
                    their academic readiness. For nursery and primary classes, an informal interaction session with the child and parents is conducted.
                  </p>
                </div>
                <div className="order-1 md:order-2 flex justify-center md:justify-start">
                  <div className="bg-school-light p-4 rounded-full h-24 w-24 flex items-center justify-center relative z-10">
                    <span className="text-3xl font-bold text-school-primary">3</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="flex justify-center md:justify-end">
                  <div className="bg-school-light p-4 rounded-full h-24 w-24 flex items-center justify-center relative z-10">
                    <span className="text-3xl font-bold text-school-primary">4</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-school-primary mb-3">Step 4: Selection & Admission</h3>
                  <p className="text-gray-700 mb-4">
                    Upon successful completion of the assessment and interview, an admission offer will be made. 
                    Parents need to complete the admission formalities, including fee payment, to secure their child's place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Fee Structure */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-school-primary mb-10 text-center">Fee Structure</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-school-primary mb-4">Academic Fee Components</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex justify-between border-b pb-2">
                    <span>Admission Fee (One-time)</span>
                    <span>₹25,000</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span>Tuition Fee (Per Quarter)</span>
                    <span>₹18,000 - ₹25,000</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span>Development Fee (Annual)</span>
                    <span>₹15,000</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span>Computer Lab Fee (Annual)</span>
                    <span>₹8,000</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span>Library Fee (Annual)</span>
                    <span>₹5,000</span>
                  </li>
                </ul>
                <p className="mt-4 text-sm text-gray-500">
                  * Fees may vary by grade level. Please check the detailed fee structure document.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-school-primary mb-4">Additional Services (Optional)</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex justify-between border-b pb-2">
                    <span>Transport Fee (Per Month)</span>
                    <span>₹2,000 - ₹4,000</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span>Meal Plan (Per Month)</span>
                    <span>₹3,500</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span>Extracurricular Activities (Per Quarter)</span>
                    <span>₹5,000 - ₹8,000</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span>Uniform Kit (One-time)</span>
                    <span>₹7,500</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span>Books & Stationery Kit (Annual)</span>
                    <span>₹6,000 - ₹10,000</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link to="/fee-structure" className="text-school-primary hover:underline font-semibold">
                    View Detailed Fee Structure →
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Key Dates */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-school-primary mb-10 text-center">Key Admission Dates</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-all duration-300 border-t-4 border-school-primary">
              <CardContent className="p-6 text-center">
                <Calendar className="h-10 w-10 text-school-primary mx-auto mb-4" />
                <h3 className="text-lg font-bold text-school-primary mb-2">Registration Opens</h3>
                <p className="text-gray-700">September 1, 2025</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300 border-t-4 border-school-secondary">
              <CardContent className="p-6 text-center">
                <Calendar className="h-10 w-10 text-school-secondary mx-auto mb-4" />
                <h3 className="text-lg font-bold text-school-secondary mb-2">Application Deadline</h3>
                <p className="text-gray-700">November 30, 2025</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300 border-t-4 border-school-primary">
              <CardContent className="p-6 text-center">
                <Calendar className="h-10 w-10 text-school-primary mx-auto mb-4" />
                <h3 className="text-lg font-bold text-school-primary mb-2">Assessment Period</h3>
                <p className="text-gray-700">December 1-15, 2025</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300 border-t-4 border-school-secondary">
              <CardContent className="p-6 text-center">
                <Calendar className="h-10 w-10 text-school-secondary mx-auto mb-4" />
                <h3 className="text-lg font-bold text-school-secondary mb-2">Results & Admission</h3>
                <p className="text-gray-700">January 15, 2026</p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-school-primary mb-8">Need Help?</h2>
          <p className="text-lg text-gray-700 mb-8">
            Our admissions team is here to help you through every step of the process.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-school-primary" />
              <span className="text-gray-700">Call us: (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-school-primary" />
              <span className="text-gray-700">Visit us: Monday - Friday, 8:00 AM - 4:00 PM</span>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Admission;
