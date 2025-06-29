import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Award, Calendar, Users } from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';

const Academics = () => {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-gradient-to-r from-school-primary to-school-secondary flex items-center justify-center text-white">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Students studying" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 text-center px-4 md:px-8 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Academic Excellence</h1>
          <p className="text-xl md:text-2xl">Nurturing minds, inspiring futures</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Introduction */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <BookOpen className="h-12 w-12 text-school-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-school-primary mb-4">Our Academic Approach</h2>
          <p className="text-lg text-gray-700">
            At Veena Public School, we believe in providing a comprehensive educational experience that balances academic rigor with creative exploration. 
            Our curriculum is designed to foster critical thinking, problem-solving abilities, and a lifelong love for learning.
          </p>
        </div>

        {/* Academic Levels Tabs */}
        <Tabs defaultValue="primary" className="mb-16">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="primary">Primary Wing</TabsTrigger>
              <TabsTrigger value="middle">Middle School</TabsTrigger>
              <TabsTrigger value="secondary">Secondary Wing</TabsTrigger>
              <TabsTrigger value="senior">Senior Secondary</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="primary" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-school-primary mb-4">Primary Wing (Classes I-V)</h3>
                <p className="text-gray-700 mb-4">
                  Our primary education program focuses on building a strong foundation in core subjects while nurturing creativity and curiosity. 
                  We employ play-based and experiential learning approaches to make education engaging and fun for young learners.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Activity-based learning approach</li>
                  <li>Focus on language development and numeracy skills</li>
                  <li>Introduction to environmental studies</li>
                  <li>Arts, music, and physical education</li>
                  <li>Value education and social skills</li>
                </ul>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Primary classroom" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="middle" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Middle school students" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-school-primary mb-4">Middle School (Classes VI-VIII)</h3>
                <p className="text-gray-700 mb-4">
                  The middle school program builds upon the foundation laid in primary classes, with a more structured approach to academics. 
                  Students are exposed to a broader curriculum and encouraged to develop analytical thinking and problem-solving skills.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Deeper exploration of language, mathematics, and sciences</li>
                  <li>Introduction to social sciences and additional languages</li>
                  <li>Project-based learning initiatives</li>
                  <li>Digital literacy and computer science fundamentals</li>
                  <li>Clubs and extra-curricular activities</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="secondary" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-school-primary mb-4">Secondary Wing (Classes IX-X)</h3>
                <p className="text-gray-700 mb-4">
                  The secondary curriculum prepares students for board examinations while ensuring a well-rounded education. 
                  We focus on academic excellence while providing opportunities for students to discover their interests and aptitudes.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>CBSE curriculum with comprehensive subject coverage</li>
                  <li>Regular assessments and preparatory examinations</li>
                  <li>Career guidance and counseling</li>
                  <li>Scientific temperament and research orientation</li>
                  <li>Leadership development through various initiatives</li>
                </ul>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Secondary classroom" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="senior" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Senior secondary students" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-school-primary mb-4">Senior Secondary (Classes XI-XII)</h3>
                <p className="text-gray-700 mb-4">
                  Our senior secondary program offers specialized streams in Science, Commerce, and Humanities, preparing students for higher education and future careers.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Specialized streams: Science, Commerce, and Humanities</li>
                  <li>Focus on competitive examination preparation</li>
                  <li>Advanced laboratories and facilities</li>
                  <li>Career counseling and university guidance</li>
                  <li>Internship and field exposure opportunities</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Facilities */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-school-primary mb-12 text-center">Academic Facilities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-school-light rounded-full mb-4">
                    <BookOpen className="h-8 w-8 text-school-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-school-primary mb-2">Modern Library</h3>
                  <p className="text-gray-600">
                    Our library houses over 10,000 books, digital resources, and quiet study spaces to foster a love for reading and research.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-school-light rounded-full mb-4">
                    <Calendar className="h-8 w-8 text-school-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-school-primary mb-2">Smart Classrooms</h3>
                  <p className="text-gray-600">
                    Technology-integrated classrooms with interactive whiteboards, multimedia resources, and internet connectivity.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-school-light rounded-full mb-4">
                    <Users className="h-8 w-8 text-school-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-school-primary mb-2">Science Laboratories</h3>
                  <p className="text-gray-600">
                    Fully equipped Physics, Chemistry, Biology, and Computer Science labs for practical learning and experimentation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Academics;
